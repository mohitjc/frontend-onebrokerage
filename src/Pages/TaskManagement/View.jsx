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
import { FaLocationDot } from "react-icons/fa6";
import environment from "../../environment";
import { Steps } from 'rsuite';
const View = () => {
    const user = useSelector((state) => state.user);
    const [Stops, setStops] = useState([]);
    const [ActiveStop, setActiveStop] = useState(0);
    const [data, setData] = useState();
    console.log(data,"data")
    const [questions, setQuestions] = useState([]);
    
    const styles = {
        width: '200px',
        display: 'inline-table',
        verticalAlign: 'top',
      };


    const history = useNavigate();
    const { id } = useParams();
    const StartdateTime = data?.load_start_date?.split("T")?.join()?.split(".")?.[0]
    const EnddateTime = data?.load_end_date?.split("T")?.join()?.split(".")?.[0]
    const getDetail = () => {
        loader(true);
        ApiClient.get(shared.detailApi, { id: id }).then((res) => {
            loader(false);
            if (res.success) {
                setData(res.data);
                if (res?.data?.shipment_status == 'delivered') {
                    setActiveStop(5);
                  } else {
                    setActiveStop(
                      res?.data?.stops?.filter((itm) => itm?.checkin)?.length
                    );
                  }
                  Stops.push(
                    {
                      address: res?.data?.origin_address,
                    },
                    {
                      destination_address: res?.data?.destination_address,
                      date: res?.data?.delivered_at,
                    }
                  );
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
                                        <FaLocationDot className="text-[#494f9f]" />
                                    </div>
                                    <h3 className="text-[16px] font-[500] text-[#494f9f]">
                                        Basic Information
                                    </h3>
                                </div>
                                <div className="grid grid-cols-12 p-4">
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Load ID
                                        </label>
                                        <p className="text-[14px] text-black font-medium pe-3">
                                            {" "}
                                            {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                                            {data && data.load_id}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Customer's Name
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.customer_name}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col  mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            All in Rate
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.all_in_rate}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col  mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Capacity
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.capacity}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col  ">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Dispatch Days
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.dispatch_days}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            EST Volume
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.est_volume}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Frequency
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.frequency}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Load Start DateTime
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {moment(StartdateTime).format(
                                                "DD-MMM-YYYY, h:mm a"
                                            )}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Load End DateTime
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {moment(EnddateTime).format(
                                                "DD-MMM-YYYY, h:mm a"
                                            )}
                                        </p>
                                    </div>
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

                                <div className="grid grid-cols-12 p-4 bg-[#f9faff] m-4 border border-[#474e9c0f]">
                                    <div className="col-span-12  mb-7">
                                        <h4 className="pb-1 text-[#494f9f] font-medium uppercase tracking-[1.4px] text-[14px] inline-block border-b border-[#474e9c]">Origin Address</h4>
                                    </div>
                                    <div className="col-span-12 flex flex-col mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Origin Address
                                        </label>
                                        <p className="text-[14px] text-black font-medium pe-3">
                                            {" "}
                                            {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                                            {data && data.origin_address}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6  flex flex-col mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Origin City
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.origin_location_city}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6  flex flex-col  mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Origin State
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.origin_location_state}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6  flex flex-col  mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Origin Postal Code
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.origin_location_postal_code}
                                        </p>
                                    </div>
                                    {data?.origin_location_country?   <div className="col-span-12 lg:col-span-6 flex flex-col  ">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Origin Country
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.origin_location_country}
                                        </p>
                                    </div>:<></>}
                                 
                                </div>
                                <div className="grid grid-cols-12 p-4 bg-[#f9faff] m-4 border border-[#474e9c0f]">
                                    <div className="col-span-12  mb-7">
                                        <h4 className="pb-1 text-[#494f9f] font-medium uppercase tracking-[1.4px] text-[14px] inline-block border-b border-[#474e9c]">Destination Address</h4>
                                    </div>
                                    <div className="col-span-12  flex flex-col mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Destination Address
                                        </label>
                                        <p className="text-[14px] text-black font-medium pe-3">
                                            {" "}
                                            {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                                            {data && data.destination_address}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Destination City
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.destination_location_city}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col  mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Destination State
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.destination_location_state}
                                        </p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6 flex flex-col  mb-5">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Destination Postal Code
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.destination_location_postal_code}
                                        </p>
                                    </div>
                                    {data?.destination_location_country? <div className="col-span-12 lg:col-span-6 flex flex-col  ">
                                        <label className="text-[14px] text-[#0000009c] tracking-wider  mb-1">
                                            Destination Country
                                        </label>
                                        <p className="text-[14px] text-black font-medium ">
                                            {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                                            {data && data?.destination_location_country}
                                        </p>
                                    </div>:<></>}
                                   
                                </div>
                            </div>
                        </div>

                        {data && data?.stops.length > 0 ? 
                        <div className="col-lg-6 height-set">
                        <div className=" white-bg-main mb-4 ">
                          <div className="  white-head mb-3">
                            <h5 class="profilelist">Track Details</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="steps-main steps-scroll">
                                {data?.status == 'accepted' && (
                                  <div className=" mb-3 view-flex">
                                    <label className="profileheddingcls">
                                      {data?.delivered_at != null
                                        ? ' Delivered At :'
                                        : data?.transit_at && 'Transit At'}
                                    </label>
                                    <div className="profiledetailscls">
                                      {data?.shipment_status == 'delivered'
                                        ? moment(data?.delivered_at).format(
                                            'DD-MMM-YYYY h:mm A'
                                          )
                                        : data?.transit_at &&
                                          moment(data?.transit_at).format(
                                            'DD-MMM-YYYY h:mm A'
                                          )}
                                    </div>
                                  </div>
                                )}
                                {data?.status == 'active' && (
                                  <div className="p-3">
                                    {data?.stops?.length > 1 ? (
                                      <Steps
                                        vertical
                                        style={styles}
                                        current={ActiveStop}
                                      >
                                        <Steps.Item
                                          title={
                                            data?.stops[0]?.checkin
                                              ? 'Picked Up'
                                              : 'Pickup Pending'
                                          }
                                          description={data?.origin_address}
                                        />
                                        {data?.stops?.map((itm, index) => {
                                          return (
                                            <>
                                            {index>0?<Steps.Item
                                                title={`${
                                                  (index <
                                                  data?.stops?.length - 1 && data?.shipment_status=="in_transit" )
                                                    ? 'In Transit -'
                                                    : ''
                                                } ${itm?.address}`}
                                                description={
                                                  itm.checkin &&
                                                  index ==
                                                    data?.stops?.length - 1
                                                    ? itm?.checkin &&
                                                      `Delivered at ${moment(
                                                        itm?.checkin
                                                      ).format(
                                                        'DD-MM-YYYY- HH:MM A'
                                                      )} ${itm?.address} `
                                                    : itm?.checkin &&
                                                      `Checkedin ${moment(
                                                        itm?.checkin
                                                      ).fromNow()}  ${
                                                        itm?.checkout == null
                                                          ? ''
                                                          : `|| checkedOut ${moment(
                                                              itm?.checkout
                                                            ).fromNow()}`
                                                      }`
                                                }
                                              />:<></>}
                                              
                                            </>
                                          );
                                        })}
                                      </Steps>
                                    ) : (
                                      <>
                                        <Steps
                                          current={
                                            Stops[1]?.date ||
                                            Stops[1]?.delivered_at
                                              ? 2
                                              : 0
                                          }
                                          vertical
                                          style={styles}
                                        >
                                          {Stops?.map((itm, index) => {
                                            return (
                                              <>
                                                <Steps.Item
                                                  title={
                                                    itm?.address ||
                                                    itm?.destination_address
                                                  }
                                                  description={
                                                    Stops[1]?.date
                                                      ? 'Delivery'
                                                      : 'No status'
                                                  }
                                                />
                                              </>
                                            );
                                          })}
                                        </Steps>
                                      </>
                                    )}
                                  </div>
                                )}
                               
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>: <></>}

                    </div>
                </div>
            </PageLayout>
        </>
    );
};

export default View;
