import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "../context/UserContext";
import Swal from "sweetalert2";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [accsept, setAccsept] = useState(false);
  console.log(image);
  const nav = useNavigate();
  const context = useContext(Users);
  const token = context.auth.token;
  async function Submit(e) {
    e.preventDefault();
    setAccsept(true);
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("image", image);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/product/create",
        form,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      nav("/dashboard/products");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Product has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
      setAccsept(true);
    }
  }

  return (
    <>
      <div className="form-container">
        <h3 className="fs-3 fw-bold mb-3">Create A New Product</h3>
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
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label htmlFor="name">Title</label>
            {accsept && !title && (
              <p className="text-danger mb-3">*Title is Required</p>
            )}
          </div>
          <div className="form-floating mb-3 w-100">
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
            <label htmlFor="description">Description</label>
            {/* {accsept && emailError && (
              <p className="text-danger">{emailError}</p>
            )} */}
          </div>
          <div className="form-floating w-100">
            <input
              type="file"
              className="form-control"
              id="image"
              placeholder="Image"
              onChange={(e) => {
                setImage(e.target.files.item(0));
              }}
            />
            <label htmlFor="image">Image</label>
          </div>
          <button type="submit" className="btn btn-primary mt-3 w-25">
            Create A New Product
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
