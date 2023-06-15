import Icon from "../Icon";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import Button from "../Button/Index";
import { useFormik } from "formik";
import CustomSelect from "../Select/CustomSelect";
import { addSchema } from "../.././schemas/validationSchemas/addFormSchema";
import { useState, useEffect } from "react";
import LinkButton from "../linkButton/Button";
import axios from "axios";
function Index({ getData }) {
  // const imgInitial = {
  //   name: "noBook.png",
  //   url: "../../src/assets/images/noBook.png",
  // };

  // let aux2;
  // const aux = {};
  // const imgInitial = new File([aux2], {
  //   type: "image/png",
  // });
  // aux.data = imgInitial;
  // //aux.data.size = "4139";
  // //aux.url = URL.createObjectURL(imgInitial);
  // aux.name = "noBook.png";
  // aux.url = "http://localhost:5173/src/assets/images/noBook.png";
  // const aux = {};
  // fetch("http://localhost:5173/58574787-d3e4-491b-af7d-0b69a2682a67")
  //   .then((res) => res.blob()) // Gets the response and returns it as a blob
  //   .then((blob) => {
  //     let aux2;
  //     aux2 = blob;
  //     // const aux = {};
  //     const imgInitial = new File([aux2], {
  //       type: "image/png",
  //     });
  //     aux.data = imgInitial;
  //     //aux.data.size = "4139";
  //     //aux.url = URL.createObjectURL(imgInitial);
  //     aux.name = "noBook.png";
  //     aux.url = "http://localhost:5173/src/assets/images/noBook.png";
  //     // Here's where you get access to the blob
  //     // And you can use it for whatever you want
  //     // Like calling ref().put(blob)

  //     // Here, I use it to make an image appear on the page
  //     let objectURL = URL.createObjectURL(blob);
  //   });

  //formLogic
  const [arrAuthor, setArrAuthor] = useState([
    "Stephen king",
    "John Saul",
    "Other",
  ]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [formats, setFormats] = useState([]);
  const [arrRating, setArrRating] = useState(["1", "2", "3", "4", "5"]);
  const [arrGenre, setArrGenre] = useState([
    "Horror",
    "Fantasy",
    "Suspense",
    "Comedy",
    "Thriller",
    "Mystery",
  ]);
  const [arrFormat, setArrFormat] = useState([
    "Hard Cover",
    "Paperback",
    "ebook",
  ]);

  const [image, setImage] = useState([]);
  // CustomStylesSelect

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#ffff" : "gray",
      backgroundColor: state.isSelected ? "#524e52" : "#2A272A",
      padding: "5px",
      ":hover": {
        backgroundColor: "#312d31",
        color: "white",
      },
    }),

    control: (provided, state) => ({
      ...provided,

      borderColor: "#9e9e9e",
      minHeight: "auto",
      maxHeight: "50px",
      boxShadow: state.isFocused ? null : null,
      outline: "none",
      border: "none",
      borderRadius: ".2rem",
      background: "#2a272a32",
    }),
    menu: (provided, state) => ({
      ...provided,
      background: "#2a272a32",
    }),

    singleValue: (provided, state) => ({
      ...provided,
      height: "100%",
      color: "white",
      paddingTop: "3px",
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      minHeight: "auto",
      maxHeight: "50px",
      padding: " 0px 3px",
    }),

    input: (provided, state) => ({
      ...provided,
      height: "25px",
      margin: "0px",
      color: "white",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
      height: "25px",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "25px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "white",
    }),
  };
  // sortFunctions
  function sortElements(elements) {
    if (elements.length === 0) return [];
    let elementsArray = [];
    elements.map((element) => {
      elementsArray.push(element.value);
    });
    return elementsArray;
  }

  function sortNewAuthor(string) {
    let temArray = string.split(",");
    let auxArray = [];
    temArray.map((element) => {
      auxArray.push(element.trim());
    });
    return auxArray;
  }
  // FormSubmitFunction
  function submitForm(values) {
    //console.log(values, " valores iniciales");
    let arrayAuthors = sortElements(values.author);
    let arrayGenres = sortElements(values.genre);
    if (values.newAuthor != null) {
      let arrNewAuthors = sortNewAuthor(values.newAuthor);
      let arrayFullAuthors = arrayAuthors.concat(arrNewAuthors);
      values.author = arrayFullAuthors;
    } else {
      values.author = arrayAuthors;
    }

    values.genre = arrayGenres;
    // console.log(arrayFullAuthors, "all authors");
    // console.log(arrayAuthors, " authors123");
    // console.log(arrayGenres, " genres123");
    console.log(values, "mod authors");
    values.imgData = image;
    getData(values);
    // if (image.url === undefined) {
    //   readImage();
    // }
    setImage([]);
  }

  //formik manageForm
  const formik = useFormik({
    initialValues: {
      bookName: "",
      author: "",
      newAuthor: "",
      genre: "",
      format: "",
      isbn: "",
      publisher: "",
      publicationDate: "",
      pages: "",
      rating: "",
      description: "",
    },

    validationSchema: addSchema,
    onSubmit: (values, { resetForm }) => {
      submitForm(values);
      resetForm({ values: "" });
    },
  });

  //    ImageLogics ////////////////////////////////////

  const imagedata = {};
  function readImage(e) {
    //console.log(e, " contenido e");

    const files = e.currentTarget.files;
    const file = files[0];
    console.log(file, " valor de file");
    const url = URL.createObjectURL(file);
    console.log(url, "valor de url");
    imagedata.data = file;

    imagedata.name = file.name;
    imagedata.url = url;
    setImage(imagedata);

    //console.log(file, " file image");
    //console.log(e.target.value, "data de evento");
    //visible ? setImage("") : "";
    //console.log(image, "afffterrr");
  }

  useEffect(() => {
    // let tem = {};
    // bookContext.genres.map((genre) => {
    //   tem = {
    //     label: genre,
    //     value: genre,
    //   };
    //   arrGen.push(tem);
    // });
    // setDefGenres(arrGen);
    // console.log(arrGen, "dddddddddd");
    const getAuthors = axios
      .get(
        "https://bookapp-api-production.up.railway.app/api/admin/books/authors"
      )
      .then((res) => {
        setAuthors(res.data.authors);
        // console.log(res.data.authors, "--------------------------");
      });

    axios
      .get(
        "https://bookapp-api-production.up.railway.app/api/admin/books/genres"
      )
      .then((res) => {
        setGenres(res.data.genres);
        //console.log(res.data.genres, "--------------------------");
      });

    axios
      .get(
        "https://bookapp-api-production.up.railway.app/api/admin/books/formats"
      )
      .then((res) => {
        setFormats(res.data.formats);
        //console.log(res.data.formats, "--------------------------");
      });
  }, []);

  return (
    <>
      {/* {console.log(image, " contenido image")} */}
      <div className="imageBox">
        <div className="imageContainer">
          <img className="imgBook" src={image.url} alt={image.name || ""} />
        </div>
        <label className="btn-image">
          <Icon css="icon" icon={faPlus} />
          <input type="file" name="" id="img" hidden onChange={readImage} />
        </label>
        <div className="cont-buttons">
          <LinkButton
            className=""
            name={"Cancel"}
            path={"/manage"}
            css="button"
          />
        </div>
      </div>
      <div className="formBox">
        <div className="formContainer">
          <form onSubmit={formik.handleSubmit}>
            <div className="contFields cf">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="bookName"
                onChange={formik.handleChange}
                value={formik.values.bookName}
              />
              <label htmlFor="">Author: </label>
              <CustomSelect
                onChange={(value) =>
                  formik.setFieldValue("author", value, value)
                }
                value={formik.values.author}
                isMulti={true}
                styles={customStyles}
                options={authors.map((author) => ({
                  label: author,
                  value: author,
                }))}
              />
              <input
                onChange={formik.handleChange}
                name="newAuthor"
                id="newName"
                type="text"
                placeholder="New author(s) Harry Potter, Tom Rethel..."
                value={formik.values.newAuthor}
              />
            </div>
            <div className="contFields cf">
              <label htmlFor="">Genre: </label>
              <CustomSelect
                onChange={(value) =>
                  formik.setFieldValue("genre", value, value)
                }
                value={formik.values.genre}
                isMulti={true}
                styles={customStyles}
                options={genres.map((genre) => ({
                  label: genre,
                  value: genre,
                }))}
              />
              <label htmlFor="">Format: </label>
              <CustomSelect
                onChange={(value) =>
                  formik.setFieldValue("format", value, value)
                }
                value={formik.values.format}
                styles={customStyles}
                options={formats.map((format) => ({
                  label: format,
                  value: format,
                }))}
              />
            </div>
            <div className="fields cf">
              <label
                htmlFor="isbn"
                onChange={formik.handleChange}
                name="newAuthor"
              >
                ISBN:{" "}
              </label>
              <input
                value={formik.values.isbn}
                type="text"
                id="isbn"
                onChange={formik.handleChange}
                name="isbn"
              />
              <label htmlFor="publisher">Publisher: </label>
              <input
                value={formik.values.publisher}
                type="text"
                id="publisher"
                onChange={formik.handleChange}
                name="publisher"
              />
            </div>
            <div className="fields cf">
              <label htmlFor="date">Publication date: </label>
              <input
                value={formik.values.publicationDate}
                type="date"
                id="date"
                format="dd-mm-yyyy"
                onChange={formik.handleChange}
                name="publicationDate"
              />
              <label htmlFor="pages">Pages: </label>
              <input
                value={formik.values.pages}
                type="text"
                id="pages"
                onChange={formik.handleChange}
                name="pages"
              />
            </div>
            <div className="cf">
              <label htmlFor="rating">Rating: </label>
              <CustomSelect
                onChange={(value) =>
                  formik.setFieldValue("rating", value, value)
                }
                value={formik.values.rating}
                styles={customStyles}
                options={arrRating.map((rating) => ({
                  label: rating,
                  value: rating,
                }))}
              />
            </div>
            <div className="inArea cf">
              <label htmlFor="desc">Description</label>
              <textarea
                value={formik.values.description}
                id="desc"
                cols="30"
                rows="4"
                onChange={formik.handleChange}
                name="description"
              ></textarea>
            </div>
            <div className="cont-btn-form">
              <Button type="submit" name="Save" />
              <div
                className={
                  Object.entries(formik.errors).length != 0 &&
                  formik.touched.description == true
                    ? "err-message-addForm"
                    : "hide"
                }
              >
                <p>*one or more fields are empty</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Index;
