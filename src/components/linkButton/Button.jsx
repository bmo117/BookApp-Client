import { Link } from "react-router-dom";
import "./styles.css";
function LinkButton({ name, path }) {
  return (
    <div className="btnCont">
      <Link className="linkButton" to={path}>
        {name}
      </Link>
    </div>
  );
}

export default LinkButton;
