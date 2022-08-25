// React router imports from react-router-dom
import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { UserTypeContext } from "./context/userTypeContext"
// Pages Imports
import Dashboard from "pages/Dashboard";
import Register from "pages/Register";
import Login from "pages/Login";
import Scholarships from "pages/Scholarships";
import IssuerForm from "pages/IssuerForm";

import "./App.css";

// Utilities
import GlobalNavbar from "components/Navigation/GlobalNavbar";
import ScholarshipDetails from "pages/ScholarshipDetails";
import Profile from "pages/Profile";

function App() {
	const { isStudent } = useContext(UserTypeContext);
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Register />} />
					<Route path="/login" element={<Login />} />
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
							isStudent ? (
								<GlobalNavbar>
									<IssuerForm />
								</GlobalNavbar>) : (<Navigate to="/dashboard" />)
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
