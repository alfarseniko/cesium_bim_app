import * as React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthError, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

export function LandingPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      navigate("/app");
    }
  }, [currentUser, navigate]);

  const onGetStarted = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredentials = await signInWithPopup(auth, provider);
      console.log(userCredentials);
    } catch (error) {
      console.error("Authentication Error:", error as AuthError);
    }
  };

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
          <button className="cta-button" onClick={onGetStarted}>
            Get started
          </button>
        </div>
        <footer>
          Made with 🧠 for the 🌍 by CREWNIX
          <img src="/public/crewnix_white.svg"></img>{" "}
        </footer>
      </div>
    </>
  );
}
