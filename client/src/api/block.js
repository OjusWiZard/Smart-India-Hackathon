import { TezosToolkit, MichelsonMap } from "@taquito/taquito";
import { char2Bytes } from "@taquito/utils";
import { BeaconWallet } from "@taquito/beacon-wallet";
import axios from "axios";

export const Tezos = new TezosToolkit("https://rpc.hangzhounet.teztnets.xyz");
export const Wallet = new BeaconWallet({
  name: "CertiSetu",
});

export const mint_certificate = async (address, metadata) => {
  if (Tezos.wallet.walletProvider.constructor.name == "BeaconWallet") {
    await Wallet.requestPermissions({
      network: {
        type: "hangzhounet",
      },
    });
    Tezos.setWalletProvider(Wallet);
  }

  const hash = "ipfs://" + (await pin_metadata(metadata)).data.IpfsHash;
  Tezos.wallet
    .at(process.env.CONTRACT_ADDRESS)
    .then(async (contract) => {
      return contract.methods
        .mint(
          address,
          1,
          MichelsonMap.fromLiteral({
            name: char2Bytes("certificate"),
            symbol: char2Bytes("CERT"),
            decimals: char2Bytes("0"),
            metadata: char2Bytes(hash),
          }),
          (await get_storage()).all_tokens
        )
        .send();
    })
    .then(({ opHash }) => {
      console.log(`Waiting for ${opHash} to be confirmed...`);
      return opHash.confirmation(1).then(() => opHash);
    })
    .then((hash) =>
      console.log(`Operation injected: https://hangzhou.tzstats.com/${hash}`)
    )
    .catch((error) =>
      console.error(`Error: ${JSON.stringify(error, null, 2)}`)
    );
};

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
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const get_storage = () => {
  return axios
    .get(
      `https://api.hangzhou2net.tzkt.io/v1/contracts/${process.env.CONTRACT_ADDRESS}/storage`
    )
    .then((res) => res.data);
};
