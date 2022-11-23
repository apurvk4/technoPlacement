import { useState } from "react";
import UserContext from "./userContext";
function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const UserProvider = ({ children }) => {
  const [level, setLevel] = useState("none");
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  return (
    <UserContext.Provider
      value={{ level, login, data, setLevel, setData, setLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
