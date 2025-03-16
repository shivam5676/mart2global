import React, { useEffect, useRef, useState } from "react";
// import iosLogo from "../assests/IOS-Logo-white.png";
// import logo from "../assests/logo.png"
import logoIcon from "../../assests/mobile.png";
import logo from "../../assests/reeloid-logo.png";

import { CgMenu } from "react-icons/cg";
import { FiSend } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import useWindowSize from "./../../customHooks/useWindowSize";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import {
  MenuItem,
  Select,
  Avatar,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useTranslation } from "react-i18next";
const Navbar = (props) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  console.log(t("your_translation_key"));
  const smallSideBArActivated = props.smallSideBarActivated;
  // console.log(props.smallSideBarActivated)
  const { width, height } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "en"
  );
  const changeLanguage = (event) => {
    const newLang = event.target.value;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };
  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // console.log(width,height)

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  return (
    <div className="bg-white w-[100vw] h-[70px] flex">
      {!smallSideBArActivated && width >= 992 ? (
        <div
          className={`flex flex-shrink-0 w-[240px]  text-black  h-[100%] items-center justify-center font-bold text-2xl`}
        >
          {/* <img src={logo} className="mt-3 w-[150px] h-[75%]"></img> */}
          <span className="text-blue-500">{t("Dash")}</span>
          <span className="text-black">{t("Stack")}</span>
        </div>
      ) : (
        <div className="flex flex-shrink-0 w-[70px]  text-black h-[100%] items-center justify-center text-2xl font-bold">
          <span className="text-blue-500">D</span>
          <span className="text-black">S</span>
        </div>
      )}
      <div className="h-[100%] w-[100%] flex items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <CgMenu
            className="h-[28px] w-[28px] text-black cursor-pointer"
            onClick={props.handleSmallSideBar}
          />
          {width >= 550 ? (
            <div className="px-2 rounded-xl flex items-center bg-gray-200 border min-w-[100px] max-w-[350px]">
              <IoSearch className="h-[20px] w-[20px] mx-2 text-gray-600" />
              <input
                placeholder="Search"
                className="bg-transparent outline-none h-[30px] w-full text-black"
              />
            </div>
          ) : (
            <IoSearch className="h-[20px] w-[20px] mx-2 text-black" />
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Notification Bell */}
          <IconButton>
            <Badge badgeContent={6} color="error">
              <NotificationsIcon sx={{ color: "#2979FF", fontSize: 24 }} />
            </Badge>
          </IconButton>

          {/* Language Selector */}
          {width >= 698 && (
            <Box display="flex" alignItems="center" gap={1}>
              <img
                src="https://flagcdn.com/w40/gb.png"
                alt="UK Flag"
                style={{ width: 24, height: 16, borderRadius: 2 }}
              />
              <Select
                value={language}
                onChange={changeLanguage}
                variant="standard"
                disableUnderline
                sx={{ fontSize: 14 }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hi">हिन्दी</MenuItem>
                <MenuItem value="es">Español</MenuItem>
              </Select>
            </Box>
          )}

          {/* User Profile */}
          <Box display="flex" alignItems="center" gap={1} ref={dropdownRef}>
            <Avatar
              src="https://i.pravatar.cc/40?img=5"
              alt="User"
              sx={{ width: 32, height: 32 }}
            />
            {width >= 698 && (
              <Box>
                <Typography fontSize={14} fontWeight="bold">
                  {t("Shivam Singh")}{" "}
                </Typography>
                <Typography fontSize={12} color="gray">
                  Admin
                </Typography>
              </Box>
            )}
            <IconButton size="small" onClick={() => setIsOpen(!isOpen)}>
              <ArrowDropDownIcon />
            </IconButton>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
