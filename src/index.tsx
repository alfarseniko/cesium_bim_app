/** ################################################### */
/*--------------------IMPORTS-------------------- */
/** ################################################### */
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import * as Router from "react-router-dom";
import { Sidebar } from "./react-components/Sidebar";
import { GISViewer } from "./react-components/GISViewer.tsx";
import { LandingPage } from "./react-components/MainPage.tsx";

/** ################################################### */
/*--------------------REACT---------------------------- */
/** ################################################### */

// Global declaration of HTML Components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "bim-grid": any;
      "bim-label": any;
      "bim-button": any;
      "bim-text-input": any;
      "bim-viewport": any;
      "bim-toolbar": any;
      "bim-panel": any;
      "bim-panel-section": any;
      "bim-checkbox": any;
    }
  }
}

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
      {/** Router initialized for page routing/rendering */}
      <Router.Routes>
        {/** Each route is a different render in itself */}
        <Router.Route path="/" element={<LandingPage />} />
        <Router.Route path="/app" element={<GISViewer />} />
      </Router.Routes>
    </Router.BrowserRouter>
  </>
);
