import { getScholarshipDetails } from "api";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import BounceLoader from "react-spinners/BounceLoader";
import moment from "moment";
import CertificateCardApply from "../../components/Cards/certificate-card-apply";

const ScholarshipDetails = () => {
	let { id } = useParams();
	const navigate = useNavigate();
	const [details, setDetails] = useState();
	const [response, setResponse] = useState(false);
	const [loading, setLoading] = useState(false);

	const scholar = [
		{
			id: 1,
			name: "MHRD Scholarship",
			desc: "The MHRD higher education scholarship is awarded to deserving students who have passed class 12. The objective is to encourage deserving students to obtain a quality education.",
			amount: "1,00,000",
		},
		{
			id: 2,
			name: "HDFC Student Scholarship",
			desc: "HDFC Bank Parivartan's ECS Scholarship 2022-23 aims to support meritorious and needy students belonging to underprivileged sections of the society.",
			amount: "50,000",
		},
		{
			id: 3,
			name: "DoSJE Scholarship",
			desc: "Department of social justice and empowerment is offering 15,000 scholarships ranging from Rs 75,000 to Rs.1,25,000 per year for class 9-12 meritorious SC/ST/OBC/DNT/EBC",
			amount: "80,000",
		},
		{
			id: 4,
			name: "LSAT Indian Law Scholarship",
			desc: "The LSAT India Topper Scholarship can be availed by a candidate who scores the highest on the LSAT India and the other opportunity can be availed by any test taker who submits the winning entry in an essay competition.",
			amount: "75,000",
		},
		{
			id: 5,
			name: "Raman Kant Munjal Scholarship",
			desc: "A scholarship of Rs. 50,000 to Rs. 5,00,000 is awarded to each finance student per year for a period of 3 years for completing their education.",
			amount: "50,000",
		},
		{
			id: 6,
			name: "Kotak Shiksha Nidhi",
			desc: "Eligible students for applying under Kotak Shiksha Nidhi are those who have lost both parents or one of the parents or a primary earning member of the family (other than parents) due to COVID-19",
			amount: "40,000",
		},
		{
			id: 7,
			name: "Azim Premji University Undergraduate Scholarship",
			desc: "The Azim Premji University invites applications for the Azim Premji University Undergraduate Scholarship 2022 from undergraduate degree applicants. Students with an annual family income of less than 15 lakhs are eligible for different levels of scholarships.",
			amount: "75,000",
		},
	];
	useEffect(() => {
		(async () => {
			// const { data } = await getScholarshipDetails(id);

			const data = scholar.filter((sch) => String(sch.id) === id);
			console.log("data", data);
			setDetails({ ...data[0], hasApplied: false });
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const applyForScholarship = async () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setResponse(true);
			setDetails({
				...details,
				hasApplied: true,
			});
		}, 1000);
	};

	const certis = [
		{
			name: "Domicile",
			isPassed: true,
		},
		{
			name: "Class XII Marksheet",
			isPassed: false,
		},
		{
			name: "Class X Marksheet",
			isPassed: true,
		},
	];
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
					{`Scholarships/${id}`}
				</div>
			</div>
			<div className="my-4">
				<div className="bg-white rounded-lg px-8 py-8">
					<h1 className="font-bold text-[24px] mb-2">
						{details?.name}
					</h1>
					<div className="text-gray-600 my-2">{details?.desc}</div>
					{/* <div className="my-2">Claims : {details?.max_claims}</div> */}
					<div className="my-2">Amount : {details?.amount}</div>
					<div className="text-right text-gray-500 mt-4">
						{moment(details?.starting).format("MMM Do YYYY")}
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
							<BounceLoader
								color="#E2E3E5"
								loading={loading}
								size={30}
							/>
						</div>
					)}
				</button>
			</div>
			{response && (
				<div className="mt-8">
					<div className="grid grid-cols-3 gap-x-8">
						{certis.map((certi) => (
							<CertificateCardApply
								name={certi.name}
								isPassed={certi.isPassed}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ScholarshipDetails;
