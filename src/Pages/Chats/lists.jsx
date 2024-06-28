import React from "react";
import { LiaTrashAlt } from "react-icons/lia";

function Lists() {
  return (
    <div className="">
      <div className="mt-4 py-4">
        <Chat />
      </div>
    </div>
  );
}

export default Lists;

const Chat = () => {
  return (
    <>
      <div className="">
        <div className="bg-white p-4">
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
                <p className="text-[16px] font-semibold">Chelsea Hagon</p>
                <p className="text-[10px]">11:43 AM</p>
                <p className="text-[12px] text-gray-600 line-clamp-1 ">
                  chat subject chat subject chat subject chat subject chat
                  subject
                </p>
              </div>
            </div>
            <div>
              <button className="">
                <span className="cursor-pointer hover:opacity-70 rounded-lg w-10 h-10 !text-primary flex items-center justify-center text-lg text-primary">
                  <LiaTrashAlt />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
