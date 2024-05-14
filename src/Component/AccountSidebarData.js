import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const AccountSidebarData = [
  {
    title: "Profile",
    path: "/account",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Email",
    path: "/account/email",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  },
  {
    title: "Settings",
    path: "/account/settings",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text"
  }
];
