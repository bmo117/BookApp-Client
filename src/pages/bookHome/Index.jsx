import { Link } from "react-router-dom";
import Button from "../../components/linkButton/Button";
import moon from "../../assets/images/moon.jpg";
import GHOST from "../../assets/images/GHOST.jpeg";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/validationSchemas/loginFormSchema.js";
import { useNavigate } from "react-router-dom";
import { User } from "../../context/User";
import CredentialExample from "../../components/credentialExample/CredentialExample";
import "./style.css";
function Index() {
  const { userName, setUserName, id, setId, userRole, setUserRole } =
    useContext(User);

  const [BookHomePage, setBookHomePage] = useState([]);
  useEffect(() => {
    axios
      .get("https://bookapp-api-production.up.railway.app/api/admin/books/5")
      .then((res) => {
        setBookHomePage(res.data);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      submitForm(values);
      resetForm({ values: "" });
    },
  });

  function submitForm(values) {
    const obj = {};
    //console.log(values, "-----------------");
    obj.email = values.email;
    obj.password = values.password.trim();
    //console.log(obj, "================");
    // const res = axios.post("http://localhost:3001/api/v1/users/login", obj);
    // const s = axios.get("http://localhost:3001/api/v1/users/profile");
    //console.log(s.data.userId, "data de profile en login ??????????");
    // setId(s.data.userId);
    // setUserName(s.data.userName);
    // setUserRole(s.data.role);
    // navigate("/manage");
    aux(obj);
  }

  async function aux(obj) {
    const res = await axios.post(
      "https://bookapp-api-production.up.railway.app/api/v1/users/login",
      obj
    );
    //
    console.log(res, "data res en login =======");
    const s = await axios.get(
      "https://bookapp-api-production.up.railway.app/api/v1/users/profile"
    );
    console.log(s.data.userId, "data de profile en login ??????????");
    console.log(s.data.role, "data de profile en login ??????????");
    setId(s.data.userId);
    setUserName(s.data.userName);
    setUserRole(s.data.role);
    if (s.data.role === "admin") {
      navigate("/manage");
    } else {
      navigate("/user/home");
    }
  }

  const navigate = useNavigate();
  return (
    <div className="contbgHomePage">
      <div className="contComponent">
        <div className="compLogo">
          <img src={moon} alt="" />
          <p>BookApp</p>
        </div>
        <div className="compLogIN">
          <div className="userLoginImage">
            <div className="imgbookLog">
              <img src={GHOST} alt="" />
            </div>
          </div>
          <div className={"LoginForm"}>
            <form onSubmit={formik.handleSubmit}>
              <div
                className={
                  "contLogInFields " +
                  (formik.errors.email && formik.touched.email ? " wrong" : "")
                }
              >
                <label htmlFor="">E-mail</label>
                <input
                  type="text"
                  onChange={formik.handleChange}
                  name="email"
                  value={formik.values.email}
                />
              </div>
              <div
                className={
                  "contLogInFields " +
                  (formik.errors.password && formik.touched.password
                    ? " wrong"
                    : "")
                }
              >
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  onChange={formik.handleChange}
                  name="password"
                  value={formik.values.password}
                />
              </div>
              <div className="contLogInFields">
                <button type="submit">Sing in</button>
              </div>
            </form>
          </div>
          <div className="contLinkRegister">
            <a href="/register">Dont have an account?</a>
          </div>
        </div>
        <div className="componentCredential">
          <CredentialExample />
        </div>
        <div className="compBooArea">
          <div className="ComBooks">
            {BookHomePage.map((book) => (
              <div className="cardHomePage" key={book.book.name}>
                <div className="cardHomePageImageArea">
                  <div className="cardHomePageImage">
                    <img
                      className="imageBookHomePage"
                      src={
                        "https://bookapp-api-production.up.railway.app/public/" +
                        book.book.dataImage.name
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="cardHomePageTitle">
                  <div className="boxTitle">{book.book.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="contBtnLOGIN">
          <Button name={"Login2"} path={"/login"} css="" />
        </div> */}
      </div>
    </div>
  );
}

export default Index;
