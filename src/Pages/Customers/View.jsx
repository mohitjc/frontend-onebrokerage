import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import { useEffect, useState } from "react";
import datepipeModel from "../../models/datepipemodel";
import ApiClient from "../../methods/api/apiClient";
import { useParams } from "react-router-dom";
import shared from "./shared";
import loader from "../../methods/loader";
import { Tooltip } from "antd";
import questionsKeys from "../Profile/questions";
import { useSelector } from "react-redux";
import { LiaUserSolid } from "react-icons/lia";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import methodModel from "../../methods/methods";
import { GrUserSettings } from "react-icons/gr";

const View = () => {
  const user = useSelector((state) => state.user);

  const [data, setData] = useState();
  const [questions, setQuestions] = useState([]);

  const history = useNavigate();
  const { id } = useParams();

  const getDetail = () => {
    loader(true);
    ApiClient.get(shared.detailApi, { id: id }).then((res) => {
      loader(false);
      if (res.success) {
        setData(res.data);
      }
    });
  };

  const sortedQuestions = questions?.sort((a, b) => a.order - b.order);

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <>
      <Layout>
        <div className="wrapper_section">
          <div className="flex items-center mb-8">
            <Tooltip placement="top" title="Back">
              <span
                onClick={() => history(-1)}
                className="!px-4  py-2 cursor-pointer flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3 bg-[#05388fed] text-white"
              >
                <i className="fa fa-angle-left text-lg"></i>
              </span>
            </Tooltip>
            <div>
              <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                {shared.addTitle} Details
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="  shadow-box overflow-hidden rounded-lg bg-white  gap-4 shrink-0 ">
                <div>
                  <h4 className="p-4 bg-[#494f9f1a] font-medium">Basic Information</h4>
                </div>
               <div className="grid grid-cols-12 p-4">
               <div className="col-span-6 flex items-center mb-4">
                  <label className="text-[14px] text-[#0000009c] tracking-wider w-[160px]">Name:</label>
                  <p className="text-[14px] text-black font-medium ms-3">
                    {" "}
                    {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                    {data && data.fullName}
                  </p>
                </div>
                  <div className="col-span-6 flex items-center mb-4">
                   <label className="text-[14px] text-[#0000009c] tracking-wider  w-[160px]">Email:</label>
                   <p className="text-[14px] text-black font-medium ms-3">
                    {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                    {data && data.email}
                  </p>
                </div>

                  <div className="col-span-6 flex items-center mb-4">
                  <label className="text-[14px] text-[#0000009c] tracking-wider  w-[160px]">Mobile Number:</label>
                   <p className="text-[14px] text-black font-medium ms-3">
                    {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                    {data?.mobileNo || "--"}
                  </p>
                </div>
                  <div className="col-span-6 flex items-center mb-4">
                  <label className="text-[14px] text-[#0000009c] tracking-wider  w-[160px]">Role:</label>
                   <p className="text-[14px] text-black font-medium ms-3">
                    {/* <GrUserSettings className="text-xl text-[#494f9f]" /> */}
                  </p>
                  {data?.role?.name || "--"}
                </div>
               </div>
              </div>
             
            </div>
            <div className="col-span-12">
              <div className="  shadow-box overflow-hidden rounded-lg bg-white  gap-4 shrink-0 ">
                <div>
                  <h4 className="p-4 bg-[#494f9f1a] font-medium">Address</h4>
                </div>
               <div className="grid grid-cols-12 p-4">
               <div className="col-span-6 flex items-center mb-4">
                  <label className="text-[14px] text-[#0000009c] tracking-wider w-[160px]">Address Line 1:</label>
                  <p className="text-[14px] text-black font-medium ms-3">
                    {" "}
                    {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                    {data && data.address}
                  </p>
                </div>
                  <div className="col-span-6 flex items-center mb-4">
                   <label className="text-[14px] text-[#0000009c] tracking-wider  w-[160px]">Address Line 2:</label>
                   <p className="text-[14px] text-black font-medium ms-3">
                    {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                    {data && data.address2}
                  </p>
                </div>

                  <div className="col-span-6 flex items-center mb-4">
                  <label className="text-[14px] text-[#0000009c] tracking-wider  w-[160px]">State / Province:</label>
                   <p className="text-[14px] text-black font-medium ms-3">
                    {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                    {data?.state || "--"}
                  </p>
                </div>
                  <div className="col-span-6 flex items-center mb-4">
                  <label className="text-[14px] text-[#0000009c] tracking-wider  w-[160px]">Postal / Zip Code:</label>
                   <p className="text-[14px] text-black font-medium ms-3">
                    {/* <GrUserSettings className="text-xl text-[#494f9f]" /> */}
                  </p>
                  {data?.zipCode|| "--"}
                </div>
                <div className="col-span-6 flex items-center mb-4">
                  <label className="text-[14px] text-[#0000009c] tracking-wider  w-[160px]">Country:</label>
                   <p className="text-[14px] text-black font-medium ms-3">
                    {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                    {data?.country || "--"}
                  </p>
                </div>
               </div>
              </div>
             
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default View;
