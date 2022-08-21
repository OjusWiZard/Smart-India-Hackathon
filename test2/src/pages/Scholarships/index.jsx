import { Link } from "react-router-dom";
import ScholarshipRow from "components/Row/ScholarshipRow";
import { useEffect, useState } from "react";
import { getScholarships } from "api";

const Scholarships = () => {
	const [scholarships, setScholarships] = useState([]);
	useEffect(() => {
		(async () => {
			const { data } = await getScholarships();
			setScholarships(data);
		})();
	}, []);
	return (
		<div className="px-14 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
			<div className="flex items-center justify-between">
				<div className="font-normal text-2xl">Scholarships</div>
				<Link
					to="/create-scholarship"
					className="bg-primary-dark px-10 py-3 text-white text-base "
				>
					Create Scholarship
				</Link>
			</div>
			<div className="mt-8">
				<div className="bg-white rounded-lg">
					{scholarships.length > 0 ? (
						scholarships.map((scholarship, index) => (
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
