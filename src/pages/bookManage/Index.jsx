import "./style.css";
import moon from "../../assets/images/moon.jpg";
import Button from "../../components/linkButton/Button";
import { useEffect, useState, useContext } from "react";
import Icon from "../../components/Icon";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Book } from "../../context/BookContext";
import LogOutButton from "../../components/logOutButton/Index";

function Index() {
  const { bookContext, setBookContext } = useContext(Book);
  const [bookData, setBookData] = useState([]);
  const [deleteOneBook, setDeleteOneBook] = useState(1);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await axios
      .get("https://bookapp-api-production.up.railway.app/api/admin/books/0")
      .then((res) => {
        setBookData(res.data);

        console.log(
          res.data,
          "se establecieron los datos ==============================="
        );
      });
  }

  function fillDataBook(dataB) {
    setBookContext(dataB);
  }

  async function deleteBook(book_ID) {
    const res = await axios.delete(
      "https://bookapp-api-production.up.railway.app/api/admin/books/" + book_ID
    );
  }
  const navigate = useNavigate();
  return (
    <div className="manageContainer">
      {console.log(bookData, "data====")}
      {console.log(bookContext, "datos en en book context")}
      <div className="header-cont">
        <div>
          <LogOutButton />
        </div>
        <div className="logo">
          <img className="imgLogo" src={moon} alt="moon image" />
          <p className="title">BookApp</p>
        </div>
        <div className="btnActionsAdmin posi">
          <Button
            path={"/manage/bookRegister"}
            name={<Icon css="iconAdminPage" icon={faPlus} />}
          />
        </div>
      </div>
      <div className="body-cont">
        <div className="books-cont">
          {bookData.map((book) => (
            <div key={book.book.ISBN} className="card">
              {console.log(book.book.dataImage.name, "------------")}
              <div className="contbtnActionsAdmin">
                <div
                  onClick={() => fillDataBook(book.book)}
                  className="btnActionsAdmin"
                >
                  <Button
                    path={"/manage/bookEdit"}
                    name={<Icon css="iconAdminPage" icon={faPencil} />}
                  />
                </div>
                <div className="btnActionsAdmin">
                  <button
                    onClick={async () => {
                      fillDataBook(book.book);
                      console.log("click on delete", book.book.book_ID);
                      await deleteBook(book.book.book_ID);
                      getData();
                    }}
                  >
                    <Icon css="iconAdminPage" icon={faTrashCan} />
                  </button>
                </div>
              </div>
              <div className="cardSection1">
                <div className="contImageAdminPage">
                  <img
                    className="imageBookAdmin"
                    src={
                      "https://bookapp-api-production.up.railway.app/public/" +
                      book.book.dataImage.name
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="cardSection2">
                <div className="databook">
                  <span>{book.book.name}</span>
                </div>
                <div className="databook">
                  <span>{book.book.authors}</span>
                </div>
                <div className="databook">
                  <span>{book.book.format}</span>
                </div>
                <div className="databook">
                  <span>{book.book.publisher} </span>
                </div>
                <div className="databook">
                  <span>ISBN: {book.book.ISBN}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
