import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const User = createContext({});

export function UserProvider({ children }) {
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    console.log("se solicito profile desde el cliente");
    axios
      .get("https://bookapp-api-production.up.railway.app/api/v1/users/profile")
      .then((response) => {
        console.log(response.data.role, "response en user ^^^^^^^^^^^");
        setId(response.data.userId);
        setUserName(response.data.userName);
        setUserRole(response.data.role);
        console.log(userRole, "vaor de rol en componente user");
      });
  }, []);

  return (
    <User.Provider
      value={{ userName, setUserName, id, setId, userRole, setUserRole }}
    >
      {console.log(userRole, "role en user provider")}
      {children}
    </User.Provider>
  );
}
