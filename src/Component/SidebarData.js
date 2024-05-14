import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "History",
    path: "/history",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  },
  {
    title: "Stock",
    path: "/stock",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text"
  },
  {
    title: "Finance",
    path: "/finance",
    icon: <MdIcons.MdOutlineAttachMoney />,
    cName: "nav-text"
  },
  {
    title: "About",
    path: "/about",
    icon: <AiIcons.AiFillSetting />,
    cName: "nav-text"
  }
];
