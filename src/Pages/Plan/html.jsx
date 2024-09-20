import React from "react";
import Layout from "../../components/global/layout";
import datepipeModel from "../../models/datepipemodel";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import environment from "../../environment";
import methodModel from "../../methods/methods";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { AiOutlineInfo } from "react-icons/ai";
import Header from "../../components/global/header2";
import Footers from "../../components/global/footer";
import { FaCheck } from "react-icons/fa";


const Html = ({
  interval,
  changeInterval,
  data,
  getPrice,
  payment,
}) => {
  console.log(data, "==================")
  return (
    <>
      <div className="hader_tops">
        <Header />
      </div>
      <div class=" p-10">
        {/* <div class="relative self-center bg-slate-200 rounded-lg p-0.5 flex">
            <button type="button"
                class="relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 bg-slate-50 border-slate-50 text-slate-900 shadow-sm">Monthly
                billing
            </button>
            <button type="button"
                class="ml-0.5 relative w-1/2 border rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 border-transparent text-slate-900">Yearly
                billing
            </button>
        </div> */}
        <div class="relative mx-auto max-w-7xl px-6 text-center lg:px-8 mb-10">
          <div class="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 class="text-lg font-semibold leading-8 text-teal-600 dark:text-teal-400">Pricing</h2>
            <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200">Find the right plan for your project</p>
          </div>
        </div>
        <div
          class="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-4 2xl:grid-cols-4">
              <div className="flex md:items-center flex-col md:flex-row md:flex-wrap justify-between border-b border-[#EBEBEB] pb-6 mb-6">
                  <div>
                    <h4 className="text-typo text-base font-semibold">Choose Plan</h4>
                  </div>
                  <ul className="flex flex-wrap items-center justify-center md:ml-auto mt-2 !gap-2 !p-1 w-fit bg-[#FAFBFC] border border-[#EAECF0] rounded-lg">
                    <li>
                      <a
                        className={`!px-3 !py-2 whitespace-nowrap text-sm block cursor-pointer text-center min-w-[120px] font-medium ${interval == 1
                          ? "shadow-btn rounded-md font-semibold text-[#344054]  bg-[#494f9f] text-white"
                          : "!text-[#667085] hover:!text-[#667085]"
                          }`}
                        onClick={(e) => changeInterval(1)}>
                        1 Month
                      </a>
                    </li>
                    <li>
                      <a
                        className={`!px-3 !py-2 whitespace-nowrap text-sm block cursor-pointer text-center min-w-[120px] font-medium ${interval == 3
                          ? "shadow-btn rounded-md font-semibold text-[#344054]  bg-[#494f9f] text-white"
                          : "!text-[#667085] hover:!text-[#667085]"
                          }`}
                        onClick={(e) => changeInterval(3)}>
                        3 Months
                      </a>
                    </li>
                    <li>
                      <a
                        className={`!px-3 !py-2 whitespace-nowrap text-sm block cursor-pointer text-center min-w-[120px] font-medium ${interval == 6
                          ? "shadow-btn rounded-md font-semibold text-[#344054]  bg-[#494f9f] text-white"
                          : "!text-[#667085] hover:!text-[#667085]"
                          }`}
                        onClick={(e) => changeInterval(6)}>
                        6 Months
                      </a>
                    </li>
                    <li>
                      <a
                        className={`!px-3 !py-2 whitespace-nowrap text-sm block cursor-pointer text-center min-w-[120px] font-medium ${interval == 12
                          ? "shadow-btn rounded-md font-semibold text-[#344054]  bg-[#494f9f] text-white"
                          : "!text-[#667085] hover:!text-[#667085]"
                          }`}
                        onClick={(e) => changeInterval(12)}>
                        12 Months
                      </a>
                    </li>
                  </ul>
                </div>
          {data && data.map((itm) => {
            return (
              <div class="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
              
                <div class="p-6">
                  <h2 class="text-xl leading-6 font-bold text-slate-900">{itm?.name}</h2>
                  {/* <p class="mt-2 text-base text-slate-700 leading-tight">For new makers who want to fine-tune and test an
                        idea.</p> */}
                  <p class="mt-8">
                    <span class="text-4xl font-bold text-slate-900 tracking-tighter">${getPrice(itm)}</span>

                    <span class="text-base font-medium text-slate-500">{interval==1?"/month":interval==3?"/3 month":interval==6?"/6 month":"/year"}</span>
                  </p>
                  <button className="mt-8 block w-full bg-primary rounded-md py-2 text-sm font-semibold text-white text-center" disabled={getPrice(itm)==0} onClick={(e)=>payment(itm,getPrice(itm))}>Buy Now</button>
                  
                </div>
                <div class="pt-6 pb-8 px-6">
                  <h3 class="text-sm font-bold text-slate-900 tracking-wide uppercase">What's included</h3>
                  <ul role="list" class="mt-4 space-y-3">
                    {itm?.features.map((item) => {
                      return (
                        <li class="flex space-x-3">
                          <FaCheck className="text-md text-primary" />

                          <span class="text-base text-slate-700">{item?.feature_name}</span>
                        </li>
                      )
                    })}


                  </ul>
                </div>
              </div>
            )
          })}

        </div>
      </div>

      <Footers />
    </>
  );
};

export default Html;
