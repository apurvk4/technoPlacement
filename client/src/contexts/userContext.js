import { createContext } from "react";

const UserContext = createContext({
  level: null,
  login: false,
  data: {},
  setLevel: () => {},
  setLogin: () => {},
  setData: () => {},
});
export default UserContext;
