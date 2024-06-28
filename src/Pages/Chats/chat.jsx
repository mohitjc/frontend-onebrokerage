import React from "react";
import methodModel from "../../methods/methods";

function Chat({
  user,
  onInputChange,
  uploadImage,
  message,
  chatMessages,
  onSendClick,
  activeChat,
}) {
  const sender = activeChat?.user_details?.find(
    (_user) => _user._id !== user?._id
  );
  return (
    <>
      {chatMessages && (
        <div className="col-span-8 2xl:col-span-9">
          <div className="bg-gray-100">
            <div className=" p-4">
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

                    <p className="text-[12px] text-gray-600 line-clamp-1 ">
                      {activeChat?.room_details?.subject}
                    </p>
                  </div>
                </div>
                <div>
                  {/* <p className="text-[10px]">11:43 AM</p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-[100%] md:h-[450px] lg:h-[550px] xl:h-[650px] overflow-auto">
            <div id="chat-box" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
              {chatMessages.map((message) => {
                return (
                  <>
                    {message.sender !== user?._id ? (
                      <div className="chat-message">
                        <div className="flex items-end">
                          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                            <div>
                              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-100 text-gray-600">
                                {message.content}
                                {/* <span className="text-gray-400 ">
                                {moment(message?.createdAt).format("LT")}
                              </span> */}
                              </span>
                            </div>
                          </div>
                          <img
                            src={methodModel.noImg(message.sender_image)}
                            alt="My profile"
                            className="w-6 h-6 rounded-full order-1"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="chat-message">
                        <div className="flex items-end justify-end">
                          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                            <div>
                              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-primary text-white ">
                                {message.content}
                                {/* <span className="text-gray-400 ">
                                {moment(message?.createdAt).format("LT")}
                              </span> */}
                              </span>
                            </div>
                          </div>
                          <img
                            src={methodModel.noImg(message.sender_image)}
                            alt="My profile"
                            className="w-6 h-6 rounded-full order-2"
                          />
                        </div>
                      </div>
                    )}
                  </>
                );
              })}

              {/* <div class="flex items-center justify-center py-4">
                <div class="border-t border-gray-300 w-full"></div>
                <span class="px-3 text-gray-500 text-sm">Yesterday</span>
                <div class="border-t border-gray-300 w-full"></div>
              </div> */}
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div className="relative flex">
                <span className="absolute inset-y-0 flex items-center">
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-100 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      ></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="text"
                  onChange={onInputChange}
                  value={message}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onSendClick();
                    }
                  }}
                  placeholder="Write your message!"
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-100 rounded-md py-3"
                />
                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex gap-2">
                  <label
                    type="button"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-100 focus:outline-none"
                  >
                    <input type="file" className="hidden" accept="image/*" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </label>

                  <button
                    type="button"
                    onClick={onSendClick}
                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-primary focus:outline-none"
                  >
                    <span className="font-bold">Send</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 ml-2 transform rotate-90"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
