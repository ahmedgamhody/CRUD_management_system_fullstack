// import { useContext, useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Users } from "../components/context/UserContext";
// import Swal from "sweetalert2";
// import imge from "../photos/avatar-03.png";
// ////////////
// function UsersShow() {
//   const [users, setUsers] = useState([]);
//   const [runEffect, setRunEffect] = useState(0);
//   const context = useContext(Users);
//   const token = context.auth.token;
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/user/show", {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       })
//       .then((data) => {
//         setUsers(data.data);
//       })
//       .catch((err) => console.log(err));
//   }, [runEffect]);

//   async function handleDelete(id) {
//     try {
//       const res = await axios.delete(
//         `http://127.0.0.1:8000/api/user/delete/${id}`,
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       if (res.status === 200) {
//         setRunEffect((prev) => prev + 1);
//       }
//     } catch {
//       console.log("error");
//     }
//   }

//   const showUsers = users.map((user, index) => (
//     <tr key={Math.random()}>
//       <td>{index + 1}</td>
//       <td>
//         <img src={imge} alt="..." className=" rounded-circle w-25"></img>
//       </td>
//       <td>{user.name}</td>
//       <td>{user.email}</td>
//       <td>
//         <Link to={`${user.id}`}>
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
//                   text: "Your User has been deleted.",
//                   icon: "success",
//                 });
//                 handleDelete(user.id);
//               }
//             });
//           }}
//         />
//       </td>
//     </tr>
//   ));
//   return (
//     <div className="w-100 text-center p-5">
//       <h1 className="text-center fw-bold mb-4">Users</h1>
//       <table className="table table-striped ">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Avatar</th>
//             <th>User</th>
//             <th>Email</th>
//             <th>Action </th>
//           </tr>
//         </thead>
//         <tbody>{showUsers}</tbody>
//       </table>
//     </div>
//   );
// }

// export default UsersShow;
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { Users } from "../components/context/UserContext";
import Swal from "sweetalert2";
import imge from "../photos/avatar-03.png";
function UsersShow() {
  const [users, setUsers] = useState([]);
  const [runEffect, setRunEffect] = useState(0);
  const context = useContext(Users);
  const token = context.auth.token;
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => console.log(err));
  }, [runEffect]);

  async function handleDelete(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setRunEffect((prev) => prev + 1);
      }
    } catch {
      console.log("error");
    }
  }

  const showUsers = users.map((user, index) => (
    <tr key={Math.random()}>
      <td>{index + 1}</td>
      <td>
        <img src={imge} alt="..." className=" rounded-circle "></img>
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link to={`${user.id}`}>
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
                  text: "Your User has been deleted.",
                  icon: "success",
                });
                handleDelete(user.id);
              }
            });
          }}
        />
      </td>
    </tr>
  ));
  return (
    <div className="w-100 text-center p-5">
      <h1 className="text-center fw-bold mb-4">Users</h1>
      <table className="table table-striped table-centered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
    </div>
  );
}

export default UsersShow;
