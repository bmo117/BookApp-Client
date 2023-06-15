import { useState, useContext } from "react";
import "./App.css";
import { UserProvider } from "./context/User";
import { MenuProvider } from "./context/MenuContext";
import BookManage from "./pages/bookManage/Index";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/bookHome/Index";
import Login from "./pages/bookLogin/Index";
import BookRegister from "./pages/bookUpload/Index";
import Manage from "./pages/bookManage/Index";
import BookEdit from "./pages/bookEdit/Index";
import BookContext from "./context/BookContext";
import BookUserHome from "./pages/bookHomeUser/Index";
import { ProtectedRoute } from "./components/ProtectedComponent";
//import Routes from "./components/routes/Routes";
//import { Routes } from "./components/routes/Routes";
import axios from "axios";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/manage",
    element: <Manage />,
  },
  {
    path: "/manage/bookRegister",
    element: <BookRegister />,
  },
  {
    path: "/manage/bookEdit",
    element: <BookEdit />,
  },
]);

function App() {
  //const [count, setCount] = useState(0);
  axios.defaults.withCredentials = true;
  return (
    <UserProvider>
      <BrowserRouter>
        <BookContext>
          <MenuProvider>
            <Routes>
              <Route path="*" element={<h1>Not Found</h1>} />
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/manage" element={<Manage />} />
              </Route>

              <Route path="/manage/bookRegister" element={<BookRegister />} />
              <Route path="/manage/bookEdit" element={<BookEdit />} />
              <Route
                path="/user/Home"
                element={
                  <ProtectedRoute>
                    <BookUserHome />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </MenuProvider>
        </BookContext>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
