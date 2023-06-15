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
import { getDataBookStatusReading } from "../../../assets/helpers/getBookStatus.js";
import BookStatus from "../../BookStatus/BookStatus";

function BookFavorites() {
  const { id, userRole, userName } = useContext(User);
  const [BookFavorites, setBookFavorites] = useState([]);
  const [reading, setReading] = useState([]);
  const [read, setRead] = useState([]);
  const [wtr, setWtr] = useState([]);
  useEffect(() => {
    getDataFavorites();
    setBookStatus();
  }, []);

  async function getDataFavorites() {
    await axios
      .get(
        "https://bookapp-api-production.up.railway.app/api/v1/users/favorites/" +
          id
      )
      .then((res) => {
        setBookFavorites(res.data);
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
      {BookFavorites.map((element) => (
        <div key={element.book.book_ID} className="bookCatalogCard">
          {console.log(element)}
          <div className="BCCardPart1">
            <div
              onClick={async () => {
                await addFavoritesToUser(id, element.book.book_ID);
                getDataFavorites();
              }}
              className="BCCardFavorite"
            >
              <Icon css={"BCCFavorite isInMyFavorites "} icon={faHeart} />
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
              {/* <div>
                <Icon css="" icon={faTrash} />
              </div> */}
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

export default BookFavorites;
