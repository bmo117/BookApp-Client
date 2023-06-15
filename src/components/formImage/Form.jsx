import { useState } from "react";
import "./style.css";
import Select from "react-select";
import Button from "../Button/Index";
import { useFormik } from "formik";
import CustomSelect from "../Select/CustomSelect";
import { addSchema } from "../.././schemas/validationSchemas/addFormSchema";
function Form({ getFormData }) {
  const [data, setData] = useState([]);
  const [arrAuthor, setArrAuthor] = useState([
    "Stephen king",
    "John Saul",
    "Other",
  ]);
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

  const manejaCambio = (value) => {
    console.log(value);
  };
  //select styles

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

  function buildFinalObject(values, arrAuthor, arrGenre) {
    let finalObj = {};
    finalObj.author = arrAuthor;
    finalObj.genre = arrGenre;

    return finalObj;
  }

  function submitForm(values) {
    console.log(values, " valores iniciales");
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
    getFormData(values);
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
    onSubmit: submitForm,
  });

  return (
    <div className="formContainer">
      {/* {console.log(Object.entries(formik.errors).length === 0, "errors")} */}
      {console.log(formik.touched.description, "cont schema")}
      <form onSubmit={formik.handleSubmit}>
        <div className="contFields cf">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="bookName"
            onChange={formik.handleChange}
          />
          <label htmlFor="">Author: </label>
          <CustomSelect
            onChange={(value) => formik.setFieldValue("author", value, value)}
            isMulti={true}
            styles={customStyles}
            options={arrAuthor.map((author) => ({
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
          />
        </div>
        <div className="contFields cf">
          <label htmlFor="">Genre: </label>
          <CustomSelect
            onChange={(value) => formik.setFieldValue("genre", value, value)}
            isMulti={true}
            styles={customStyles}
            options={arrGenre.map((genre) => ({
              label: genre,
              value: genre,
            }))}
          />
          <label htmlFor="">Format: </label>
          <CustomSelect
            onChange={(value) => formik.setFieldValue("format", value, value)}
            styles={customStyles}
            options={arrFormat.map((format) => ({
              label: format,
              value: format,
            }))}
          />
        </div>
        <div className="fields cf">
          <label htmlFor="isbn" onChange={formik.handleChange} name="newAuthor">
            ISBN:{" "}
          </label>
          <input
            type="text"
            id="isbn"
            onChange={formik.handleChange}
            name="isbn"
          />
          <label htmlFor="publisher">Publisher: </label>
          <input
            type="text"
            id="publisher"
            onChange={formik.handleChange}
            name="publisher"
          />
        </div>
        <div className="fields cf">
          <label htmlFor="date">Publication date: </label>
          <input
            type="date"
            id="date"
            format="dd-mm-yyyy"
            onChange={formik.handleChange}
            name="publicationDate"
          />
          <label htmlFor="pages">Pages: </label>
          <input
            type="text"
            id="pages"
            onChange={formik.handleChange}
            name="pages"
          />
        </div>
        <div className="cf">
          <label htmlFor="rating">Rating: </label>
          <input
            type="text"
            id="rating"
            onChange={formik.handleChange}
            name="rating"
          />
        </div>
        <div className="inArea cf">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            cols="30"
            rows="5"
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
  );
}

export default Form;
