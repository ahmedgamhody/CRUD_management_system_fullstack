import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Users } from "./context/UserContext";
import "../index.css";
import { Link } from "react-router-dom";
function HomePage() {
  const [products, setProducts] = useState([]);
  const context = useContext(Users);
  const token = context.auth.token;
  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/product/show", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((data) => {
          setProducts(data.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <Header></Header>
      {!token ? <h1 className="text-center p-4">Welcome !</h1> : null}
      {token ? (
        <h1 className="text-center p-4">Products</h1>
      ) : (
        <h2 className="text-center p-4 text-info">
          Please Signin Or SignUp to Show Products and Users{" "}
        </h2>
      )}
      <div className="container">
        <div className="row">
          {products.map((pro, index) => {
            return (
              <div className="col-md-4" key={index}>
                <div className="card">
                  <img src={pro.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{pro.title}</h5>
                    <p className="card-text">{pro.description}</p>
                    <Link to={`product/${pro.id}`} className="btn btn-primary">
                      About Product
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
