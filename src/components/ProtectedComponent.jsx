import { User } from "../context/User";
import { Children, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
  isAllowed,
  children,
  redirectTo = "/user/home",
}) => {
  const { userRole } = useContext(User);
  console.log(userRole, "valor de rol antes de verificaciones ");
  // if (!!userRole) {
  //   console.log("no hay role te llevo a home");
  //   return <Navigate to={"/"} />;
  // }
  console.log(!userRole, "SSSSSSSSSSSSSSSSSSSSS", userRole);
  // if (userRole == "user") {
  //   console.log(" role  igual a user te llevo a user/home");
  //   return children;
  // }
  if (userRole === "user") {
    console.log(" role  igual a user te llevo a user/home");
    return children;
  }

  if (userRole === "admin") {
    console.log(" role  igual a admin te llevo a /manage");
    return children ? children : <Outlet />;
  }
  // if (userRole === null) {
  //   return <Navigate to={"/"} />;
  // }
  // else if (!userRole) {
  //   console.log("no hay role te llevo a home");
  //   return <Navigate to={"/"} />;
  // }
  //else {
  //   return children ? children : <Outlet />;
  // }
};
