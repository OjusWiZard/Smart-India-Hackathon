import smartpy as sp

FA2 = sp.io.import_script_from_url("https://smartpy.io/templates/FA2.py")


class Token_meta_data:
    def __init__(self, config):
        self.config = config

    def get_type(self):
        return sp.TRecord(token_id = sp.TNat, token_info = sp.TMap(sp.TString, sp.TString))

    def set_type_and_layout(self, expr):
        sp.set_type(expr, self.get_type())


##
## ## Implementation of the Contract
##
## `mutez_transfer` is an optional entry-point, hence we define it “outside” the
## class:
def mutez_transfer(contract, params):
    sp.verify(sp.sender == contract.data.administrator)
    sp.set_type(params.destination, sp.TAddress)
    sp.set_type(params.amount, sp.TMutez)
    sp.send(params.destination, params.amount)


class Certificate(FA2.FA2):
    def __init__(self, admin, config, metadata):
        self.config = config
        self.error_message = FA2.Error_message(self.config)
        self.operator_set = FA2.Operator_set(self.config)
        self.operator_param = FA2.Operator_param(self.config)
        self.token_id_set = FA2.Token_id_set(self.config)
        self.ledger_key = FA2.Ledger_key(self.config)
        self.token_meta_data = Token_meta_data(self.config)
        self.batch_transfer    = FA2.Batch_transfer(self.config)
        if  self.config.add_mutez_transfer:
            self.transfer_mutez = sp.entry_point(mutez_transfer)
        if config.lazy_entry_points:
            self.add_flag("lazy-entry-points")
        self.add_flag("initial-cast")
        self.exception_optimization_level = "default-line"
        self.init(
            administrator = admin,
            paused = False,
            ledger = self.config.my_map(tvalue = FA2.Ledger_value.get_type()),
            token_metadata = self.config.my_map(tkey = sp.TNat, tvalue = self.token_meta_data.get_type()),
            operators = self.operator_set.make(),
            all_tokens = self.token_id_set.empty(),
            metadata = metadata,
            issuers = sp.set([admin]),
            issued_by = sp.map(
                tkey = sp.TNat,
                tvalue = sp.TAddress
            )
        )

        if self.config.store_total_supply:
            self.update_initial_storage(
                total_supply = self.config.my_map(tkey = sp.TNat, tvalue = sp.TNat),
            )

    def is_issuer(self, person):
        return self.data.issuers.contains(person)

    @sp.onchain_view(pure=True)
    def count_tokens(self):
        sp.result(self.data.all_tokens)

    @sp.entry_point
    def add_issuer(self, params):
        sp.verify(self.is_administrator(sp.sender))
        self.data.issuers.add(params.issuer)

    @sp.entry_point
    def revoke_issuer(self, params):
        sp.verify(self.is_administrator(sp.sender))
        self.data.issuers.remove(params.issuer)

    @sp.entry_point
    def mint(self, params):
        # Only issuer can issue certificate
        sp.verify(self.is_issuer(sp.sender), message = self.error_message.not_admin())
        
        # Rest all same as in FA2
        if self.config.single_asset:
            sp.verify(params.token_id == 0, message = "single-asset: token-id <> 0")
        if self.config.non_fungible:
            sp.verify(params.amount == 1, message = "NFT-asset: amount <> 1")
            sp.verify(
                ~ self.token_id_set.contains(self.data.all_tokens, params.token_id),
                message = "NFT-asset: cannot mint twice same token"
            )
        user = self.ledger_key.make(params.address, params.token_id)
        sp.if self.data.ledger.contains(user):
            self.data.ledger[user].balance += params.amount
        sp.else:
            self.data.ledger[user] = FA2.Ledger_value.make(params.amount)
        sp.if ~ self.token_id_set.contains(self.data.all_tokens, params.token_id):
            self.token_id_set.add(self.data.all_tokens, params.token_id)
            self.data.token_metadata[params.token_id] = sp.record(
                token_id    = params.token_id,
                token_info  = params.metadata
            )
        if self.config.store_total_supply:
            self.data.total_supply[params.token_id] = params.amount + self.data.total_supply.get(params.token_id, default_value = 0)

        self.data.issued_by[params.token_id] = sp.sender

    @sp.entry_point
    def transfer(self, params):
        sp.verify( ~self.is_paused(), message = self.error_message.paused() )
        sp.set_type(params, self.batch_transfer.get_type())
        sp.for transfer in params:
            current_from = transfer.from_
            sp.for tx in transfer.txs:
                if self.config.single_asset:
                    sp.verify(tx.token_id == 0, message = "single-asset: token-id <> 0")

                sender_verify = self.data.issued_by[tx.token_id] == sp.sender   # Only issuer transfer certificate
                message = self.error_message.not_owner()
                if self.config.support_operator:
                    message = self.error_message.not_operator()
                    sender_verify |= (self.operator_set.is_member(self.data.operators,
                                                                    current_from,
                                                                    sp.sender,
                                                                    tx.token_id))
                if self.config.allow_self_transfer:
                    sender_verify |= (sp.sender == sp.self_address)
                sp.verify(sender_verify, message = message)
                sp.verify(
                    self.data.token_metadata.contains(tx.token_id),
                    message = self.error_message.token_undefined()
                )
                # If amount is 0 we do nothing now:
                sp.if (tx.amount > 0):
                    from_user = self.ledger_key.make(current_from, tx.token_id)
                    sp.verify(
                        (self.data.ledger[from_user].balance >= tx.amount),
                        message = self.error_message.insufficient_balance())
                    to_user = self.ledger_key.make(tx.to_, tx.token_id)
                    self.data.ledger[from_user].balance = sp.as_nat(
                        self.data.ledger[from_user].balance - tx.amount)
                    sp.if self.data.ledger.contains(to_user):
                        self.data.ledger[to_user].balance += tx.amount
                    sp.else:
                            self.data.ledger[to_user] = FA2.Ledger_value.make(tx.amount)
                sp.else:
                    pass


@sp.add_test(name = "CertiSetu-Test")
def test():

    admin = sp.test_account("admin")
    issuer1 = sp.test_account("issuer1")
    issuer2 = sp.test_account("issuer2")
    student1 = sp.test_account("student1")
    student2 = sp.test_account("student2")
    student2_1 = sp.test_account("student2.1")

    sc = sp.test_scenario()
    sc.h1("CertiSetu")
    sc.table_of_contents()

    sc.h2("Accounts")
    sc.show([admin,issuer1,issuer2,student1,student2])

    sc.h2("NFT Certificate")
    fa2 = Certificate(
        admin.address,
        FA2.FA2_config(
            non_fungible=True,
            support_operator=False,
            store_total_supply=True,
            use_token_metadata_offchain_view=True
        ),
        metadata = sp.utils.metadata_of_url("ipfs://QmQNZQmNyuTkSMjJvNzVLdHXitSUcHx6CSWFePeobTtCMB")
    )
    sc += fa2

    sc.p("admin adds issuer1 and issuer2")
    sc += fa2.add_issuer(
        sp.record(issuer = issuer1.address)
    ).run(sender = admin)
    sc += fa2.add_issuer(
        sp.record(issuer = issuer2.address)
    ).run(sender = admin)

    sc.p("issuer1 mints a certificate to student1")
    sc += fa2.mint(
        address=student1.address,
        amount=1,
        token_id=fa2.data.all_tokens,
        metadata = {
            "name": "B.Tech Marksheet",
            "rollno": "1",
            "branch": "CSE",
            "year": "2020",
            "A - marks": "80",
            "B - marks": "78",
            "C - marks": "86",
            "D - marks": "90",
            "E - marks": "95",
            "total": "429",
            "percentage": "85.8",
            "status": "pass"
        }
    ).run(sender = issuer1)

    sc.p("issuer2 mints a certificate to student2")
    sc += fa2.mint(
        address=student2.address,
        amount=1,
        token_id=fa2.data.all_tokens,
        metadata={
            "name": "B.Tech Marksheet",
            "rollno": "2",
            "branch": "CSE",
            "year": "2020",
            "A - marks": "87",
            "B - marks": "39",
            "C - marks": "86",
            "D - marks": "49",
            "E - marks": "78",
            "total": "339",
            "percentage": "67.8",
            "status": "pass"
        }
    ).run(sender = issuer2)

    sc.p("issuer2 can't transfer MARK1 of student1")
    sc += fa2.transfer([
        fa2.batch_transfer.item(
            from_ = student1.address,
            txs = [sp.record(
                to_ = student2_1.address,
                amount = 1,
                token_id = 0
            )]
        )
    ]).run(sender = issuer2, valid=False)

    sc.p("issuer2 can transfer MARK2 of student2")
    sc += fa2.transfer([
        fa2.batch_transfer.item(
            from_ = student2.address,
            txs = [sp.record(
                to_ = student2_1.address,
                amount = 1,
                token_id = 1
            )]
        )
    ]).run(sender = issuer2)


sp.add_compilation_target(
    "CertiSetu Certificates", 
    Certificate(
        admin=sp.address("tz1bb299QQuWXuYbynKzPfdVftmZdAQrvrGN"), 
        config = FA2.FA2_config(
            debug_mode = True,
            non_fungible=True,
            use_token_metadata_offchain_view=True
        ),
        metadata=sp.utils.metadata_of_url("ipfs://QmQNZQmNyuTkSMjJvNzVLdHXitSUcHx6CSWFePeobTtCMB")
    )
)