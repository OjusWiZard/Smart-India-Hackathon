import { TezosToolkit } from "@taquito/taquito";
import { ThanosWallet } from "@thanos-wallet/dapp";
import axios from "axios";
import swal from "sweetalert";
// import { sendStatus } from "./index";
export const Tezos = new TezosToolkit(process.env.REACT_APP_RPC_URL);
export const wallet = new ThanosWallet("CertiSetu");

export const mint_certificate = async (metadata, address) => {
	const available = await ThanosWallet.isAvailable();
	if (!available) swal("Error", "Thanos Wallet not installed", "error");
	else
		wallet
			.connect("ghostnet")
			.then(() => wallet.reconnect("ghostnet"))
			.then(() => {
				// Code to mint
				get_storage().then(async (res) => {
					const tokenId = res.data.all_tokens;
					console.log(
						"TOKENID:",
						tokenId,
						"KT1VdWmmLkpZPvZRijPuTS1cs7VBePcwiPE6"
					);
					console.log("TEZ:", Tezos);
					const contract = Tezos.wallet
						.at(process.env.REACT_APP_CONTRACT_ADDRESS)
						.then(async (res) => {
							console.log("CONTRACT:", res);
							const op = await res.methodsObject.mint({
								metadata,
								address,
								token_id: tokenId,
								amount: 1,
							});
						})
						.catch((err) => console.log(err));
				});
			});
};

export const get_certificate = () => {
	axios
		.get("https://api.ghostnet.tzkt.io/v1/bigmaps/176460/keys/0")
		.then((res) => {
			const id = Object.keys(res.data.value.token_info)[0].slice(7);
			axios
				.get("https://ipfs.io/ipfs/" + id)
				.then((response) => console.log(response.data));
		});
};

export const pin_metadata = (metadata) => {
	try {
		return axios.post(
			"https://api.pinata.cloud/pinning/pinJSONToIPFS",
			metadata,
			{
				headers: {
					pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
					pinata_secret_api_key: process.env.REACT_APP_SECRET_API_KEY,
				},
			}
		);
	} catch (error) {
		swal("Error", "Metadata not pinned", "error");
	}
};

export const get_storage = () => {
	return axios
		.get(
			`https://api.ghostnet.tzkt.io/v1/contracts/${process.env.REACT_APP_CONTRACT_ADDRESS}/storage`
		)
		.then((res) => {
			console.log(res);
			return res;
		});
};

export const connectWallet = async () => {
	const available = await ThanosWallet.isAvailable();
	if (!available) swal("Error", "Thanos Wallet not installed", "error");
	else
		wallet
			.connect("ghostnet")
			.then(() => wallet.connect("ghostnet"))
			.then(async () => {
				await Tezos.setWalletProvider(wallet);
				localStorage.setItem("wallet", await wallet.getPKH());
			});
};
