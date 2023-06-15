// import { useContext } from "react";
// import { User } from "../../context/User";
// import BookHome from "../../pages/bookHome/Index";
// import BookManage from "../../pages/bookManage/Index";
// import UserHome from "../../pages/bookHomeUser/Index";

// import Register from "../../pages/bookLogin/Index";

// export function Routes() {
//   const { userName, id, userRole } = useContext(User);
//   console.log(
//     "se ejecuto Routes >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
//   );
//   console.log(userRole, "rrrrrrrrrrrrrrolllllllll");
//   if (!userRole) {
//     return <BookHome />; // if have an authentication token
//   } else if (userRole === "user") {
//     console.log("UserName");
//     return <UserHome />;
//   } else {
//     return <BookManage />; // home
//     console.log("BookManage");
//   }
// }

// export default Routes;
