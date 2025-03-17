import React, { useState } from "react";

import useWindowSize from "../../customHooks/useWindowSize";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginSliceAction } from "../../store/loginSlice";
import { Logout, LogoutOutlined } from "@mui/icons-material";
import {
  AiFillNotification,
  AiOutlineDashboard,
  AiOutlineProduct,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";

const BigScreenSideBar = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [currentMenuOpen, setCurrentMEnuOpen] = useState(null);
  console.log(currentMenuOpen);
  const currentMenuHandler = (value) => {
    setCurrentMEnuOpen(value);
  };
  const userType = localStorage.getItem("role");
  return (
    <div
      className={`w-[200px] z-[10000]  bg-white h-[calc(100vh-70px)] pt-4  overflow-y-auto customScrollbar ${
        width < 992 ? "absolute flex flex-col" : "flex flex-shrink-0 flex-col"
      }`}
    >
      <div className={`text-black hover:text-white group cursor-pointer ${
            (activeLink != "/products" || userType == "user") &&
            "border-l-8 border-blue-500"
          }`}>
        <div
          className={`mx-4 h-[50px] flex items-center group-hover:bg-blue-500 rounded px-2 ${
            (activeLink != "/products" || userType == "user") &&
            "bg-blue-500 text-white"
          }`}
          onClick={() => {
            navigate("/");
            setActiveLink("/");
          }}
        >
          <AiOutlineDashboard className="h-[20px] w-[20px]" />
          <p className="text-[.9rem] px-4 font-semibold">{t("Dashboard")}</p>
        </div>
      </div>
      <div className={`text-black hover:text-white group cursor-pointer ${
            (activeLink == "/products" &&
              userType == "Admin" ) &&
            "border-l-8 border-blue-500"
          }`}>
        <div
          className={`mx-4 h-[50px] flex items-center group-hover:bg-blue-500 rounded px-2  ${
            activeLink == "/products" &&
            userType == "Admin" &&
            "bg-blue-500 text-white"
          }`}
          onClick={() => {
            navigate("/products");
            setActiveLink("/products");
          }}
        >
          <AiOutlineProduct className="h-[20px] w-[20px]" />
          <p className="text-[.9rem] px-4 font-semibold">{t("Products")}</p>
        </div>
      </div>
      <div className={`text-black hover:text-white group cursor-pointer`}>
        <div
          className="mx-4 h-[50px] flex items-center group-hover:bg-blue-500 rounded px-2"
          onClick={() => {
            localStorage.removeItem("user");
            dispatch(loginSliceAction.logOut());
          }}
        >
          <LogoutOutlined className="h-[20px] w-[20px]" />
          <p className="text-[.9rem] px-4 font-semibold">{t("Logout")}</p>
        </div>
      </div>
    </div>
  );
};

export default BigScreenSideBar;
