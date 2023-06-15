import "./style.css";
import { useContext } from "react";
import { Menu } from "../../context/MenuContext";
function menuUser() {
  const { userMenu, setUserMenu } = useContext(Menu);

  return (
    <div className="contMenuUser">
      <div
        onClick={() => setUserMenu("Books")}
        className={
          "contBtnMenuUser " + (userMenu === "Books" ? "isSelected" : "")
        }
      >
        Books
      </div>
      <div
        onClick={() => setUserMenu("MyBooks")}
        className={
          "contBtnMenuUser " + (userMenu === "MyBooks" ? "isSelected" : "")
        }
      >
        My Books
      </div>
      <div
        onClick={() => setUserMenu("Favorites")}
        className={
          "contBtnMenuUser " + (userMenu === "Favorites" ? "isSelected" : "")
        }
      >
        Favorites
      </div>
      <div
        onClick={() => setUserMenu("Reading")}
        className={
          "contBtnMenuUser " + (userMenu === "Reading" ? "isSelected" : "")
        }
      >
        Reading
      </div>
      <div
        onClick={() => setUserMenu("WantToRead")}
        className={
          "contBtnMenuUser " + (userMenu === "WantToRead" ? "isSelected" : "")
        }
      >
        Want to Read
      </div>
    </div>
  );
}

export default menuUser;
