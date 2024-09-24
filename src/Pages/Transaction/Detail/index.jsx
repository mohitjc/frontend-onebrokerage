import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageLayout from "../../../components/global/PageLayout";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
// import "./style.scss";
import { useSelector } from "react-redux";
import moment from "moment";
import { Tooltip } from "antd";
const RoleDetail = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { id, userId } = useParams();
  const [data, setData] = useState();

  const getDetail = () => {
    loader(true);
    ApiClient.get(`transaction`, { id: id }).then((res) => {
      if (res.success) {
        setData(res.data);
      }
      loader(false);
    });
  };

  const back = () => {
    navigate(-1);
  };

  useEffect(() => {
    getDetail(userId ? userId : id);
  }, [id, userId]);

  return (
    <PageLayout>
      <div className="flex items-center mb-8">
        <Tooltip placement="top" title="Back">
          <span
            onClick={back}
            className="!px-4  py-2 cursor-pointer flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3 bg-[#494f9f] text-white hover:text-black"
          >
            <i className="fa fa-angle-left text-lg"></i>
          </span>
        </Tooltip>
        <div>
          <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
            Transaction Details
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 mb-6">
            <div className="bg-[#1245940a] p-4 border-b">
              <h3 className="text-[20px] font-[500]">Basic Information</h3>
            </div>
            <div className="col-span-12">
              <div className="shadow-box overflow-hidden rounded-lg bg-white gap-4 shrink-0">
                <div className="grid grid-cols-12 p-4">
                <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider mb-1">
                      Transaction Id
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {data && data.payment_intent_id}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider mb-1">
                      Plan Name
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {data && data.plan_id?.name}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider mb-1">
                      Carrier Name
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {data && data.user_id?.fullName}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider mb-1">
                      Amount 
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {data && data.amount}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider mb-1">
                      Created At
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {data && moment(data.createdAt).format("DD-MM-YYYY")}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider mb-1">
                      Status 
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {data && data.transaction_status}
                    </p>
                  </div>

          
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default RoleDetail;
