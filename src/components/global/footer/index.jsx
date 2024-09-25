import React from 'react';

import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

const Footers = () => {
  return (
    <>
        <footer className="bg-[#F4F7FF]">
       
        <div className="container mx-auto">
          <div className=' px-4  py-4 '>
            


            <div className="flex justify-between flex-wrap border-b border-gray-200 pb-4 mt-10 xl:mt-16">
                <div className="flex items-center gap-4 xl:gap-10">
                        <p className="text-[16px] text-[#1B1C20]">About</p>
                        <p className="text-[16px] text-[#1B1C20]">Features</p>
                        <p className="text-[16px] text-[#1B1C20]">Works</p>
                        <p className="text-[16px] text-[#1B1C20]">Support</p>
                </div>

                <div className="flex items-center gap-4 xl:gap-10">
                        <p className="text-[16px] text-[#1B1C20]"><BsTwitterX />  </p>
                        <p className="text-[16px] text-[#1B1C20]"><FaFacebookF /> </p>
                        <p className="text-[16px] text-[#1B1C20]"><FiInstagram /> </p>
                        <p className="text-[16px] text-[#1B1C20]"><FaGithub /> </p>
                </div>
            </div>

            <div className="flex justify-between flex-wrap  mt-6 xl:mt-10">
              <div className="">
                    <p>© Copyright 2024, All Rights Reserved</p>
              </div>
                <div className="flex items-center gap-4 xl:gap-10">
                        <p className="text-[16px] text-[#797B89]">Privacy Policy   </p>
                        <p className="text-[16px] text-[#797B89]"> Terms & Conditions</p>
                </div>
            </div>



          </div>
        </div>
      </footer>
    </>
  );
};

export default Footers;
