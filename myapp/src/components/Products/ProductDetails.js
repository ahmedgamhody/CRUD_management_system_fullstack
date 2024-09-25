import { useParams } from "react-router-dom";
import Header from "../Header";
import { useContext, useEffect, useState } from "react";
import { Users } from "../context/UserContext";
import axios from "axios";
function ProductDetails() {
  const [product, setProduct] = useState({});
  const id = useParams().id;
  const context = useContext(Users);
  const token = context.auth.token;
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setProduct(data.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header />
      <div className="container container-card w-50 p-5 ">
        <div className="card w-100 h-100">
          <img src={product.image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
