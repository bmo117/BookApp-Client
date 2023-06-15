import "./style.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../context/User";
import axios from "axios";
function Index() {
  const { userName } = useContext(User);
  let user = userName.split(" ")[0];

  function logOut() {
    axios.post(
      "https://bookapp-api-production.up.railway.app/api/v1/users/logout"
    );
    navigate("/");
  }
  const navigate = useNavigate();
  return (
    <div className="ContUserName">
      <p>{user}</p>
      <div>
        <button className="btnLogOut" onClick={() => logOut()}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Index;
