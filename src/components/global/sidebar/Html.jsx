import React, { useEffect } from "react";
import environment from "../../../environment";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import styles from "./index.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { tooltip } from "antd";
import { RiHome6Line, RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiPackage, FiSettings, FiThumbsUp, FiUsers } from "react-icons/fi";
import { TiArrowSortedDown } from "react-icons/ti";
import { PiHandCoins, PiHandbagBold } from "react-icons/pi";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { LuCircleDot, LuEye, LuUser } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { IoGitPullRequestOutline } from "react-icons/io5";
import { TbLogout, TbReportMoney, TbUserShield } from "react-icons/tb";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { LiaTruckSolid } from "react-icons/lia";
import { CgLogOut } from "react-icons/cg";
import { login_success, logout } from '../../../Pages/actions/user';
import { Link, useNavigate } from 'react-router-dom';
import methodModel from "../../../methods/methods";
import { HiOutlineUserGroup } from "react-icons/hi2";
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
import loader from "../../../methods/loader";
import ApiClient from "../../../methods/api/apiClient";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineTruck } from "react-icons/hi";
// import { FaTruckLoading } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { MdManageHistory } from "react-icons/md";
// import { CostingURL } from '../../../pages/CostingTemplate/Api';
// import { CostingTourURL } from '../../../pages/CostPerTourTemplate/Api';

const Html = ({ ListItemLink, tabclass, urlAllow, route, isOpen }) => {

  const location = useLocation();
  const user = useSelector(state => state.user)

  const path = window.location.pathname;
  const history = useNavigate()
  const dispatch = useDispatch()
  const Logout = () => {
    dispatch(logout())
    localStorage.removeItem("persist:admin-app")
    localStorage.removeItem("token")
    history('/login');
  };

  const gallaryData = () => {
    // loader(true);
    ApiClient.get(`user/detail`, { id: user.id }).then((res) => {
      if (res.success) {
        const data = res.data;
        const newdata = { ...user, ...data };
        dispatch(login_success(newdata));
      }
      // loader(false);
    });
  };
  useEffect(() => {
    if (user && user.id) {
      gallaryData();
    }
  }, [user.id]);


  return (
    <>
      <div className="sidebar_new">
        <div className=" rounded-t-lg bg-gray-50 ">
          <div className="flex  items-center gap-4 flex-wrap relative px-4 pt-4 pb-4">

            <div className="shrink-0 m-auto">

              <img
                src={methodModel.userImg(user && user.image)}
                className="h-[100px] w-[100px] rounded-full object-cover mx-auto  border-[2px-solid-#fff] shadow-[2px_1px_10px_0px_#dfdfdf]"
              />
            </div>

            <div className="">
              <h2 className="text-xl font-semibold">{methodModel.capitalizeFirstLetter(user?.fullName)}</h2>
              <p className="text-sm font-normal">{user?.email}</p>
            </div>
          </div>
          <div className="flex  items-center">
            <button className="bg-primary px-4 py-2 text-white flex-grow text-xs flex items-center gap-1 justify-center font-medium"><LuEye /><Link to="/profile">View profile</Link></button>
            <button id="handleLogout" className="bg-red-500 px-4 py-2 text-white flex-grow text-xs flex items-center gap-1 justify-center font-medium" onClick={() => Logout()}> <CgLogOut /> Logout</button>
          </div>
        </div>

        <div className="border-t  px-2 py-4">

          <ul className="space-y-2  ">
            <li>
              <tooltip placement="right" title={`${user?.role == "carrier" || user?.permissions?.dashboard_get ? "Dashboard" : "You have not valid permission to access this module"}`}>
                <NavLink
                  to={`${(user?.plan_id || user?.role == "driver" || (user?.role == "staff" && user?.addedBy?.plan_id) && user?.permissions?.dashboard_get) ? "/dashboard" : ""}`}
                  // to={`/dashboard`}
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
            {user?.role == "driver" ? <></> : <>  <li>
              <tooltip placement="right" title="Trucks">
                <NavLink
                  to={`${user?.plan_id || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/trucks" : ""}`}
                  // to={`trucks`}
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
                <tooltip placement="right" title="Drivers">
                  <NavLink
                    to={`${user?.plan_id || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/drivers" : ""}`}
                    // to={`/drivers`}
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
              </li></>}

            {user?.role == "driver" ?
              <li>
                <tooltip placement="right" title="Carriers">
                  <NavLink
                    to={`${user?.plan_id || user?.role == "driver" || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/carriers" : ""}`}
                    // to={`/transaction`}
                    className={(isActive) =>
                      "p-2.5  flex items-center gap-[12px] text-sm bg-gray-50 font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg group " +
                      (location?.pathname == "/carriers" &&
                        " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                    }
                  >
                    <FiUsers className="text-black shrink-0 text-lg group-hover:text-white " />
                    <span className="text-inherit leading-none sidebar_text">
                      Carriers
                    </span>
                  </NavLink>
                </tooltip>
              </li> :
              user?.role == "user" || user?.role == "staff" ? <></> :
                <li>
                  <Disclosure as="div" defaultOpen={tabclass("carriers")}>
                    {({ open }) => (
                      <>
                        <tooltip placement="right" title="Carriers">
                          <Disclosure.Button className="w-full p-2.5 rounded-lg bg-gray-50 flex items-center justify-between text-black hover:!text-[#fff] gap-[12px] hover:bg-[#494f9f] transition-all duration-300  group">
                            <span className="text-sm font-normal text-inherit flex items-center gap-[12px] crm">
                              <LuUser className="text-black shrink-0 text-lg group-hover:text-white" />
                              <span className=" text-inherit leading-none sidebar_text">
                                {" "}
                                Carriers
                              </span>
                            </span>

                            <TiArrowSortedDown
                              className={`${open ? "" : "-rotate-90 transform"
                                } h-4 w-4 transition-all duration-500  text-[#494f9f] group-hover:text-white`}
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
                          <Disclosure.Panel className=" mt-[4px] ">
                            <ul className="space-y-2 ">
                              <li id="/carriers">
                                <tooltip
                                  placement="right"
                                  title="Carrier"
                                >
                                  <NavLink
                                    to={`${user?.plan_id || user?.role == "driver" || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/carriers" : ""}`}
                                    className={(isActive) =>
                                      "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group" +
                                      (location?.pathname == "/carriers" &&
                                        " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                    }
                                  >
                                    <FiUsers className="text-black shrink-0 text-lg group-hover:text-white" />
                                    <span className="text-inherit leading-none sidebar_text">
                                      All Carriers
                                    </span>
                                  </NavLink>
                                </tooltip>
                              </li>


                              <li id="/carriers">
                                <tooltip
                                  placement="right"
                                  title=" Accepted Carrier"
                                >
                                  <NavLink
                                    to={`${user?.plan_id || user?.role == "driver" || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/approvedcarriers" : ""}`}
                                    className={(isActive) =>
                                      "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group " +
                                      (location?.pathname == "/approvedcarriers" &&
                                        " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                    }
                                  >
                                    <IoMdCheckmarkCircleOutline className="text-black shrink-0 text-lg group-hover:text-white " />


                                    <span className="text-inherit leading-none sidebar_text">
                                      Approved Carrier
                                    </span>
                                  </NavLink>
                                </tooltip>
                              </li>


                              <li id="/carriers">
                                <tooltip
                                  placement="right"
                                  title=" Reject Carrier"
                                >
                                  <NavLink
                                    to={`${user?.plan_id || user?.role == "driver" || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/rejectedcarrier" : ""}`}
                                    className={(isActive) =>
                                      "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group " +
                                      (location?.pathname == "/rejectedcarrier" &&
                                        " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                    }
                                  >
                                    <RxCrossCircled className="text-black shrink-0 text-lg group-hover:text-white" />

                                    <span className="text-inherit leading-none sidebar_text">
                                      Rejected Carriers
                                    </span>
                                  </NavLink>
                                </tooltip>
                              </li>


                              <li id="/carriers">
                                <tooltip placement="right" title=" Carrier requests">
                                  <NavLink
                                    to={`${user?.plan_id || user?.role == "driver" || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/pendingcarrier" : ""}`}
                                    className={(isActive) =>
                                      "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group " +
                                      (location?.pathname == "/pendingcarrier" &&
                                        " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                    }
                                  >
                                    <IoGitPullRequestOutline className="text-black shrink-0 text-lg group-hover:text-white" />


                                    <span className="text-inherit leading-none sidebar_text">
                                      Pending Carriers
                                    </span>
                                  </NavLink>
                                </tooltip>
                              </li>



                            </ul>
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                </li>

            }

            {user?.role == "staff" ? <></> : <li>
              <tooltip placement="right" title="Carrier Staff">
                <NavLink
                  to={`${user?.plan_id || user?.role == "driver" || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/carrierstaff" : ""}`}
                  // to={`/transaction`}
                  className={(isActive) =>
                    "p-2.5  flex items-center gap-[12px] text-sm bg-gray-50 font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg group " +
                    (location?.pathname == "/carrierstaff" &&
                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                  }
                >
                  <HiOutlineUserGroup className="text-black shrink-0 text-lg group-hover:text-white " />
                  <span className="text-inherit leading-none sidebar_text">
                    Carrier's Staff
                  </span>
                </NavLink>
              </tooltip>
            </li>}


            {user?.role == "driver" ?
                <li>
                <Disclosure as="div" defaultOpen={tabclass("tasks")}>
                  {({ open }) => (
                    <>
                      <tooltip placement="right" title="Task">
                        <Disclosure.Button className="w-full p-2.5 rounded-lg bg-gray-50 flex items-center justify-between text-black hover:!text-[#fff] gap-[12px] hover:bg-[#494f9f] transition-all duration-300  group">
                          <span className="text-sm font-normal text-inherit flex items-center gap-[12px] crm">
                            <FaTasks className="text-black shrink-0 text-lg group-hover:text-white" />
                            <span className=" text-inherit leading-none sidebar_text">
                              {" "}
                             Tasks
                            </span>
                          </span>

                          <TiArrowSortedDown
                            className={`${open ? "" : "-rotate-90 transform"
                              } h-4 w-4 transition-all duration-500  text-[#494f9f] group-hover:text-white`}
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
                        <Disclosure.Panel className=" mt-[4px] ">
                          <ul className="space-y-2 ">
                            <li id="/task">
                              <tooltip
                                placement="right"
                                title="Task"
                              >
                                <NavLink
                                  to={`${user?.role == "driver" ? "/task" : ""}`}
                                  className={(isActive) =>
                                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group" +
                                    (location?.pathname == "/task" &&
                                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                  }
                                >
                                  <FaTasks className="text-black shrink-0 text-lg group-hover:text-white" />
                                  <span className="text-inherit leading-none sidebar_text">
                                    All Task
                                  </span>
                                </NavLink>
                              </tooltip>
                            </li>

                            <li id="/pendingpickuptask">
                              <tooltip
                                placement="right"
                                title="Pendingpickup Tasks"
                              >
                                <NavLink
                                  to={`${user?.role == "driver" ? "/pendingpickuptask" : ""}`}
                                  className={(isActive) =>
                                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group" +
                                    (location?.pathname == "/pendingpickuptask" &&
                                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                  }
                                >
                                  <FaTasks className="text-black shrink-0 text-lg group-hover:text-white" />
                                  <span className="text-inherit leading-none sidebar_text">
                                    Pending Pickup Task
                                  </span>
                                </NavLink>
                              </tooltip>
                            </li>
                            <li id="/pickeduptask">
                              <tooltip
                                placement="right"
                                title="Pickedup Task"
                              >
                                <NavLink
                                to={`${user?.role == "driver" ? "/pickeduptask" : ""}`}
                                  className={(isActive) =>
                                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group " +
                                    (location?.pathname == "/pickeduptask" &&
                                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                  }
                                >
                                  <FaTasks className="text-black shrink-0 text-lg group-hover:text-white " />


                                  <span className="text-inherit leading-none sidebar_text">
                                    Pickedup Task
                                  </span>
                                </NavLink>
                              </tooltip>
                            </li>


                            <li id="/intransittask">
                              <tooltip
                                placement="right"
                                title="Intransit Task"
                              >
                                <NavLink
                                 to={`${user?.role == "driver" ? "/intransittask" : ""}`}
                                  className={(isActive) =>
                                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group " +
                                    (location?.pathname == "/intransittask" &&
                                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                  }
                                >
                                  <FaTasks className="text-black shrink-0 text-lg group-hover:text-white" />

                                  <span className="text-inherit leading-none sidebar_text">
                                    Intransit Task
                                  </span>
                                </NavLink>
                              </tooltip>
                            </li>


                            {/* <li id="/deliveredloads">
                              <tooltip placement="right" title="Delivered Loads">
                                <NavLink
                                 to={`${user?.role == "driver" ? "/task" : ""}`}
                                  className={(isActive) =>
                                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group " +
                                    (location?.pathname == "/deliveredloads" &&
                                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                  }
                                >
                                  <FaTasks className="text-black shrink-0 text-lg group-hover:text-white" />


                                  <span className="text-inherit leading-none sidebar_text">
                                    Delivered Task
                                  </span>
                                </NavLink>
                              </tooltip>
                            </li> */}



                          </ul>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </li>
            // <li>
            //   <tooltip placement="right" title="Tasks">
            //     <NavLink
            //       to={`${user?.role == "driver" ? "/task" : ""}`}
            //       // to={`/transaction`}
            //       className={(isActive) =>
            //         "p-2.5  flex items-center gap-[12px] text-sm bg-gray-50 font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg group " +
            //         (location?.pathname == "/task" &&
            //           " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
            //       }
            //     >
            //       <FaTasks className="text-black shrink-0 text-lg group-hover:text-white " />
            //       <span className="text-inherit leading-none sidebar_text">
            //         Tasks
            //       </span>
            //     </NavLink>
            //   </tooltip>
            // </li> 
            : <></>}


            {user?.role == "driver" ? <></> : <>

              <li>
                <Disclosure as="div" defaultOpen={tabclass("loads")}>
                  {({ open }) => (
                    <>
                      <tooltip placement="right" title="Carriers">
                        <Disclosure.Button className="w-full p-2.5 rounded-lg bg-gray-50 flex items-center justify-between text-black hover:!text-[#fff] gap-[12px] hover:bg-[#494f9f] transition-all duration-300  group">
                          <span className="text-sm font-normal text-inherit flex items-center gap-[12px] crm">
                            <LuUser className="text-black shrink-0 text-lg group-hover:text-white" />
                            <span className=" text-inherit leading-none sidebar_text">
                              {" "}
                              Loads
                            </span>
                          </span>

                          <TiArrowSortedDown
                            className={`${open ? "" : "-rotate-90 transform"
                              } h-4 w-4 transition-all duration-500  text-[#494f9f] group-hover:text-white`}
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
                        <Disclosure.Panel className=" mt-[4px] ">
                          <ul className="space-y-2 ">
                            <li id="/loads">
                              <tooltip
                                placement="right"
                                title="Carrier"
                              >
                                <NavLink
                                  to={`${user?.plan_id || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/loads" : ""}`}
                                  className={(isActive) =>
                                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group" +
                                    (location?.pathname == "/loads" &&
                                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                  }
                                >
                                  <FiUsers className="text-black shrink-0 text-lg group-hover:text-white" />
                                  <span className="text-inherit leading-none sidebar_text">
                                    All Loads
                                  </span>
                                </NavLink>
                              </tooltip>
                            </li>

                            <li id="/pendingpickuploads">
                              <tooltip
                                placement="right"
                                title="Pendingpickup Loads"
                              >
                                <NavLink
                                  to={`${user?.plan_id || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/pendingpickuploads" : ""}`}
                                  className={(isActive) =>
                                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group" +
                                    (location?.pathname == "/pendingpickuploads" &&
                                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                  }
                                >
                                  <FiUsers className="text-black shrink-0 text-lg group-hover:text-white" />
                                  <span className="text-inherit leading-none sidebar_text">
                                    Pending Pickup Loads
                                  </span>
                                </NavLink>
                              </tooltip>
                            </li>
                            <li id="/pickeduploads">
                              <tooltip
                                placement="right"
                                title="Pickedup Loads"
                              >
                                <NavLink
                                  to={`${user?.plan_id || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/pickeduploads" : ""}`}
                                  className={(isActive) =>
                                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group " +
                                    (location?.pathname == "/pickeduploads" &&
                                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                  }
                                >
                                  <IoMdCheckmarkCircleOutline className="text-black shrink-0 text-lg group-hover:text-white " />


                                  <span className="text-inherit leading-none sidebar_text">
                                    Pickedup Loads
                                  </span>
                                </NavLink>
                              </tooltip>
                            </li>


                            <li id="/intransitloads">
                              <tooltip
                                placement="right"
                                title="Intransit Loads"
                              >
                                <NavLink
                                  to={`${user?.plan_id || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/intransitloads" : ""}`}
                                  className={(isActive) =>
                                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group " +
                                    (location?.pathname == "/intransitloads" &&
                                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                  }
                                >
                                  <RxCrossCircled className="text-black shrink-0 text-lg group-hover:text-white" />

                                  <span className="text-inherit leading-none sidebar_text">
                                    Intransit Loads
                                  </span>
                                </NavLink>
                              </tooltip>
                            </li>


                            <li id="/deliveredloads">
                              <tooltip placement="right" title="Delivered Loads">
                                <NavLink
                                  to={`${user?.plan_id || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/deliveredloads" : ""}`}
                                  className={(isActive) =>
                                    "p-2.5  flex items-center gap-[12px] text-sm font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg bg-gray-50 group " +
                                    (location?.pathname == "/deliveredloads" &&
                                      " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                                  }
                                >
                                  <IoGitPullRequestOutline className="text-black shrink-0 text-lg group-hover:text-white" />


                                  <span className="text-inherit leading-none sidebar_text">
                                    Delivered Loads
                                  </span>
                                </NavLink>
                              </tooltip>
                            </li>



                          </ul>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </li>

              <li>
                <tooltip placement="right" title={`${user?.role == "carrier" || user?.permissions?.active_plan_get ? "Active Plan" : "You have not valid permission to access this  module"}`}>
                  <NavLink
                    to={`${(user?.role == "staff" && user?.addedBy?.plan_id) && user?.permissions?.active_plan_get || user?.plan_id ? "/activeplan" : ""}`}
                    // to={`/activeplan`}
                    className={(isActive) =>
                      "p-2.5  flex items-center gap-[12px] text-sm bg-gray-50 font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg group " +
                      (location?.pathname == "/activeplan" &&
                        " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                    }
                  >
                    <RiMoneyDollarCircleLine className="text-black shrink-0 text-lg group-hover:text-white " />
                    <span className="text-inherit leading-none sidebar_text">
                      Active Plan
                    </span>
                  </NavLink>
                </tooltip>
              </li>
              <li>
                <tooltip placement="right" title="Transaction">
                  <NavLink
                    to={`${user?.plan_id || (user?.role == "staff" && user?.addedBy?.plan_id) ? "/transaction" : ""}`}
                    // to={`/transaction`}
                    className={(isActive) =>
                      "p-2.5  flex items-center gap-[12px] text-sm bg-gray-50 font-normal text-black hover:!text-[#fff] hover:bg-[#494f9f] !no-underline transition-all  rounded-lg group " +
                      (location?.pathname == "/transaction" &&
                        " !text-[#fff] !bg-[#494f9f] !font-medium active-bg")
                    }
                  >
                    <TbReportMoney className="text-black shrink-0 text-lg group-hover:text-white " />
                    <span className="text-inherit leading-none sidebar_text">
                      Transactions
                    </span>
                  </NavLink>
                </tooltip>
              </li></>}

          </ul>

        </div>
      </div>
    </>
  );
};

export default Html;
