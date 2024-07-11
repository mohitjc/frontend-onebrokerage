import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Html from "./Html";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Pages/actions/user";
import socketModel from "../../../models/socketModel";

const Header = ({ setIsOpen, isOpen }) => {
  const user = useSelector((state) => state.user);
  const toggle = () => {
    setIsOpen(!isOpen);
    localStorage.setItem("sidebar", !isOpen);
  };
  const [isOpen1, setIsOpen1] = useState(false);
  let messagecount = localStorage.getItem("unreadMessages") || 0;
  const [messageCount, setUnreadMessagesCount] = useState(messagecount);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const history = useNavigate();
  const dispatch = useDispatch();

  const searchState = { data: "" };

  const Logout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:admin-app");
    localStorage.removeItem("token");
    // localStorage.removeItem("loginTime")
    history("/login");
    socketModel.emit("user-offline", { user_id: user?._id });
  };

  // logout after 1 day
  function autoLogout() {
    const oneDayInMillis = 24 * 60 * 60 * 1000; // One day in milliseconds
    const currentTime = new Date().getTime();

    if (user?.lastLogin) {
      const lastLoginTime = new Date(user?.lastLogin).getTime();
      const timeDifference = currentTime - lastLoginTime;

      if (timeDifference >= oneDayInMillis) {
        console.log("Logging out user...");
        Logout();
      }
    } else {
      // No last login time found, assuming user is logging in for the first time
      console.log("Logging in user for the first time...");
    }
  }

  useEffect(() => {
    autoLogout();
  }, []);

  useEffect(() => {
    let notify = sessionStorage.getItem("notify-message");
    if (!notify) {
      console.log("notify", notify);
      socketModel.emit("notify-message", { user_id: user?._id });
    }

    socketModel.on("notify-message", (data) => {
      let count = data.data.unread_count;
      localStorage.setItem("unreadMessages", count);
      setUnreadMessagesCount(data.data.unread_count);
    });
    sessionStorage.setItem("notify-message", "true");
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    // if (searchState.data) {
    //   dispatch(search_success(''))
    // }
  }, []);

  useEffect(() => {
    setSearch(searchState.data);
  }, [searchState]);

  const [search, setSearch] = useState("");

  const searchHandle = (e) => {
    e.preventDefault();
    // dispatch(search_success(search))
  };

  const searchChange = (e) => {
    setSearch(e);
    if (!e) {
      // dispatch(search_success(''))
    }
  };

  const clear = () => {
    setSearch("");
    // dispatch(search_success(''))
  };

  return (
    <Html
      isOpen={isOpen}
      toggle={toggle}
      searchHandle={searchHandle}
      search={search}
      user={user}
      searchChange={searchChange}
      isOpen1={isOpen1}
      clear={clear}
      Logout={Logout}
      messageCount={messageCount}
    />
  );
};

export default Header;
