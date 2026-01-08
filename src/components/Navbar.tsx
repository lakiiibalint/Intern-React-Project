import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <div className="container">
        <h1 className="navbar-brand fw-bold">Intern App</h1>
        <div className="navbar-nav">
          <NavLink to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active fw-semibold" : ""}`
            }
          >
            Movies
          </NavLink>

          <NavLink  to="/sandbox"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active fw-semibold" : ""}`
            }
          >
            Sandbox
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
