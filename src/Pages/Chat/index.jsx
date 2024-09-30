import React, { useState, useEffect } from 'react';
import { FaMoon } from "react-icons/fa";
import { GoHome, GoSearch } from "react-icons/go";
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
import SideChat from './SideChat';
import moment from 'moment';
import { CiHome } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

export default function Chat() {

const [ChatWithUser,setChatWithUser]=useState(null);
// const obj={Data:'here'};
// ChatWithUser.current=obj
  const [darkMode, setDarkMode] = useState(false);
  const history=useNavigate()
  const user = useSelector(state => state.user)
  const currectChat = useRef()

  const messages = useRef()
  const [chatMessages, setChatMessages] = useState([]);

console.log(chatMessages,"chatMessages")
  const [sidechat, setsidechat] = useState([]);
  const [chatRoomId, setChatRoomId] = useState("");
  const [isonline, setonline] = useState(false);

  console.log(isonline,"???????????????")
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


  const joinChat = (id) => {
    let payload = {
      chat_by: user._id || user?.id,
      chat_with: id
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
    ApiClient.get('chat/user/recent-chats/all', { user_id: user?.id||user?._id }, environment.chat_api).then(res => {
      if (res.success) {
        setsidechat(res?.data?.data)
      }
    })
  }

  const getUserDetail=(id)=>
  {
    ApiClient.get(`user/detail`, { id: id }).then((res) => {
      if (res.success) {
       console.log(res.data,"===============")
      }
  
    });
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


    let id = methodModel.getPrams('id')
 


  socketModel.on("user-online", (data) => {   
    if (id == data.data.user_id) {
      setonline(true)
    }
  });

  socketModel.on("user-offline", (data) => {   
    if (id == data.data.user_id) {
      setonline(false)
    }
  });
  }, [])


  let id = methodModel.getPrams('id')


useEffect(()=>{ 
  if (id) {
    // assignmentDetail(id)
  joinChat(id)
  getUserDetail(id)
  }
  else if(ChatWithUser?.id){
    
  }
},[ChatWithUser,id])


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
    ApiClient.multiImageUpload('upload/document/multiple', files).then(res => {
      e.target.value = ''
      loader(false)
      if (res.success) {
        let value = {
          room_id: chatRoomId,
          type: 'IMAGE',
          media:res?.data?.imagePath
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


  const ChatSelectorHandler=(data)=>{
    console.log(data?.room_members[0],"datadatadatadata")
    history("/chat")
    joinChat(data?.room_members[0].user_id)
    getUserDetail(data?.room_members[0].user_id)
    setChatWithUser(data);  
  }


  return (
    <>
      <div className="main_chats h-screen overflow-hidden">
        <div className="flex">
         
          <SideChat sidechat={sidechat} ChatSelectorHandler={ChatSelectorHandler}/>

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
                                {itm?.type == "IMAGE" ? <> 
                                {itm?.media?.map((item)=>{
                                  return  <img
                                  src={methodModel.userImg(
                                    item,"chat"
                                  )}
                                  className="h-32 w-32 rounded-full mb-4 object-contain "
                                />
                                })}
                               
                                </> : <p class="text-sm">{itm?.content}</p>}

                              </div>
                              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                              {/* <span class="text-xs text-gray-500 leading-none">{MintTime(itm?.createdAt)}</span> */}
                            </div>
                            <img
                                  src={methodModel.userImg(
                                    itm?.sender_image
                                  )}
                                  className="h-10 w-10 rounded-full mb-4 object-contain "
                                />
                          </div>
                        </> :
                          <div class="flex w-full mt-2 space-x-3 max-w-xs">
                             <img
                                  src={methodModel.userImg(
                                    itm?.sender_image
                                  )}
                                  className="h-10 w-10 rounded-full mb-4 object-contain "
                                />
                            <div>
                              <div class="bg-white p-3 rounded-r-lg rounded-bl-lg">
                              {itm?.type == "IMAGE" ? <> 
                                {itm?.media?.map((item)=>{
                                  return  <img
                                  src={methodModel.userImg(
                                    item,"chat"
                                  )}
                                  className="h-32 w-32 rounded-full mb-4 object-contain "
                                />
                                })}
                               
                                </> : <p class="text-sm">{itm?.content}</p>}
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
                          <input type="file" multiple onChange={uploadImage} accept="image/*" className="d-none" />
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
