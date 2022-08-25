import NftCard from "components/Cards/nft-card";
import React from "react";

const NFT = () => {
	return (
		<div className="px-12 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
			<div className="font-normal text-2xl lg:mb-0 mb-3">
				My Certificates
			</div>
			<div className="mt-8">
				<div className="grid grid-cols-3 gap-x-8">
					<NftCard />
					<NftCard />
					<NftCard />
				</div>
			</div>
		</div>
	);
};

export default NFT;
