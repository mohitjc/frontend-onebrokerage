import moment from "moment";
import React from "react";
import { LiaTrashAlt } from "react-icons/lia";

function Lists({ chats, onChatRoomClick, user }) {
  return (
    <div className="">
      <div className="mt-4 py-4">
        {chats &&
          chats.map((chat) => {
            const sender = chat.user_details.find(
              (_user) => _user.id !== user._id
            );
            return (
              <Chat chat={chat} onChatClick={onChatRoomClick} sender={sender} />
            );
          })}
      </div>
    </div>
  );
}

export default Lists;

const Chat = ({ chat, onChatClick, sender }) => {
  return (
    <>
      <div className="">
        <div className="bg-white p-4">
          <a
            onClick={() => {
              onChatClick(chat.room_details._id);
            }}
          >
            <div className="flex items-center justify-between  ">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="/assets/img/person.jpg"
                    alt=""
                  />
                </div>
                <div className="">
                  <p className="text-[16px] font-semibold">
                    {sender?.fullName}
                  </p>
                  <p className="text-[10px]">
                    {moment(chat.room_details?.createdAt).format("LT")}
                  </p>
                  <p className="text-[12px] text-gray-600 line-clamp-1 ">
                    {chat.room_details.subject}
                  </p>
                </div>
              </div>
              {/* <div>
              <button className="">
                <span className="cursor-pointer hover:opacity-70 rounded-lg w-10 h-10 !text-primary flex items-center justify-center text-lg text-primary">
                  <LiaTrashAlt />
                </span>
              </button>
            </div> */}
            </div>
          </a>
        </div>
      </div>
    </>
  );
};
