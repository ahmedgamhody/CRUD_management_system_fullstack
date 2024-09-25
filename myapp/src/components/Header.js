import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { Users } from "./context/UserContext";

function Header() {
  const cookie = new Cookies();
  // const token = cookie.get("Bearer");
  const context = useContext(Users);
  const token = context.auth.token;
  async function hamdelLogOut() {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    cookie.remove("Bearer");
    window.location.pathname = "/";
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <h2>GAM</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            {token && (
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {!token && (
            <div className=" ms-5 gap-2 d-flex">
              <Link to="/register" type="button" className="btn btn-primary">
                Register
              </Link>
              <Link to="/login" type="button" className="btn btn-primary">
                Login
              </Link>
            </div>
          )}

          {token && (
            <div className=" ms-5 gap-2 d-flex">
              <Link
                type="button"
                className="btn btn-primary"
                onClick={hamdelLogOut}
              >
                logOut
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Header;
