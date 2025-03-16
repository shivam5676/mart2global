import { current } from "@reduxjs/toolkit";
import React, { useRef, useState } from "react";
import { BiSolidCameraMovie, BiSolidCheckboxChecked } from "react-icons/bi";
import { CiSliderVertical } from "react-icons/ci";
import { FaAffiliatetheme } from "react-icons/fa6";
import { GrUserSettings, GrVmMaintenance } from "react-icons/gr";
import { HiOutlineHome } from "react-icons/hi";
import { IoMdAnalytics } from "react-icons/io";
import { IoLanguage, IoLogOutOutline } from "react-icons/io5";
import {
  MdOutlineMovie,
  MdOutlineNotificationAdd,
  MdOutlineSubscriptions,
} from "react-icons/md";
import { RiAdminLine, RiAdvertisementFill } from "react-icons/ri";
import { SiWebflow } from "react-icons/si";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSliceAction } from "../../store/loginSlice";
import { AiOutlineDashboard, AiOutlineProduct } from "react-icons/ai";

const IconScreenSideBar = () => {
  const dispatch = useDispatch();
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const menuRefs = useRef([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const item = ["menu item", "close item"];
  const [position, setPosition] = useState(null);
  const navigate = useNavigate("");
  const handleMouseEnter = (index) => {
    setHoveredItem(index);
    const rect = menuRefs.current[index].getBoundingClientRect(); // Get position of hovered div
    setPosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  };
  console.log(position);
  const menuItems = [
    {
      title: "Dashboard",
      icon: (
        <AiOutlineDashboard className="h-[20px] w-[20px] text-black group-hover:text-blue-500" />
      ),
      subItems: [{ name: "Dashboard", navigateTo: "/" }],
    },
    {
      title: "Products",
      icon: (
        <AiOutlineProduct className="h-[20px] w-[20px] text-black group-hover:text-blue-500" />
      ),
      subItems: [{ name: "Products", navigateTo: "/products" }],
    },
    // Add more items as needed AiOutlineProduct
  ];

  return (
    <div
      className={`w-[70px] h-[100%]  z-[100000]  pt-4 flex flex-col flex-shrink-0 items-center overflow-y-scroll customScrollbar bg-white`}
    >
      {menuItems?.map((item, index) => (
        <div
          key={index}
          ref={(el) => (menuRefs.current[index] = el)}
          className="text-black  w-full cursor-pointer flex items-center p-2 ps-3 relative group "
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="flex justify-center w-[40px] h-[40px]  rounded-full  items-center text-white font-semibold shadow-[-2px_-2px_5px_rgba(255,_255,_255,_0.8),_5px_5px_5px_rgba(0,_0,_0,_0.25)] transition-all group-hover:shadow-[-1px_-1px_5px_rgba(96,_165,_250,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(96,_165,_250,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)] hover:text-blue-400">
            {item.icon}
          </div>
          {hoveredItem === index && (
            <div
              className="fixed bg-white text-black hover:text-blue-500 px-8 py-2 shadow-lg w-[200px] "
              style={{ top: position.top, left: "66px" }} // Ensure the first item aligns with the icon
            >
              {item.subItems.map((subItem, subIndex) => (
                <p
                  key={subIndex}
                  className="text-[1rem] h-[40px] font-semibold flex items-center"
                  onClick={() => {
                    console.log(subItem);
                    if (subItem.fn) {
                      console.log(subItem.navigateTo, "hello");
                      subItem.fn();
                    }
                    navigate(subItem.navigateTo);
                  }}
                >
                  {subItem.name}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default IconScreenSideBar;
