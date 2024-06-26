import React from "react";
import { LiaTrashAlt } from "react-icons/lia";

function Lists() {
  return (
    <div className="border rounded col-span-2 ...">
      <Chat />
    </div>
  );
}

export default Lists;

const Chat = () => {
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="">
              <img className="h-8" src="/assets/img/person.jpg" alt="" />
            </div>
            <div className="">
              <p className="text-[12px]">Chelsea Hagon</p>
              <p className="text-[12px]">December 9 at 11:43 AM</p>
            </div>
          </div>
          <div>
            <button className="">
              <span className="cursor-pointer hover:opacity-70 rounded-lg w-10 h-10 !text-primary flex items-center justify-center text-lg ">
                <LiaTrashAlt />
              </span>
            </button>
          </div>
        </div>

        <div className="">
          <p>Chat Subject</p>
        </div>
      </div>
    </>
  );
};
