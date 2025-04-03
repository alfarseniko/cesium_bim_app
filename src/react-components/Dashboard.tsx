// src/components/Dashboard.tsx
import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut, AuthError } from "firebase/auth";
import { auth } from "../firebase";

function Dashboard(): JSX.Element {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect to landing if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      // The redirect will happen automatically due to the useEffect above
    } catch (error) {
      console.error("Sign out error:", error as AuthError);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {currentUser && (
        <>
          <p>Welcome, {currentUser.displayName || currentUser.email}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      )}
    </div>
  );
}

export default Dashboard;
