import { getScholarshipDetails } from "api";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import ClipLoader from "react-spinners/ClipLoader";

const ScholarshipDetails = () => {
	let { id } = useParams();
	const navigate = useNavigate();
	const [details, setDetails] = useState();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			const { data } = await getScholarshipDetails(id);
			setDetails({ ...data, hasApplied: false });
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const applyForScholarship = async () => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};
	return (
		<div className="px-14 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
			<div className="my-4">
				<div className="w-8 flex justify-center">
					<Link to="/scholarships" className="">
						<BiArrowBack className="text-[22px]" />
					</Link>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="font-normal text-2xl">
					{`Scholarships/${details?.id}`}
				</div>
			</div>
			<div className="my-4">
				<div className="bg-white rounded-lg px-8 py-8">
					<h1 className="font-bold text-[24px] mb-2">
						{details?.name}
					</h1>
					<div className="text-gray-600 my-2">
						{details?.description}
					</div>
					<div className="my-2">Claims : {details?.max_claims}</div>
					<div className="my-2">Amount : {details?.amount}</div>
					<div className="text-right text-gray-500 mt-4">
						{details?.starting}
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<button
					disabled={details?.hasApplied}
					onClick={() => applyForScholarship()}
					className={`px-10 py-3 text-white text-base flex items-center ${
						details?.hasApplied
							? "bg-gray-300 cursor-not-allowed"
							: "bg-primary-dark"
					}`}
				>
					Click to Apply
					{loading && (
						<div className="ml-3">
							<ClipLoader
								color="#7F6CF9"
								loading={loading}
								size={30}
							/>
						</div>
					)}
				</button>
			</div>
		</div>
	);
};

export default ScholarshipDetails;
