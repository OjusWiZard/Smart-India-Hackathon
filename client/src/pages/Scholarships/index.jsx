import { Link } from "react-router-dom";
import ScholarshipRow from "components/Row/ScholarshipRow";
import { useEffect, useState, useContext } from "react";
import { getScholarships } from "api";
import { UserTypeContext } from "../../context/userTypeContext";

const Scholarships = () => {
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
	const [scholarships, setScholarships] = useState([]);
	const { isStudent } = useContext(UserTypeContext);
	useEffect(() => {
		(async () => {
			const { data } = await getScholarships();
			setScholarships(
				data.map((scholarship) => {
					return {
						...scholarship,
						isPassed: true,
					};
				})
			);
		})();
	}, []);
	return (
		<div className="px-14 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
			<div className="flex items-center justify-between">
				<div className="font-normal text-2xl">Scholarships</div>
				{isStudent && (
					<Link
						to="/create-scholarship"
						className="bg-primary-dark px-10 py-3 text-white text-base "
					>
						Create Scholarship
					</Link>
				)}
			</div>
			<div className="mt-8">
				<div className="bg-white rounded-lg">
					{scholar.length > 0 ? (
						scholar.map((scholarship, index) => (
							<Link
								key={scholarship.id}
								to={`/scholarships/${scholarship.id}`}
							>
								<ScholarshipRow scholarship={scholarship} />
							</Link>
						))
					) : (
						<div className="flex items-center justify-start border-gray-200 border-b px-8 py-3 h-24 rounded-t-xl">
							<div className="font-semibold text-xl">
								No Current Scholarships..
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Scholarships;
