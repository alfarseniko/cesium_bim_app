import * as React from "react";

export function LandingPage() {
  return (
    <>
      <div id="landing-page">
        <header>
          <div>
            <img src="/public/crewnix_white.svg"></img>
          </div>
          <div className="header-links">
            <ul>
              <a href="https://www.linkedin.com/in/bhatti25/" target="_blank">
                Contact Us
              </a>
            </ul>
            <ul></ul>
            <button id="login-button">LOG IN</button>
          </div>
        </header>
        <div id="landing-items">
          <h1>GeoBIM</h1>
          <h2>Your BIM Model on the Globe</h2>
          <button className="cta-button">Get started</button>
        </div>
        <footer>
          Made with 🧠 for the 🌍 by CREWNIX
          <img src="/public/crewnix_white.svg"></img>{" "}
        </footer>
      </div>
    </>
  );
}
