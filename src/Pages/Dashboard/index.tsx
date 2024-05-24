import { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import Chart from "../../components/Charts/Chart";
import { IoHandRightOutline } from "react-icons/io5";


const Dashboard = () => {
  return (
    <>
      <Layout>
        <h4 className="text-2xl font-bold mb-3 flex items-center gap-2"><IoHandRightOutline className="text-3xl slow-shake text-[#EB6A59]" /><span className="">Hi,</span> Admin Shroom</h4>



        <div className="shadow-box w-full bg-white rounded-lg mt-6 p-6">


              <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col-reverse  border border-gray-200 shadow-sm px-6 py-2 rounded-lg">
                <dt className="text-base leading-7 text-black/40">Total Users</dt>
                <dd className="text-2xl font-bold leading-9  text-[#EB6A59]">12</dd>
              </div>
              <div className="flex flex-col-reverse  border border-gray-200 shadow-sm px-6 py-2 rounded-lg">
                <dt className="text-base leading-7 text-black/40">Total Products</dt>
                <dd className="text-2xl font-bold leading-9  text-[#EB6A59]">300+</dd>
              </div>
              <div className="flex flex-col-reverse  border border-gray-200 shadow-sm px-6 py-2 rounded-lg">
                <dt className="text-base leading-7 text-black/40">Total Categories</dt>
                <dd className="text-2xl font-bold leading-9  text-[#EB6A59]">40</dd>
              </div>
              <div className="flex flex-col-reverse  border border-gray-200 shadow-sm px-6 py-2 rounded-lg">
                <dt className="text-base leading-7 text-black/40">Total Questions</dt>
                <dd className="text-2xl font-bold leading-9  text-[#EB6A59]">50+</dd>
              </div>
            </div>
              

      

        <div className="grid grid-cols-12 gap-4 mt-6">
            <div className="col-span-12 md:col-span-12">
                <div className="chatr_ones">
                   <Chart />
                </div>
            </div>

            <div className="col-span-12 md:col-span-6">
                <div className="chatr_ones">
                   <Chart />
                </div>
            </div>

            <div className="col-span-12 md:col-span-6">
                <div className="chatr_ones">
                   <Chart />
                </div>
            </div>


            
        </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
