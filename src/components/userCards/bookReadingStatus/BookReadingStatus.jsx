import { User } from "../../../context/User";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Icon from "../../Icon";
import {
  faBook,
  faHeart,
  faHeartCirclePlus,
  faSquarePlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { getDataBookStatusReading } from "../../../assets/helpers/getBookStatus.js";
import BookStatus from "../../BookStatus/BookStatus";
import DeleteBookButton from "../../deleteBookBuuton/DeleteBookButton";
function BookReadingStatus() {
  const { id, userRole, userName } = useContext(User);
  const [BookReading, setBookReading] = useState([]);
  const [myFavorites, setMyFavorites] = useState([]);
  const [reading, setReading] = useState([]);
  const [read, setRead] = useState([]);
  const [wtr, setWtr] = useState([]);
  useEffect(() => {
    getReadingBook();
    getFavorites();
    setBookStatus();
  }, []);

  function getReadingBook() {
    axios
      .get(
        "https://bookapp-api-production.up.railway.app/api/v1/users/bookStatus/" +
          id +
          "/" +
          "reading"
      )
      .then((res) => {
        setBookReading(res.data);
      });
  }

  async function getFavorites() {
    await axios
      .get(
        "https://bookapp-api-production.up.railway.app/api/v1/users/favoritesIDs/" +
          id
      )
      .then((res) => {
        setMyFavorites(res.data);
      });
  }

  async function addFavoritesToUser(userID, bookID) {
    await axios.post(
      "https://bookapp-api-production.up.railway.app/api/v1/users/favorites",
      {
        userID,
        bookID,
      }
    );

    console.log("BookID: ", bookID, "UserID: ", userID);
  }

  async function setBookStatus() {
    let readingBooks = await getDataBookStatusReading(id, "reading");
    let readBooks = await getDataBookStatusReading(id, "read");
    let wtrBooks = await getDataBookStatusReading(id, "want to read");
    setReading(readingBooks);
    setRead(readBooks);
    setWtr(wtrBooks);
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

  return (
    <div className="contBookMyBooks">
      {BookReading.map((element) => (
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
                  "https://bookapp-api-production.up.railway.app/public/" +
                  element.book.dataImage.name
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
                  functionExecute={getReadingBook}
                />
              </div>
              <div>
                <BookStatus
                  value={defineStatus(element.book.book_ID)[0]}
                  userID={id}
                  bookID={element.book.book_ID}
                  css={defineStatus(element.book.book_ID)[1]}
                  func={getReadingBook}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookReadingStatus;
