import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import styles from "./index.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "antd";
import { RiHome6Line } from "react-icons/ri";
import { FiPackage, FiSettings, FiThumbsUp, FiUsers } from "react-icons/fi";
import { TiArrowSortedDown } from "react-icons/ti";
import {  RiPresentationLine } from "react-icons/ri";
import { GrCatalogOption } from "react-icons/gr";
import environment from "../../../environment";


const Html = ({ ListItemLink, tabclass, isAllow, route, isOpen,user }) => {
  const location = useLocation();


  const menus=[
    {
      name:'Main Menu',
    },
    {
      name:'Dashboard',
      icon:<RiHome6Line className="text-[#00b884] shrink-0 text-lg" />,
      url:'/dashboard',
      key:'readDashboard',
    },
      {
      name:'Events',
      icon:<span class="material-symbols-outlined text-[#ffc800] shrink-0 text-lg">star</span>,
      url:'/event',
      key:'readEvents',
    },
    {
      name:'Plan',
      icon:<span class="material-symbols-outlined text-[#ffc800] shrink-0 text-lg">star</span>,
      url:'/plan',
      key:'',
    },
  ]

  return (
    <>

      <div className={`px-[8px] ${isOpen && styles.sm_sidebar}`} component="siderbar">

        <ul className="space-y-2 px-2" >
          {user?.verifiedGroupLeader!='approve'&&user.customerRole?._id==environment.glRoleId?<>
          <div className="py-4 text-red-600">{user?.verifiedGroupLeader=='decline'?'Your Request is declined':'Your request approvel is under progress'}</div>
          </>:<>
          {menus.map(itm=>{
            return <>
            {itm.icon?<>
              <li>
            {itm.menu?<>
              <Disclosure as="div" defaultOpen={tabclass(itm.tab)}>
              {({ open }) => (
                <>
                  <Tooltip placement="right" title={itm.name}>
                    <Disclosure.Button className="w-full p-2.5 rounded-md flex items-center justify-between text-[#4A545E]  hover:!text-[#5577FF] gap-[12px] hover:bg-[#5577FF]/10 transition-all duration-300">

                      <span className="text-sm font-normal text-inherit flex items-center gap-[12px] crm">
                      {itm.icon}
                        <span className=" text-inherit leading-none sidebar_text"> {itm.name}</span>

                      </span>

                      <TiArrowSortedDown
                        className={`${open ? "" : "-rotate-90 transform"
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
                    leaveTo="transform scale-95 opacity-0">
                    <Disclosure.Panel className="pl-[30px] mt-[4px] ">
                      <ul className="space-y-2">
                        {itm.menu.map(sitm=>{
                          return <>
                           {isAllow(sitm.key) ? <li> <NavLink className={(isActive) =>
                          "p-2.5 rounded-md block text-sm font-normal text-[#4A545E] cursor-pointer hover:!text-[#5577FF] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                          (location?.pathname == sitm.url &&
                            " !text-[#5577FF] !bg-[#5577FF]/10 !font-medium")
                        } to={sitm.url}>

                          <span className="text-inherit leading-none sidebar_text" title={sitm.name}> {sitm.name}</span>
                        </NavLink></li> : null}
                          </>
                        })}
                      </ul>


                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            </>:<>
            {isAllow(itm.key) ? <>
              <Tooltip placement="right" title={itm.name}>
                <NavLink
                  to={itm.url}
                  className={(isActive) =>
                    "p-2.5 rounded-md flex items-center gap-[12px] text-sm font-normal text-[#4A545E] hover:!text-[#00b884] hover:bg-[#00b884]/10 !no-underline transition-all " +
                    (location?.pathname == itm.url && " !text-[#00b884] !bg-[#EDECF9] !font-medium")
                  }>

                  {itm.icon}
                  <span className="text-inherit leading-none sidebar_text">{itm.name}</span>

                </NavLink>
              </Tooltip>
            </> : <></>}
            </>}
          </li>
            </>:<>
            <li>
            <h6
            className={`${isOpen ? "py-[12px] text-center" : "p-[12px] text-center text-md"
              } text-xs font-medium text-[#7E8B99] mt-[12px]`}>
            <span className=" sidebar_text text-center"> {itm.name} </span>
          </h6>
            </li>
            </>}
            
            </>
          })}
          </>}
        

        </ul>
      </div>
    </>
  );
}

export default Html