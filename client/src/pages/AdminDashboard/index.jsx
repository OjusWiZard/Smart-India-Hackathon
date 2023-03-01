import React from "react";
import DonutChart from "react-donut-chart";

const AdminDashboard = () => {
	return (
		<div className="px-12 py-[50px] bg-primary-light min-h-[calc(100vh-80px)]">
			<div className="font-normal text-2xl sm:mb-0 mb-3">
				Statistical Information
			</div>
			<div className="grid grid-cols-2 mt-8 gap-x-6 gap-y-12">
				<div className="bg-white flex items-center justify-center p-7">
					<DonutChart
						colors={["#6C42C1", "#6456CB"]}
						className="text-xl overflow-scroll max-w-full"
						data={[
							{
								label: "Monthly Expense",
								value: 60,
							},
							{
								label: "Students Left",
								value: 40,
							},
						]}
					/>
				</div>
				<div className="bg-white flex items-center justify-center p-7">
					<DonutChart
						colors={["#6C42C1", "#6456CB"]}
						className="text-xl"
						data={[
							{
								label: "Scholarship Grant",
								value: 80,
							},
							{
								label: "Students Left",
								value: 20,
							},
						]}
					/>
				</div>
				<div className="bg-white flex items-center justify-center p-7">
					<DonutChart
						colors={["#6C42C1", "#6456CB"]}
						className="text-xl"
						data={[
							{
								label: "No of Issuers",
								value: 30,
							},
							{
								label: "Students Left",
								value: 70,
							},
						]}
					/>
				</div>
				{/* <div className="bg-white flex items-center justify-center p-7">
					<HalfPieChart
						name="rentStatus"
						right={right2}
						left={left2}
						title="Approved Applications"
					/>
				</div>
				<div className="bg-white flex items-center justify-center p-7">
					<HalfPieChart
						name="rentStatus"
						right={right3}
						left={left3}
						title="Number of Issuers"
					/>
				</div> */}
				{/* <div className="bg-white flex items-center justify-center p-7">
					<HalfPieChart
						name="rentStatus"
						right={right}
						left={left}
						title="Rent Status"
					/>
				</div>
				<div className="bg-white flex items-center justify-center p-7">
					<HalfPieChart
						name="rentStatus"
						right={right}
						left={left}
						title="Rent Status"
					/>
				</div>
				<div className="bg-white flex items-center justify-center p-7">
					<HalfPieChart
						name="rentStatus"
						right={right}
						left={left}
						title="Rent Status"
					/>
				</div>
				<div className="bg-white flex items-center justify-center p-7">
					<HalfPieChart
						name="rentStatus"
						right={right}
						left={left}
						title="Rent Status"
					/>
				</div>
				<div className="bg-white flex items-center justify-center p-7">
					<HalfPieChart
						name="rentStatus"
						right={right}
						left={left}
						title="Rent Status"
					/>
				</div>
				<div className="bg-white flex items-center justify-center p-7">
					<HalfPieChart
						name="rentStatus"
						right={right}
						left={left}
						title="Rent Status"
					/>
				</div>
				<div className="bg-white flex items-center justify-center p-7">
					<HalfPieChart
						name="rentStatus"
						right={right}
						left={left}
						title="Rent Status"
					/>
				</div> */}
			</div>
		</div>
	);
};

export default AdminDashboard;
