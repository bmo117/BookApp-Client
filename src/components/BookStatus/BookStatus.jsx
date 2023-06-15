import { useState, useContext } from "react";
import "./style.css";
import axios from "axios";
import Icon from "../../components/Icon";
import { useNavigate } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../../context/MenuContext";
function BookStatus({ value, userID, bookID, css, func }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userMenu, setUserMenu } = useContext(Menu);

  //const [value, setValue] = useState("Want To read");
  const [selectedValue, setSelectedValue] = useState("want to read"); // = user_book. status
  async function UpdateReadingStatus() {
    console.log("book status: ", selectedValue);
    console.log("user: ", userID);
    console.log("book: ", bookID);
    console.log("css: ", css);
    let ReadingStatus = selectedValue;
    await axios.post(
      "https://bookapp-api-production.up.railway.app/api/v1/users/userBook",
      {
        userID,
        bookID,
        ReadingStatus,
      }
    );
  }

  return (
    <div className={"contGeneralModal "}>
      {isOpen === false && (
        <button
          className={"btnStatusReading " + css}
          onClick={() => setIsOpen(true)}
        >
          <div className="btnStatusReading2">
            <p>{value}</p>
            <Icon css="btnReadingStatus" icon={faCaretDown} />
          </div>
        </button>
      )}
      {isOpen === true && (
        <div className={"menuWTR "}>
          <div className="contBTNBookStatus">
            <button className="btnBookStatus" onClick={() => setIsOpen(false)}>
              Cancel
            </button>

            <button
              className="btnBookStatus"
              disabled={selectedValue === null ? true : false}
              type="submit"
              onClick={async () => {
                setIsOpen(false);
                await UpdateReadingStatus();
                // setUserMenu("Books");
                func();
              }}
            >
              done
            </button>
          </div>
          <select
            className="selectBookStatus"
            required
            name="bookStatus"
            id=""
            onChange={(event) => {
              setSelectedValue(event.target.value);
            }}
            defaultValue={selectedValue}
          >
            <option value="want to read">Wan to read</option>
            <option value="read">read</option>
            <option value="reading">reading</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default BookStatus;
