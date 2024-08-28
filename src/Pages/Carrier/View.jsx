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
  console.log(data, "datadatadatadatadata");
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
                <div>
                  <h4 className="p-4 bg-[#494f9f1a] font-medium">
                    Basic Information
                  </h4>
                </div>
                <div className="grid grid-cols-12 p-4">
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1 ">
                      Name:
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {" "}
                      {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                      {data && data.fullName}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      Position:
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                      {data && data.position}
                    </p>
                  </div>

                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      Company Name :
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                      {data?.company_name || "--"}
                    </p>
                  </div>

                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      Mc# :
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                      {data?.mc_number || "--"}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      Email :
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                      {data && data.email}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      Latest Login IP :
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                      {data?.ip_address || "--"}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      Tax Number :
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                      {methodModel.capitalizeFirstLetter(data?.tax_number) ||
                        "--"}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      Dot#:
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <GrUserSettings className="text-xl text-[#494f9f]" /> */}
                    </p>
                    {data?.dot_number || "--"}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 ">
                <div>
                  <h4 className="p-4 bg-[#494f9f1a] font-medium">Address</h4>
                </div>
                <div className="grid grid-cols-12 p-4">
                  <div className="col-span-12  lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1 ">
                      Address :
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {" "}
                      {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                      {data && data.address}
                    </p>
                  </div>

                  <div className="col-span-12  lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      State :
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                      {data?.state || "--"}
                    </p>
                  </div>

                  <div className="col-span-12  lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      Country:
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                      {data?.country || "--"}
                    </p>
                  </div>
                  <div className="col-span-12  lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      City:
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                      {methodModel.capitalizeFirstLetter(data?.city)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 ">
                <div>
                  <h4 className="p-4 bg-[#494f9f1a] font-medium">
                    Truck Details
                  </h4>
                </div>
                <div className="grid grid-cols-12 p-4">
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1 ">
                      Team Truck :
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {" "}
                      {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                      {data?.team_truck || "--"}
                    </p>
                  </div>

                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      Total Truck :
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                      {data?.total_trucks || "--"}
                    </p>
                  </div>

                 
                 
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      Solo Truck :
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                      {data?.solo_truck || "--"}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      Total Trailer :
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                      {data?.trailers_number || "--"}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      Trailer Type :
                    </label>
                    <p className="text-[14px] text-black font-medium">
                      {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                      {data?.trailer_type?.map((itm, i) => {
                        return (
                          <span className="me-2">
                            {" "}
                            {itm == "dry_van" ? "Dry Van" : "Reefer"}{" "}
                            {i < data?.trailer_type.length - 1 ? " , " : ""}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                    <label className="text-[14px] text-[#0000009c] tracking-wider block mb-1  ">
                      Board Name :
                    </label>
                    <p className="text-[14px] text-black font-medium flex">
                      {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                      {data?.boardDetails?.map((board, i) => {
                        return (
                          <>
                            <div className="  board-name me-2">
                              {methodModel.capitalizeFirstLetter(board?.name) ||
                                "--"}
                              {i < data?.boardDetails.length - 1 ? " , " : ""}
                            </div>
                          </>
                        );
                      })}
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
