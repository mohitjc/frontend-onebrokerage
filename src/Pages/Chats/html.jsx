import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import "./style.scss";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import Table from "../../components/Table";
import SelectDropdown from "../../components/common/SelectDropdown";
import statusModel from "../../models/status.model";
import datepipeModel from "../../models/datepipemodel";
import shared from "./shared";
import ApiClient from "../../methods/api/apiClient";
import { useSelector } from "react-redux";
import { LiaEdit, LiaTrashAlt } from "react-icons/lia";
import { PiEyeLight } from "react-icons/pi";
import Lists from "./lists";
import Chat from "./chat";
import { IoSearchOutline } from "react-icons/io5";
import socketModel from "../../models/socketModel";
const Html = ({
  sorting,
  filter,
  edit,
  view,
  statusChange,
  pageChange,
  count,
  deleteItem,
  clear,
  filters,
  setFilter,
  loaging,
  data,
  changestatus,
  isAllow,
  total = { total },
}) => {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatRooms, setChatRooms] = useState();
  const [chatRoomId, setChatRoomId] = useState("");
  const [activeChat, setActiveChat] = useState();
  const [showEmojis, setShowEmojis] = useState(false);

  const chatScroll = () => {
    // Scroll to the bottom after sending a message
    var chatBox = document.getElementById("chat-box");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  };

  chatRooms?.forEach((item) => {
    item.createdAt = new Date(item.createdAt);
  });

  // Step 2: Sort the array based on createdAt field
  chatRooms?.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });

  const handleSendMessage = () => {
    let value = {};
    if (message) {
      value = {
        room_id: chatRoomId,
        type: "TEXT",
        content: message,
        user_id: user?._id,
      };

      chatMessages.push({ ...value, sender: value.user_id });
      setChatMessages([...chatMessages]);
      setTimeout(() => {
        chatScroll();
      }, 100);

      socketModel.emit("send-message", value);
      setMessage("");
    }
  };

  const handleEmojiClick = ({ emoji }) => {
    const _value = message;
    let _message = message.length > 0 ? `${_value} ${emoji}` : `${emoji}`;
    setMessage(_message);
    setShowEmojis(false);
  };

  const getChatRoomsList = () => {
    ApiClient.get("chat/room-members").then((res) => {
      if (res.success) {
        console.log("res", res);
        setChatRooms(res.data.data);
      }
    });
  };
  const getChatMessages = (id) => {
    ApiClient.get("chat/messages", { room_id: id }).then((res) => {
      if (res.success) {
        setChatMessages(res.data.data);
        setTimeout(() => {
          chatScroll();
        }, 100);
      }
    });
  };

  const getActiveChat = (id) => {
    ApiClient.get("chat/room-members", { room_id: id }).then((res) => {
      if (res.success) {
        setActiveChat(res.data.data?.[0]);
      }
    });
  };

  const uploadImage = () => {};

  const handleChatClick = (id) => {
    if (id) {
      console.log("handleChatClick", id);
      setChatRoomId(id);
      getChatMessages(id);
      getActiveChat(id);
    }
  };

  useEffect(() => {
    if (chatRoomId != "") {
      let value = {
        room_id: chatRoomId,
        user_id: user?._id,
      };
      socketModel.emit("join-room", value);
      getChatMessages(chatRoomId);
    }
    console.log("chatRoomId", chatRoomId);
  }, [chatRoomId]);

  useEffect(() => {
    socketModel.on("receive-message", (data) => {
      console.log("data", data);
      getChatMessages(data.data.room_id);
    });
  }, []);

  useEffect(() => {
    {
      getChatRoomsList();
    }
  }, []);

  return (
    <Layout>
      <div className="flex flex-wrap justify-between items-center gap-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-[#111827]">
            {" "}
            {shared.title}
          </h3>
          <p className="text-sm font-normal text-[#75757A]">
            Here you can see all about your {shared.title}
          </p>
        </div>
      </div>

      <div className="shadow-box w-full bg-white rounded-lg mt-6">
        <div className="">
          <div className="grid grid-cols-12 gap-4  ">
            <div className="col-span-4 2xl:col-span-3">
              <div className="bg-gray-100 p-6 h-full">
                <form
                  className="flex items-center max-w-sm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    filter();
                  }}
                >
                  <label for="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="simple-search"
                      value={filters.search}
                      onChange={(e) => {
                        setFilter({ ...filters, search: e.target.value });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  h-10 focus:ring-orange-500 focus:border-[#EB6A59]block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 pr-10"
                      placeholder="Search"
                      required
                    />
                    {filters?.search && (
                      <i
                        className="fa fa-times absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                        aria-hidden="true"
                        onClick={(e) => clear()}
                      ></i>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="p-2.5 text-sm font-medium h-10 text-white  border border-[#EB6A59] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <IoSearchOutline />
                  </button>
                </form>
                <Lists
                  user={user}
                  chats={chatRooms}
                  onChatRoomClick={(id) => {
                    handleChatClick(id);
                  }}
                />
              </div>
            </div>

            {chatRoomId != "" ? (
              <Chat
                user={user}
                activeChat={activeChat}
                onSendClick={handleSendMessage}
                onInputChange={(e) => {
                  setMessage(e.target.value);
                }}
                uploadImage={uploadImage}
                message={message}
                chatMessages={chatMessages}
                onEmojiIconClick={() => {
                  setShowEmojis(!showEmojis);
                }}
                onEmojiClick={handleEmojiClick}
                showEmojis={showEmojis}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Html;
