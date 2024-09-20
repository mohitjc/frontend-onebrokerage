
import { TiArrowRightThick, TiStarFullOutline } from "react-icons/ti";
import Header from "../components/global/header2";
import Footers from "../components/global/footer";
import { IoIosVideocam } from "react-icons/io";
import { BiSolidStopwatch } from "react-icons/bi";
import { MdOutlineWifiLock } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { useParams } from "react-router-dom";


const Html = ({

}) => {
 
  const {page}=useParams()
  console.log(page,"pagepage")
  return (
    <>
      <div className="hader_tops">
          <Header/>
      </div>

      <div className="bg-[#EAEFFF] px-4 lg:px-8">
          <div className="flex flex-col  md:flex-row items-center justify-center gap-4  xl:gap-10 relative">
              <div className="data_inners flex flex-col items-center md:items-start text-center md:text-left gap-6 xl:gap-8 w-[100%] lg:max-w-[700px] py-10">
                    <h1 className="font-light text-[#1B1C20] text-[30px]  md:text-[30px] leading-[40px]  lg:text-[40px] md:leading-[50px]  xl:leading-[70px] xl:text-[50px]">
                        Get in touch with
                        <span className=" font-bold block text-[#1B1C20] text-[30px]  md:text-[30px] leading-[40px]  lg:text-[40px] md:leading-[50px]  xl:leading-[70px] xl:text-[50px]">
                            Carriers & Drivers anytime, anywhere with
                            <span className="text-primary font-bold ml-2 text-[#1B1C20] text-[30px]  md:text-[30px] leading-[40px]  lg:text-[40px] md:leading-[50px]  xl:leading-[70px] xl:text-[50px]">Software</span>
                         </span>

                    </h1>

                    <p className="text-[18px] text-[#383A47] leading-[25px] ">Great software that allows you to chat from any place at any time without any interruption.</p>


                    <div className="">
                      <button className="px-6 py-4 text-white bg-primary inline-flex items-center gap-3">
                          Start Chatting Now <TiArrowRightThick className="text-xl" />
                      </button>
                    </div>


                    <div className="flex items-center gap-4 mt-4 ">
                        <div className="flex items-center gap-4">
                            <div className="flex relative ">
                              <img src="assets/img/d1.png" className="h-10 w-10 xl:h-16 xl:w-16 object-contain rounded-full"/>
                              <img src="assets/img/d2.png" className="h-10 w-10 xl:h-16 xl:w-16 -ml-4  xl:-ml-8 object-contain rounded-full"/>
                              <img src="assets/img/d3.png" className="h-10 w-10 xl:h-16 xl:w-16 -ml-4 xl:-ml-10  object-contain rounded-full"/>
                            </div>
                            <div>
                                <p className="font-bold text-[#383A47] text-[24px]  xl:text-[30px]">2,291</p>
                                <p className="text-gray-600 text-[12px] xl:text-[16px]">Happy Customers</p>
                            </div>
                        </div>

                        <p className="h-12 w-0.5 bg-[#1B1C20]"></p>

                        <div>
                            <p className="font-bold text-[#383A47] text-[24px]  xl:text-[30px]">4.8/5</p>
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

      
      <div className="bg-[#F4F7FF] px-4 lg:px-8 py-10 lg:py-20">
          <div className="container mx-auto">
              <div className="text-center mb-6 lg:mb-12  xl:mb-20">
                  <h4 className="font-bold text-[24px] lg:text-[28px] xl:text-[36px]">Features for a better experience</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-8">
                  <div className="one_row flex flex-col lg:flex-row gap-4 items-center text-center lg:items-start lg:text-left">
                        <div className="relative">
                          <div className="h-16 w-16 rounded-full flex items-center justify-center bg-[#FD6003]/20">
                          <IoIosVideocam className="text-2xl fill-[#FD6003]" />
                          </div>
                        </div>
                        <div className="">
                            <h6 className="font-bold text-[20px]">Video messaging</h6>
                            <p className="text-[16px] mt-2">This software is very easy for you to manage. You can use it as you wish.</p>
                        </div>
                  </div>


                  <div className="one_row flex flex-col lg:flex-row gap-4 items-center text-center lg:items-start lg:text-left ">
                        <div className="relative">
                          <div className="h-16 w-16 rounded-full flex items-center justify-center bg-[#4DA44E]/20">
                          <BiSolidStopwatch className="text-2xl fill-[#FD6003]" />
                          </div>
                        </div>
                        <div className="">
                            <h6 className="font-bold text-[20px]">Save your time</h6>
                            <p className="text-[16px] mt-2">This software is very easy for you to manage. You can use it as you wish.</p>
                        </div>
                  </div>


                  <div className="one_row flex flex-col lg:flex-row gap-4 items-center text-center lg:items-start lg:text-left ">
                        <div className="relative">
                          <div className="h-16 w-16 rounded-full flex items-center justify-center bg-[#FB8E0B]/20">
                          <MdOutlineWifiLock className="text-2xl fill-[#FD6003]" />
                          </div>
                        </div>
                        <div className="">
                            <h6 className="font-bold text-[20px]">Keep safe & private</h6>
                            <p className="text-[16px] mt-2">This software is very easy for you to manage. You can use it as you wish.</p>
                        </div>
                  </div>


              </div>
          </div>
      </div>

      <div className="bg-[#F4F7FF] px-4 lg:px-8 py-10 lg:py-20 ">
          <div className="container mx-auto">
             
              <div className="grid grid-cols-12 gap-4 xl:gap-6 items-center">
                  <div className="col-span-12 md:col-span-6 2xl:col-span-5  ">
                        <div className="relative">
                            <img src="assets/img/homeimg/1.png" className="mx-auto" />
                        </div>
                      
                  </div>


                  <div className="col-span-12 md:col-span-6 pl-4 xl:pl-0 2xl:col-span-5">
                        
                        <div className="flex flex-col gap-4  text-center  md:text-left xl:gap-4 2xl:max-w-[500px]">
                            <h6 className="font-bold text-[24px] lg:text-[40px] leading-[30px] lg:leading-[50px] xl:text-[48px] xl:leading-[60px]">Meet your team
                            with live video chat</h6>
                            <p className="text-[16px] ">Proin faucibus nibh et sagittis a. Lacinia purus ac amet superexcellent aliquam enim.</p>
                            <p className="text-[16px] ">Get paychecks up to two days early. Get a $20 bonus when you receive qualifying direct deposits</p>
                        </div>
                  </div>



              </div>
          </div>
      </div>

      <div className="bg-[#F4F7FF] px-4 lg:px-8 py-10 lg:py-20">
          <div className="container mx-auto">
             
              <div className="grid grid-cols-12 gap-4 xl:gap-6 items-center">
                  


                  <div className="col-span-12 md:col-span-6 pl-4 xl:pl-0 2xl:col-span-5">
                        
                        <div className="flex flex-col gap-4  items-center lg:items-start   xl:gap-6 ">
                            <h6 className="font-bold text-[24px] lg:text-[40px] leading-[30px] lg:leading-[50px] xl:text-[48px] xl:leading-[60px] ">Start sharing directly inside conversations</h6>
                            <p className="text-[16px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                            <div className="">
                            <button className="px-4 py-4 bg-primary text-white rounded-lg">
                                Start Chatting Now
                            </button>
                            </div>
                        </div>
                  </div>

                  <div className="col-span-12 md:col-span-6 2xl:col-span-6  ">
                        <div className="relative">
                            <img src="assets/img/homeimg/2.png" className="mx-auto" />
                            {/* <img src="assets/img/homeimg/2.2.png" className="absolute right-10 bottom-32"  />
                            <img src="assets/img/homeimg/2.3.png" className="absolute -left-10 bottom-0 " /> */}
                        </div>
                      
                  </div>



              </div>
          </div>
      </div>


      <div className="bg-[#F4F7FF] px-4 lg:px-8 py-10 lg:py-20">
          <div className="container mx-auto">
              
              <div className="grid grid-cols-12 gap-4 xl:gap-6 items-center">
                  <div className="col-span-12 md:col-span-6 2xl:col-span-6  ">
                        <div className="relative">
                            <img src="assets/img/homeimg/3.png" className="mx-auto" />
                        </div>
                      
                  </div>


                  <div className="col-span-12 md:col-span-6 pl-4 xl:pl-0 2xl:col-span-6">
                        
                        <div className="flex flex-col gap-4  text-center  md:text-left xl:gap-6 2xl:max-w-[500px]">
                            <h6 className=" text-[24px] lg:text-[40px] leading-[30px] lg:leading-[50px] xl:text-[48px] xl:leading-[60px]  ">Get tasks updates <span className="font-bold text-[24px] lg:text-[40px] leading-[30px] lg:leading-[50px] xl:text-[48px] xl:leading-[60px] "> from your drivers & carriers.</span></h6>
                            <p className="text-[16px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

                        </div>
                  </div>



              </div>
          </div>
      </div>



      <div className="bg-[#E4ECFF] px-4 lg:px-8 py-10 lg:py-20">
          <div className="container mx-auto">
              <div className="text-center mb-6 xl:mb-20">
                  <h4 className="font-bold text-[24px] lg:text-[28px] xl:text-[36px]">Our users said about us.</h4>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting.  </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2  gap-4 xl:gap-8">
                  <div className="flex flex-col items-center">
                          <div className="bg-white text-center rounded-xl p-4 lg:p-6">
                              <p className="text-[20px] font-bold mb-2">
                                   “Incredible Experience”
                              </p>
                              <p className="text-[18px] text-[#383A47]">
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                              </p>
                          </div>
                          <div className="flex gap-4 mt-4">
                                <img src="assets/img/d1.png" />
                                <div className="">
                              <h6 className="font-bold text-[18px]">Wade Warren</h6>
                              <p className="text-[14px] mt-1">CEO, ABC Corporation</p>
                          </div>
                    </div>
                      
                  </div>

                  <div className="flex flex-col items-center">
                          <div className="bg-white text-center rounded-xl p-4 lg:p-6">
                              <p className="text-[20px] font-bold mb-2">
                              “Dependable, Responsive, Professional”
                              </p>
                              <p className="text-[18px] text-[#383A47]">
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                              </p>
                          </div>
                          <div className="flex gap-4 mt-4">
                                <img src="assets/img/d2.png" />
                                <div className="">
                              <h6 className="font-bold text-[18px]">Esther Howard</h6>
                              <p className="text-[14px] mt-1">CEO, ABC Corporation</p>
                          </div>
                    </div>
                      
                  </div>

                




                 


              </div>
          </div>
      </div>



      <div className="bg-primary px-4 lg:px-8 py-10 lg:py-20">
          <div className="container mx-auto">
              
              <div className="grid grid-cols-12 gap-4 xl:gap-6 items-center">
                  <div className="col-span-12 md:col-span-6 2xl:col-span-6  ">
                        <div className="relative">
                            <img src="assets/img/homeimg/4.png" className=" h-[300px] mx-auto md:h-[100%] md:mx-auto" />
                        </div>
                      
                  </div>


                  <div className="col-span-12 md:col-span-6  2xl:col-span-6">
                        
                        <div className="flex flex-col gap-4  text-center text-white  md:text-left xl:gap-6 ">
                              <h6 className="text-xs text-[#FFC947]">TECHNOLOGY USED</h6>
                              <h6 className="text-[20px] lg:text-[24px] xl:text-[31px] ">Lorem Ipsum is a dummy paragraph
                                to fill a content of the website.
                                </h6>
                              <p className="text-[16px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into el</p>
                              
                              <div className="flex flex-col gap-4 xl:gap-6 py-6">
                                <div className="one_row flex flex-col md:flex-row gap-4   ">
                                      <div className="relative">
                                          <img src="assets/img/homeimg/4.1.png" className="mx-auto" />
                                      </div>
                                      <div className="">
                                          <h6 className="font-medium text-[16px] xl:text-[20px]">Use Real Time Emoticons </h6>
                                          <p className="text-[14px] xl:text-[16px] mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                      </div>
                                </div>
                                <div className="one_row flex flex-col md:flex-row gap-4   ">
                                      <div className="relative">
                                          <img src="assets/img/homeimg/4.2.png" className="mx-auto" />
                                      </div>
                                      <div className="">
                                          <h6 className="font-medium text-[16px] xl:text-[20px]">Custome Stickers </h6>
                                          <p className="text-[14px] xl:text-[16px] mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                      </div>
                                </div>

                                <div className="one_row flex flex-col md:flex-row gap-4   ">
                                      <div className="relative">
                                          <img src="assets/img/homeimg/4.3.png" className="mx-auto" />
                                      </div>
                                      <div className="">
                                          <h6 className="font-medium text-[16px] xl:text-[20px]">Change Available Status </h6>
                                          <p className="text-[14px] xl:text-[16px] mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                      </div>
                                </div>
                              </div>


                        </div>
                  </div>



              </div>
          </div>
      </div>


      <div className="bg-white px-4 lg:px-8 py-10 lg:py-20">
        <div className="container mx-auto">
            <div className="bg-primary shadow_new rounded-xl xl:w-[1024px] mx-auto">
                   <div className="flex gap-4 items-center">
                      <div className="flex flex-col text-white items-start gap-4 py-8 md:py-0  xl:gap-6 px-4 lg:px-10 2xl:px-20  w-[600px]">
                              <h6 className="text-[14px] font-semibold">DOWNLOAD APPLICATION</h6>

                              <h2 className="text-[20px] xl:text-[28px] font-regular">Download our official Application for your specific OS Platform</h2>

                              <div className="relative flex gap-4 items-center">
                                 <img src="assets/img/homeimg/5.1.png" className="mx-auto" />
                                 <img src="assets/img/homeimg/5.2.png" className="mx-auto" />
                              </div>

                              <p className="text-[16px] font-regular">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>


                        </div>
                        <div className="relative hidden sm:block">
                            <img src="assets/img/homeimg/5.png" className="mx-auto" />
                        </div>
                   </div>
            </div>
        </div>
      </div>
                                
       <Footers/>     
    
    </>
  );
};

export default Html;
