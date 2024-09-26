import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../components/global/PageLayout";
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
import moment from "moment";
import { FaUserAlt } from "react-icons/fa";
import { FaFileZipper, FaLocationDot } from "react-icons/fa6";
import environment from "../../environment";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";

const View = () => {
  const user = useSelector((state) => state.user);
  const [Permission, SetPermission] = useState({});
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
        if (res?.data?.role == "staff") {
          ApiClient.get(`permission/user-base?user_id=${id}`).then((res) => {
            SetPermission(res?.data);
          });
        }
      }
    });
  };

  const sortedQuestions = questions?.sort((a, b) => a.order - b.order);

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <>
      <PageLayout>
        <div className="wrapper_section">
          <div className="flex items-center mb-8">
            <Tooltip placement="top" title="Back">
              <span
                onClick={() => history(-1)}
                className="!px-4  py-2 cursor-pointer flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3 bg-[#494f9f] text-white hover:text-black"
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
              <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 ">
                <div className=" p-3 border-b flex items-center border-[#474e9c3b] border-dashed">
                  <div className="bg-[#eeeff6] p-3 me-3 rounded-md">
                    <FaUserAlt className="text-[#494f9f]" />
                  </div>
                  <h3 className="text-[16px] font-[500] text-[#494f9f]">
                    Basic Information
                  </h3>
                </div>
                <div className="grid grid-cols-12 p-4">
                  <div className="col-span-12 lg:col-span-6 flex flex-col  ">
                    <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                      Name
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {" "}
                      {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                      {methodModel.capitalizeFirstLetter(data && data.fullName)}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col  ">
                    <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                      Email
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                      {data && data?.email}
                    </p>
                  </div>


                  {data?.mobileNo ? <div className="col-span-12 lg:col-span-6 flex flex-col  ">
                    <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                      Mobile Number
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                      {data && data?.mobileNo}
                    </p>
                  </div> : <></>}

                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 ">
                <div className=" p-3 border-b flex items-center border-[#474e9c3b] border-dashed">
                  <div className="bg-[#eeeff6] p-3 me-3 rounded-md">
                    <FaLocationDot className="text-[#494f9f]" />
                  </div>
                  <h3 className="text-[16px] font-[500] text-[#494f9f]">
                    Address
                  </h3>
                </div>
                <div className="grid grid-cols-12 p-4">
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-5">
                    <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                      Address
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {" "}
                      {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                      {data && data.address}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-5">
                    <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                      City
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                      {data && data?.city}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col  mb-5">
                    <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                      State
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                      {data && data?.state}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col  mb-5">
                    <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                      Postal Code
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                      {data && data?.pincode}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col  ">
                    <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                      Country
                    </label>
                    <p className="text-[14px] text-black font-medium ">
                      {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                      {data && data?.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 ">
                <div className=" p-3 border-b flex items-center border-[#474e9c3b] border-dashed">
                  <div className="bg-[#eeeff6] p-3 me-3 rounded-md">
                    <FaFileZipper className="text-[#494f9f]" />
                  </div>
                  <h3 className="text-[16px] font-[500] text-[#494f9f]">
                    Permissions
                  </h3>
                </div>
                <div className="overflow-x-auto ">
                  <table className="w-full border border-gray">
                    <thead className="bg-[#474e9c12] ">
                      <tr>
                        <th className="py-2 text-sm font-medium text-left px-4"></th>

                        <th className="py-2 text-sm font-medium text-left px-4">
                          {" "}
                          Read</th>
                        <th className="py-2 text-sm font-medium text-left px-4">
                          {" "}
                          Add</th>
                        <th className="py-2 text-sm font-medium text-left px-4">
                          {" "}
                          Edit </th>
                        <th className="py-2 text-sm  font-medium text-left px-4">
                          {" "}
                          Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray px-4 py-2 ">                    <span className="font-semibold text-sm">Dashboard</span>
                        </td>


                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.dashboard_get ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">

                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">

                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">

                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray px-4 py-2 ">                  <span className="font-semibold text-sm">Carrier</span>
                        </td>



                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.carrier_get ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.carrier_add ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.carrier_edit ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.carrier_delete ? <IoMdCheckmark /> : <IoClose />}
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-gray px-4 py-2 ">                   <span className="font-semibold text-sm">Plan</span>
                        </td>



                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.plan_get ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.plan_add ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.plan_edit ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.plan_delete ? <IoMdCheckmark /> : <IoClose />}
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-gray px-4 py-2 ">                  <span className="font-semibold text-sm">Group</span>
                        </td>



                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.group_get ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.group_add ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.group_edit ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.group_delete ? <IoMdCheckmark /> : <IoClose />}
                        </td>
                      </tr>


                      <tr>
                        <td className="border border-gray px-4 py-2 ">                   <span className="font-semibold text-sm">Driver</span>
                        </td>



                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.driver_get ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.driver_add ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.driver_edit ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.driver_delete ? <IoMdCheckmark /> : <IoClose />}
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-gray px-4 py-2 ">
                          <span className="font-semibold text-sm">Truck</span>
                        </td>



                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.truck_get ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.truck_add ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">

                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">

                        </td>
                      </tr>

                      <tr>
                        <td className="border border-gray px-4 py-2 ">
                          <span className="font-semibold text-sm">Transaction</span>
                        </td>



                        <td className="border border-gray px-4 py-2 text-left ">
                          {Permission?.transaction_get ? <IoMdCheckmark /> : <IoClose />}
                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">

                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">

                        </td>

                        <td className="border border-gray px-4 py-2 text-left ">

                        </td>
                      </tr>

                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default View;
