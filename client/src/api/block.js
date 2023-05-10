import { TezosToolkit, MichelsonMap } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
	NetworkType,
	BeaconEvent,
	defaultEventCallbacks,
} from "@airgap/beacon-sdk";
import axios from "axios";
import swal from "sweetalert";
// import { sendStatus } from "./index";
export const Tezos = new TezosToolkit(process.env.REACT_APP_RPC_URL);
export const wallet = new BeaconWallet({
	name: "CertiSetu",
	preferredNetwork: NetworkType.GHOSTNET,
	disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
	eventHandlers: {
		// To keep the pairing alert, we have to add the following default event handlers back
		[BeaconEvent.PAIR_INIT]: {
			handler: defaultEventCallbacks.PAIR_INIT,
		},
	},
});

export const mint_certificate = async (metadata, address) => {
	if (!(await wallet.getPKH())) await connectWallet();
	const storage = await get_storage();
	const token_id = storage.data.all_tokens;
	const contract = await Tezos.contract.at(
		process.env.REACT_APP_CONTRACT_ADDRESS
	);
	const op = await contract.methodsObject
		.mint({
			metadata: new MichelsonMap.fromLiteral(metadata),
			address,
			token_id,
			amount: 1,
		})
		.send();
	await op.confirmation();
	return op.hash;
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
	try {
		await wallet.requestPermissions();
		Tezos.setWalletProvider(wallet);
	} catch (error) {
		console.log("error:", error);
	}
};
