import { React, useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import styles from "./index.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "antd";
import { RiHome6Line, RiUserSettingsLine } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { TbCategoryPlus } from "react-icons/tb";
import { BiCartAdd } from "react-icons/bi";
import { PiBellSimpleLight, PiNewspaper } from "react-icons/pi";
import { GrUserSettings } from "react-icons/gr";
import { VscSymbolMisc } from "react-icons/vsc";
import { GoFileMedia } from "react-icons/go";
import { TfiLayoutMediaCenterAlt } from "react-icons/tfi";

import {
  MdContentPaste,
  MdOutlineGroups,
  MdOutlineMarkEmailRead,
  MdOutlineOndemandVideo,
  MdOutlineAudioFile,
  MdOutlineChat,
} from "react-icons/md";

import { LuUser2 } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { LiaHistorySolid, LiaUserTagSolid } from "react-icons/lia";
import environment from "../../../environment";
import ApiClient from "../../../methods/api/apiClient";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { FiGift, FiSettings, FiUsers } from "react-icons/fi";
import { FaBlog, FaQuestion } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsCartCheck } from "react-icons/bs";

const Html = ({ ListItemLink, tabclass, isAllow, route, isOpen, user }) => {
  const [activeplan, setActiveplan] = useState();
  const role = user?.customerRole?.name === "Group Leader";
  const getactivePlan = () => {
    let filter = {};
    if (user?.subRole?.id == environment.SubRolePartner) {
      filter = { id: user.id || user?._id };
    } else {
      filter = {};
    }
    ApiClient.get("api/getMyPlan", filter).then((res) => {
      if (res.success) {
        setActiveplan(res?.data);
      }
    });
  };

  const location = useLocation();
  useEffect(() => {
    if (user?.customerRole?.name === "Group Leader") {
      getactivePlan();
    }
  }, []);

  const menus = [
    {
      name: "Main Menu",
    },
    {
      name: "Dashboard",
      icon: <RiHome6Line className="text-[#fff] shrink-0 text-lg" />,
      url: "/dashboard",
      key: "readDashboard",
    },
    // {
    //   name: "Chats",
    //   icon: <MdOutlineChat className="text-[#fff] shrink-0 text-lg" />,
    //   url: "/chat",
    //   key: "",
    // },
    {
      name: "Onboarding Questions",
      icon: <RiUserSettingsLine className="text-[#fff] shrink-0 text-lg" />,
      url: "/question",
      key: "readonboardingQuestions",
    },
    {
      name: "Staff",
      icon: <FiUsers className="text-[#fff] shrink-0 text-lg" />,
      url: "/user",
      key: "readstaff",
    },
    {
      name: "Groove Group",
      icon: <MdOutlineGroups className="text-[#fff] shrink-0 text-lg" />,
      url: "/customers",
      key: "readgrooveGroup",
    },
    // {
    //   name: "Roles",
    //   icon: <GrUserSettings className="text-[#fff] shrink-0 text-lg" />,
    //   url: "/roles",
    //   key: "",
    // },
    {
      name: "Categories",
      icon: <TbCategoryPlus className="text-[#fff] shrink-0 text-lg" />,
      url: "/category",
      key: "readCategories",
    },
    {
      name: "Products",
      icon: <BiCartAdd className="text-[#fff] shrink-0 text-lg" />,
      url: "/product",
      key: "readProducts",
    },
    {
      name: "Tags",
      icon: <LiaUserTagSolid className="text-[#fff] shrink-0 text-lg" />,
      url: "/tag",
      key: "readTags",
    },
    {
      name: "Blogs",
      icon: (
        <TfiLayoutMediaCenterAlt className="text-[#fff] shrink-0 text-lg" />
      ),
      url: "/blog",
      key: "readBlogs",
    },
    {
      name: "Messages",
      icon: <PiBellSimpleLight className="text-[#fff] shrink-0 text-lg" />,
      url: "/notifications",
      key: "",
    },
    {
      name: "Orders Management",
      icon: <BsCartCheck className="text-[#fff] shrink-0 text-lg" />,
      url: "/orders",
      key: "readorders",
    },
    {
      name: "Reward Points",
      icon: <FiGift className="text-[#fff] shrink-0 text-lg" />,
      url: "/rewardpoints",
      key: "rewardpoints",
    },
    {
      name: "Content Library",
      icon: <GoFileMedia className="text-[#fff] shrink-0 text-lg" />,
      url: "/content-library",
      key: "readVideos",
      tab: "content-library",
      menu: [
        {
          name: "Videos",
          icon: (
            <MdOutlineOndemandVideo className="text-[#fff] shrink-0 text-lg" />
          ),
          url: "/videos",
          key: "readVideos",
        },
        {
          name: "Audio",
          icon: <MdOutlineAudioFile className="text-[#fff] shrink-0 text-lg" />,
          url: "/audio",
          key: "readAudio",
        },
      ],
    },
    {
      name: "Content Management",
      icon: <MdContentPaste className="text-[#fff] shrink-0 text-lg" />,
      url: "/content-management",
      tab: "content-management",
      menu: [
        {
          name: "FAQ",
          icon: <FaQuestion className="text-[#fff] shrink-0 text-lg" />,
          url: "/faq",
          key: "readFAQ",
        },
        {
          name: "Content",
          icon: <MdContentPaste className="text-[#fff] shrink-0 text-lg" />,
          url: "/content",
          key: "readContent",
        },
        {
          name: "Newsletter",
          icon: <PiNewspaper className="text-[#fff] shrink-0 text-lg" />,
          url: "/newsletter",
          key: "readNewsletter",
        },
        {
          name: "Subscribers",
          icon: (
            <MdOutlineMarkEmailRead className="text-[#fff] shrink-0 text-lg" />
          ),
          url: "/subscribers",
          key: "readSubscribers",
        },
      ],
    },
    {
      name: "Settings",
      icon: <FiSettings className="text-[#fff] shrink-0 text-lg" />,
      url: "/profile/settings",
      key: "settings",
    },
  ];

  return (
    <>
      <div
        className={`px-[8px] ${isOpen && styles.sm_sidebar}`}
        component="siderbar"
      >
        <ul className="space-y-2 px-2">
          {menus.map((itm) => {
            return (
              <>
                {itm.icon ? (
                  <>
                    <li>
                      {itm.menu ? (
                        <>
                          {isAllow(
                            itm.menu.map((itm) => itm.key).toString()
                          ) ? (
                            <>
                              <Disclosure
                                as="div"
                                defaultOpen={tabclass(itm.tab)}
                              >
                                {({ open }) => (
                                  <>
                                    <tooltip placement="right" title={itm.name}>
                                      <Disclosure.Button className="w-full p-2.5 rounded-md flex items-center justify-between text-[#fff]  hover:!text-[#fff] gap-[12px] hover:bg-[#EB6A59] transition-all duration-300">
                                        <span className="text-sm font-normal text-inherit flex items-center gap-[12px] crm">
                                          {itm.icon}
                                          <span className=" text-inherit leading-none sidebar_text">
                                            {itm.name}
                                          </span>
                                        </span>
                                        <TiArrowSortedDown
                                          className={`${
                                            open ? "" : "-rotate-90 transform"
                                          } h-4 w-4 transition-all duration-500  text-[#fff]`}
                                        />
                                      </Disclosure.Button>
                                    </tooltip>
                                    <Transition
                                      enter="transition duration-300 ease-in-out"
                                      enterFrom="transform scale-95 opacity-0"
                                      enterTo="transform scale-300 opacity-300"
                                      leave="transition duration-300 ease-in-out"
                                      leaveFrom="transform scale-300 opacity-300"
                                      leaveTo="transform scale-95 opacity-0"
                                    >
                                      <Disclosure.Panel className="pl-[30px] mt-[4px] ">
                                        <ul className="space-y-2">
                                          {itm.menu?.map((sitm) => {
                                            return (
                                              <>
                                                {isAllow(sitm.key) ? (
                                                  <li>
                                                    {" "}
                                                    <NavLink
                                                      className={(isActive) =>
                                                        "p-2.5 rounded-md block text-sm font-normal text-[#d6d6d6] hover:text-[#fff] cursor-pointer  hover:bg-[#EB6A59] !no-underline transition-all " +
                                                        (location?.pathname ==
                                                          sitm.url &&
                                                          " !text-[#fff] !font-medium")
                                                      }
                                                      to={sitm.url}
                                                    >
                                                      <span
                                                        className="text-inherit leading-none sidebar_text"
                                                        title={sitm.name}
                                                      >
                                                        {sitm.name}
                                                      </span>
                                                    </NavLink>
                                                  </li>
                                                ) : null}
                                              </>
                                            );
                                          })}
                                        </ul>
                                      </Disclosure.Panel>
                                    </Transition>
                                  </>
                                )}
                              </Disclosure>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <>
                          {isAllow(itm.key) ? (
                            <>
                              <tooltip
                                placement="top"
                                color="#EB6A59"
                                title={itm.name}
                              >
                                <NavLink
                                  to={itm.url}
                                  className={(isActive) =>
                                    "p-2.5 rounded-md flex items-center gap-[12px] text-sm font-normal text-[#fff] hover:!text-[#fff] hover:bg-[#EB6A59] !no-underline transition-all " +
                                    (location?.pathname == itm.url &&
                                      " !text-[#fff] !bg-[#EB6A59] !font-medium")
                                  }
                                >
                                  {itm.icon}
                                  <span className="text-inherit leading-none sidebar_text">
                                    {itm.name}
                                  </span>
                                </NavLink>
                              </tooltip>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <h6
                        className={`${
                          isOpen
                            ? "py-[12px] text-center"
                            : "p-[12px] text-center text-md"
                        } text-xs font-medium text-[#7E8B99] mt-[12px]`}
                      >
                        <span className=" sidebar_text text-center">
                          {" "}
                          {itm.name}{" "}
                        </span>
                      </h6>
                    </li>
                  </>
                )}
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Html;
