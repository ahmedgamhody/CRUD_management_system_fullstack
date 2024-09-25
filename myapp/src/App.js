import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/Home";
import Dashboard from "./page/Dashboard";
import UsersShow from "./page/Users";
import UpdateUser from "./page/UpdateUser";
import CreateUser from "./page/CreateUser";
import RequierAuth from "./components/RequierAuth";
import PersistLogin from "./components/PersistLogin";
import Products from "./components/Products/Products";
import AddProduct from "./components/Products/AddProduct";
import UpdatProduct from "./components/Products/UpdatProduct";
import ProductDetails from "./components/Products/ProductDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="register" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequierAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<UsersShow />} />
              <Route path="users/:userId" element={<UpdateUser />} />
              <Route path="users/create" element={<CreateUser />} />
              <Route path="products" element={<Products />} />
              <Route path="products/create" element={<AddProduct />} />
              <Route path="products/:id" element={<UpdatProduct />} />
            </Route>
          </Route>

          <Route element={<RequierAuth />}>
            <Route path="product/:id" element={<ProductDetails />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
