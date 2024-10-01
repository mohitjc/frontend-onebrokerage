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
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
export default function SideChat({ sidechat, ChatSelectorHandler }) {


  const history = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  // const calculateTime = (newdate) => {
  //   let newgivendate = new Date(newdate)
  //   let currentdate = new Date;
  //   console.log(
  //     moment(newdate).fromNow()
  //   )
  //   let Difference_In_Time =
  //     currentdate.getTime() - newgivendate.getTime();

  //   let Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24))
  //   const Difference_In_Hours = Math.floor((Difference_In_Time % (1000 * 3600 * 24)) / (1000 * 3600));
  //   const Difference_In_Minutes = Math.floor((Difference_In_Time % (1000 * 3600)) / (1000 * 60));

  //   if (Difference_In_Days  ) {
  //       return Difference_In_Days +" days"
  //   }
  //   else if (Difference_In_Hours ) {
  //      return Difference_In_Hours+" hr"
  //   }
  //  else
  //  {
  //    return Difference_In_Minutes+" min"
  //  }
  // }



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
              <div className="flex gap-2 xl:gap-4 " onClick={(e) => history("/")}>
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
            <GoHome onClick={(e) => history("/")} className="text-xl cursor-pointer xl:text-3xl ml-2 text-[#707991] hidden md:block" />
            <IoMdClose onClick={closeSidebar} className="text-xl block md:hidden xl:text-3xl ml-2 text-[#707991]" />
            <div className="bg-gray-100 items-center flex gap-2 py-2 px-4 rounded-full w-full">
              <GoSearch className="text-xl" />
              <input type="search" className="bg-transparent" />
            </div>
            <button>Add Group</button>
          </div>

          <div className="mt-4 flex flex-col gap-2 h-[calc(100vh-80px)] tailwind-scrollbar overflow-y-auto">

            {sidechat?.map((item) =>

              <div className="flex justify-between gap-4 bg-white px-4 py-2 " >
                <div className="flex gap-2 xl:gap-4 cursor-pointer" onClick={e => ChatSelectorHandler(item)}>
                  {
                    item?.room_members?.map((itm) =>
                      <img
                        src={methodModel.userImg(
                          itm?.user_image
                        )}
                        className="h-10 w-10 rounded-full mb-4 object-contain "
                      />
                    )
                  }

                  <div className="">
                    <h4 className="flex items-center gap-2 font-semibold text-[14px] xl:text-[18px]">{item?.room_members?.map((itm) => itm?.user_name)}<TbRosetteDiscountCheckFilled className="text-blue-500" />  </h4>
                    <p className="line-clamp-1 text-[12px] xl:text-[15px] text-[#707991]">{item?.last_message?.type == "TEXT" ? item?.last_message?.content : <><span className='flex gap-1 items-center'><ImImages /> Photos</span></>}</p>
                  </div>
                </div>
                <div className=" ">
                  <h4 className="flex items-center gap-2 text-[13px] text-[#707991]">
                    {moment(item?.last_message_at).fromNow()=="a day ago"?"1 day ago":moment(item?.last_message_at).fromNow()}
                    {/* {calculateTime(item?.last_message_at)} */}
                  {/* 2 min */}
                  </h4>

                  {/* <p className="bg-primary rounded-full h-4 w-4 mt-1 flex items-center text-white text-xs justify-center">{item?.unread_count}</p> */}

                </div>
              </div>
            )}


          </div>

        </div>
      </div>

      <div className="fixed inset-0 hidden  items-center justify-center">
        <button
          type="button"
          id="OpenReasonModel"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div>



      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full relative max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >


                  </Dialog.Title>
                  <div className=" flex items-center justify-center relative">

                    <div className='h-16 w-16 rounded-full absolute -top-16 right-1/2 left-1/2  -translate-x-1/2 text-white flex items-center justify-center bg-red-500 shadow-md mx-auto border-2 border-red-800 p-4'>
                    <MdClose className='text-4xl font-bold' />

                    </div>

                 


                  </div>

                  <div className="mt-5">

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        Reject();
                      }}
                    >
                      <div class="modal-body">
                        <label class="mb-2 block">
                          {' '}
                          Reason to Reject <span className="text-danger">*</span>
                        </label>

                        <div class="mb-3">
                          {/* <label for="message-text" class="col-form-label">Message:</label> */}
                          <textarea
                            value={Reason}
                            onChange={(e) => {
                              setReason(e.target.value);
                            }}
                            class="bg-white w-full p-2 focus:outline-0 rounded-lg h-32 text-gray-800 border border-gray-200"
                            id="message-text"
                          ></textarea>
                        </div>
                        {submitted && !Reason ? (
                          <div className="invalid-feedback d-block">
                            Reason is Required
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className='flex items-center justify-end gap-2'>


                        <button
                          type="button"
                          id="CloseReasonModel"
                          className=" justify-center bg-gray-400 text-white rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                          onClick={closeModal}
                        >
                          Close
                        </button>
                        <button type="submit" class="btn btn-primary">
                          Submit
                        </button>
                      </div>

                    </form>


                    {/* <div className="flex items-center justify-center">
                        <button
                          onClick={() => {
                            history("/login");
                            document.getElementById("CloseBidModel").click();
                          }}
                          type="submit"
                          class="bg-primary text-white px-4 py-2 text-sm rounded-lg"
                        >
                          Ok
                        </button>
                      </div> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


    </>
  );
}
