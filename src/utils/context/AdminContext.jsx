import { createContext } from "react";

export const Admin = createContext();

const admin = {
  firstname: "John",
  lastname: "Doe",
  email: "johndoe@gmail.com",
  password: 12345678,
};

const AdminContextProvider = ({ children }) => {
  return <Admin.Provider value={{ admin }}>{children}</Admin.Provider>;
};

export default AdminContextProvider;
