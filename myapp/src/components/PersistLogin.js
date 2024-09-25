import axios from "axios";
import { Outlet } from "react-router-dom";
import { Users } from "./context/UserContext";
import { useState, useContext, useEffect } from "react";
import LoadingPage from "./LoadingPage";
import Cookies from "universal-cookie";

function PersistLogin() {
  const context = useContext(Users);
  const token = context.auth.token;
  const [loading, setLoading] = useState(true);
  //use cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");
  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post("http://127.0.0.1:8000/api/refresh", null, {
            headers: {
              Authorization: "Bearer " + getToken,
            },
          })
          .then((data) => {
            cookie.set("Bearer", data.data.token, { path: "/" });
            context.setAuth(() => {
              return {
                userDetails: data.data.user,
                token: data.data.token,
              };
            });
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);

  return loading ? <LoadingPage /> : <Outlet />;
}

export default PersistLogin;
