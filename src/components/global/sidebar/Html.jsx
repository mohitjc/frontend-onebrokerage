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
import { LuCircleDot, LuEye } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { IoGitPullRequestOutline } from "react-icons/io5";
import { TbLogout, TbUserShield } from "react-icons/tb";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { LiaTruckSolid } from "react-icons/lia";
import { CgLogOut } from "react-icons/cg";
import { logout } from '../../../Pages/actions/user';
import { Link, useNavigate } from 'react-router-dom';
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
import { GrCar, GrCatalogOption } from "react-icons/gr";
import { useSelector ,useDispatch} from "react-redux";
import { HiOutlineTruck } from "react-icons/hi";
// import { CostingURL } from '../../../pages/CostingTemplate/Api';
// import { CostingTourURL } from '../../../pages/CostPerTourTemplate/Api';

const Html = ({ ListItemLink, tabclass, urlAllow, route, isOpen }) => {

  const location = useLocation();
  const user=useSelector(state=>state.user)
  const path = window.location.pathname;
  const history=useNavigate()
  const dispatch=useDispatch()
  const Logout = () => {
    dispatch(logout())
    localStorage.removeItem("persist:admin-app")
    localStorage.removeItem("token")
    history('/login');
  };
  return (
    <>

      <div className="sidebar_new">
          <div className=" rounded-t-lg bg-gray-50 ">
              <div className="flex  items-center gap-4 flex-wrap relative px-4 pt-4 pb-4">

                <div className="">
                  {/* <img
                    src={methodModel.userImg(data && data.image)}
                    className="h-36 w-36 rounded-full object-cover mx-auto"
                  /> */}
                   <img src="/assets/img/d1.png" className=" " alt=""/>
                </div>
                 
                  <div className="">
                      <h2 className="text-xl font-semibold">{user?.fullName}</h2>
                      <p className="text-sm font-normal">{user?.email}</p>
                  </div>
              </div>
              <div className="flex  items-center">
                    <button className="bg-primary px-4 py-2 text-white flex-grow text-xs flex items-center gap-1 justify-center font-medium"><LuEye /><Link to="/profile">View profile</Link></button>
                    <button className="bg-red-500 px-4 py-2 text-white flex-grow text-xs flex items-center gap-1 justify-center font-medium"  onClick={() =>Logout()}> <CgLogOut /> Logout</button>
              </div>
          </div>

          <div className="border-t  px-2 py-4">


          <ul className="space-y-2  ">
              <li>
                <tooltip placement="right" title="Dashboard">
                  <NavLink
                    to="/dashboard"
                
                    className={(isActive) =>
                      "p-2.5  flex items-center gap-[12px] text-sm bg-gray-50 font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg group " +
                      (location?.pathname == "/dashboard" &&
                        " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                    }
                  >
                    <RiHome6Line className="text-black shrink-0 text-lg group-hover:text-white " />
                    <span className="text-inherit leading-none sidebar_text">
                      Dashboard
                    </span>
                  </NavLink>
                </tooltip>
              </li>
              <li>
                <tooltip placement="right" title="Dashboard">
                  <NavLink
                    to="/trucks"
                
                    className={(isActive) =>
                      "p-2.5  flex items-center gap-[12px] text-sm bg-gray-50 font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg group " +
                      (location?.pathname == "/trucks" &&
                        " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                    }
                  >
                    <HiOutlineTruck className="text-black shrink-0 text-lg group-hover:text-white " />
                    <span className="text-inherit leading-none sidebar_text">
                      Trucks
                    </span>
                  </NavLink>
                </tooltip>
              </li>
              <li>
                <tooltip placement="right" title="Dashboard">
                  <NavLink
                    to="/drivers"
                
                    className={(isActive) =>
                      "p-2.5  flex items-center gap-[12px] text-sm bg-gray-50 font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg group " +
                      (location?.pathname == "/drivers" &&
                        " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                    }
                  >
                    <GrCar className="text-black shrink-0 text-lg group-hover:text-white " />
                    <span className="text-inherit leading-none sidebar_text">
                      Drivers
                    </span>
                  </NavLink>
                </tooltip>
              </li>
              <li>
                <tooltip placement="right" title="Dashboard">
                  <NavLink
                    to="/activeplan"
                
                    className={(isActive) =>
                      "p-2.5  flex items-center gap-[12px] text-sm bg-gray-50 font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg group " +
                      (location?.pathname == "/activeplan" &&
                        " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                    }
                  >
                    <GrCar className="text-black shrink-0 text-lg group-hover:text-white " />
                    <span className="text-inherit leading-none sidebar_text">
                      Active Plan
                    </span>
                  </NavLink>
                </tooltip>
              </li>
          </ul>

          </div>
      </div>


     
      {/* <div
        className={` pt-[60px] mx-[10px] h-full pb-4  ${isOpen && styles.sm_sidebar}`}
        component="siderbar"
      >
       <div className="px-[8px] pt-12  p-4 rounded-lg  bg-[#494f9f17] h-full border border-[#474e9c33]">


        <ul className="space-y-2  ">
          <li>
            <Tooltip placement="right" title="Dashboard">
              <NavLink
                to="/dashboard"
             
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
        
          <li>
            <Tooltip placement="right" title="Groups">
              <NavLink
                to="/groups"
            
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
    
          <li>
            <Tooltip placement="right" title="Plans">
              <NavLink
                to="/plans"
          
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
            <Tooltip placement="right" title="Drivers">
              <NavLink
                to="/drivers"
             
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
      </div> */}
    </>
  );
};

export default Html;
