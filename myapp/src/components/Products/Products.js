// import { useContext, useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Users } from "../context/UserContext";
// import Swal from "sweetalert2";
// ////////////
// function Products() {
//   const [products, setProducts] = useState([]);
//   const [runEffect, setRunEffect] = useState(0);
//   const context = useContext(Users);
//   const token = context.auth.token;
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/product/show", {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       })
//       .then((data) => {
//         setProducts(data.data);
//       })
//       .catch((err) => console.log(err));
//   }, [runEffect]);

//   async function handleDelete(id) {
//     try {
//       const res = await axios.delete(
//         `http://127.0.0.1:8000/api/product/delete/${id}`,
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );

//       setRunEffect((prev) => prev + 1);
//     } catch (err) {
//       console.log(err);
//       console.log("error");
//     }
//   }

//   const showProducts = products.map((pro, index) => (
//     <tr key={Math.random()}>
//       <td>{index + 1}</td>
//       <td>
//         <img src={pro.image} alt="..." className="rounded-3"></img>
//       </td>
//       <td>{pro.title}</td>
//       <td>{pro.description}</td>
//       <td>
//         <Link to={`${pro.id}`}>
//           <FontAwesomeIcon
//             icon={faPenToSquare}
//             className="text-success me-2  "
//           />
//         </Link>
//         <FontAwesomeIcon
//           icon={faTrash}
//           className="text-danger"
//           onClick={() => {
//             Swal.fire({
//               title: "Are you sure?",
//               text: "You won't be able to revert this!",
//               icon: "warning",
//               showCancelButton: true,
//               confirmButtonColor: "#3085d6",
//               cancelButtonColor: "#d33",
//               confirmButtonText: "Yes, delete it!",
//             }).then((result) => {
//               if (result.isConfirmed) {
//                 Swal.fire({
//                   title: "Deleted!",
//                   text: "Your file has been deleted.",
//                   icon: "success",
//                 });
//                 handleDelete(pro.id);
//               }
//             });
//           }}
//         />
//       </td>
//     </tr>
//   ));
//   return (
//     <div className="w-100 text-center p-5">
//       <h1 className="text-center fw-bold mb-4">Products</h1>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Image</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Action </th>
//           </tr>
//         </thead>
//         <tbody>{showProducts}</tbody>
//       </table>
//     </div>
//   );
// }

// export default Products;
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { Users } from "../context/UserContext";
import Swal from "sweetalert2";

function Products() {
  const [products, setProducts] = useState([]);
  const [runEffect, setRunEffect] = useState(0);
  const context = useContext(Users);
  const token = context.auth.token;
  useEffect(() => {
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
  }, [runEffect]);

  async function handleDelete(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setRunEffect((prev) => prev + 1);
    } catch (err) {
      console.log(err);
      console.log("error");
    }
  }

  const showProducts = products.map((pro, index) => (
    <tr key={pro.id}>
      <td>{index + 1}</td>
      <td>
        <img src={pro.image} alt="Product Image" className="rounded-3" />
      </td>
      <td>{pro.title}</td>
      <td>{pro.description}</td>
      <td>
        <Link to={`${pro.id}`}>
          <FontAwesomeIcon icon={faPenToSquare} className="text-success me-2" />
        </Link>
        <FontAwesomeIcon
          icon={faTrash}
          className="text-danger"
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                handleDelete(pro.id);
              }
            });
          }}
        />
      </td>
    </tr>
  ));

  return (
    <div className="w-100 text-center p-5">
      <h1 className="text-center fw-bold mb-4">Products</h1>
      <table className="table table-striped table-centered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showProducts}</tbody>
      </table>
    </div>
  );
}

export default Products;
