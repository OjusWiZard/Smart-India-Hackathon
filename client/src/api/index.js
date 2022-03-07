import axios from "axios";
import swal from "sweetalert";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

const API = axios.create({
  baseURL: `https://sih-a-normal-team.herokuapp.com`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("jwt-token")) {
    req.headers.Authorization = "Bearer " + localStorage.getItem("jwt-token");
  }
  return req;
});

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getOtp = async (phno) => {
  console.log(phno);
  try {
    const res = await API.post("/auth/get", { to: `+91${phno}` }, config);
    swal("OTP sent", "Please check your phone", "success");
    return res;
  } catch (error) {
    swal("Oops!", "Something went wrong", "error");
  }
};

export const verifyOtp = async (formData) => {
  try {
    const res = await API.post("/auth/verify", formData, config);
    localStorage.setItem('token', res.data.token)
    swal("OTP verified", "You are logged in", "success");
    return res;
  } catch (error) {
    swal("Oops!", "Something went wrong", "error");
  }
};

// export const Tezos = new TezosToolkit(process.env.REACT_APP_RPC_URL);
// export const Wallet = new BeaconWallet({
//   name: process.env.REACT_APP_WALLET_NAME,
// });

// export const getAccount = async () => {
//   try {
//     const activeAccount = await Wallet.client.getActiveAccount();
//     if (activeAccount) {
//       Tezos.setWalletProvider(Wallet);
//       return { result: true, address: activeAccount.address };
//     } else return { result: false, address: null };
//   } catch (error) {
//     swal("Error", "Error getting account", "error");
//   }
// };

// export const logIn = () =>
//   new Promise(async (resolve, reject) => {
//     await Wallet.requestPermissions({
//       network: {
//         type: "granadanet",
//       },
//     });
//     Tezos.setWalletProvider(Wallet);
//     resolve();
//   });

// export const logOut = async () => {
//   await Wallet.clearActiveAccount();
//   logIn();
// };

// export const getNFTData = async (tokenId) => {
//   try {
//     const hash = await Tezos.wallet.at(process.env.REACT_APP_CONTRACT_ADDRESS).then((contract) => {
//       contract.methods.tokenMetaData(tokenId).send()
//     }).then((op) => op.confirmation(1)).then((op) => op.hash())
//     return { result: true, message: hash };
//   } catch (error) {
//     swal("Error", "Error getting NFT data", "error");
//   }
// }

// export const mintCertificate = async () => {
//   try {
//     const hash = await Tezos.wallet.at(process.env.REACT_APP_CONTRACT_ADDRESS).then((contract) => {
//       contract.methods.mintCertificate().send()
//     }).then((op) => op.confirmation(1)).then((op) => op.hash())
//     return { result: true, message: hash };
//   } catch (error) {
//     return { result: false, message: error };
//   }
// }

