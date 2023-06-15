import "./style.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Icon from "../../Icon";
import { getDataBookStatusReading } from "../../../assets/helpers/getBookStatus.js";
import {
  faBook,
  faHeart,
  faHeartCirclePlus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../../../context/User";
import BookStatus from "../../BookStatus/BookStatus";
function bookCatalogCard() {
  const { id } = useContext(User);
  const [BookCatalog, setBookCatalog] = useState([]);
  const [myFavorites, setMyFavorites] = useState([]);
  const [reading, setReading] = useState([]);
  const [read, setRead] = useState([]);
  const [wtr, setWtr] = useState([]);
  const [updateReadBook, setUpdateReadBook] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3001/api/admin/books/").then((res) => {
      setBookCatalog(res.data);
    });
    getFavorites();
    setBookStatus();
  }, []);

  async function setBookStatus() {
    let readingBooks = await getDataBookStatusReading(id, "reading");
    let readBooks = await getDataBookStatusReading(id, "read");
    let wtrBooks = await getDataBookStatusReading(id, "want to read");
    setReading(readingBooks);
    setRead(readBooks);
    setWtr(wtrBooks);
  }
  //
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

  return (
    <div className="contBookCatalog">
      {/* {console.log("books reading", reading)} */}
      {BookCatalog.map((element) => (
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
                {/* {console.log(defineStatus(element.book.book_ID), "1Status")} */}
                <BookStatus
                  value={defineStatus(element.book.book_ID)[0]}
                  userID={id}
                  bookID={element.book.book_ID}
                  css={defineStatus(element.book.book_ID)[1]}
                  func={setBookStatus}
                />
              </div>
              {/* <div onClick={() => setShowSelect(1)} className="btnWTR">
                Want to read &darr;
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default bookCatalogCard;

// myFavorites.find(e => e ==element.book.book_ID ):
