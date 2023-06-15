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
function BookWtrStatus() {
  const { id, userRole, userName } = useContext(User);
  const [BookWtr, setBookWtr] = useState([]);
  const [myFavorites, setMyFavorites] = useState([]);
  const [reading, setReading] = useState([]);
  const [read, setRead] = useState([]);
  const [wtr, setWtr] = useState([]);
  useEffect(() => {
    getBookStatus();
    getFavorites();
    setBookStatus();
  }, []);

  function getBookStatus() {
    axios
      .get(
        "http://localhost:3001/api/v1/users/bookStatus/" +
          id +
          "/" +
          "want to read"
      )
      .then((res) => {
        setBookWtr(res.data);
      });
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

    console.log("BookID: ", bookID, "UserID: ", userID);
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
  return (
    <div className="contBookMyBooks">
      {BookWtr.map((element) => (
        <div key={element.book.book_ID} className="bookCatalogCard">
          {console.log(element)}
          <div className="BCCardPart1">
            <div
              onClick={
                async () => {
                  await addFavoritesToUser(id, element.book.book_ID);
                  getFavorites();
                }
                // console.log("BookID: ", element.book.book_ID, "UserID: ", id)
              }
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
                  functionExecute={getBookStatus}
                />
              </div>
              <div>
                <BookStatus
                  value={defineStatus(element.book.book_ID)[0]}
                  userID={id}
                  bookID={element.book.book_ID}
                  css={defineStatus(element.book.book_ID)[1]}
                  func={getBookStatus}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookWtrStatus;
