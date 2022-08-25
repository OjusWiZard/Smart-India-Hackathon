import { TezosToolkit } from "@taquito/taquito";
import { TempleWallet } from '@temple-wallet/dapp';
import { ThanosWallet } from '@thanos-wallet/dapp';
import axios from "axios";
import swal from "sweetalert";
// import { sendStatus } from "./index";
export const Tezos = new TezosToolkit(process.env.REACT_APP_RPC_URL);


export const mint_certificate = async () => {
	try {
		const available = await ThanosWallet.isAvailable();
		if (!available) {
			swal("Error", "Thanos Wallet not installed", "error");
		}
		const wallet = new ThanosWallet('CertiSetu');
		await wallet.connect('ghostnet');
		Tezos.setWalletProvider(wallet);
	} catch (err) {
		console.log(err);
	}
}

// }

// const hash = "ipfs://" + (await pin_metadata(metadata)).data.IpfsHash;
// Tezos.wallet
// 	.at(process.env.REACT_APP_CONTRACT_ADDRESS)
// 	.then(async (contract) => {
// 		return contract.methods
// 			.mint(
// 				address,
// 				1,
// 				MichelsonMap.fromLiteral({
// 					name: char2Bytes("certificate"),
// 					symbol: char2Bytes("CERT"),
// 					decimals: char2Bytes("0"),
// 					metadata: char2Bytes(hash),
// 				}),
// 				(await get_storage()).all_tokens
// 			)
// 			.send();
// 	})
// 	.then(({ opHash }) => {
// 		console.log(`Waiting for ${opHash} to be confirmed...`);
// 		swal("Success", "Certificate minted", "success");

// 		sendStatus(
// 			"Congratulations! You have been successfully granted a certificate to address " +
// 			metadata["address"]
// 		)
// 			.then((res) => {
// 				console.log(res.data);
// 			})
// 			.catch((err) => console.error(err));
// 		return opHash.confirmation(1).then(() => opHash);
// 	})
// 	.then((hash) => {
// 		console.log(
// 			`Operation injected: https://hangzhou.tzstats.com/${hash}`
// 		);
// 	})
// 	.catch((error) => {
// 		console.error(`Error: ${JSON.stringify(error, null, 2)}`);
// 		swal("Success", "Certificate minted", "success");
// 	});


export const get_certificate = () => {
	axios
		.get("https://api.hangzhou2net.tzkt.io/v1/bigmaps/176460/keys/0")
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

const get_storage = () => {
	return axios
		.get(
			`https://api.hangzhou2net.tzkt.io/v1/contracts/${process.env.REACT_APP_CONTRACT_ADDRESS}/storage`
		)
		.then((res) => res.data);
};
