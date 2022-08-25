// React router imports from react-router-dom
import { useContext, useEffect, useState } from "react";
import {
	BrowserRouter,
	Route,
	Routes,
	Navigate,
	useParams,
} from "react-router-dom";
import { UserTypeContext } from "./context/userTypeContext";
// Pages Imports
import Dashboard from "pages/Dashboard";
import Register from "pages/Register";
import Login from "pages/Login";
import Scholarships from "pages/Scholarships";
import IssuerForm from "pages/IssuerForm";
import NFT from "pages/NFT";
import NFTDetails from "pages/NFTDetails";
import Mint from "pages/Mint";
import { getUserInfo } from "api";
import "./App.css";

// Utilities
import GlobalNavbar from "components/Navigation/GlobalNavbar";
import ScholarshipDetails from "pages/ScholarshipDetails";
import Profile from "pages/Profile";
import AuthenticatedIssuer from "components/Gaurds/AuthenticatedIssuer";

function App() {
	const pathname = window.location.pathname;
	// const navigate = useNavigation();
	// const { isStudent } = useContext(UserTypeContext);
	// const user = localStorage.getItem('jwt-token');

	const [wallet, setWallet] = useState(localStorage.getItem("wallet"));
	const [user, setUser] = useState(null);
	const { isStudent } = useContext(UserTypeContext);
	// const user = localStorage.getItem('jwt-token');
	// const pathname = navigate.pathname();
	// console.log(pathname);
	useEffect(() => {
		if (pathname !== "/login" && pathname !== "/") {
			(async () => {
				let token = localStorage.getItem("jwt-token");
				const { data } = await getUserInfo(token);
				localStorage.setItem("user", JSON.stringify(data));
			})();
		}

		const user = localStorage.getItem("jwt-token");
		if (user) {
			setUser(user);
		}
	}, [user]);

	const isLoggedIn = (user) => {
		if (user) {
			return true;
		}
		return false;
	};
	// console.log("USER: ", user)
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
							<GlobalNavbar>
								<IssuerForm />
							</GlobalNavbar>
						}
					/>
					<Route
						path="/scholarships/:id"
						element={
							isLoggedIn(user) ? (
								<GlobalNavbar>
									<ScholarshipDetails />
								</GlobalNavbar>
							) : (
								<Navigate to="/login" />
							)
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
					<Route
						path="/nft"
						element={
							<GlobalNavbar>
								<NFT />
							</GlobalNavbar>
						}
					/>
					<Route
						path="/nft/:id"
						element={
							<GlobalNavbar>
								<NFTDetails />
							</GlobalNavbar>
						}
					/>
					<Route
						path="/mint"
						element={
							<GlobalNavbar>
								<Mint />
							</GlobalNavbar>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
