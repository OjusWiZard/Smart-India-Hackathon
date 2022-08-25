// React router imports from react-router-dom
import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { UserTypeContext } from "./context/userTypeContext"
// Pages Imports
import Dashboard from "pages/Dashboard";
import Register from "pages/Register";
import Login from "pages/Login";
import Scholarships from "pages/Scholarships";
import IssuerForm from "pages/IssuerForm";
import NFT from "pages/NFT";
import NFTDetails from "pages/NFTDetails";
import Mint from "pages/Mint";

import "./App.css";

// Utilities
import GlobalNavbar from "components/Navigation/GlobalNavbar";
import ScholarshipDetails from "pages/ScholarshipDetails";
import Profile from "pages/Profile";
import AuthenticatedIssuer from "components/Gaurds/AuthenticatedIssuer";

function App() {
	// const { isStudent } = useContext(UserTypeContext);
	// const user = localStorage.getItem('jwt-token');
	const [user, setUser] = useState(null);
	const { isStudent } = useContext(UserTypeContext);
	// const user = localStorage.getItem('jwt-token');
	useEffect(() => {
		const user = localStorage.getItem('jwt-token');
		if (user) {
			setUser(user)
			console.log(user)
		}
	}, [user])

	const isLoggedIn = (user) => {
		if (user) {
			return true;
		}
		return false;
	}
	// console.log("USER: ", user)
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={isLoggedIn(user) ? <Navigate to="/dashboard" /> : <Register />} />
					<Route path="/login" element={isLoggedIn(user) ? <Navigate to="/dashboard" /> : <Login />} />
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
							isLoggedIn(user) ? (<GlobalNavbar>
								<Scholarships />
							</GlobalNavbar>) : (<Navigate to="/login" />)
						}
					/>
					<Route
						path="/create-scholarship"
						element={
							isLoggedIn(user) ? (isStudent ? (
								<GlobalNavbar>
									<IssuerForm />
								</GlobalNavbar>) : (<Navigate to="/dashboard" />)) : (<Navigate to="/login" />)
						}
					/>
					<Route
						path="/scholarships/:id"
						element={
							isLoggedIn(user) ? (<GlobalNavbar>
								<ScholarshipDetails />
							</GlobalNavbar>) : (<Navigate to="/login" />)
						}
					/>
					<Route
						path="/profile"
						element={
							isLoggedIn(user) ? (<GlobalNavbar>
								<Profile />
							</GlobalNavbar>) : (<Navigate to="/login" />)
						}
					/>
					<Route
						path="/nft"
						element={
							isLoggedIn(user) ? (<GlobalNavbar>
								<NFT />
							</GlobalNavbar>) : (<Navigate to="/login" />)
						}
					/>
					<Route
						path="/nft/:id"
						element={
							isLoggedIn(user) ? (<GlobalNavbar>
								<NFTDetails />
							</GlobalNavbar>) : (<Navigate to="/login" />)
						}
					/>
					<Route
						path="/mint"
						element={
							(<GlobalNavbar>
								<Mint />
							</GlobalNavbar>)
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;