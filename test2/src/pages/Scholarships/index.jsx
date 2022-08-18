import React from "react";
import { Link } from "react-router-dom";
import ScholarshipRow from "components/Row/ScholarshipRow";

const Scholarships = () => {
	const Scholarships = [
		{
			title: "MHDR Scholarship",
			description:
				"Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is a utility",
			link: "https://www.mhrd.gov.in/",
			startingDate: "23 Sept",
			endingDate: "23 Dec",
		},
		{
			title: "HDFC Student Scholarship",
			description:
				"Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is a utility",
			link: "https://www.mhrd.gov.in/",
			startingDate: "23 Sept",
			endingDate: "23 Dec",
		},
		{
			title: "DoSJE Scholarship",
			description:
				"Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is a utility",
			link: "https://www.mhrd.gov.in/",
			startingDate: "23 Sept",
			endingDate: "23 Dec",
		},
		{
			title: "LSAT Indian Scholarship",
			description:
				"Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is a utility",
			link: "https://www.mhrd.gov.in/",
			startingDate: "23 Sept",
			endingDate: "23 Dec",
		},
		{
			title: "Raman Kant Munjal Scholarship",
			description:
				"Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is a utility",
			link: "https://www.mhrd.gov.in/",
			startingDate: "23 Sept",
			endingDate: "23 Dec",
		},
		{
			title: "Shiksha Scholarship",
			description:
				"Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is a utility",
			link: "https://www.mhrd.gov.in/",
			startingDate: "23 Sept",
			endingDate: "23 Dec",
		},
		{
			title: "Kotak Mahindra Scholarship",
			description:
				"Lorem Ipsum is Lorem Ipsum and Lorem Ipsum is a utility",
			link: "https://www.mhrd.gov.in/",
			startingDate: "23 Sept",
			endingDate: "23 Dec",
		},
	];
	return (
		<div className="px-14 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
			<div className="flex items-center justify-between">
				<div className="font-normal text-2xl">Scholarships</div>
				<Link
					to="/create-scholarship"
					className="bg-primary-dark px-10 rounded-xl py-3 text-white text-base "
				>
					Create Scholarship
				</Link>
			</div>
			<div className="mt-8">
				<div className="bg-white rounded-lg">
					{Scholarships.map((scholarship) => (
						<ScholarshipRow scholarship={scholarship} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Scholarships;
