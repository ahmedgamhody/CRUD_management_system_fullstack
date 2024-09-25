import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "../components/context/UserContext";
import Swal from "sweetalert2";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [accsept, setAccsept] = useState(false);

  const nav = useNavigate();
  const context = useContext(Users);
  const token = context.auth.token;
  async function Submit(e) {
    e.preventDefault();
    setAccsept(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/user/create",
        {
          name,
          email,
          password,
          password_confirmation: repassword,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      nav("/dashboard/users");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your User has been saved",
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
      <div className="form-container">
        <h3 className="fs-3 fw-bold mb-3">Create A New User</h3>
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
            Create User
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateUser;
