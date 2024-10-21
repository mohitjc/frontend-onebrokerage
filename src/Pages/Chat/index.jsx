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
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import ApiClient from '../../methods/api/apiClient';
import environment from '../../environment';
import socketModel from '../../models/socketModel';
import methodModel from '../../methods/methods';
import { IoIosArrowUp } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import SelectDropdown from '../../components/common/SelectDropdown';
import SideChat from './SideChat';
import MultiSelectDropdown from '../../components/common/MultiSelectDropdown';
import moment from 'moment';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { BsEmojiSmile } from "react-icons/bs";
import { CiHome } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import AgoraUIKit from 'agora-react-uikit';
import AgoraRTC from "agora-rtc-sdk-ng";

export default function Chat() {
  const AxiosCancelToken = axios.CancelToken;
  const CancelRefToken = useRef(0)
  const [emoji, setemoji] = useState(false)
  const [ChatWithUser, setChatWithUser] = useState(null); 
  const [ChatWithUserName, setChatWithUserName] = useState({});
  console.log(ChatWithUserName,"ChatWithUserName")
  const [callingUser,setCallingUser]=useState({})
  const [darkMode, setDarkMode] = useState(false);
  const [addmember, setaddmember] = useState(false)
  const [adddrivermemberlisting, setadddrivermemberListing] = useState([])
  const [addstafmemberlisting, setaddstaffmemberListing] = useState([])

  const history = useNavigate()
  const [driverfilters, setdriverfilters] = useState([])

  const [stafffilters, setstafffilters] = useState([])
  const [filters, setFilter] = useState({
    search: "",
  });

  const user = useSelector(state => state.user)
  const currectChat = useRef()
  const messages = useRef()
  const [chatMessages, setChatMessages] = useState([]);
  const [currentchatdata, setcurrentchatdata] = useState()
  const [isOpenmodal, setisOpenmodal] = useState(false);
  const [isOpenGroupmodal, setisOpenGroupmodal] = useState(false)
  const [sidechat, setsidechat] = useState([]);
  const [chatRoomId, setChatRoomId] = useState("");
  const [isonline, setonline] = useState(false);
  const [text, setText] = useState('');
  let ar = sessionStorage.getItem("activeRooms");
  const activeRooms = useRef(ar ? JSON.parse(ar) : []);


// **************************************vedio call**********************

const [inCall, setInCall] = useState(false);  // To track whether the user is in a call
const [channelName, setChannelName] = useState('');  // To store the channel name
const [rtcProps, setRtcProps] = useState({});  // RTC props including token and channel name
const [client, setClient] = useState(null);  // Store Agora RTC client
const [screenTrack, setScreenTrack] = useState(null); // Store screen sharing track
const [isJoining, setIsJoining] = useState(false); // Track if a user is in the process of joining the call
const [token, setToken] = useState(''); 
// Your Agora App ID (replace with your actual App ID)
const appId = environment.appId;  // Replace with your Agora App ID


// Function to check camera permissions
const checkCameraPermission = async () => {
  // return true
  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
    return true;  // Camera access granted
  } catch (error) {
    console.error("Camera access denied:", error);
    return false;  // Camera access denied
  }
};

// Handle starting the call
const startCall = async () => {
  if (isJoining) return; // Prevent multiple join attempts
  const hasPermission = await checkCameraPermission();
  if (!hasPermission) {
    alert('Camera access is required to start the call. Please allow camera access in your browser settings.');
    return;  // Exit the function if camera access is denied
  }

  if (channelName) {
    setIsJoining(true); // Set to true while joining the call
    try {
      ApiClient.get(`chat/user/getagoratoken?channelName=${channelName}&uid=${user?._id||user?.id}&role=publisher`,{},environment.chat_api).then((res) => {
        if (res.success) {
          setToken(res?.data?.token)
          setChannelName(res?.data?.channelName||channelName)
        }   
      });

      // Log the token to ensure it's correct
      console.log('Token:', token);
      // Initialize Agora client
      const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
      console.log(agoraClient,"agoraclient")
      setClient(agoraClient); // Save the client for later use (e.g., screen sharing)
      setRtcProps({
        appId: appId,  // Your Agora App ID
        channel:channelName, 
        token: token,  // Token from backend or null
      });
      // Join the Agora channel with the token or null
      // await agoraClient.join(appId, responseChannelName, token, null);  // Join the Agora channel
      setInCall(true);  // Mark user as in the call
      setCallingUser(user?.id)
    } catch (error) {
      console.error("Error starting the call:", error);
      alert('Failed to start the call. Please check the console for more details.');
    } finally {
      setIsJoining(false);  
    }
  } else {
    alert('Please enter a valid channel name');
  }
};

// Handle ending the call
const endCall = async () => {
  if (client) {
    await client.leave();  // Leave the Agora channel
  }
  setInCall(false);  
};

// Handle screen sharing
const startScreenShare = async () => {
  try {
    if (client) {
      // Create the screen-sharing track
      const screenTrack = await AgoraRTC.createScreenVideoTrack();
      setScreenTrack(screenTrack);
      // Publish the screen-sharing track
      await client.publish(screenTrack);
      console.log("Screen sharing started!");
    } else {
      console.error("Agora client not initialized");
    }
  } catch (error) {
    console.error("Error starting screen sharing:", error);
  }
};

// Cleanup screen share track when component unmounts or when screen share is stopped
useEffect(() => {
  return () => {
    if (screenTrack) {
      screenTrack.stop();
      screenTrack.close();
    }
  };
}, [screenTrack]);

// **************************************vedio call**********************

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

  }

  function closeGroupModal() {
    setisOpenGroupmodal(false)
  }

  function openGroupModal() {
    setisOpenGroupmodal(true)

  }




  const AddMember = () => {
    const newfilter = driverfilters.concat(stafffilters)
    const payload = {
      users: newfilter,
      group_id: chatRoomId,
      admin_id: user?.id
    }
    ApiClient.post("chat/user/group/add-member", payload, {}, environment.chat_api).then((res) => {
      if (res.success) {
        allroommemeber()
      }
      closeModal()
    });
  }

  const deleteMembers = (data) => {
    const payload = {
      room_id: chatRoomId,
      user_id: data?.user_id
    }
    ApiClient.put("chat/user/group/remove-member", payload, environment.chat_api).then((res) => {
      if (res.success) {
        // toast.success(res?.message)
        setChatWithUser(ChatWithUser?.room_members?.filter((itm) => itm?.user_id != data?.user_id))
      }
      closeGroupModal()
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
        setChatRoomId("")
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
        room_id: chatRoomId
      }
    }

    loader(true)
    ApiClient.post('chat/user/join-group', payload, {}, environment.chat_api).then(res => {
      loader(false)
      if (res.success) {
        let room_id = res.data.room_id
        setChatRoomId(room_id)
        // currectChat.current=room_id
      }
    })
  }

  const allroommemeber = (p={}) => {
    let filter = { ...filters, ...p, role: "carrier" ,board_id:"",user_id: user?.id || user?._id};
    ApiClient.get('chat/user/recent-chats/all',filter, environment.chat_api).then(res => {
      if (res.success) {
        setsidechat(res?.data?.data)
        setChatWithUser(res?.data?.data?.find((item) => item?.room_id == chatRoomId))
      }
    })
  }

  const AddDriver = () => {
    ApiClient.get("chat/user/group/allusers", { user_id: user?.id || user?._id, role: "driver", room_id: chatRoomId }, environment.chat_api).then((res) => {
      if (res.success) {
        setadddrivermemberListing(
          res?.data?.usersNotInRoom?.map((item) => ({
            id: item?.id || item?._id,
            name: item?.fullName,
          }))
        );
      }
    });
  }

  const AddStaff = () => {
    ApiClient.get("chat/user/group/allusers", { user_id: user?.id || user?._id, role: "staff", room_id: chatRoomId }, environment.chat_api).then((res) => {
      if (res.success) {
        setaddstaffmemberListing(
          res?.data?.usersNotInRoom?.map((item) => ({
            id: item?.id || item?._id,
            name: item?.fullName,
          }))
        );
      }
    });
  }
  const SideChatRef = useRef([]);
  const getUserDetail = (id) => {
    ApiClient.get(`user/detail`, { id: id }).then((res) => {
      if (res.success) {
        setcurrentchatdata(res?.data)
      }

    });
  }

  useEffect(() => {
    SideChatRef.current = sidechat
  }, [sidechat])


  useEffect(() => {
    socketModel.on("receive-message", (data) => {
      console.log(data,"data")
      if (currectChat.current == data.data.room_id) {
        messages.current.push({ ...data.data });

        const uniqueMessages = Array.from(
          new Set(messages.current.map((message) => message._id))
        ).map((id) => {
          return messages.current.find((message) => message._id === id);
        });
        setChatMessages([...uniqueMessages]);
  
        setTimeout(() => {
          chatScroll();
        }, 100);
      }
    });

    socketModel.on("receive-message1", (data) => {
      console.log(data, "==========");
      const updatedSideChat = SideChatRef.current.map((chat) => {
        if (chat?.room_id === data?.data?.room_id) {
          return {
            ...chat,
            last_message: {
              ...chat.last_message,
              content: data?.data?.content,
              createdAt: data.data.createdAt,
            },
            last_message_at: data.data.createdAt, // Ensure you update this field
          };
        }
        return chat;
      });

      const sortedMessages = updatedSideChat
        .filter(chat => chat.last_message_at) 
        .sort((a, b) => new Date(b.last_message_at) - new Date(a.last_message_at));
      setsidechat(sortedMessages);

    });




    let id = methodModel.getPrams('id')
    socketModel.on("user-online", (data) => {

      if (id) {
        if (id == data.data.user_id) {
          setonline(true)

        }
      }
      let newdata = SideChatRef.current?.map((item) => {
        if (item?.room_members[0]?.user_id == data?.data?.user_id) {
          return { ...item, room_members: [{ ...item?.room_members[0], isOnline: true }, ...item?.room_members.slice(1)] }
        } else {
          return item
        }
      });
      setsidechat([...newdata])
    });


    socketModel.on("user-offline", (data) => {
      if (id) {
        if (id == data.data.user_id) {
          setonline(false)
        }
      }

      let newdata = SideChatRef.current?.map((item) => {
        if (item?.room_members[0]?.user_id == data?.data?.user_id) {
          return { ...item, room_members: [{ ...item?.room_members[0], isOnline: false }, ...item?.room_members.slice(1)] }
        } else {
          return item
        }
      });

      setsidechat([...newdata])
    });
    allroommemeber()

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
      // if (!activeRooms.current.includes(chatRoomId)) {
      activeRooms.current.push(chatRoomId);
      sessionStorage.setItem(
        "activeRooms",
        JSON.stringify(activeRooms.current)
      );
      socketModel.emit("join-room", value);
      // }
      // socketModel.emit("unread-count", value);
      // socketModel.emit("read-all-message", value);
      setChannelName(chatRoomId)
      currectChat.current = chatRoomId
      getChatMessages(chatRoomId);
      AddDriver()
      AddStaff()

    }
  }, [chatRoomId]);


  const handleSubmit = () => {
    if (!text) return
    let value = {
      room_id: chatRoomId,
      type: 'TEXT',
      content: text
    }
    socketModel.emit("send-message", value);
    setText("")
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
        socketModel.emit("send-message", value);
        // getChatMessages(chatRoomId);
      }
    })

  }

  // const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // On component mount, check for dark mode preference
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
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

  const readmessages=(roomId)=>
  {
    ApiClient.put("chat/user/read-all-messages", { user_id: user?.id || user?._id, room_id: roomId }, environment.chat_api).then((res) => {
      if (res.success) {
        setaddstaffmemberListing(
          res?.data?.usersNotInRoom?.map((item) => ({
            id: item?.id || item?._id,
            name: item?.fullName,
          }))
        );
      }
    });
  }


  const ChatSelectorHandler = (data) => {
    const updatedSideChat = SideChatRef.current.map((chat) => {
      if (chat?.room_id == data?.room_id) {
        return {
          ...chat,
          unread_count: 0
        };
      }
      return chat;
    });
    setsidechat(updatedSideChat);

    // socketModel.emit(`unread-count`, { user_id: data?.id, room_id: data?.room_id });
    readmessages(data?.room_id)
    getChatMessages(data?.room_id);
    getUserDetail(data?.isGroupChat ? data?.user_id : data?.room_members[0]?.user_id)
    setChatWithUser(data);
    setChatRoomId(data?.room_id)
    setChatWithUserName({ id:data?.id || data?._id ,name: data?.room_name ? data?.room_name : data?.room_members[0].user_name, image: data?.isGroupChat ? data?.room_image : data?.room_members[0]?.user_image, isGroupChat: data?.isGroupChat, isOnline: data?.room_members[0]?.isOnline })
    history("/chat")
  }


  return (
    <>
      <div className="main_chats h-screen overflow-hidden ">
        <div className="flex">

          <SideChat sidechat={sidechat} ChatSelectorHandler={ChatSelectorHandler} allroommemeber={allroommemeber} setsidechat={setsidechat} filters={filters} setFilter={setFilter}/>

          <div className="rigtsie_inners h-screen w-full">
            {chatRoomId ?
              <> <div className="headres_names flex items-center justify-between p-4 bg-white dark:bg-slate-800 ">
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
                      <p className=" text-[12px] xl:text-[15px] text-[#707991]">{ChatWithUserName?.isGroupChat ? `${ChatWithUser?.room_members?.length || 0} Participants` : ChatWithUserName?.isOnline ? "Online" : "Offline"}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 ">
                  {ChatWithUserName?.isGroupChat && user?.role == "carrier" ? <> <button onClick={() => {
                    document
                      .getElementById('OpenmemberModel')
                      .click();
                    // setform({})
                  }}>Add Members</button> </> : <></>}
                  {ChatWithUserName?.isGroupChat ? <button onClick={() => {
                    document
                      .getElementById('OpengroupdModel')
                      .click();
                    // setform({})
                  }}>Group Detail</button> : <></>}

                 
                  {/* ***********************************vedio call**********************************/}

                  {!inCall ? (
                    <div>
                    {callingUser?.id==ChatWithUserName?.id?  <div  onClick={startCall} disabled={isJoining}>
                      JoinCall    
                   </div>:  <div>
                      <MdVideoCall onClick={startCall} disabled={isJoining}/>
                   </div>}
                   </div>
                  
                  ) : (
                    <div>
                      <AgoraUIKit rtcProps={rtcProps} />
                      <div>
                        <button onClick={endCall}>End Call</button>
                        {/* <button onClick={startScreenShare}>Start Screen Share</button> */}
                      </div>
                    </div>
                  )}

                   {/* ***********************************vedio call  */}
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
                            <PencilIcon className="size-4 text-[#fff]" />
                            Edit

                          </button>
                        </MenuItem>

                        <div className="my-1 h-px bg-white/5" />

                        <MenuItem>
                          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <TrashIcon className="size-4 text-[#fff]" />
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

                                  <span class="text-xs text-gray-500 leading-none">{itm?.sender_details?.fullName}, {moment(itm?.createdAt).fromNow()}</span>
                                  {/* <span class="text-xs text-gray-500 leading-none">{MintTime(itm?.createdAt)}</span> */}
                                </div>
                                <img
                                  src={methodModel.userImg(
                                    itm?.sender_details?.image
                                  )}
                                  className="h-10 w-10 rounded-full mb-4 object-contain "
                                />
                              </div>
                            </> :
                              <div class="flex w-full mt-2 space-x-3 max-w-xs">
                                <img
                                  src={methodModel.userImg(
                                    itm?.sender_details?.image
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
                                  
                                  <span class="text-xs text-gray-500 leading-none">{itm?.sender_details?.fullName}, {moment(itm?.createdAt).fromNow()}</span>
                                </div>
                              </div>

                            }
                          </>
                        })}
                      </div>

                      <div class="rounded-xl flex relative items-center gap-4 mt-4">
                        <form className='w-full ' onSubmit={e => { e.preventDefault(); handleSubmit() }}>
                          {emoji ? <div>
                            <EmojiPicker
                              onEmojiClick={e => setText(prevText => `${prevText} ${e?.emoji}`)}
                            />
                          </div> : <></>}
                          <div className='relative'>
                            <div className='absolute items-center left-[17px] top-[17px] flex'>
                              {
                                emoji ? <IoIosArrowUp onClick={(e) => setemoji(false)} className='text-[#707991]' /> : <BsEmojiSmile onClick={(e) => setemoji(true)} className='text-[#707991]' />
                              }


                              <label className=" cursor-pointer ml-4">
                                <ImAttachment className='text-[#707991]' />
                                <input type="file" multiple onChange={uploadImage} accept="image/*" className="d-none" />
                              </label>
                            </div>
                          </div>


                          {/* <LuSmile className='text-xl text-gray-600' />
        <ImAttachment className='text-xl text-gray-600' /> */}



                          <div className='w-full flex items-center gap-2'>
                            <input
                              type="text"
                              value={text}
                              onChange={e => setText(e.target.value)}
                              // placeholder="Type a message..."
                              className="flex-grow border border-[0px] rounded-lg py-3 set-up-input ps-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className='absolute right-[12px]' onClick={e => { e.preventDefault(); handleSubmit() }}> <IoSend className='text-2xl text-[#8BABD8] text-[12px]' /></button>
                          </div>

                        </form>
                      </div>
                    </div>

                  </div>
                </div></> :
              <div className='flex justify-center	 items-center	h-full '>
                <img className='w-[200px] h-[200px]' src='assets/img/no-msg.png'></img></div>}
          </div>
        </div>
      </div>


      <div className="fixed inset-0 hidden  items-center justify-center">
        <button
          type="button"
          id="OpengroupdModel"
          onClick={openGroupModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div>



      <Transition appear show={isOpenGroupmodal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeGroupModal}>
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
                      <div class="modal-body text-center">
                        <img
                          src={methodModel.userImg(
                            ChatWithUserName?.image
                          )}
                          className="h-32 w-32 m-auto border-[2px_solid_#fff] shadow-[2px_1px_10px_0px_#dfdfdf] rounded-full object-contain "
                        />
                        <label class="mt-1 block text-[24px] font-[600]">
                          {' '}
                          {ChatWithUserName?.name}
                        </label>
                        <p className='text-[15px] text-[grey]'>Created by {currentchatdata?.fullName} </p>

                      </div>
                      <p className='text-[14px] text-[grey] uppercase font-[500]'>{ChatWithUser?.room_members?.length} Participants </p>
                      <div className='mt-3'>
                        {ChatWithUser?.room_members ? ChatWithUser?.room_members?.map((item) =>
                          <div className='flex justify-between items-center	mt-2'>
                            <div className='flex items-center '>
                              <img
                                src={methodModel.userImg(
                                  ChatWithUser?.role=="admin"?ChatWithUser?.user_id?.image:item?.user_image
                                )}
                                className="w-[35px] h-[35px] rounded-full object-cover	shadow-[2px_1px_10px_0px_#dfdfdf]"
                              />
                              <p className='ml-2 text-[18px] font-[600] capitalize'>
                                {ChatWithUser?.role=="admin"?ChatWithUser?.user_id?.fullName:item?.user_name}
                              </p>
                            </div>
                            <button className='text-[12px] text-[grey] rounded-full border  border-[grey]  p-[0px_6px]' onClick={(e) => deleteMembers(item)}>Remove</button></div>

                        ) : <>{ChatWithUser?.map((item) =>
                          <div className='flex justify-between items-center mt-2'>
                            <div className='flex items-center '>
                              <img
                                src={methodModel.userImg(
                                  item?.user_image
                                )}
                                className="w-[35px] h-[35px] rounded-full object-cover	shadow-[2px_1px_10px_0px_#dfdfdf]"
                              />
                              <p className='ml-2'>{item?.user_name} </p>
                            </div>
                            <button className='text-[12px] text-[grey] border-[1px_solid_grey] p-[0px_6px]' onClick={(e) => deleteMembers(item)}>Remove</button></div>

                        )}</>}
                      </div>
                      <div className='flex items-center justify-end gap-2'>

                        <button
                          type="button"
                          id="CloseGroupModel"
                          className=" justify-center btn btn-primary mt-3 text-white rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                          onClick={closeGroupModal}
                        >
                          Ok
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

      <div className="fixed inset-0 hidden  items-center justify-center">
        <button
          type="button"
          id="OpenmemberModel"
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
                <Dialog.Panel className="w-full relative max-w-md transform  rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">
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

                  <div className="">

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();

                      }}
                    >
                      <div className='modal-header'>

                        <div className="flex  items-center justify-end">

                          <MdDelete title="Delete Group" onClick={(e) => deletgroup()} className=' text-[27px] text-[red] cursor-pointer' />
                        </div>
                      </div>
                      <div class="modal-body">
                        <label class="mb-5 mt-5 block text-center">
                          {' '}
                          {ChatWithUserName?.name}
                        </label>
                         {addmember ? <div class="mb-3">
                          <MultiSelectDropdown
                            id="statusDropdown"
                            className="role-color "
                            displayValue="name"
                            placeholder="Select Load Type"
                            intialValue={driverfilters}
                            result={(e) => {
                              setdriverfilters(e.value);
                            }}
                            options={adddrivermemberlisting}
                            required={true}
                          />
                          <div className='mt-4'>
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
                          </div>
                        </div> :
                          //  <>{currentchatdata?.fullName}  ~Admin</>
                          <></>
                        }

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
                          addmember ? <><button type="submit" class="btn btn-primary" onClick={(e) => AddMember(ChatWithUser)} >
                            Add
                          </button></> : <><button type="button" class="btn btn-primary" onClick={(e) => setaddmember(true)}>
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
