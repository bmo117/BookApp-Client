import "./style.css";
import moon from "../../assets/images/moon.jpg";
function Logo() {
  return (
    <div className="contGeneralLogo">
      <img className="imgGeneralLogo" src={moon} alt="moon image" />
      <p className="titleGL">BookApp</p>
    </div>
  );
}

export default Logo;
