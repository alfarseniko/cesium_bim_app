/** ################################################### */
/*--------------------IMPORTS-------------------------- */
/** ################################################### */
import * as React from "react";
import { Link } from "react-router-dom";

/** ################################################### */
/*--------------------REACT FUNCTION------------------- */
/** ################################################### */
export function Sidebar() {
  /** ################################################### */
  /*--------------JSX RETURN VALUE----------------------- */
  /** ################################################### */
  return (
    <aside
      id="sidebar"
      style={{
        width: "300px",
        backgroundColor: "#333",
        padding: "20px",
        color: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        id="company-logo"
        src="./crewnix_white.svg"
        alt="Construction Company"
        style={{ width: "100px", marginBottom: "20px" }}
      />
      <ul
        id="nav-buttons"
        style={{ listStyle: "none", padding: 0, width: "100%" }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <li
            id="projects-button"
            style={{
              padding: "10px",
              backgroundColor: "#444",
              borderRadius: "5px",
              marginBottom: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <bim-label
              style={{ color: "#fff" }}
              icon="material-symbols:apartment"
            >
              Projects
            </bim-label>
          </li>
        </Link>
        <Link to="/users" style={{ textDecoration: "none" }}>
          <li
            id="users-button"
            style={{
              padding: "10px",
              backgroundColor: "#444",
              borderRadius: "5px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <bim-label style={{ color: "#fff" }} icon="mdi:user">
              Users
            </bim-label>
          </li>
        </Link>
      </ul>
    </aside>
  );
}
