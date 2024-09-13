
import { TiArrowRightThick, TiStarFullOutline } from "react-icons/ti";
import Header from "../components/global/header2";

const Html = ({

}) => {
 

  return (
    <>
      <div className="hader_tops">
          <Header/>
      </div>

      <div className="bg-[#EAEFFF]">
          <div className="flex flex-col  md:flex-row items-center justify-center gap-4 px-4 lg:px-8 xl:gap-10 relative">
              <div className="data_inners flex flex-col gap-6 xl:gap-8 w-[100%] lg:max-w-[700px] py-10">
                    <h1 className="font-light text-[#1B1C20]  text-[30px] leading-[50px]  xl:leading-[70px] lg:text-[50px]">
                        Get in touch with
                        <span className=" font-bold block">
                            Carriers & Drivers anytime, anywhere with
                            <span className="text-primary font-bold ml-2">Software</span>
                         </span>

                    </h1>

                    <p className="text-[18px] text-[#383A47] leading-[25px] dm">Great software that allows you to chat from any place at any time without any interruption.</p>


                    <div className="inline-flex">
                      <button className="px-4 py-4 text-white bg-primary inline-flex items-center gap-3">
                          Start Chatting Now <TiArrowRightThick className="text-xl" />
                      </button>
                    </div>


                    <div className="flex items-center gap-4 mt-4 ">
                        <div className="flex items-center gap-4">
                            <div className="flex relative ">
                              <img src="assets/img/d1.png" className="h-16 w-16 object-contain rounded-full"/>
                              <img src="assets/img/d2.png" className="h-16 w-16  -ml-8 object-contain rounded-full"/>
                              <img src="assets/img/d3.png" className="h-16 w-16 -ml-10  object-contain rounded-full"/>
                            </div>
                            <div>
                                <p className="font-bold text-[#383A47] text-[30px]">2,291</p>
                                <p className="text-gray-600 text-[16px]">Happy Customers</p>
                            </div>
                        </div>

                        <p className="h-12 w-0.5 bg-[#1B1C20]"></p>

                        <div>
                            <p className="font-bold text-[#383A47] text-[30px]">4.8/5</p>
                            <p className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                 <TiStarFullOutline className="text-[#FFC947]" />
                                 <TiStarFullOutline className="text-[#FFC947]" />
                                 <TiStarFullOutline className="text-[#FFC947]" />
                                 <TiStarFullOutline className="text-[#FFC947]" />
                                 <TiStarFullOutline className="text-gray-500" />
                                </div>
                                <p className="text-[#383A47]">Rating</p>
                            </p>
                        </div>


                    </div>

              </div>

              <div className="relative ">
                   <img alt="logo"  src="./assets/img/hero-1.png" className="h-72 md:h-auto w-auto "/>
              </div>
          

          </div>
      </div>
    
    </>
  );
};

export default Html;
