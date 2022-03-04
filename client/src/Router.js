import React, { lazy, Fragment, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Authenticated from "./components/Authenticated";
// import Register from "./pages/Register";

export const renderRoutes = (allRoutes) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Please Wait...</div>}>
        <Routes>
          {/* <Route path="/" element={<Register />} /> */}
          {allRoutes.map((route, index) => {
            const Component = route.component;
            const Gaurd = route.gaurd || Fragment;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <>
                    {(props) => (
                      <Gaurd>
                        <Component {...props} />
                      </Gaurd>
                    )}
                  </>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export const allRoutes = [
  {
    path: "/",
    // gaurd: '',
    component: lazy(() => import("../src/pages/Register")),
  },
];
