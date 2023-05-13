import NftCard from "components/Cards/nft-card";
import { getDataFromIPFS, getTokenIdFromAddress } from "../../api/block";
import React, { useState, useEffect } from "react";

const NFT = () => {
	const [loading, setLoading] = useState(true);
	const [nft, setNft] = useState([]);
	useEffect(() => {
		getTokenIdFromAddress(
			"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
		).then((res) => {
			console.log("GET TOKENID", res);
		});
		getDataFromIPFS("QmVdpF8R34aUrJpgaSFcMcuJK2YifhpcKE6vsBJhPP4Fh8").then(
			(res) => {
				// setNft(res);
				console.log("RESPONSE:", res);
				setLoading(false);
			}
		);
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
