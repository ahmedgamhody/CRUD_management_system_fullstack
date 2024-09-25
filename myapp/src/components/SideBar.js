import { Link } from "react-router-dom";
import "../sideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserPlus,
  faPlus,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  return (
    <div className="sidebar p-2">
      <div className="text-center d-flex flex-column gap-3 w-100 h-100 justify-content-start align-items-center pt-3">
        <Link
          to="/dashboard/users"
          className="btn btn-info w-75 text-white justify-content-center align-items-center"
        >
          <FontAwesomeIcon icon={faUsers} className=" me-2" />
          Users
        </Link>
        <Link
          to="/dashboard/users/create"
          className="btn btn-info w-75 text-white"
        >
          <FontAwesomeIcon icon={faUserPlus} className=" me-2" />
          Add User
        </Link>
        <Link to="/dashboard/products" className="btn btn-info w-75 text-white">
          <FontAwesomeIcon icon={faFolder} className=" me-2" />
          Products
        </Link>
        <Link
          to="/dashboard/products/create"
          className="btn btn-info w-75 text-white"
        >
          <FontAwesomeIcon icon={faPlus} className=" me-2" />
          New Product
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
