import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalNavbar from "./components/Navigation/GlobalNavbar";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Scholarships from "./pages/Scholarships";
import IssuerForm from "pages/IssuerForm";
// import { renderRoutes, allRoutes } from "./Router";

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
            path="/form"
            element={
              <GlobalNavbar>
                <IssuerForm />
              </GlobalNavbar>
            }
          />
          {/* <Route path="teams/new" element={<NewTeam />} /> */}
        </Routes>
      </BrowserRouter>
      {/* {renderRoutes(allRoutes)} */}
    </div>
  );
}

export default App;
