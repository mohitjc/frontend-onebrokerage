import moment from "moment";
import React from "react";
import { LiaTrashAlt } from "react-icons/lia";
import methodModel from "../../methods/methods";
import FromNow from "../../components/Time/FromNow";

function Lists({ chats, onChatRoomClick, user, activeChat }) {
  return (
    <div className="">
      {chats?.length == 0 && (
        <div className="text-gray-600 text-center py-6">no chats.</div>
      )}
      <div className="py-4 max-h-[200px]  lg:max-h-[650px] overflow-y-auto pr-4 mt-4">
        {chats &&
          chats.map((chat) => {
            const sender = chat.user_details.find(
              (_user) => _user._id != user._id
            );
            return (
              <Chat
                chat={chat}
                onChatClick={onChatRoomClick}
                sender={sender}
                isActive={chat?.room_id == activeChat}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Lists;

const Chat = ({ chat, onChatClick, sender, isActive }) => {
  return (
    <>
      {chat && (
        <div className="">
          <div
            className={` ${
              isActive ? "bg-[#EB6A59] text-white" : "bg-white"
            } hover:bg-[#EB6A59] group hover:!text-gray-100 group  p-2 mb-3`}
          >
            <a
              onClick={() => {
                onChatClick(chat.room_details._id);
              }}
            >
              <div className="">
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="shrink-0">
                    <img
                      className="h-6 w-6  xl:h-12 xl:w-12 rounded-full object-cover"
                      src={methodModel.noImg(sender?.image)}
                      alt=""
                    />
                  </div>
                  <div className="">
                    <div className="">
                      <p className="xl:text-[15px] text-[12px] font-semibold">
                        {sender?.fullName}
                      </p>

                      <p className="xl:text-[12px] text-[10px] w-20 xl:w-32 line-clamp-1 ">
                        {chat?.room_details?.subject}
                      </p>
                    </div>
                  </div>
                </div>
                <div></div>
                <div className="flex justify-end text-[10px] shrink-0">
                  <FromNow date={chat.room_details?.createdAt} />
                </div>
              </div>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
