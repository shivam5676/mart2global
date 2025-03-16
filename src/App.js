import { useEffect, useState } from "react";

import useWindowSize from "./customHooks/useWindowSize";
import { NavLink, Route, Routes } from "react-router-dom";

import { authRoutes } from "./routes/authRoutes";
import { useDispatch, useSelector } from "react-redux";
import { loginSliceAction } from "./store/loginSlice";

import bgImg from "./assests/blur-bg.jpg";
import Navbar from "./components/Navbar/Navbar";
import BigScreenSideBar from "./components/Sidebar/BigScreenSideBar";
import IconScreenSideBar from "./components/Sidebar/iconScreenSideBar";
import { adminRoutes } from "./routes/adminRoutes";
import { userRoutes } from "./routes/userRoutes";
function App() {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const isLoggedIn = useSelector((state) => state.loginData.loggedIn);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const dispatch = useDispatch();
  // console.log(loggedIn)
  const [smallSideBarActivated, setSmallSideBarActivated] = useState(false);
  const { width, height } = useWindowSize();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(width, height);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(loginSliceAction.login("user", true));
    }
    if (localStorage.getItem("role")) {
      setRole(localStorage.getItem("role"));
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    // setIsLoggedIn(true);
  };
  return (
    <div
      className={` w-[100vw] h-[100vh] ${
        selectedTheme === "modern reeloid" ? "bgImg" : "bg-[#222736]"
      }`}
      style={
        selectedTheme === "modern reeloid"
          ? { backgroundImage: `url(${bgImg})` }
          : undefined
      }
    >
      {isLoggedIn ? (
        <>
          {" "}
          <Navbar
            handleSmallSideBar={() => {
              setSmallSideBarActivated(!smallSideBarActivated);
            }}
            smallSideBarActivated={smallSideBarActivated}
          ></Navbar>
          <div className="flex h-[calc(100vh-70px)]">
            {width >= 992 && !smallSideBarActivated ? (
              <BigScreenSideBar />
            ) : width >= 992 && smallSideBarActivated ? (
              <IconScreenSideBar />
            ) : (
              !smallSideBarActivated && <BigScreenSideBar />
            )}

            {role == "Admin" && (
              <Routes>
                {adminRoutes.map((current) => (
                  <Route path={current.path} element={current.element}></Route>
                ))}
              </Routes>
            )}
            {role == "user" && (
              <Routes>
                {userRoutes.map((current) => (
                  <Route path={current.path} element={current.element}></Route>
                ))}
              </Routes>
            )}
          </div>
        </>
      ) : (
        <Routes>
          {authRoutes.map((current) => (
            <Route path={current.path} element={current.element} />
          ))}
        </Routes>
      )}
    </div>
  );
}

export default App;
