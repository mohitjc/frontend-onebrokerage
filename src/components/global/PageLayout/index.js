import React, { useEffect, useState, Fragment } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import permissionModel from "../../../models/permisstion.model";
import ApiClient from "../../../methods/api/apiClient";
import { Menu, Transition } from "@headlessui/react";
import methodModel from "../../../methods/methods";
import { FaFacebookF } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import { FaGithub } from "react-icons/fa6";
import { FaDribbble } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { login_success, logout } from "../../../Pages/actions/user";
import Header from "../header2";
import Footers from "../footer";
import Sidebar from "../sidebar";

const PageLayout = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useNavigate();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // useEffect(() => {
  //   if (!user.loggedIn) {
  //   } else {
  //     let permissions = user.roleDetail?.permissions?.[0];
  //     if (!permissionModel.urlAllow(permissions)) {
  //       // history("/profile")
  //     }
  //     let browseload = localStorage.getItem("browseload");
  //     if (!browseload) {
  //       ApiClient.get("api/user/detail", { id: user._id }).then(async (res) => {
  //         if (res.success) {
  //           let data = { ...user, ...res.data };
  //           dispatch(login_success(data));
  //         }
  //       });
  //     }
  //   }
  // }, []);

  const menus = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/" },
    { name: "Market", url: "/" },
    { name: "About", url: "/" },
  ];

  const Logout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    history("/login");
  };

  return (
    <>
      <div component="page-layout">
       <Header/>
       <div component="page-layout" className="xl:container mx-auto">
       <div className="grid grid-cols-12 gap-4 xl:gap-8 px-6 py-4 lg:py-16 lg:px-16">
          <div className="sidebars_data shrink-0 col-span-12 md:col-span-4 lg:col-span-3 2xl:col-span-3 border border-gray-200 rounded-xl shadow-md">
              <div className="w-full">
                  <Sidebar  />
              </div>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-9 2xl:col-span-9">
            {children}
            </div>
       </div>

       </div>

      {/* <Footers/> */}
      </div>
    </>
  );
};
export default PageLayout;
