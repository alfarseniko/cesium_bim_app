/** ################################################### */
/*--------------------IMPORTS-------------------- */
/** ################################################### */
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import * as Router from "react-router-dom";
import { GISViewer } from "./react-components/GISViewer.tsx";
import { LandingPage } from "./react-components/LandingPage.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Dashboard from "./react-components/Dashboard.tsx";

// Getting an element for REACT Root Element
const rootElement = document.getElementById("app") as HTMLDivElement;
// React Root Element assigned
const appRoot = ReactDOM.createRoot(rootElement);
// All renders and HTML changes happen with this function
appRoot.render(
  <>
    {/**  ROUTER helps in page navigation
     *    BrowserRouter for use in Web Browser */}
    <Router.BrowserRouter>
      <AuthProvider>
        {/** Router initialized for page routing/rendering */}
        <Router.Routes>
          {/** Each route is a different render in itself */}
          <Router.Route path="/" element={<LandingPage />} />
          <Router.Route path="/app" element={<GISViewer />} />
        </Router.Routes>
      </AuthProvider>
    </Router.BrowserRouter>
  </>
);
