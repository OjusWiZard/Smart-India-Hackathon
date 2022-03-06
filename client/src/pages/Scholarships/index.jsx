import React from "react";
import ScholarshipRow from "components/Row/ScholarshipRow";

const Scholarships = () => {
  const Scholarships = [
    {
      title: "MHDR",
      description: "lorem10",
      link: "https://www.mhrd.gov.in/",
      startingDate: "23 Sept",
      endingDate: "23 Dec",
    },
    {
      title: "MHDR",
      description: "lorem10",
      link: "https://www.mhrd.gov.in/",
      startingDate: "23 Sept",
      endingDate: "23 Dec",
    },
    {
      title: "MHDR",
      description: "lorem10",
      link: "https://www.mhrd.gov.in/",
      startingDate: "23 Sept",
      endingDate: "23 Dec",
    },
  ];
  return (
    <div className="px-14 py-[50px] bg-primary-light min-h-screen">
      <div className="font-normal text-2xl">Scholarships</div>
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
