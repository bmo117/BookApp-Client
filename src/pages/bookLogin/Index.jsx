import Button from "../../components/linkButton/Button";
import "./style.css";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas/validationSchemas/registerFormSchema.js";
import axios from "axios";
import { useContext } from "react";
import { User } from "../../context/User";
import { useNavigate } from "react-router-dom";

function Index() {
  const { userName, setUserName, id, setId, userRole, setUserRole } =
    useContext(User);
  //submit manageForm
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },

    validationSchema: registerSchema,
    onSubmit: (values, { resetForm }) => {
      submitForm(values);
      resetForm({ values: "" });
    },
  });
  // onSubmit={formik.handleSubmit}
  function submitForm(values) {
    const obj = {};
    console.log(values, "-----------------");
    obj.name = values.name.trim();
    obj.lastName = values.lastName.trim();
    obj.email = values.email;
    obj.password = values.password.trim();
    console.log(obj, "================");
    //axios.post("http://localhost:3001/api/v1/users/register", obj);
    aux(obj);
  }

  async function aux(obj) {
    const res = await axios.post(
      "https://bookapp-api-production.up.railway.app/api/v1/users/register",
      obj
    );
    //
    const s = await axios.get(
      "https://bookapp-api-production.up.railway.app/api/v1/users/profile"
    );
    console.log(s.data.userId, "data de profile en register ??????????");
    setId(s.data.userId);
    setUserName(s.data.userName);
    setUserRole(s.data.role);
    navigate("/user/home");
  }

  console.log(formik.errors.name, "++++++++++++++");
  const navigate = useNavigate();
  return (
    <div className="bgRegister">
      {console.log(Object.entries(formik.errors))}
      <div className="contFormRegister">
        <form onSubmit={formik.handleSubmit}>
          <div className="contFormRegisterTitle">
            <p>Register</p>
          </div>
          <div
            className={
              "contFormRegisterFields" +
              (formik.errors.name && formik.touched.name ? " wrong" : "")
            }
          >
            <label htmlFor="">Name</label>
            <input
              type="text"
              onChange={formik.handleChange}
              name="name"
              value={formik.values.name}
            />
          </div>
          <div
            className={
              "contFormRegisterFields " +
              (formik.errors.lastName && formik.touched.lastName
                ? " wrong"
                : "")
            }
          >
            <label htmlFor="">Last_name</label>
            <input
              type="text"
              onChange={formik.handleChange}
              name="lastName"
              value={formik.values.lastName}
            />
          </div>
          <div
            className={
              "contFormRegisterFields " +
              (formik.errors.email && formik.touched.email ? " wrong" : "")
            }
          >
            <label htmlFor="">email</label>
            <input
              type="text"
              onChange={formik.handleChange}
              name="email"
              value={formik.values.email}
            />
          </div>
          <div
            className={
              "contFormRegisterFields " +
              (formik.errors.password && formik.touched.password
                ? " wrong"
                : "")
            }
          >
            <label htmlFor="">password</label>
            <input
              type="text"
              onChange={formik.handleChange}
              name="password"
              value={formik.values.password}
            />
          </div>
          <div className="contFormRegisterFields">
            <button type="submit">Register</button>
          </div>
          <div className="contFormRegisterLink">
            <a href="/">Already register?</a>
          </div>
          {/* <div
            className={
              Object.entries(formik.errors).length != 0
                ? "err-message-addForm"
                : "hide"
            }
          >
            <p>*one or more fields are empty</p>
          </div> */}
        </form>
      </div>
      {/* <Button name={"manage"} path={"/manage"} css="button" /> */}
    </div>
  );
}

export default Index;
