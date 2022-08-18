import { Link } from "react-router-dom";

const ScholarshipDetails = () => {
	return (
		<div className="px-14 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
			<div className="flex items-center justify-between">
				<div className="font-normal text-2xl">
					Scholarships/ Details
				</div>
				<Link
					to="/create-scholarship"
					className="bg-primary-dark px-10 py-3 text-white text-base "
				>
					Click to Apply
				</Link>
			</div>
			<div className="mt-8">
				<div className="bg-white rounded-lg px-8 py-8">
					<h1 className="font-bold text-[24px] mb-2">
						Raman Kant Munjal Scholarship
					</h1>
					Under the CSR Project of Education & Livelihood of Kotak
					Group Companies, their partner organisation Kotak Education
					Foundation is implementing ‘Kotak Shiksha Nidhi’ – financial
					assistance to students, who have lost primary earning member
					of the family due to COVID-19, for the continuation of
					education.
				</div>
			</div>
		</div>
	);
};

export default ScholarshipDetails;
