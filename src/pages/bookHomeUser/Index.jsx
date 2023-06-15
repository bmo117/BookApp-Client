import { User } from "../../context/User";
import { Menu } from "../../context/MenuContext";
import { useContext, useState, useEffect } from "react";
import Logo from "../../components/Logo/Logo";
import MenuUsers from "../../components/MenuUserHome/menuUser";
import BookCatalogCard from "../../components/userCards/bookCatalog/BookCatalogCarg";
import BookMyBooksCard from "../../components/userCards/bookMyBooks/BookMyBooksCard";
import LogOutButton from "../../components/logOutButton/Index";
import BookReadingStatus from "../../components/userCards/bookReadingStatus/BookReadingStatus";
import BookWtrStatus from "../../components/userCards/bookWtrStatus/BookWtrStatus";
import BookFavorites from "../../components/userCards/bookFavorites/BookFavorites";

import "./style.css";
function Index() {
  const { userMenu, setMenuContext } = useContext(Menu);
  const { userRole, userName } = useContext(User);
  const [option, setOption] = useState(userMenu);
  const d = userMenu;
  useEffect(() => {}, [option]);
  return (
    <div className="bgUserHome">
      <div className="logoUserHome">
        {console.log(userMenu, "menu en &&&&&&")}
        {console.log(option, "valor menu en ++++++++")}
        <div>
          <LogOutButton />
        </div>
        <Logo />
      </div>
      <div className="contMenuUserHome">
        <MenuUsers />
      </div>
      <div className="AreaUserHome">
        {/* <div className="prbComponent"></div> */}
        {/* <BookCatalogCard /> */}
        {userMenu === "Books" && <BookCatalogCard />}
        {userMenu === "MyBooks" && <BookMyBooksCard />}
        {userMenu === "Favorites" && <BookFavorites />}
        {userMenu === "Reading" && <BookReadingStatus />}
        {userMenu === "WantToRead" && <BookWtrStatus />}
      </div>
    </div>
  );
}

export default Index;
