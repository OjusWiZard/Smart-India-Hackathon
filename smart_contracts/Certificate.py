import smartpy as sp


FA2 = sp.io.import_script_from_url("https://smartpy.io/templates/FA2.py")


class Certificate(FA2.FA2):
    @sp.onchain_view(pure=True)
    def count_tokens(self):
        sp.result(self.data.all_tokens)

    @sp.entry_point
    def mint(self, params):
        sp.verify(~self.is_paused(), message = self.error_message.paused())
        # We don't check for pauseness because we're the admin.
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

    @sp.entry_point
    def transfer(self, params):
        sp.verify( ~self.is_paused(), message = self.error_message.paused() )
        sp.set_type(params, self.batch_transfer.get_type())
        sp.for transfer in params:
           current_from = transfer.from_
           sp.for tx in transfer.txs:
                if self.config.single_asset:
                    sp.verify(tx.token_id == 0, message = "single-asset: token-id <> 0")

                sender_verify = ((self.is_administrator(sp.sender)) |
                                (current_from == sp.sender))
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
    student1 = sp.test_account("student1")
    student2 = sp.test_account("student2")

    sc = sp.test_scenario()
    sc.h1("CertiSetu")
    sc.table_of_contents()

    sc.h2("Accounts")
    sc.show([admin,student1,student2])

    sc.h2("NFT Certificate")
    fa2 = Certificate(
        FA2.FA2_config(
            debug_mode = True,
            non_fungible=True,
            use_token_metadata_offchain_view=True
        ),
        admin=admin.address,
        metadata = sp.utils.metadata_of_url("ipfs://QmQNZQmNyuTkSMjJvNzVLdHXitSUcHx6CSWFePeobTtCMB")
    )
    sc += fa2

    sc.p("admin mints a certificate to student1")
    sc += fa2.mint(
        address=student1.address,
        amount=1,
        token_id=fa2.data.all_tokens,
        metadata = {
            "name": sp.utils.bytes_of_string("B.Tech Marksheet"),
            "rollno": sp.utils.bytes_of_string("1"),
            "branch": sp.utils.bytes_of_string("CSE"),
            "year": sp.utils.bytes_of_string("2020"),
            "A - marks": sp.utils.bytes_of_string("80"),
            "B - marks": sp.utils.bytes_of_string("78"),
            "C - marks": sp.utils.bytes_of_string("86"),
            "D - marks": sp.utils.bytes_of_string("90"),
            "E - marks": sp.utils.bytes_of_string("95"),
            "total": sp.utils.bytes_of_string("429"),
            "percentage": sp.utils.bytes_of_string("85.8"),
            "status": sp.utils.bytes_of_string("pass")
        }
    ).run(sender = admin)

    sc.p("admin mints a certificate to student2")
    sc += fa2.mint(
        address=student2.address,
        amount=1,
        token_id=fa2.data.all_tokens,
        metadata={
            "name": sp.utils.bytes_of_string("B.Tech Marksheet"),
            "rollno": sp.utils.bytes_of_string("2"),
            "branch": sp.utils.bytes_of_string("CSE"),
            "year": sp.utils.bytes_of_string("2020"),
            "A - marks": sp.utils.bytes_of_string("87"),
            "B - marks": sp.utils.bytes_of_string("39"),
            "C - marks": sp.utils.bytes_of_string("86"),
            "D - marks": sp.utils.bytes_of_string("49"),
            "E - marks": sp.utils.bytes_of_string("78"),
            "total": sp.utils.bytes_of_string("339"),
            "percentage": sp.utils.bytes_of_string("67.8"),
            "status": sp.utils.bytes_of_string("pass")
        }
    ).run(sender = admin)


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