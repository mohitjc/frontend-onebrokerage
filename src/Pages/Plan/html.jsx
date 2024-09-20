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


const Html =()=> {
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
            <div class="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
                <div class="p-6">
                    <h2 class="text-xl leading-6 font-bold text-slate-900">Starter</h2>
                    <p class="mt-2 text-base text-slate-700 leading-tight">For new makers who want to fine-tune and test an
                        idea.</p>
                    <p class="mt-8">
                        <span class="text-4xl font-bold text-slate-900 tracking-tighter">$0</span>

                        <span class="text-base font-medium text-slate-500">/mo</span>
                    </p><a href="/sign-up"
                        class="mt-8 block w-full bg-primary rounded-md py-2 text-sm font-semibold text-white text-center">Join
                        as a Starter</a>
                </div>
                <div class="pt-6 pb-8 px-6">
                    <h3 class="text-sm font-bold text-slate-900 tracking-wide uppercase">What's included</h3>
                    <ul role="list" class="mt-4 space-y-3">
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">1 landing page included</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">1,000 visits/mo</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">Access to all UI blocks</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">50 conversion actions included</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">5% payment commission</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">Real-time analytics</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
                <div class="p-6">
                    <h2 class="text-xl leading-6 font-bold text-slate-900">Superior</h2>
                    <p class="mt-2 text-base text-slate-700 leading-tight">For new makers who want to fine-tune and test an
                    idea.</p>
                    <p class="mt-8">
                        <span class="text-4xl font-bold text-slate-900 tracking-tighter">$8</span>

                        <span class="text-base font-medium text-slate-500">/mo</span>
                    </p><a href="/sign-up"
                        class="mt-8 block w-full bg-primary rounded-md py-2 text-sm font-semibold text-white text-center">Join
                        as a Superior</a>
                </div>
                <div class="pt-6 pb-8 px-6">
                    <h3 class="text-sm font-bold text-slate-900 tracking-wide uppercase">What's included</h3>
                    <ul role="list" class="mt-4 space-y-3">
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">All Free features</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">5 landing pages included</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">50,000 visits/mo</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">1,000 conversion actions included</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">1% payment commission</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
                <div class="p-6">
                    <h2 class="text-xl leading-6 font-bold text-slate-900">Shipper</h2>
                    <p class="mt-2 text-base text-slate-700 leading-tight">For productive shippers who want to work more
                        efficiently.</p>
                    <p class="mt-8">
                        <span class="text-4xl font-bold text-slate-900 tracking-tighter">$15</span>

                        <span class="text-base font-medium text-slate-500">/mo</span>
                    </p><a href="/sign-up"
                        class="mt-8 block w-full bg-primary rounded-md py-2 text-sm font-semibold text-white text-center">Join
                        as a Shipper</a>
                </div>
                <div class="pt-6 pb-8 px-6">
                    <h3 class="text-sm font-bold text-slate-900 tracking-wide uppercase">What's included</h3>
                    <ul role="list" class="mt-4 space-y-3">
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">All Standard features</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">20 landing pages included</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">200,000 visits/mo</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">5,000 conversion actions included</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">No payment commission</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
                <div class="p-6">
                    <h2 class="text-xl leading-6 font-bold text-slate-900">Shipper</h2>
                    <p class="mt-2 text-base text-slate-700 leading-tight">For productive shippers who want to work more
                        efficiently.</p>
                    <p class="mt-8">
                        <span class="text-4xl font-bold text-slate-900 tracking-tighter">$15</span>

                        <span class="text-base font-medium text-slate-500">/mo</span>
                    </p><a href="/sign-up"
                        class="mt-8 block w-full bg-primary rounded-md py-2 text-sm font-semibold text-white text-center">Join
                        as a Shipper</a>
                </div>
                <div class="pt-6 pb-8 px-6">
                    <h3 class="text-sm font-bold text-slate-900 tracking-wide uppercase">What's included</h3>
                    <ul role="list" class="mt-4 space-y-3">
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">All Standard features</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">20 landing pages included</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">200,000 visits/mo</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">5,000 conversion actions included</span>
                        </li>
                        <li class="flex space-x-3">
                           <FaCheck className="text-md text-primary" />

                            <span class="text-base text-slate-700">No payment commission</span>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
        </div>

        <Footers/>   
  </>
  );
};

export default Html;
