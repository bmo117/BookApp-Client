import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const Menu = createContext({});

export function MenuProvider({ children }) {
  const [userMenu, setUserMenu] = useState("Books");

  return (
    <Menu.Provider value={{ userMenu, setUserMenu }}>{children}</Menu.Provider>
  );
}
