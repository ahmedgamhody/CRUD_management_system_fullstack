import axios from "axios";
import { useContext, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Users } from "./context/UserContext";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accsept, setAccsept] = useState(false);
  const [emailError, setEmailError] = useState("");

  const nav = useNavigate();
  const userNow = useContext(Users);
  const cookie = new Cookies();

  async function submit(e) {
    e.preventDefault();
    setAccsept(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      const token = res.data.data.token;
      const userDetails = res.data.data.user;
      cookie.set("Bearer", token, { path: "/" });
      userNow.setAuth({ token, userDetails });
      setEmailError("");
      nav("/dashboard");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Welcome Back ${userDetails.name}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      if (error.response.status === 401) {
        setEmailError("The password or email is wrong");
      }
      setAccsept(true);
    }
  }

  return (
    <>
      <Header />
      <div className="form-container">
        <div>
          <h3 className="fs-3 fw-bold mb-3">Welcome Back !</h3>
          <form onSubmit={submit}>
            <div className="form-floating mb-3 w-100">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating w-100">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            {password.length < 8 && accsept && (
              <p className="mt-2 text-warning">
                *Password must be more than 8 characters
              </p>
            )}

            <button type="submit" className="btn btn-primary mt-3 w-25">
              Login
            </button>
            {emailError && accsept && (
              <p className="text-danger pt-2">{emailError}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
