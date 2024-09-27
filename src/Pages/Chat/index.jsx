import React, { useState, useEffect } from 'react';
import { FaMoon } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { HiMiniBars3 } from "react-icons/hi2";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { WiDaySunny } from "react-icons/wi";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { PencilIcon, TrashIcon, } from '@heroicons/react/16/solid'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoSend } from 'react-icons/io5';
import { LuSmile } from 'react-icons/lu';
import { ImAttachment } from "react-icons/im";
import { IoMdClose } from 'react-icons/io';
import loader from '../../methods/loader';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import ApiClient from '../../methods/api/apiClient';
import environment from '../../environment';
import socketModel from '../../models/socketModel';
import methodModel from '../../methods/methods';
import moment from 'moment';


export default function Chat() {

  const [darkMode, setDarkMode] = useState(false);

  const user = useSelector(state => state.user)
  const currectChat = useRef()
  const messages = useRef()
  const [chatMessages, setChatMessages] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [chatRoomId, setChatRoomId] = useState("");
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');
  const [cloader, setCLoader] = useState('');
  const [assignment, setAssignment] = useState();

  let ar = sessionStorage.getItem("activeRooms");
  const activeRooms = useRef(ar ? JSON.parse(ar) : []);

  const chatScroll = () => {
    // Scroll to the bottom after sending a message
    var chatBox = document.getElementById("chat-box");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  };

  // const MintTime=(time)=>
  // {
  //   const date=moment(time).format("DD-MM-YYYY")
  //   const dateTime=date.getTime()/6000
  //   console.log(dateTime,"dateTime")
  //    const Newdate = new Date();

  //    const now = ((date.getTime()) / (60000));
      
  // }

  const getChatMessages = (id) => {
    // loader(true);
    ApiClient.get("chat/user/message/all", { room_id: id }, environment.chat_api).then((res) => {
      if (res.success) {
        let data = res.data.data;
        setChatMessages(data);
        messages.current = data;
        setTimeout(() => {
          chatScroll();
        }, 100);
      }
      // loader(false);
    });
  };


  const joinChat = (assignment_id) => {
    let payload = {
      chat_by: user._id || user?.id,
      chat_with: assignment_id
    }
    loader(true)
    ApiClient.post('chat/user/join-group', payload, {}, environment.chat_api).then(res => {
      loader(false)
      if (res.success) {
        let room_id = res.data.room_id
        setChatRoomId(room_id)
        currectChat.current = room_id
      }
    })
  }

  const allroommemeber = (id) => {
    ApiClient.get('chat/user/room-members/all', { room_id: id }, environment.chat_api).then(res => {
      if (res.success) {
     
      }
    })
  }


  useEffect(() => {
    socketModel.on("receive-message", (data) => {
      if (currectChat.current == data.data.room_id) {
        messages.current.push({ ...data.data });

        const uniqueMessages = Array.from(
          new Set(messages.current.map((message) => message._id))
        ).map((id) => {
          return messages.current.find((message) => message._id === id);
        });

        console.log("uniqueMessages", uniqueMessages);
        setChatMessages([...uniqueMessages]);
        setTimeout(() => {
          chatScroll();
        }, 100);
      }
    });

    let assignment_id = methodModel.getPrams('assignment_id')
    if (assignment_id) {
      // assignmentDetail(assignment_id)
      joinChat(assignment_id)
    }

  }, [])



  useEffect(() => {
    if (chatRoomId != "") {
      let value = {
        room_id: chatRoomId,
        user_id: user?._id || user?.id,
      };
      if (!activeRooms.current.includes(chatRoomId)) {
        console.log("activeRooms inner", activeRooms);
        activeRooms.current.push(chatRoomId);
        sessionStorage.setItem(
          "activeRooms",
          JSON.stringify(activeRooms.current)
        );
        socketModel.emit("join-room", value);
      }
      // socketModel.emit("unread-count", value);
      // socketModel.emit("read-all-message", value);

      getChatMessages(chatRoomId);
      allroommemeber(chatRoomId)
    }
  }, [chatRoomId]);


  const handleSubmit = () => {
    if (!text) return
    let value = {
      room_id: chatRoomId,
      type: 'TEXT',
      content: text
    }
    console.log("value", value)
    socketModel.emit("send-message", value);
    setText('')
  }

  const uploadImage = (e) => {
    let files = e.target.files
    console.log("files", files)
    loader(true)
    ApiClient.multiImageUpload('user/uploadImage', files).then(res => {
      e.target.value = ''
      loader(false)
      if (res.success) {
        let value = {
          room_id: chatRoomId,
          type: 'IMAGE',
          content: res.image
        }
        console.log("value", value)
        socketModel.emit("send-message", value);
      }
    })

  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // State to control the visibility of the sidebar
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="main_chats h-screen overflow-hidden">
        <div className="flex">
          <div className="block lg:hidden">
            <div className={`chatslefts w-[400px] border-r border-gray-200 shrink-0 py-4 h-screen bg-white fixed top-0 z-50 left-0 transition-transform duration-300 ease-in-out
                  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="hdes_sech flex items-center gap-6 px-4 ">
                <HiMiniBars3 className="text-xl xl:text-3xl ml-2 text-[#707991] hidden lg:block" />
                <IoMdClose onClick={closeSidebar} className="text-2xl block lg:hidden xl:text-3xl ml-2 text-[#707991]" />
                <div className="bg-gray-100 items-center flex gap-2 py-2 px-4 rounded-full w-full">
                  <GoSearch className="text-xl" />
                  <input type="search" className="bg-transparent" />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 h-[calc(100vh-80px)] tailwind-scrollbar overflow-y-auto">
                <div className="flex justify-between gap-4 bg-white px-4 py-2 ">
                  <div className="flex gap-2 xl:gap-4 ">
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



                <div className="flex justify-between gap-4 bg-white px-4 py-2">
                  <div className="flex gap-2 xl:gap-4 ">
                    <img src="assets/img/d1.png" className="h-8 w-8 xl:h-12 xl:w-12 object-contain" />
                    <div className="">
                      <h4 className="flex items-center gap-2 font-semibold text-[14px] xl:text-[18px]">Jessica Drew     </h4>
                      <p className="line-clamp-1 text-[12px] xl:text-[15px] text-[#707991]">All data has been updated</p>
                    </div>
                  </div>
                  <div className=" ">
                    <h4 className="flex items-center gap-2 text-[13px] text-[#707991]">19:48    </h4>
                    <p className="bg-primary rounded-full h-4 w-4 mt-1 flex items-center text-white text-xs justify-center">2</p>

                  </div>
                </div>


                <div className="flex justify-between gap-4 bg-[#F5F5F5] px-4 py-2">
                  <div className="flex gap-2 xl:gap-4 ">
                    <img src="assets/img/d2.png" className="h-8 w-8 xl:h-12 xl:w-12 object-contain" />
                    <div className="">
                      <h4 className="flex items-center gap-2 font-semibold text-[14px] xl:text-[18px]">David Moore     </h4>
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
                <HiMiniBars3 className="text-xl xl:text-3xl ml-2 text-[#707991] hidden md:block" />
                <IoMdClose onClick={closeSidebar} className="text-xl block md:hidden xl:text-3xl ml-2 text-[#707991]" />
                <div className="bg-gray-100 items-center flex gap-2 py-2 px-4 rounded-full w-full">
                  <GoSearch className="text-xl" />
                  <input type="search" className="bg-transparent" />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 h-[calc(100vh-80px)] tailwind-scrollbar overflow-y-auto">
                <div className="flex justify-between gap-4 bg-white px-4 py-2 ">
                  <div className="flex gap-2 xl:gap-4 ">
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


                <div className="flex justify-between gap-4 bg-white px-4 py-2">
                  <div className="flex gap-2 xl:gap-4 ">
                    <img src="assets/img/d1.png" className="h-8 w-8 xl:h-12 xl:w-12 object-contain" />
                    <div className="">
                      <h4 className="flex items-center gap-2 font-semibold text-[14px] xl:text-[18px]">Jessica Drew     </h4>
                      <p className="line-clamp-1 text-[12px] xl:text-[15px] text-[#707991]">All data has been updated</p>
                    </div>
                  </div>
                  <div className=" ">
                    <h4 className="flex items-center gap-2 text-[13px] text-[#707991]">19:48    </h4>
                    <p className="bg-primary rounded-full h-4 w-4 mt-1 flex items-center text-white text-xs justify-center">2</p>

                  </div>
                </div>


                <div className="flex justify-between gap-4 bg-[#F5F5F5] px-4 py-2">
                  <div className="flex gap-2 xl:gap-4 ">
                    <img src="assets/img/d2.png" className="h-8 w-8 xl:h-12 xl:w-12 object-contain" />
                    <div className="">
                      <h4 className="flex items-center gap-2 font-semibold text-[14px] xl:text-[18px]">David Moore     </h4>
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



          <div className="rigtsie_inners h-screen w-full">
            <div className="headres_names flex items-center justify-between p-4 bg-white dark:bg-black ">


              <div className="flex items-center gap-4">
                <HiMiniBars3 onClick={toggleSidebar} className="text-xl xl:text-3xl ml-2 text-[#707991] block lg:hidden" />
                <div className="flex gap-2 xl:gap-4 ">
                  <img src="assets/img/d1.png" className="h-12 w-12 xl:h-12 xl:w-12 object-contain" />
                  <div className="">
                    <h4 className="flex items-center gap-2 font-semibold text-[14px] xl:text-[18px]">David Moore  </h4>
                    <p className=" text-[12px] xl:text-[15px] text-[#707991]">last seen 5 mins ago</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 ">
                <div className="darkmode">

                  <div className="flex items-center gap-4">
                    <p className="text-sm">Turn On Dark Mode</p>
                    <label htmlFor="switch" className="toggle">
                      <input
                        type="checkbox"
                        className="input"
                        id="switch"
                        checked={darkMode}
                        onChange={toggleDarkMode}
                      />
                      <div className="icon icon--moon">
                        <FaMoon />
                      </div>
                      <div className="icon icon--sun">
                        <WiDaySunny className="text-2xl" />
                      </div>
                    </label>
                  </div>

                </div>


                <div className="mt-1">
                  <Menu>
                    <MenuButton className="">
                      <HiOutlineDotsVertical className="text-xl" />

                    </MenuButton>

                    <MenuItems
                      transition
                      anchor="bottom end"
                      className="w-52 origin-top-right mt-4 rounded-xl border border-white/5 bg-primary p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          <PencilIcon className="size-4 fill-white/30" />
                          Edit

                        </button>
                      </MenuItem>

                      <div className="my-1 h-px bg-white/5" />

                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          <TrashIcon className="size-4 fill-white/30" />
                          Delete

                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>

              </div>

            </div>

            <div className="bg-[#E4EBFF]  w-full relative  text-gray-800  overflow-hidden">
              <div className='flex flex-col items-center justify-center h-[calc(100vh-80px)] py-4 lg:py-8 w-[100%] lg:w-[80%] mx-auto px-4  '>
                <div class="flex flex-col flex-grow w-full  overflow-hidden">
                  <div class="flex flex-col flex-grow h-0 p-4 tailwind-scrollbar overflow-auto">
                    {chatMessages && chatMessages?.map((itm, i) => {

                      return <>


                        {(itm?.sender == user?.id) ? <>

                          <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                            <div>
                              <div class="bg-primary text-white p-3 rounded-l-lg rounded-br-lg">
                                <p class="text-sm">{itm?.content}</p>
                              </div>
                              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                              {/* <span class="text-xs text-gray-500 leading-none">{MintTime(itm?.createdAt)}</span> */}
                            </div>
                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                          </div>
                        </> :
                          <div class="flex w-full mt-2 space-x-3 max-w-xs">
                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                            <div>
                              <div class="bg-white p-3 rounded-r-lg rounded-bl-lg">
                                <p class="text-sm">{itm?.content}</p>
                              </div>
                              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                            </div>
                          </div>

                        }
                      </>
                    })}
                  </div>

                  <div class="bg-white p-4 rounded-xl flex items-center gap-4 mt-4">
                    <form className='w-full' onSubmit={e => { e.preventDefault(); handleSubmit() }}>
                      <div className='flex gap-4 items-center relative'>
                        <label className="absolute left-[10px] top-1/2 cursor-pointer">
                          <ImAttachment className='text-xl text-gray-600' />
                          <input type="file" onChange={uploadImage} accept="image/*" className="d-none" />
                        </label>
                        {/* <LuSmile className='text-xl text-gray-600' />
                      <ImAttachment className='text-xl text-gray-600' /> */}
                      </div>


                      <div className='w-full flex items-center gap-2'>
                        <input
                          type="text"
                          value={text}
                          onChange={e => setText(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-grow border border-gray-300 rounded-lg py-3  ps-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={e => { e.preventDefault(); handleSubmit() }}> <IoSend className='text-2xl text-primary' /></button>
                      </div>

                    </form>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>





    </>
  );
}
