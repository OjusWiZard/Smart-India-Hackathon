// React router imports from react-router-dom
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages Imports
import Dashboard from "pages/Dashboard";
import Register from "pages/Register";
import Scholarships from "pages/Scholarships";
import IssuerForm from "pages/IssuerForm";

import "./App.css";

// Utilities
import GlobalNavbar from "components/Navigation/GlobalNavbar";
import ScholarshipDetails from "pages/ScholarshipDetails";
import Profile from "pages/Profile";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Register />} />
					<Route
						path="/dashboard"
						element={
							<GlobalNavbar>
								<Dashboard />
							</GlobalNavbar>
						}
					/>
					<Route
						path="/scholarships"
						element={
							<GlobalNavbar>
								<Scholarships />
							</GlobalNavbar>
						}
					/>
					<Route
						path="/create-scholarship"
						element={
							<GlobalNavbar>
								<IssuerForm />
							</GlobalNavbar>
						}
					/>
					<Route
						path="/scholarships/:id"
						element={
							<GlobalNavbar>
								<ScholarshipDetails />
							</GlobalNavbar>
						}
					/>
					<Route
						path="/profile"
						element={
							<GlobalNavbar>
								<Profile />
							</GlobalNavbar>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
