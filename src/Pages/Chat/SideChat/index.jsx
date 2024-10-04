import React, { useState, useEffect } from 'react';
import { FaMoon } from "react-icons/fa";
import { GoHome, GoSearch } from "react-icons/go";
import { HiMiniBars3 } from "react-icons/hi2";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import methodModel from '../../../methods/methods';
import { useNavigate } from 'react-router-dom';
import { ImImages } from "react-icons/im";
import moment from 'moment';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import { MdClose } from 'react-icons/md';
import { toast } from "react-toastify";
import { MdGroupAdd } from "react-icons/md";
import environment from '../../../environment';
export default function SideChat({ sidechat, ChatSelectorHandler,allroommemeber }) {
  const user = useSelector((state) => state.user);

  const history = useNavigate()
  const [isOpenmodal, setisOpenmodal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [form,setform]=useState({})

  function closeModal() {
    setisOpenmodal(false)
  }

  function openModal() {
    setisOpenmodal(true)
  }

  const uploadImage = (e) => {
    console.log(e, "images")
    setform({ ...form, baseImg: e.target.value });
    let files = e.target.files;
    let file = files.item(0);
    loader(true);
    ApiClient.postFormData('upload/image?modelName=users', { file: file }).then(
      (res) => {
        if (res.success) {

          let image = res?.data?.fullpath;
          setform({ ...form, image: image, baseImg: '' });
        } else {
          setform({ ...form, baseImg: '' });
        }
        loader(false);
      }
    );
  };


  const createGroup=()=>
  {
    let value = {
      group_name:form?.group_name,
      image:form?.image,
      users:[{user_id:user?.id,role:"admin"}]
    };
    ApiClient.post(`chat/user/group/create`, value,{},environment.chat_api).then((res) => {
      if (res.success) {
        allroommemeber()
        closeModal()
      }
      loader(false);
    });
  }


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
            {
              user?.role=="carrier"?    <button  onClick={() => {
                document
                  .getElementById('OpenReasonModel')
                  .click();
                setform({})
              }}><MdGroupAdd className='text-[#494f9f] text-[23px]' />
</button>:<></>
            }
        
          </div>

          <div className="mt-4 flex flex-col gap-2 h-[calc(100vh-80px)] tailwind-scrollbar overflow-y-auto">

            {sidechat?.map((item) =>

              <div className="flex justify-between gap-4 bg-white px-4 py-2 " >
                <div className="flex gap-2 xl:gap-4 cursor-pointer" onClick={e => ChatSelectorHandler(item)}>
                  {item?.isGroupChat?<><img
                        src={methodModel.userImg(
                          item?.room_image
                        )}
                        className="h-10 w-10 rounded-full mb-4 object-contain "
                      /></>:<> {
                    item?.room_members?.map((itm) =>
                      <img
                        src={methodModel.userImg(
                          itm?.user_image
                        )}
                        className="h-10 w-10 rounded-full mb-4 object-contain "
                      />
                    )
                  }</>}
                 

                  <div className="">
                    <h4 className="flex items-center gap-2 font-semibold text-[14px] xl:text-[18px]">{item?.isGroupChat?item?.room_name:item?.room_members?.map((itm) => itm?.user_name)}<TbRosetteDiscountCheckFilled className="text-blue-500" />  </h4>
                    <p className="line-clamp-1 text-[12px] xl:text-[15px] text-[#707991]">{item?.last_message?.type == "TEXT" ? item?.last_message?.content :item?.last_message?.type == "IMAGE"? <><span className='flex gap-1 items-center'><ImImages /> Photos</span></>:<></>}</p>
                  </div>
                </div>
                <div className=" ">
                  <h4 className="flex items-center gap-2 text-[13px] text-[#707991]">
                    {moment(item?.last_message_at).fromNow()=="a day ago"?"1 day ago":moment(item?.last_message_at).fromNow()}
                    {/* {calculateTime(item?.last_message_at)} */}
                  {/* 2 min */}
                  </h4>
                  
                  {item?.unread_count?<p className="bg-primary rounded-full h-4 w-4 mt-1 flex items-center text-white text-xs justify-center">{item?.unread_count}</p>:<></>}
                  

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



      <Transition appear show={isOpenmodal} as={Fragment}>
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

                    {/* <div className='h-16 w-16 rounded-full absolute -top-16 right-1/2 left-1/2  -translate-x-1/2 text-white flex items-center justify-center bg-red-500 shadow-md mx-auto border-2 border-red-800 p-4'>
                    <MdClose className='text-4xl font-bold' />

                    </div> */}

                 


                  </div>

                  <div className="mt-5">

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        createGroup();
                      }}
                    >
                      <div class="modal-body">
                        <label class="mb-2 block">
                          {' '}
                         Create a group <span className="text-danger">*</span>
                        </label>
                        <div className="flex flex-col items-center justify-center">
                      <img
                        src={methodModel.userImg(
                          form && form.image
                        )}
                        className="h-[100px] w-[100px] rounded-full mb-4 object-contain "
                      />

                      <div>
                        <label className="new_images bg-primary bg-white p-2 rounded-lg inline-flex items-center gap-2 text-white edit">
                          <input
                            id="bannerImage"
                            type="file"
                            className="d-none "
                            accept="image/*"
                            value={
                              form.baseImg ? form.baseImg : ''
                            }
                            onChange={(e) => {
                              uploadImage(e);
                            }}
                          />
                          <span className="uploader">
                          {/* <IoCameraSharp className="text-2xl" /> */}

                          </span>
                         Upload Image
                        </label>
                      </div>
                     
                    </div>
                        <div class="mb-3">

                        <input
                                type="text"
                                className="pl-2 shadow-[rgba(0,_0,_0,_0.16)_0px_10px_36px_0px,_rgba(0,_0,_0,_0.06)_0px_0px_0px_1px] p-2 w-full border-[0px] mt-2 rounded-lg"
                                value={form.group_name}
                                onChange={(e) =>
                                  setform({ ...form, group_name: e.target.value })
                                }
                                // required
                              />
                        </div>
                   
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
                          Create a group
                        </button>
                      </div>

                    </form>


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
