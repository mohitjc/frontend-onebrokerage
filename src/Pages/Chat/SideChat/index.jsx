import React, { useState, useEffect } from 'react';
import { FaMoon } from "react-icons/fa";
import { GoHome, GoSearch } from "react-icons/go";
import { HiMiniBars3 } from "react-icons/hi2";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";

import { IoMdClose } from 'react-icons/io';
import methodModel from '../../../methods/methods';
import { useNavigate } from 'react-router-dom';
import { ImImages } from "react-icons/im";
import moment from 'moment';
export default function SideChat({sidechat,ChatSelectorHandler}) {
  
  console.log(sidechat,"sidechat")

  const history=useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the sidebar

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };


 
  return (
    <>
   
        <div className="block lg:hidden">
            <div className={`chatslefts w-[400px] border-r border-gray-200 shrink-0 py-4 h-screen bg-white fixed top-0 z-50 left-0 transition-transform duration-300 ease-in-out
                  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="hdes_sech flex items-center gap-6 px-4 ">
                <HiMiniBars3 className="text-xl xl:text-3xl ml-2 text-[#707991] hidden lg:block" />
                <HiMiniBars3 onClick={closeSidebar} className="text-2xl block lg:hidden xl:text-3xl ml-2 text-[#707991]" />
                <div className="bg-gray-100 items-center flex gap-2 py-2 px-4 rounded-full w-full">
                  <GoSearch className="text-xl" />
                  <input type="search" className="bg-transparent" />
                </div>
                {/* <div onClick={(e)=>history("/")}><CiHome/></div> */}
              </div>

              <div className="mt-4 flex flex-col gap-2 h-[calc(100vh-80px)] tailwind-scrollbar overflow-y-auto">
                <div className="flex justify-between gap-4 bg-white px-4 py-2 ">
                  <div className="flex gap-2 xl:gap-4 " onClick={(e)=>history("/")}>
                    <img src="assets/img/logo.jpeg" className="h-8 w-8 xl:h-12 xl:w-12 object-contain" />
                    <div className="">
                      <h4 className="flex items-center gap-2 font-semibold text-[14px] xl:text-[18px]">One Brokerage Support   <TbRosetteDiscountCheckFilled className="text-blue-500" />  </h4>
                      <p className="line-clamp-1 text-[12px] xl:text-[15px] text-[#707991]">All data has been updated</p>
                    </div>
                  </div>
                  <div className=" ">
                    <h4 className="flex items-center gap-2 text-[13px] text-[#707991]">19:48    </h4>
                    <p className="bg-primary rounded-full h-4 w-4 mt-1 flex items-center text-white text-xs justify-center">2</p>

                  </div>
                </div>



        


              </div>

            </div>
          </div>


          <div className="hidden lg:block">
            <div className="chatslefts lg:w-[300px] xl:w-[400px] border-r border-gray-200 shrink-0 py-4 h-screen ">

              <div className="hdes_sech flex items-center gap-6 px-4 ">
                <GoHome onClick={(e)=>history("/")} className="text-xl cursor-pointer xl:text-3xl ml-2 text-[#707991] hidden md:block" />
                <IoMdClose onClick={closeSidebar} className="text-xl block md:hidden xl:text-3xl ml-2 text-[#707991]" />
                <div className="bg-gray-100 items-center flex gap-2 py-2 px-4 rounded-full w-full">
                  <GoSearch className="text-xl" />
                  <input type="search" className="bg-transparent" />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 h-[calc(100vh-80px)] tailwind-scrollbar overflow-y-auto">

                {sidechat?.map((item)=>
                
                        <div className="flex justify-between gap-4 bg-white px-4 py-2 " >
                  <div className="flex gap-2 xl:gap-4 cursor-pointer" onClick={e=>ChatSelectorHandler(item)}>
                    {
                      item?.room_members?.map((itm)=>
                        <img
                      src={methodModel.userImg(
                        itm?.user_image
                      )}
                      className="h-10 w-10 rounded-full mb-4 object-contain "
                    />
                      )
                    }
                 
                    <div className="">
                      <h4 className="flex items-center gap-2 font-semibold text-[14px] xl:text-[18px]">{item?.room_members?.map((itm)=>itm?.user_name)}<TbRosetteDiscountCheckFilled className="text-blue-500" />  </h4>
                      <p className="line-clamp-1 text-[12px] xl:text-[15px] text-[#707991]">{item?.last_message?.type=="TEXT"?item?.last_message?.content:<><span className='flex gap-1 items-center'><ImImages /> Photos</span></>}</p>
                    </div>
                  </div>
                  <div className=" ">
                    <h4 className="flex items-center gap-2 text-[13px] text-[#707991]">{moment(item?.last_message_at).format("DD-MM-YYYY")}</h4>
                    <p className="bg-primary rounded-full h-4 w-4 mt-1 flex items-center text-white text-xs justify-center">2</p>

                  </div>
                </div>
                )}
        


             

              


              </div>

            </div>
          </div>



    </>
  );
}
