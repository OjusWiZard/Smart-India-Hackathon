import axios from "axios";
import swal from "sweetalert";
import { create } from "ipfs-http-client";

const projectId = process.env.REACT_APP_INFURA_KEY;
const projectSecret = process.env.REACT_APP_INFURA_SECRET;
console.log("PROJECTID", projectId);
const auth = "Basic " + btoa(projectId + ":" + projectSecret);

const client = create({
	host: "ipfs.infura.io",
	port: 5001,
	protocol: "https",
	headers: {
		authorization: auth,
	},
});

export const uploadDataToIPFS = async (file) => {
	try {
		const response = await client.add(file);
		console.log("RESPONSE");
		return response;
	} catch (error) {
		swal("Error", "Error in uploading data to IPFS");
	}
};

export const mint_certificate = async (file, address) => {
	try {
		await uploadDataToIPFS(file);
	} catch (error) {
		swal("Error", error);
	}
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
		if (!window.ethereum) {
			alert("Please install metamask");
			return;
		}
		const { ethers } = await import("ethers");
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		const address = await signer.getAddress();
		localStorage.setItem("wallet", address);
	} catch (error) {
		console.log("ERROR:", error);
	}
};
