import "./style.css";
import axios from "axios";
import Icon from "../../Icon";
import { User } from "../../../context/User";
import { useEffect, useState, useContext } from "react";
import {
  faBook,
  faHeart,
  faHeartCirclePlus,
  faSquarePlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DeleteBookButton from "../../deleteBookBuuton/DeleteBookButton";
import { getDataBookStatusReading } from "../../../assets/helpers/getBookStatus.js";
import BookStatus from "../../BookStatus/BookStatus";
function BookMyBooksCard() {
  const { id, userRole, userName } = useContext(User);
  const [BookMyBooks, setBookMyBooks] = useState([]);
  const [myFavorites, setMyFavorites] = useState([]);
  const [reading, setReading] = useState([]);
  const [read, setRead] = useState([]);
  const [wtr, setWtr] = useState([]);
  useEffect(() => {
    getDataMyBooks();
    getFavorites();
    setBookStatus();
  }, []);

  async function getDataMyBooks() {
    await axios
      .get("http://localhost:3001/api/v1/users/myBooks/" + id)
      .then((res) => {
        setBookMyBooks(res.data);
      });
    console.log("se ejecuto traer mis libros");
  }
  async function getFavorites() {
    await axios
      .get("http://localhost:3001/api/v1/users/favoritesIDs/" + id)
      .then((res) => {
        setMyFavorites(res.data);
      });
  }

  async function addFavoritesToUser(userID, bookID) {
    await axios.post("http://localhost:3001/api/v1/users/favorites", {
      userID,
      bookID,
    });
  }

  function defineStatus(id) {
    //console.log("idIn:", id);
    let status = "want to read?";
    let statusCode = "";
    let arr = [];
    //console.log("res. find: ", !!reading.find((e) => e == id));
    if (!!reading.find((e) => e == id) == true) {
      status = "reading";
      statusCode = "statusReading";
    }

    if (!!read.find((e) => e == id) == true) {
      status = "read";
      statusCode = "statusRed";
    }
    if (!!wtr.find((e) => e == id) == true) {
      status = "want to read";
      statusCode = "statusWTR";
    }
    arr.push(status);
    arr.push(statusCode);
    return arr;
  }

  async function setBookStatus() {
    let readingBooks = await getDataBookStatusReading(id, "reading");
    let readBooks = await getDataBookStatusReading(id, "read");
    let wtrBooks = await getDataBookStatusReading(id, "want to read");
    setReading(readingBooks);
    setRead(readBooks);
    setWtr(wtrBooks);
  }

  function sendDataDelete(userID, bookID) {
    let arr = [];
    arr.push(userID);
    arr.push(bookID);
    return arr;
  }

  return (
    <div className="contBookMyBooks">
      {console.log(myFavorites)}
      {BookMyBooks.map((element) => (
        <div key={element.book.book_ID} className="bookCatalogCard">
          {console.log(element)}
          <div className="BCCardPart1">
            <div
              onClick={async () => {
                await addFavoritesToUser(id, element.book.book_ID);
                getFavorites();
              }}
              className="BCCardFavorite"
            >
              <Icon
                css={
                  "BCCFavorite " +
                  (myFavorites.find((e) => e == element.book.book_ID)
                    ? "isInMyFavorites"
                    : "")
                }
                icon={faHeart}
              />
            </div>
            <div className="contImageBCCard">
              <img
                className="imgBCCard"
                src={
                  "http://localhost:3001/public/" + element.book.dataImage.name
                }
                alt=""
              />
            </div>
          </div>
          <div className="BCCardPart2">
            <div className="BCCardField">{element.book.name}</div>
            <div className="BCCardField">{element.book.authors}</div>
            <div className="BCCardField">
              <Icon css="BCCFormat" icon={faBook} />
              {element.book.format}
            </div>
            <div className="BCCardButtons">
              <div>
                <DeleteBookButton
                  userID={id}
                  bookID={element.book.book_ID}
                  functionExecute={getDataMyBooks}
                />
              </div>
              <div>
                <BookStatus
                  value={defineStatus(element.book.book_ID)[0]}
                  userID={id}
                  bookID={element.book.book_ID}
                  css={defineStatus(element.book.book_ID)[1]}
                  func={setBookStatus}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookMyBooksCard;
