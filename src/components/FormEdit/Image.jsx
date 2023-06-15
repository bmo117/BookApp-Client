import Icon from "../Icon";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import "./style.css";
function Image({ getImageData, visible }) {
  const imgInitial = {
    name: "unknown.jpg",
    url: "../../../src/assets/images/unknown.jpg",
  };

  const [image, setImage] = useState([]);

  const [vis, setVis] = useState();
  function readImage(e) {
    const files = e.currentTarget.files;
    const file = files[0];
    const url = URL.createObjectURL(file);
    const data = {
      name: file.name,
      url,
      file,
    };

    setImage(data);
    getImageData(data);
    //console.log(file, " file image");
    //console.log(e.target.value, "data de evento");
    //visible ? setImage("") : "";
    //console.log(image, "afffterrr");
  }

  return (
    <>
      {console.log(image, "bbbbeforeeee")}
      <div className="imageContainer">
        <img
          className="imgBook"
          src={image.url ? image.url : imgInitial.url}
          alt={image.name || ""}
        />
      </div>
      <label className="btn-image">
        <Icon css="icon" icon={faPlus} />
        <input type="file" name="" id="img" hidden onChange={readImage} />
      </label>
    </>
  );
}

export default Image;
