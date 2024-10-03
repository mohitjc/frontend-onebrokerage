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
import SelectDropdown from '../../components/common/SelectDropdown';
import SideChat from './SideChat';
import MultiSelectDropdown from '../../components/common/MultiSelectDropdown';
import moment from 'moment';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { CiHome } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Chat() {
  const AxiosCancelToken = axios.CancelToken;
  const CancelRefToken = useRef(0)
  const [ChatWithUser, setChatWithUser] = useState(null);
  const [ChatWithUserName, setChatWithUserName] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [addmember, setaddmember] = useState(false)
  const [adddrivermemberlisting, setadddrivermemberListing] = useState([])
  const [addstafmemberlisting, setaddstaffmemberListing] = useState([])
  const history = useNavigate()
  const [driverfilters, setdriverfilters] = useState([])

  const [stafffilters, setstafffilters] = useState([])


  const user = useSelector(state => state.user)
  const currectChat = useRef()

  const messages = useRef()
  const [chatMessages, setChatMessages] = useState([]);
  const [currentchatdata, setcurrentchatdata] = useState()
  const [isOpenmodal, setisOpenmodal] = useState(false);
  const [sidechat, setsidechat] = useState([]);
  const [chatRoomId, setChatRoomId] = useState("");
  const [isonline, setonline] = useState(false);


  const [text, setText] = useState('');

  let ar = sessionStorage.getItem("activeRooms");
  const activeRooms = useRef(ar ? JSON.parse(ar) : []);

  const chatScroll = () => {
    // Scroll to the bottom after sending a message
    var chatBox = document.getElementById("chat-box");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  };

  function closeModal() {
    setisOpenmodal(false)
    setaddmember(false)
  }

  function openModal() {
    setisOpenmodal(true)
    setdriverfilters([])
    setstafffilters([])
  }



  const AddMember = () => {
  const newfilter=driverfilters.concat(stafffilters)
    const payload = {
      users: newfilter,
      group_id: chatRoomId,
      admin_id: user?.id
    }
    ApiClient.post("chat/user/group/add-member", payload, {}, environment.chat_api).then((res) => {
      if (res.success) {
        console.log(res, "|||||||||||||||||||||||")
      }
      closeModal()
    });
  }


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

  const deletgroup = () => {
    ApiClient.delete(`chat/user/group?room_id=${chatRoomId}`, {}, environment.chat_api).then((res) => {
      if (res.success) {
        toast(res?.message)
        closeModal()
        allroommemeber()
      }
      // loader(false);
    });
  }



  const joinChat = (chatwithid) => {

    CancelRefToken.current += 1
    if (CancelRefToken.current > 1) {
      return
    }
    let payload
    if (id) {
      payload = {
        chat_by: user._id || user?.id,
        chat_with: chatwithid
      }
    }
    else {
      payload = {
        room_id: chatwithid
      }
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

  const allroommemeber = () => {
    ApiClient.get('chat/user/recent-chats/all', { user_id: user?.id || user?._id }, environment.chat_api).then(res => {
      if (res.success) {
        setsidechat(res?.data?.data)

      }
    })
  }

  const AddDriver = () => {
    ApiClient.get("users/list", { addedBy: user?.id || user?._id, role: "driver" }).then((res) => {
      if (res.success) {
        setadddrivermemberListing(
          res?.data?.data?.map((item) => ({
            id: item?.id,
            name: item?.fullName,
          }))
        );
      }
    });
  }

  const AddStaff = () => {
    ApiClient.get("users/list", { addedBy: user?.id || user?._id, role: "staff" }).then((res) => {
      if (res.success) {
        setaddstaffmemberListing(
          res?.data?.data?.map((item) => ({
            id: item?.id,
            name: item?.fullName,
          }))
        );
      }
    });
  }



  const getUserDetail = (id) => {
    ApiClient.get(`user/detail`, { id: id }).then((res) => {
      if (res.success) {
        setcurrentchatdata(res?.data)
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

    allroommemeber()
    AddDriver()
    AddStaff()
  }, [])



  let id = methodModel.getPrams('id')


  useEffect(() => {
    if (id) {
      joinChat(id)
      allroommemeber(user?.id)
      getUserDetail(id)
    }

  }, [id])


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
    getChatMessages(chatRoomId);
    allroommemeber()
    setText('')
  }


  const uploadImage = (e) => {
    let files = e.target.files

    loader(true)
    ApiClient.multiImageUpload('upload/document/multiple', files).then(res => {
      e.target.value = ''
      loader(false)
      if (res.success) {
        let value = {
          room_id: chatRoomId,
          type: 'IMAGE',
          media: res?.data?.imagePath
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


  const ChatSelectorHandler = (data) => {

    history("/chat")
    getChatMessages(data?.room_id);
    getUserDetail(data?.isGroupChat ? data?.user_id : data?.room_members[0]?.user_id)
    setChatWithUser(data);
    setChatRoomId(data?.room_id)
    setChatWithUserName({ name: data?.room_name ? data?.room_name : data?.room_members[0].user_name, image: data?.room_image ? data?.room_image : data?.room_members[0]?.user_image, isGroupChat: data?.isGroupChat })
  }


  return (
    <>
      <div className="main_chats h-screen overflow-hidden">
        <div className="flex">

          <SideChat sidechat={sidechat} ChatSelectorHandler={ChatSelectorHandler} allroommemeber={allroommemeber} />

          <div className="rigtsie_inners h-screen w-full">
            {chatRoomId ? <> <div className="headres_names flex items-center justify-between p-4 bg-white dark:bg-black ">
              <div className="flex items-center gap-4">
                <HiMiniBars3 onClick={toggleSidebar} className="text-xl xl:text-3xl ml-2 text-[#707991] block lg:hidden" />
                <div className="flex gap-2 xl:gap-4 ">
                  <img
                    src={methodModel.userImg(
                      ChatWithUserName?.isGroupChat ? ChatWithUserName?.image : currentchatdata?.image
                    )}
                    className="h-12 w-12 rounded-full mb-4 object-contain "
                  />
                  <div className="">
                    <h4 className="flex items-center gap-2 font-semibold text-[14px] xl:text-[18px]">{ChatWithUserName?.name || currentchatdata?.fullName}</h4>
                    <p className=" text-[12px] xl:text-[15px] text-[#707991]">{currentchatdata?.isOnline ? "Online" : "Offline"}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 ">
                {ChatWithUserName?.isGroupChat && user?.role=="carrier"? <button onClick={() => {
                  document
                    .getElementById('OpenaddmemberModel')
                    .click();
                  // setform({})
                }}>Group Info</button> : <></>}

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
                                    {itm?.media?.map((item) => {
                                      return <img
                                        src={methodModel.userImg(
                                          item, "chat"
                                        )}
                                        className="h-32 w-32 rounded-full mb-4 object-contain "
                                      />
                                    })}

                                  </> : <p class="text-sm">{itm?.content}</p>}

                                </div>
                                <span class="text-xs text-gray-500 leading-none">{moment(itm?.createdAt).fromNow()}</span>
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
                                    {itm?.media?.map((item) => {
                                      return <img
                                        src={methodModel.userImg(
                                          item, "chat"
                                        )}
                                        className="h-32 w-32 rounded-full mb-4 object-contain "
                                      />
                                    })}

                                  </> : <p class="text-sm">{itm?.content}</p>}
                                </div>
                                <span class="text-xs text-gray-500 leading-none">{moment(itm?.createdAt).fromNow()}</span>
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
              </div></> : <>No Messages</>}
          </div>
        </div>
      </div>


      <div className="fixed inset-0 hidden  items-center justify-center">
        <button
          type="button"
          id="OpenaddmemberModel"
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
                        
                      }}
                    >
                      <div class="modal-body">
                        <label class="mb-2 block">
                          {' '}
                          {ChatWithUserName?.name}
                        </label>
                        <div className="flex flex-col items-center justify-center">

                          <button onClick={(e) => deletgroup()}>Delete Group</button>
                          <div>

                          </div>

                        </div>
                        {addmember ? <div class="mb-3">
                          <MultiSelectDropdown
                            id="statusDropdown"
                            className="role-color"
                            displayValue="name"
                            placeholder="Select Load Type"
                            intialValue={driverfilters}
                            result={(e) => {
                              setdriverfilters(e.value);
                            }}
                            options={adddrivermemberlisting}
                            required={true}
                          />
                          <MultiSelectDropdown
                            id="statusDropdown"
                            className="role-color"
                            displayValue="name"
                            placeholder="Select Load Type"
                            intialValue={stafffilters}
                            result={(e) => {
                              setstafffilters(e.value);
                            }}
                            options={addstafmemberlisting}
                            required={true}
                          />

                        </div> : <>{currentchatdata?.fullName}  ~Admin</>}

                      </div>
                      <div className='flex items-center justify-end gap-2'>

                        {addmember ? <button
                          type="button"
                          id=""
                          className=" justify-center bg-gray-400 text-white rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                          onClick={(e) => setaddmember(false)}
                        >
                          Back
                        </button> : <button
                          type="button"
                          id="CloseReasonModel"
                          className=" justify-center bg-gray-400 text-white rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                          onClick={closeModal}
                        >
                          Close
                        </button>}
                        {
                          addmember?<><button type="submit" class="btn btn-primary" onClick={(e) => AddMember()} >
                          Add 
                        </button></>:<><button type="button" class="btn btn-primary" onClick={(e) => setaddmember(true)}>
                          Add Member
                        </button></>
                        }
                      
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
