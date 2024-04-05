import { IoLocationSharp } from "react-icons/io5";
import PageLayout from "../components/global/PageLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loader from "../methods/loader";
import ApiClient from "../methods/api/apiClient";
import datepipeModel from "../models/datepipemodel";

const EventDetail = () => {
  const [host, setHost]:any = useState()
  const [data, setData]:any = useState()
  const [attendee, setAttendee]:any = useState([])
  const history = useNavigate()
  const {id}=useParams()

  const getDetail=()=>{
      loader(true)
      ApiClient.get('api/event/details',{id:id}).then(res=>{
          loader(false)
          if(res.success){
              setData(res.data)
              getHostDetail(res.data.addedBy._id)
          }
      })
  }

  const getHostDetail=(id:any)=>{
      ApiClient.get('api/user/detail',{id:id}).then(res=>{
          if(res.success){
              setHost(res.data)
          }
      })
  }

  const getAttendee=()=>{
    let f={

    }
    ApiClient.get('api/attendees/list',f).then(res=>{
      if(res.success){
        setAttendee(res.data)
      }
    })
  }

  const attendeeFilter=(meetConfirm:any)=>{
    let arr=attendee||[]

    if(meetConfirm=='Pending'){
      arr=attendee.filter((itm:any)=>itm.meetConfirm=='Pending'||!itm.meetConfirm)
    }else{
      arr=attendee.filter((itm:any)=>itm.meetConfirm==meetConfirm)
    }
    return arr
  }

  useEffect(()=>{
      getDetail()
      getAttendee()
  },[])
  return (
    <>
      <PageLayout>
          <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
              <div className="container mx-auto">
                <div className="banner-sectin">
                    <img src="/assets/img/event-banner.png"  className="w-full h-75 md:h-[450px] lg:[500px] object-cover rounded-3xl	 "/>
                </div>
              </div>
          </div>

          <div className="bg-white border-gray-200 px-4 lg:px-6 py-8 dark:bg-gray-800">
              <div className="container mx-auto">
                <div className="events_details">
                   <div className="grid grid-cols-12 gap-x-10">
                        <div className="col-span-12 md:col-span-7 lg:col-span-8">
                            <div className="flex flex-col lg:gap-y-3 py-2 lg:py-4">
                            <div className="date_text">
                                  <h6 className="text-[#EF7A2B] text-[24px] font-[400]"> <span className="mr-1">{datepipeModel.datetime(data?.date)}</span>
                                  {/* |<span className="ml-1">Time 8:30 AM - 11:00 AM</span> */}
                                  </h6>
                            </div>
                            <div>
                              <p className="text-[#393C3D] text-[33px] font-[600]">{data?.title}</p>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="flex gap-x-2 items-center capitalize"><IoLocationSharp className="text-orange-500 text-2xl lg:text-3xl" />{data?.address}</p>
                              <p className="lg:mr-20">Event Type: <span className="text-orange-500 capitalize">{data?.type}</span></p>
                            
                            </div>
                            </div>
                            <div className="main_decription flex flex-col lg:gap-y-10 py-8 lg:py-15">
                                  <p className="text-[#0B0A0A] text-[19px] leading-5 lg:leading-8	 font-[400]" dangerouslySetInnerHTML={{__html:data?.description}}></p>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-5 lg:col-span-4">
                            <div className="flex items-center gap-x-6">
                                <div className=" border-4 border-orange-500 rounded-full drop-shadow-lg">
                                  <img className="h-28 w-28 rounded-full object-cover " src="/assets/img/event-banner.png" alt="" />
                                </div>
                                <div className="teaxings">
                                    <h6 className="text-[#3F3F3F] text-[18px] font-[700] capitalize">{data?.addedBy?.fullName}</h6>
                                    <div className="flex flex-col gap-y-2 mb-2">
                                        <p className=""> <span className="relative text-orange-500 capitalize">{host?.customerRole?.name}</span></p>
                                        <span className="block h-1 w-12 bg-orange-500 "></span>
                                    </div>
                                    <div className="text-[12px] flex flex-col gap-y-1 mt-4">
                                    <p className="font-[400]">You Have RSVP’d . Yes to this event</p>
                                    <p className="text-[#2B91EF] font-[600]">Change My RSVP</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:mt-8 lg:mt-10">
                                <div className="borders_data p-6">
                                   <div className="flex flex-col gap-y-4">
                                      <button className="bg-[#EF7A2B] py-3 px-2  text-center text-white rounded-lg">Mark Attendance</button>
                                        <button className="bg-[#46454E] py-3 px-2 text-center text-white rounded-lg">End Meeting</button>
                                   </div>

                                   <div className="mt-6 mb-6">
                                      <h6 className="text-[#2B91EF] text-[19px] leading-2  lg:leading-6	 font-[600]">YES ({attendeeFilter('Yes').length})</h6>
                                      <ul className="mt-3">
                                        {attendeeFilter('Yes').map((itm:any)=>{
                                          return <>
                                            <li className="text-[#3F3F3F] text-[14px] capitalize">{itm.memberDetails.fullName}</li>
                                          </>
                                        })}
                                      
                                      </ul>
                                   </div>

                                    <div className="mt-6 mb-6">
                                      <h6 className="text-[#C22020] text-[19px] leading-2  lg:leading-6	 font-[600]">No ({attendeeFilter('No').length})</h6>
                                      <ul className="mt-3">
                                      {attendeeFilter('No').map((itm:any)=>{
                                          return <>
                                            <li className="text-[#3F3F3F] text-[14px] capitalize">{itm.memberDetails.fullName}</li>
                                          </>
                                        })}
                                      </ul>
                                   </div>

                                    <div className="mt-6 mb-6">
                                      <h6 className="text-[#C22020] text-[19px] leading-2  lg:leading-6	 font-[600]">VIEWED/NO RESPONSE YET ({attendeeFilter('Pending').length})</h6>
                                      <ul className="mt-3">
                                      {attendeeFilter('Pending').map((itm:any)=>{
                                          return <>
                                            <li className="text-[#3F3F3F] text-[14px] capitalize">{itm.memberDetails.fullName}</li>
                                          </>
                                        })}
                                      </ul>
                                   </div>
                                
                                </div>

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

export default EventDetail;
