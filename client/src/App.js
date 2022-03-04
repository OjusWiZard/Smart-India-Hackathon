import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
// import { renderRoutes, allRoutes } from "./Router";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          {/* <Route path="teams/new" element={<NewTeam />} /> */}
        </Routes>
      </BrowserRouter>
      {/* {renderRoutes(allRoutes)} */}
    </div>
  );
}

export default App;
