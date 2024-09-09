import React from "react";
import environment from "../../../environment";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import styles from "./index.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "antd";
import { RiHome6Line } from "react-icons/ri";
import { FiPackage, FiSettings, FiThumbsUp, FiUsers } from "react-icons/fi";
import { TiArrowSortedDown } from "react-icons/ti";
import { PiHandCoins, PiHandbagBold } from "react-icons/pi";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { LuCircleDot } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { IoGitPullRequestOutline } from "react-icons/io5";
import { TbUserShield } from "react-icons/tb";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { LiaTruckSolid } from "react-icons/lia";

import {
  MdOutlineHolidayVillage,
  MdOutlineAttachEmail,
  MdOutlineCoPresent,
} from "react-icons/md";
import {
  IoFileTrayFullOutline,
  IoChatboxEllipsesOutline,
} from "react-icons/io5";
import { RiCoupon3Line, RiPresentationLine } from "react-icons/ri";
import { GrCatalogOption } from "react-icons/gr";
// import { CostingURL } from '../../../pages/CostingTemplate/Api';
// import { CostingTourURL } from '../../../pages/CostPerTourTemplate/Api';

const Html = ({ ListItemLink, tabclass, urlAllow, route, isOpen }) => {
  const location = useLocation();
  const path = window.location.pathname;
  return (
    <>
      <div
        className={` pt-[60px] mx-[10px] h-full pb-4  ${isOpen && styles.sm_sidebar}`}
        component="siderbar"
      >
       <div className="px-[8px] pt-12  p-4 rounded-lg  bg-[#494f9f17] h-full border border-[#474e9c33]">
       {/* <h6
          className={`${
            isOpen ? "py-[20px] text-center" : "pb-[20px]"
          } text-xs font-medium text-[#7E8B99] mt-[40px]`}
        >
          <span className="sidebar_text text-[#4A545E] "> MAIN MENU </span>
        </h6> */}

        <ul className="space-y-2  ">
          <li>
            <Tooltip placement="right" title="Dashboard">
              <NavLink
                to="/dashboard"
                // className={(isActive) =>
                //   "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                //   (isActive && " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                // }
                className={(isActive) =>
                  "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                  (location?.pathname == "/dashboard" &&
                    " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                }
              >
                <RiHome6Line className="text-black shrink-0 text-lg group-hover:text-white " />
                <span className="text-inherit leading-none sidebar_text">
                  Dashboard
                </span>
              </NavLink>
            </Tooltip>
          </li>
          <li>
            <Disclosure as="div" defaultOpen={tabclass("carriers")}>
              {({ open }) => (
                <>
                  <Tooltip placement="right" title="Carriers">
                    <Disclosure.Button className="w-full p-2.5 rounded-[50px] flex items-center justify-between text-black hover:!text-[#fff] gap-[12px] hover:bg-[#494f9f] transition-all duration-300  group">
                      <span className="text-sm font-normal text-inherit flex items-center gap-[12px] crm">
                        <FiUsers className="text-black shrink-0 text-lg group-hover:text-white" />
                        <span className=" text-inherit leading-none sidebar_text">
                          {" "}
                          Carriers
                        </span>
                      </span>

                      <TiArrowSortedDown
                        className={`${
                          open ? "" : "-rotate-90 transform"
                        } h-4 w-4 transition-all duration-500  text-[#494f9f] group-hover:text-white`}
                      />
                    </Disclosure.Button>
                  </Tooltip>
                  <Transition
                    enter="transition duration-300 ease-in-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-300 opacity-300"
                    leave="transition duration-300 ease-in-out"
                    leaveFrom="transform scale-300 opacity-300"
                    leaveTo="transform scale-95 opacity-0"
                  >
                      <Disclosure.Panel className=" mt-[4px] ">
                      <ul className="space-y-2 ">
                      <li id="/carriers">
                          <Tooltip
                            placement="right"
                            title="Carrier"
                          >
                            <NavLink
                              to={`/carriers`}
                              className={(isActive) =>
                                "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group" +
                                (location?.pathname == "/carriers" &&
                                  " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                              }
                            >
                              <FiUsers className="text-black shrink-0 text-lg group-hover:text-white" />
                              <span className="text-inherit leading-none sidebar_text">
                                Carriers
                              </span>
                            </NavLink>
                          </Tooltip>
                        </li>
                        <li id="/carriers">
                          <Tooltip
                            placement="right"
                            title=" Accepted Carrier"
                          >
                            <NavLink
                              to={`/acceptedcarriers`}
                              className={(isActive) =>
                                "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                                (location?.pathname == "/acceptedcarriers" &&
                                  " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                              }
                            >
                              <IoMdCheckmarkCircleOutline className="text-black shrink-0 text-lg group-hover:text-white "/>

                              
                              <span className="text-inherit leading-none sidebar_text">
                                Accepted Carrier
                              </span>
                            </NavLink>
                          </Tooltip>
                        </li>

                        {urlAllow("carriers") ? (
                          <li id="/carriers">
                            <Tooltip
                              placement="right"
                              title=" Reject Carrier"
                            >
                              <NavLink
                                to={`/rejectedcarriers`}
                                className={(isActive) =>
                                  "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                                  (location?.pathname == "/rejectedcarriers" &&
                                    " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                }
                              >
                                <RxCrossCircled className="text-black shrink-0 text-lg group-hover:text-white" />

                                <span className="text-inherit leading-none sidebar_text">
                                  Rejected Carrier
                                </span>
                              </NavLink>
                            </Tooltip>
                          </li>
                        ) : (
                          <></>
                        )}

                        {urlAllow("carriers") ? (
                          <>
                            <li>
                              <Tooltip placement="right" title=" Carrier requests">
                                <NavLink
                                  to="/carriersrequest"
                                  className={(isActive) =>
                                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                                    (location?.pathname == "/carriersrequest" &&
                                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                  }
                                >
                                  <IoGitPullRequestOutline className="text-black shrink-0 text-lg group-hover:text-white"/>


                                  <span className="text-inherit leading-none sidebar_text">
                                    Carrier requests
                                  </span>
                                </NavLink>
                              </Tooltip>
                            </li>
                          </>
                        ) : (
                          <></>
                        )}

                        {urlAllow("carriers") ? (
                          <>
                            <li>
                              <Tooltip placement="right" title="Carrier's Staff">
                                <NavLink
                                  to="/carrierstaff"
                                  className={(isActive) =>
                                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                                    (location?.pathname == "/carrierstaff" &&
                                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                  }
                                >
                                 
                                  <TbUserShield className="text-black shrink-0 text-lg group-hover:text-white"/>

                                  <span className="text-inherit leading-none sidebar_text">
                                    Carrier's Staff
                                  </span>
                                </NavLink>
                              </Tooltip>
                            </li>
                          </>
                        ) : (
                          <></>
                        )}
                        {urlAllow("carriers") ? (
                          <>
                            <li>
                              <Tooltip placement="right" title="Approved Sub-Carrier">
                                <NavLink
                                  to="/approvedSubCarrier"
                                  className={(isActive) =>
                                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                                    (location?.pathname == "/approvedSubCarrier" &&
                                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                  }
                                >
                                
                                  <IoCheckmarkDoneSharp className="text-black shrink-0 text-lg group-hover:text-white"/>

                                  <span className="text-inherit leading-none sidebar_text">
                                    Approved Sub-Carrier
                                  </span>
                                </NavLink>
                              </Tooltip>
                            </li>
                          </>
                        ) : (
                          <></>
                        )}
                      </ul>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </li>
          <li>
            <Tooltip placement="right" title="Features">
              <NavLink
                to="/feature"
                // className={(isActive) =>
                //   "p-2.5 rounded-md flex items-center gap-[12px] text-sm font-normal text-[#4A545E] hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                //   (isActive && " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                // }
                className={(isActive) =>
                  "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                  (location?.pathname == "/feature" &&
                    " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                }
              >
                <MdOutlineFeaturedPlayList  className="text-black shrink-0 text-lg group-hover:text-white "/>

                <span className="text-inherit leading-none sidebar_text">
                Features
                </span>
              </NavLink>
            </Tooltip>
          </li>
          {/* Group */}
          <li>
            <Tooltip placement="right" title="Groups">
              <NavLink
                to="/groups"
                // className={(isActive) =>
                //   "p-2.5 rounded-md flex items-center gap-[12px] text-sm font-normal text-[#4A545E] hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                //   (isActive && " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                // }
                className={(isActive) =>
                  "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                  (location?.pathname == "/groups" &&
                    " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                }
              >
                <MdOutlineFeaturedPlayList  className="text-black shrink-0 text-lg group-hover:text-white "/>

                <span className="text-inherit leading-none sidebar_text">
                Groups
                </span>
              </NavLink>
            </Tooltip>
          </li>
          {/*  */}
          <li>
            <Tooltip placement="right" title="Plans">
              <NavLink
                to="/plans"
                // className={(isActive) =>
                //   "p-2.5 rounded-md flex items-center gap-[12px] text-sm font-normal text-[#4A545E] hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                //   (isActive && " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                // }
                className={(isActive) =>
                  "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                  (location?.pathname == "/plans" &&
                    " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                }
              >
                <LuCircleDot className="text-black shrink-0 text-lg group-hover:text-white "/>
              
                <span className="text-inherit leading-none sidebar_text">
                  Plan
                </span>
              </NavLink>
            </Tooltip>
          </li>
          

          <li>
            <Tooltip placement="right" title="Trucks">
              <NavLink
                to="/trucks"
                // className={(isActive) =>
                //   "p-2.5 rounded-md flex items-center gap-[12px] text-sm font-normal text-[#4A545E] hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                //   (isActive && " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                // }
                className={(isActive) =>
                  "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                  (location?.pathname == "/trucks" &&
                    " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                }
              >

                <LiaTruckSolid className="text-black shrink-0 text-lg group-hover:text-white " />
                <span className="text-inherit leading-none sidebar_text">
                Trucks
                </span>
              </NavLink>
            </Tooltip>
          </li>


          <li>
            <Tooltip placement="right" title="Trucks">
              <NavLink
                to="/drivers"
                // className={(isActive) =>
                //   "p-2.5 rounded-md flex items-center gap-[12px] text-sm font-normal text-[#4A545E] hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                //   (isActive && " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                // }
                className={(isActive) =>
                  "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                  (location?.pathname == "/drivers" &&
                    " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                }
              >

                <LiaTruckSolid className="text-black shrink-0 text-lg group-hover:text-white " />
                <span className="text-inherit leading-none sidebar_text">
                Driver
                </span>
              </NavLink>
            </Tooltip>
          </li>

          <li>
            <Tooltip placement="right" title="Transaction">
              <NavLink
                to="/transaction"
                // className={(isActive) =>
                //   "p-2.5 rounded-md flex items-center gap-[12px] text-sm font-normal text-[#4A545E] hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                //   (isActive && " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                // }
                className={(isActive) =>
                  "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                  (location?.pathname == "/transaction" &&
                    " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                }
              >
                <MdOutlineFeaturedPlayList  className="text-black shrink-0 text-lg group-hover:text-white "/>
                <span className="text-inherit leading-none sidebar_text">
                Transactions
                </span>
              </NavLink>
            </Tooltip>
          </li>

          {/* <li id="/reseller">
            <Tooltip placement="right" title="Resellers / Agents">
              <NavLink
                to={`/reseller`}
                className={(isActive) =>
                  "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                  (location?.pathname == "/reseller" &&
                    " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                }
              >
                <MdOutlineCoPresent className=" text-[#5577FF] shrink-0 text-lg" />

                <span className="text-inherit leading-none sidebar_text">
                  Resellers / Agents
                </span>
              </NavLink>
            </Tooltip>
          </li> */}
{/* 
          {urlAllow("features,plans") ? (
            <li>
              <Disclosure as="div" defaultOpen={tabclass("plan")}>
                {({ open }) => (
                  <>
                    <Tooltip placement="right" title="Subscription Plan">
                      <Disclosure.Button className="w-full p-2.5 rounded-md flex items-center justify-between text-[#4A545E]  hover:!text-[#5577FF] gap-[12px] hover:bg-[#5577FF]/10 transition-all duration-300">
                        <span className="text-sm font-normal text-inherit flex items-center gap-[12px] crm">
                          <i className="material-icons text-[#ffc800] shrink-0 text-lg">
                            subscriptions
                          </i>
                          <span className="text-inherit leading-none sidebar_text">
                            {" "}
                            Subscription Plan
                          </span>
                        </span>

                        <TiArrowSortedDown
                          className={`${
                            open ? "" : "-rotate-90 transform"
                          } h-4 w-4 transition-all duration-500  text-[#7E8B99]`}
                        />
                      </Disclosure.Button>
                    </Tooltip>
                    <Transition
                      enter="transition duration-300 ease-in-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-300 opacity-300"
                      leave="transition duration-300 ease-in-out"
                      leaveFrom="transform scale-300 opacity-300"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="pl-[30px] mt-[4px] ">
                        <div className="submenus">
                          {urlAllow("features") ? (
                            <>
                              <li>
                                <NavLink
                                  className={(isActive) =>
                                    "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                    (location?.pathname == "/features" &&
                                      " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                                  }
                                  to="/features"
                                >
                                  <span className="text-inherit leading-none sidebar_text">
                                    Plan Features
                                  </span>
                                </NavLink>
                              </li>
                            </>
                          ) : (
                            <></>
                          )}
                          {urlAllow("plans") ? (
                            <>
                              <li>
                                <NavLink
                                  className={(isActive) =>
                                    "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                    (location?.pathname == "/plans" &&
                                      " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                                  }
                                  to="/plans"
                                >
                                  <span className="text-inherit leading-none sidebar_text">
                                    Plans
                                  </span>
                                </NavLink>
                              </li>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </li>
          ) : null}

          {urlAllow("types,categories,category") ? (
            <li>
              <Disclosure as="div" defaultOpen={tabclass("catalogue")}>
                {({ open }) => (
                  <>
                    <Tooltip placement="right" title="Category">
                      <Disclosure.Button className="w-full p-2.5 rounded-md flex items-center justify-between text-[#4A545E]  hover:!text-[#5577FF] gap-[12px] hover:bg-[#5577FF]/10 transition-all duration-300">
                        <span className="text-sm font-normal text-inherit flex items-center gap-[12px] crm">
                          <GrCatalogOption className="text-[#fd71af] shrink-0 text-lg" />

                          <span className="text-inherit leading-none sidebar_text">
                            Category
                          </span>
                        </span>
                        <TiArrowSortedDown
                          className={`${
                            open ? "" : "-rotate-90 transform"
                          } h-4 w-4 transition-all duration-500  text-[#7E8B99]`}
                        />
                      </Disclosure.Button>
                    </Tooltip>
                    <Transition
                      enter="transition duration-300 ease-in-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-300 opacity-300"
                      leave="transition duration-300 ease-in-out"
                      leaveFrom="transform scale-300 opacity-300"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="pl-[30px] mt-[4px] ">
                        <div className="submenus">
                          {urlAllow("types") ? (
                            <>
                              <li>
                                <NavLink
                                  className={(isActive) =>
                                    "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                    (location?.pathname == "/types" &&
                                      " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                                  }
                                  to="/types"
                                >
                                  <span className="text-inherit leading-none sidebar_text">
                                    Types
                                  </span>
                                </NavLink>
                              </li>
                            </>
                          ) : (
                            <></>
                          )}
                          {urlAllow("categories") ? (
                            <>
                              <li>
                                <NavLink
                                  className={(isActive) =>
                                    "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                    (location?.pathname == "/categories" &&
                                      " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                                  }
                                  to="/categories"
                                >
                                  <span className="text-inherit leading-none sidebar_text">
                                    Categories
                                  </span>
                                </NavLink>
                              </li>
                            </>
                          ) : (
                            <></>
                          )}
                          {urlAllow("category") ? (
                            <>
                              <li>
                                <NavLink
                                  className={(isActive) =>
                                    "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                    (location?.pathname.includes(
                                      "/category/"
                                    ) &&
                                      " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                                  }
                                  to={"/category/" + environment.resellerTypeId}
                                >
                                  <span className="text-inherit leading-none sidebar_text">
                                    Reseller Categories
                                  </span>
                                </NavLink>
                              </li>
                            </>
                          ) : (
                            <></>
                          )}
                          {urlAllow("category") ? (
                            <>
                              <li>
                                <NavLink
                                  className={(isActive) =>
                                    "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                    (location?.pathname.includes(
                                      "/category/product/"
                                    ) &&
                                      " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                                  }
                                  to={
                                    "/category/product/" +
                                    environment.productTypeId
                                  }
                                >
                                  <span className="text-inherit leading-none sidebar_text">
                                    Product Categories
                                  </span>
                                </NavLink>
                              </li>
                            </>
                          ) : (
                            <></>
                          )}

                          {urlAllow("category") ? (
                            <>
                              <li>
                                <NavLink
                                  className={(isActive) =>
                                    "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                    (location?.pathname.includes(
                                      "/category/sustanability/"
                                    ) &&
                                      " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                                  }
                                  to={
                                    "/category/sustanability/" +
                                    environment.sustainableId
                                  }
                                >
                                  <span className="text-inherit leading-none sidebar_text">
                                    Sustanability Categories
                                  </span>
                                </NavLink>
                              </li>
                            </>
                          ) : (
                            <></>
                          )}

                          {urlAllow("category") ? (
                            <>
                              <li>
                                <NavLink
                                  className={(isActive) =>
                                    "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                    (location?.pathname.includes(
                                      "/category/pricing/"
                                    ) &&
                                      " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                                  }
                                  to={
                                    "/category/pricing/" + environment.pricingId
                                  }
                                >
                                  <span className="text-inherit leading-none sidebar_text">
                                    Pricing Categories
                                  </span>
                                </NavLink>
                              </li>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </li>
          ) : null} */}

          {/* <Disclosure as="div" defaultOpen={tabclass("template")}>
            {({ open }) => (
              <>
                <Tooltip placement="right" title="Templates">
                  <Disclosure.Button className="w-full p-2.5 rounded-md flex items-center justify-between text-[#4A545E]  hover:!text-[#5577FF] gap-[12px] hover:bg-[#5577FF]/10 transition-all duration-300">
                    <span className="text-sm font-normal text-inherit flex items-center gap-[12px] crm">
                      <GrCatalogOption className="text-[#fd71af] shrink-0 text-lg" />

                      <span className="text-inherit leading-none sidebar_text">
                        Templates
                      </span>
                    </span>
                    <TiArrowSortedDown
                      className={`${
                        open ? "" : "-rotate-90 transform"
                      } h-4 w-4 transition-all duration-500  text-[#7E8B99]`}
                    />
                  </Disclosure.Button>
                </Tooltip>
                <Transition
                  enter="transition duration-300 ease-in-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-300 opacity-300"
                  leave="transition duration-300 ease-in-out"
                  leaveFrom="transform scale-300 opacity-300"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="pl-[30px] mt-[4px] ">
                    <div className="submenus space-y-2">
                      <li id="/dynamicpricelist">
                        <Tooltip placement="right" title="Dynamic Pricing">
                          <NavLink
                            to={`/dynamicpricelist`}
                            className={(isActive) =>
                              "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                              (location?.pathname.includes(
                                "/dynamicpricelist"
                              ) &&
                                " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                            }
                          >
                            
                            <span className="text-inherit leading-none sidebar_text">
                              Dynamic Pricing
                            </span>
                          </NavLink>
                        </Tooltip>
                      </li>

                      <li id="/crm">
                        <Tooltip placement="right" title="Contract Templates">
                          <NavLink
                            to={`/crm`}
                            className={(isActive) =>
                              "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                              (location?.pathname.includes("crm") &&
                                " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                            }
                          >
                           

                            <span className="text-inherit leading-none sidebar_text">
                              Contract Templates
                            </span>
                          </NavLink>
                        </Tooltip>
                      </li>
                      <li id="/waiver">
                        <Tooltip placement="right" title="Waiver Templates">
                          <NavLink
                            to={`/waiver`}
                            className={(isActive) =>
                              "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                              (location?.pathname.includes("/waiver") &&
                                " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                            }
                          >


                            <span className="text-inherit leading-none sidebar_text">
                              Waiver Templates
                            </span>
                          </NavLink>
                        </Tooltip>
                      </li>

                      <li id={""}>
                        <Tooltip
                          placement="right"
                          title="Budget Per Tour Template"
                        >
                          <NavLink
                            to={""}
                            className={(isActive) =>
                              "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                              (window.location.pathname.includes(
                                "/costing/template"
                              ) ||
                                (window.location.pathname.includes(
                                  "/costing/add"
                                ) &&
                                  " !text-[#fff] !bg-[#494f9f] !font-medium active-bg"))
                            }
                          >
                           
                            <span className="text-inherit leading-none sidebar_text">
                              Budget Per Tour Template
                            </span>
                          </NavLink>
                        </Tooltip>
                      </li>

                      <li id={""}>
                        <Tooltip
                          placement="right"
                          title="Costing Per Tour Template"
                        >
                          <NavLink
                            to={""}
                            className={(isActive) =>
                              "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                              (window.location.pathname.includes(
                                "/costingtour"
                              ) &&
                                " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                            }
                          >
                            <span className="text-inherit leading-none sidebar_text">
                              Costing Per Tour Template
                            </span>
                          </NavLink>
                        </Tooltip>
                      </li>

                      {urlAllow("emailtemplate") ? (
                        <>
                          {" "}
                          <li id="/emailtemplate">
                            <Tooltip placement="right" title="Email Template">
                              <NavLink
                                to={`/emailtemplate`}
                                className={(isActive) =>
                                  "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                                  (location?.pathname.includes(
                                    "emailtemplate"
                                  ) &&
                                    " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                }
                              >
                               

                                <span className="text-inherit leading-none sidebar_text">
                                  Email Template
                                </span>
                              </NavLink>
                            </Tooltip>
                          </li>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure> */}

          {/* {urlAllow('currency') ? <>
            <li>
              <Tooltip placement="right" title="Currency">
                <NavLink
                  to="/currency"
                  className={(isActive) =>
                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-[50px] group " +
                    (isActive && " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                  }>

                  <i className="material-icons text-[#5577FF] shrink-0 text-lg" title="">currency_exchange</i>
                  <span className="text-inherit leading-none sidebar_text">Currency</span>
                </NavLink>
              </Tooltip>
            </li>
          </> : <></>} */}

          {/* {urlAllow("bookingSystem") ? (
            <li>
              <Disclosure as="div" defaultOpen={tabclass("api")}>
                {({ open }) => (
                  <>
                    <Tooltip placement="right" title="Data Connections">
                      <Disclosure.Button className="w-full  p-2.5 rounded-md flex items-center justify-between text-[#4A545E]  hover:!text-[#5577FF] gap-[12px] hover:bg-[#5577FF]/10 transition-all duration-300">
                        <span className="text-sm font-normal text-inherit flex items-center gap-[12px] crm">
                          <i
                            className="material-icons  mr-2 text-[#b46d2a] shrink-0 text-lg"
                            title=""
                          >
                            menu_book
                          </i>
                          <span className="text-inherit leading-none sidebar_text">
                            {" "}
                            Data Connections
                          </span>
                        </span>

                        <TiArrowSortedDown
                          className={`${
                            open ? "" : "-rotate-90 transform"
                          } h-4 w-4 transition-all duration-500  text-[#7E8B99]`}
                        />
                      </Disclosure.Button>
                    </Tooltip>
                    <Transition
                      enter="transition duration-300 ease-in-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-300 opacity-300"
                      leave="transition duration-300 ease-in-out"
                      leaveFrom="transform scale-300 opacity-300"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="pl-[30px] mt-[4px] ">
                        <div className="submenus">
                          {urlAllow(
                            "bookingSystem,reviews,accounting-system"
                          ) ? (
                            <>
                              <li id="/bookingSystem">
                                <NavLink
                                  className={(isActive) =>
                                    "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                    (location?.pathname == "/bookingSystem" &&
                                      " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                                  }
                                  to="/bookingSystem"
                                >
                                  <span className="text-inherit leading-none sidebar_text">
                                    Booking System
                                  </span>
                                </NavLink>
                              </li>
                            </>
                          ) : (
                            <></>
                          )}

                          <li id="/marketing">
                            <NavLink
                              className={(isActive) =>
                                "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                (location?.pathname == "/marketing" &&
                                  " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                              }
                              to="/marketing"
                            >
                              <span className="text-inherit leading-none sidebar_text">
                                Marketing{" "}
                              </span>
                            </NavLink>
                          </li>
                          <li id="/communication">
                            <NavLink
                              className={(isActive) =>
                                "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                (location?.pathname == "/communication" &&
                                  " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                              }
                              to="/communication"
                            >
                              <span className="text-inherit leading-none sidebar_text">
                                Communication Channel
                              </span>
                            </NavLink>
                          </li>
                          <li id="/reviews">
                            <NavLink
                              className={(isActive) =>
                                "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                (location?.pathname == "/reviews" &&
                                  " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                              }
                              to="/reviews"
                            >
                              <span className="text-inherit leading-none sidebar_text">
                                Reviews
                              </span>
                            </NavLink>
                          </li>
                          <li id="/accountingSystem">
                            <NavLink
                              className={(isActive) =>
                                "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                (location?.pathname == "/accountingSystem" &&
                                  " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                              }
                              to="/accountingSystem"
                            >
                              <span className="text-inherit leading-none sidebar_text">
                                Accounting System
                              </span>
                            </NavLink>
                          </li>
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </li>
          ) : null} */}

          {/* <h6
            className={`${
              isOpen ? "py-[12px] text-center" : "p-[12px]"
            } text-xs font-medium text-[#7E8B99] mt-[12px]`}
          >
            <span className=" sidebar_text"> Others </span>
          </h6> */}


          {urlAllow("roles,users") ? (
            <li>
              <Disclosure as="div" defaultOpen={tabclass("user")}>
                {({ open }) => (
                  <>
                    <Tooltip placement="right" title="Internal Users">
                      <Disclosure.Button className="w-full p-2.5 rounded-md flex items-center justify-between text-[#4A545E]  hover:!text-[#5577FF] gap-[12px] hover:bg-[#5577FF]/10 transition-all duration-300">
                        <span className="text-sm font-normal text-inherit flex items-center gap-[12px] crm">
                          <FiUsers className="text-[#5577FF] shrink-0 text-lg" />
                          <span className=" text-inherit leading-none sidebar_text">
                            {" "}
                            Internal Users
                          </span>
                        </span>

                        <TiArrowSortedDown
                          className={`${
                            open ? "" : "-rotate-90 transform"
                          } h-4 w-4 transition-all duration-500  text-[#7E8B99]`}
                        />
                      </Disclosure.Button>
                    </Tooltip>
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
                          {urlAllow("users") ? (
                            <li>
                              {" "}
                              <NavLink
                                className={(isActive) =>
                                  "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                  (location?.pathname == "/users" &&
                                    " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                                }
                                to="/users"
                              >
                                <span
                                  className="text-inherit leading-none sidebar_text"
                                  title="Users"
                                >
                                  {" "}
                                  Users
                                </span>
                              </NavLink>
                            </li>
                          ) : null}
                          {urlAllow("roles") ? (
                            <li>
                              {" "}
                              <NavLink
                                className={(isActive) =>
                                  "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                  (location?.pathname == "/roles" &&
                                    " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                                }
                                to="/roles"
                              >
                                <span
                                  className="text-inherit leading-none sidebar_text"
                                  title="Roles"
                                >
                                  {" "}
                                  Roles
                                </span>
                              </NavLink>
                            </li>
                          ) : null}
                        </ul>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </li>
          ) : null}
        </ul>
       </div>
      </div>
    </>
  );
};

export default Html;
