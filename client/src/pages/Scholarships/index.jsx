import { Link } from "react-router-dom";
import ScholarshipRow from "components/Row/ScholarshipRow";
import { useEffect, useState, useContext } from "react";
import { getScholarships } from "api";
import { UserTypeContext } from "../../context/userTypeContext";
import { Listbox } from "@headlessui/react";
import Dropdown from "../../components/Dropdown/scholarship-filter";

const Scholarships = () => {
	const isAdmin = localStorage.getItem("isAdmin");
	const [loading, setLoading] = useState(true);
	const scholar = [
		{
			id: 1,
			name: "MHRD Scholarship",
			desc: "The MHRD higher education scholarship is awarded to deserving students who have passed class 12. The objective is to encourage deserving students to obtain a quality education.",
			amount: "1,00,000",
			criteria: "Education",
		},
		{
			id: 2,
			name: "HDFC Student Scholarship",
			desc: "HDFC Bank Parivartan's ECS Scholarship 2022-23 aims to support meritorious and needy students belonging to underprivileged sections of the society.",
			amount: "50,000",
			criteria: "Caste",
		},
		{
			id: 3,
			name: "DoSJE Scholarship",
			desc: "Department of social justice and empowerment is offering 15,000 scholarships ranging from Rs 75,000 to Rs.1,25,000 per year for class 9-12 meritorious SC/ST/OBC/DNT/EBC",
			amount: "80,000",
			criteria: "Education",
		},
		{
			id: 4,
			name: "LSAT Indian Law Scholarship",
			desc: "The LSAT India Topper Scholarship can be availed by a candidate who scores the highest on the LSAT India and the other opportunity can be availed by any test taker who submits the winning entry in an essay competition.",
			amount: "75,000",
			criteria: "Caste",
		},
		{
			id: 5,
			name: "Raman Kant Munjal Scholarship",
			desc: "A scholarship of Rs. 50,000 to Rs. 5,00,000 is awarded to each finance student per year for a period of 3 years for completing their education.",
			amount: "50,000",
			criteria: "Gender",
		},
		{
			id: 6,
			name: "Kotak Shiksha Nidhi",
			desc: "Eligible students for applying under Kotak Shiksha Nidhi are those who have lost both parents or one of the parents or a primary earning member of the family (other than parents) due to COVID-19",
			amount: "40,000",
			criteria: "Gender",
		},
		{
			id: 7,
			name: "Azim Premji University Undergraduate Scholarship",
			desc: "The Azim Premji University invites applications for the Azim Premji University Undergraduate Scholarship 2022 from undergraduate degree applicants. Students with an annual family income of less than 15 lakhs are eligible for different levels of scholarships.",
			amount: "75,000",
			criteria: "Education",
		},
	];
	const filters = ["All", "Gender", "Caste", "Education"];
	const [scholarships, setScholarships] = useState([]);
	const { isStudent } = useContext(UserTypeContext);
	const [selectedFilter, setSelectedFilter] = useState(filters[0]);
	const [schol, setSchol] = useState(scholar);
	useEffect(() => {
		(async () => {
			if (localStorage.getItem("jwt-token")) {
				const { data } = await getScholarships();
				setScholarships(
					data.map((scholarship) => {
						return {
							...scholarship,
							isPassed: true,
						};
					})
				);
				setLoading(false);
			}
		})();
		setSchol([...scholar]);
		console.log(schol);
		if (selectedFilter !== "All") {
			setSchol(scholar);
			console.log(schol);
			let newScholar = schol.filter(
				(scholar) => scholar.criteria === selectedFilter
			);
			console.log(newScholar);
			setSchol(newScholar);
		}
	}, [selectedFilter]);
	if (loading) {
		return (
			<div className="px-14 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
				Loading
			</div>
		);
	}
	// useEffect(() => {
	// 	if (selectedFilter !== "All") {
	// 		let newScholar = schol.filter(
	// 			(scholar) => scholar.criteria === selectedFilter
	// 		);
	// 		console.log(newScholar);
	// 		setSchol(newScholar);
	// 	}
	// }, [schol]);

	return (
		<div className="px-14 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
			<div className="flex md:flex-row flex-col md:items-center items-start justify-between">
				<div className="font-normal text-2xl">Scholarships</div>
				{isAdmin ? (
					<div className="relative">
						<Listbox
							value={selectedFilter}
							onChange={setSelectedFilter}
						>
							<Listbox.Button className="relative bg-primary-dark text-white rounded-md px-4 py-1">
								{selectedFilter}
							</Listbox.Button>
							<Listbox.Options className="absolute bg-white shadow-xl rounded-md px-3 py-2 mt-2 right-0">
								{filters.map((filter, index) => (
									<Listbox.Option
										className={({ active }) =>
											` ${
												active
													? "bg-primary-light"
													: null
											} cursor-pointer py-1 px-2 rounded-md`
										}
										key={index}
										value={filter}
									>
										{filter}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Listbox>
					</div>
				) : (
					<>
						{isStudent && (
							<Link
								to="/create-scholarship"
								className="bg-primary-dark px-10 py-3 text-white text-base md:mt-0 mt-2"
							>
								Create Scholarship
							</Link>
						)}
					</>
				)}
			</div>
			<div className="mt-8">
				<div className=" rounded-lg">
					{scholar.length > 0 ? (
						<>
							{schol.map((scholarship, index) => {
								return (
									<Link
										key={scholarship.id}
										to={`/scholarships/${scholarship.id}`}
									>
										<ScholarshipRow
											scholarship={scholarship}
										/>
									</Link>
								);
							})}
						</>
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
