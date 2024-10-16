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
import methodModel from "../../methods/methods";

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
                                <div className="bg-[#1245940a] p-4 border-b">
                                    <h3 className="text-[20px] font-[500]">Basic Information</h3>
                                </div>
                                <div className="grid grid-cols-12 p-4 gap-4">
                                <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">Carrier Name </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {" "}
                                            {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                                            {data && methodModel.capitalizeFirstLetter(data.fullName)}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">Email </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {" "}
                                            {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                                            {data && data.email}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">Company Name </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {" "}
                                            {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                                            {data && methodModel.capitalizeFirstLetter(data.company_name)}
                                        </p>
                                    </div>
                                    {data && data?.fax_number ?<div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">Fax Number</label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.fax_number}
                                        </p>
                                    </div>:<></>}
                                    
                                 
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">Tax Number</label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.tax_number}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">Trailer Type </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data?.trailer_type?.map((itm) => {
                                                return (
                                                    <>
                                                        <span className="">
                                                            {itm == "dry_van" ? "dry van" : itm} {" "}
                                                        </span>
                                                    </>
                                                );
                                            })}
                                        </p>
                                    </div>


                                </div>
                            </div>

                        </div>
                        <div className="col-span-12">
                            <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 ">
                                <div className="bg-[#1245940a] p-4 border-b">
                                    <h3 className="text-[20px] font-[500]">Address</h3>
                                </div>
                                <div className="grid grid-cols-12 p-4 gap-4">
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">Address </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {" "}
                                            {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                                            {data && data.address}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">City </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.city}

                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">State </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.state}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">Postal Code 
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.pincode}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-4">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">Country 
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.country}
                                        </p>
                                    </div>


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
