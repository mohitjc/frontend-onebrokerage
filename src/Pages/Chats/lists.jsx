import moment from "moment";
import React from "react";
import { LiaTrashAlt } from "react-icons/lia";

function Lists({ chats, onChatRoomClick, user }) {
  return (
    <div className="">
      <div className="py-4 max-h-[650px] overflow-y-auto pr-4 mt-4">
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
        <div className="bg-white hover:bg-[#EB6A59] group hover:!text-gray-100 group  p-2 mb-3">
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
                  <div className="">
                  <p className="text-[14px] font-semibold">
                    {sender?.fullName}
                  </p>
                 
                  <p className="text-[12px] text-gray-600 group-hover:!text-gray-100 line-clamp-1 ">
                    {chat.room_details.subject}
                  </p>

                  </div>
                 
                </div>
              </div>
              <div>
              <p className="text-[10px]">
                    {moment(chat.room_details?.createdAt).format("LT")}
                  </p>
            </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};
