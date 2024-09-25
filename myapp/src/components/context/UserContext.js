import { createContext, useState } from "react";

export const Users = createContext({});

function UsersProvider({ children }) {
  const [auth, setAuth] = useState({});
  return <Users.Provider value={{ auth, setAuth }}>{children}</Users.Provider>;
}

export default UsersProvider;
