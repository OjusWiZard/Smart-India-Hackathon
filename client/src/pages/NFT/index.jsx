import NftCard from "components/Cards/nft-card";
import { get_storage } from "../../api/block";
import React, { useState, useEffect } from "react";

const NFT = () => {
	const [loading, setLoading] = useState(true);
	const [nft, setNft] = useState([]);
	useEffect(() => {
		if (localStorage.getItem("wallet")) {
			get_storage().then((res) => {
				const NFTs = res.data.ledger.filter(
					(data) =>
						data.key.address === localStorage.getItem("wallet")
				);
				let ansArray = [];

				const NFTData = Object.values(res.data.token_metadata).forEach(
					// eslint-disable-next-line array-callback-return
					(mdt) => {
						NFTs.forEach((nft) => {
							if (nft.key.nat === mdt.token_id) {
								ansArray.push(mdt.token_info);
							}
						});
					}
				);
				console.log(
					"NFTDATA:",
					Object.values(res.data.token_metadata),
					ansArray
				);
				setNft(res);
				setLoading(false);
			});
		} else {
			setLoading(false);
		}
	}, []);
	return (
		<div className="px-12 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
			<div className="font-normal text-2xl lg:mb-0 mb-3">
				My Certificates
			</div>
			<div className="mt-8">
				{loading ? (
					<div>Loading...</div>
				) : (
					<>
						{!localStorage.getItem("wallet") ? (
							<div>Please connect your wallet</div>
						) : (
							<div className="grid grid-cols-3 gap-x-8">
								<NftCard />
								<NftCard />
								<NftCard />
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default NFT;
