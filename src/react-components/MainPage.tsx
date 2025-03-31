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
            <ul>About Us</ul>
            <ul>Contact Us</ul>
            <ul>Login</ul>
          </div>
        </header>
        <div id="landing-items">
          <h1>GeoBIM</h1>
          <h2>Your BIM Model on the Globe</h2>
        </div>
        <footer></footer>
      </div>
    </>
  );
}
