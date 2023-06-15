import Icon from "../Icon";
import axios from "axios";
import "./style.css";
import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
function DeleteBookButton({ userID, bookID, functionExecute }) {
  const [userId, setData] = useState(userID);
  const [bookId, setData2] = useState(bookID);

  async function deleteUserBook(userID, bookID) {
    await axios
      .delete(
        "https://bookapp-api-production.up.railway.app/api/v1/users/userBooks/" +
          userID +
          "/" +
          bookID
      )
      .then((res) => {
        console.log(res);
      });
  }
  return (
    <div
      onClick={async () => {
        console.log("userID: " + userId);
        console.log("bookID: " + bookId);
        await deleteUserBook(userId, bookId);
        functionExecute();
      }}
      className="contUserDeleteBookButton"
    >
      <Icon css="UserDeleteBookButton" icon={faTrash} />
    </div>
  );
}

export default DeleteBookButton;
