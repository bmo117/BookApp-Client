import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const Book = createContext({});
function BookContext({ children }) {
  const [bookContext, setBookContext] = useState([]);
  return (
    <Book.Provider value={{ bookContext, setBookContext }}>
      {children}
    </Book.Provider>
  );
}

export default BookContext;

// import { createContext, useState, useEffect } from "react";
// import axios from "axios";
// export const User = createContext({});

// export function UserProvider({ children }) {
//   const [userName, setUserName] = useState(null);
//   const [id, setId] = useState(null);

//   useEffect(() => {
//     axios.get("/users/profile").then((response) => {
//       setId(response.data.userId);
//       setUserName(response.data.userName);
//     });
//   }, []);

//   return (
//     <User.Provider value={{ userName, setUserName, id, setId }}>
//       {children}
//     </User.Provider>
//   );
// }
