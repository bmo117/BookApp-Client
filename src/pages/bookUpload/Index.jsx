import "./style.css";
import { useState, useEffect } from "react";
import Form from "../../components/formImage/Form";
import Image from "../../components/formImage/Image";
import LinkButton from "../../components/linkButton/Button";
import Button from "../../components/Button/Index";
import axios from "axios";
import FullForm from "../../components/formImage/Index";

function Index() {
  const [formData, setFormData] = useState([]);
  const [visible, setVisible] = useState([]);
  const [imageData, setImageData] = useState([]);
  const arrDataBook = [];
  let obj = {};
  const upload = async (obj, imgData) => {
    const formData = new FormData();
    console.log(obj, "cont final obj");
    console.log(imgData, "cont final img");
    // console.log(obj.file, " obj file");
    // console.log(obj.bookName, " obj book name");
    formData.append("imageFile", imgData);
    formData.append("data", JSON.stringify(obj));
    //console.log(formData, "contenido fromData ");

    let res = axios.post(
      "https://bookapp-api-production.up.railway.app/api/admin/books",
      formData
    );
    //setVisible();
  };

  function getImageData(data) {
    obj.imageBookName = data.name;
    obj.url = data.url;
    obj.file = data.file;
    console.log(data, " file en index");
  }

  function getData(data) {
    console.log(data, " data de values en el padre");
    // obj.bookName = data.bookName;
    // obj.author = data.author;
    //obj = Object.assign(obj, data);
    obj.bookName = data.bookName;
    obj.author = data.author;
    obj.genres = data.genre;
    obj.format = data.format.value;
    obj.isbn = data.isbn;
    obj.publisher = data.publisher;
    obj.publicationDate = data.publicationDate;
    obj.pages = data.pages;
    obj.rating = data.rating.value;
    obj.description = data.description;
    console.log(data.imgData.data, "data image ^^^^^");
    let dataImage;
    if (data.imgData.data != undefined) {
      dataImage = data.imgData.data;
    } else {
      //dataImage = data.imgData[0].data;
      dataImage = [];
    }
    upload(obj, dataImage);
    setFormData(obj);
  }

  function resetImage() {
    let reset = true;
    resetImage();
  }
  return (
    <div className="buContainerG">
      {/* {console.log(JSON.stringify(formData), "@@@")}
      {console.log(formData, "sssss")} */}
      <div className="buContainer">
        <FullForm getData={getData} />
      </div>
    </div>
  );
}

export default Index;
