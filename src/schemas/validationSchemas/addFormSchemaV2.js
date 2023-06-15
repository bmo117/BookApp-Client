import * as yup from "yup";

export const addSchema = yup.object().shape({
  bookName: yup.string().required("name required"),
  author: yup.array().required("author required"),
  newAuthor: yup.string().when("author", (author, schema) => {
    if (author[0][0] === undefined)
      return schema.required("author is required");
    return schema;
  }),
  genre: yup.array().min(1, "at least one genre").required("genre required"),
  format: yup.object().required("format required"),
  isbn: yup.string().required("isbn required"),
  publisher: yup.string().required("publisher required"),
  publicationDate: yup.string().required("publication date required"),
  pages: yup.number().integer().required("pages required"),
  rating: yup.object().required("rating required"),
  description: yup.string().required("description required"),
});
