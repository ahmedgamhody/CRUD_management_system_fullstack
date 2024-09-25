import axios from "axios";
import { useContext, useState } from "react";
import { Users } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [accsept, setAccsept] = useState(false);

  const nav = useNavigate();
  const userNow = useContext(Users);
  const cookie = new Cookies();

  async function Submit(e) {
    e.preventDefault();
    setAccsept(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: repassword,
      });
      console.log(res);

      nav("/dashboard");
      const token = res.data.data.token;
      cookie.set("Bearer", token, { path: "/" });
      const userDetails = res.data.data.user;
      userNow.setAuth({ token, userDetails });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Welcome ${userDetails.name}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError("The email has already been taken");
      }
      setAccsept(true);
    }
  }

  return (
    <>
      <Header></Header>
      <div className="form-container">
        <h3 className="fs-3 fw-bold mb-3">Welcome !</h3>
        <form
          className=" w-100"
          onSubmit={(e) => {
            Submit(e);
          }}
        >
          <div className="form-floating mb-3 w-100">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor="name">Name</label>
            {accsept && !name && (
              <p className="text-danger mb-3">*Name is Required</p>
            )}
          </div>
          <div className="form-floating mb-3 w-100">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label htmlFor="email">Email address</label>
            {accsept && emailError && (
              <p className="text-danger">{emailError}</p>
            )}
          </div>
          <div className="form-floating w-100">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
            {accsept && password.length < 8 && (
              <p className="mt-2 text-warning">
                *Password must be more than 8 characters
              </p>
            )}
          </div>
          <div className="form-floating mt-3 w-100">
            <input
              type="password"
              className="form-control"
              id="repassword"
              placeholder="Repeat Password"
              value={repassword}
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
            />
            <label htmlFor="repassword">Repeat Password</label>
            {accsept && password !== repassword && (
              <p className="mt-2 text-danger">*The password does not match</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary mt-3 w-25">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
