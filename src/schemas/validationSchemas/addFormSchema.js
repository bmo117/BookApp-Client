import * as yup from "yup";

export const addSchema = yup.object().shape({
  bookName: yup.string().required("name required"),
  author: "",
  newAuthor: yup.string().when("author", (author, schema) => {
    if (author == "") return schema.required("author is required");
    return schema;
  }),
  genre: yup.array().required("genre required"),
  format: yup.object().required("format required"),
  isbn: yup.string().required("isbn required"),
  publisher: yup.string().required("publisher required"),
  publicationDate: yup.string().required("publication date required"),
  pages: yup.number().integer().required("pages required"),
  rating: yup.object().required("rating required"),
  description: yup.string().required("description required"),
});
