import { IoLocationSharp } from "react-icons/io5";
import PageLayout from "../components/global/PageLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loader from "../methods/loader";
import ApiClient from "../methods/api/apiClient";
import datepipeModel from "../models/datepipemodel";
import { Tooltip } from "antd";
import crendentialModel from "../models/credential.model";
import { BsCheck, BsCrosshair, BsTrash3 } from "react-icons/bs";
import Modal from "../components/common/Modal";
import AddAttendee from "./Events/AddAttendee";
import { toast } from "react-toastify";
import Members from "../components/Events/Member";

const EventDetail = () => {
  const [host, setHost]: any = useState()
  const [data, setData]: any = useState()
  const [attendee, setAttendee]: any = useState([])
  const [aloading, setALoader] = useState(false)
  const [isModal, setModal] = useState('')
  const [isRModal, setRModal] = useState(false)
  const [invites, setInvites] = useState([])
  const user: any = crendentialModel.getUser()
  const history = useNavigate()
  const [role, setRole] = useState()
  const [me, setMe] = useState()
  const [member, setMember]:any = useState()
  const { id } = useParams()

  const getDetail = () => {
    loader(true)
    ApiClient.get('api/event/details', { id: id }).then(res => {
      loader(false)
      if (res.success) {
        setData(res.data)
        if(res.data?.addedBy?._id) getHostDetail(res.data.addedBy._id)
        if(res.data?.groupId?._id) getMember(res.data.groupId._id)
        
      }
    })
  }

  const getHostDetail = (id: any) => {
    ApiClient.get('api/user/detail', { id: id }).then(res => {
      if (res.success) {
        setHost(res.data)
      }
    })
  }

  const getAttendee = () => {
    let f = {
      eventId: id,
      joinRequest:''
    }
    setALoader(true)
    ApiClient.get('api/attendees/list', f).then(res => {
      setALoader(false)
      if (res.success) {
        let data:any=res.data.map((itm:any)=>{
          return {
            ...itm,
            email:itm?.memberDetails?.email||itm.email
          }
        })

        setAttendee(data)
        let ext=data.find((itm:any)=>itm.email==user.email)
        if(ext){
          console.log("ext",ext)
          setRole(ext?.memberDetails?.role || 'member')
          setMe(ext)
        }
      }
    })
  }

  const getInvites = () => {
    let f = {
      eventId: id,
      joinRequest:'pending'
    }
    ApiClient.get('api/attendees/list', f).then(res => {
      if (res.success) {
        setInvites(res.data)
      }
    })
  }

  const attendeeFilter = (meetConfirm: any) => {
    let arr = attendee || []

    if (meetConfirm == 'Pending') {
      arr = attendee.filter((itm: any) => itm.meetConfirm == 'Pending' || !itm.meetConfirm)
    } else {
      arr = attendee.filter((itm: any) => itm.meetConfirm == meetConfirm)
    }
    return arr
  }

  const endEvent = () => {
    if (window.confirm("Do you want to End this Event")) {
      loader(true)
      ApiClient.put('api/event/edit', { id: id, meetingStatus: "completed" }).then(res => {
        loader(false)
        if (res.success) {
          getDetail()
        }
      })
    }
  }

  const deletePremit = (row: any) => {
    let value = false
    if (row?.addedBy === user._id || data?.addedBy?._id === user?._id) value = true
    if (role == 'assistant'||role=='meetManager') value = true
    if(data?.meetingStatus == 'completed') value=false
    return value
  }

  const addPremit=()=>{
    let value=false
    if(data?.addedBy?._id===user._id) value=true
    if(role=='assistant'||role=='meetManager')value=true
    return value
}

  const getMember = (groupId='') => {
    let f = {
      search: user.email,
      groupId: groupId,
      count: 1,
      page:1
    }
    ApiClient.get('api/members/list', f).then(res => {
      if (res.success) {
        let data = res.data?.[0]
        setMember(data)
      }
    })
  }

  const deleteItem = (id: any) => {
    if (window.confirm("Do you want to delete this")) {
      loader(true)
      ApiClient.delete('api/attendees', { id: id }).then(res => {
        if (res.success) {
          getAttendee()
        }
        loader(false)
      })
    }
  }

  const markAttendance=()=>{
    loader(true)
    ApiClient.post('api/sentEmail',{eventId:id}).then(res=>{
      loader(false)
      if(res.success){
        toast.success(res.message)
      }
    })
  }

  useEffect(() => {
    getDetail()
    getAttendee()
    getInvites()
  }, [])

  const requestCheck=()=>{
    let value=false
    if(data?.addedBy?._id!=user._id && !me) value=true
    return value
  }

  const request=()=>{
    if(!member){
      toast.error("You are not a member of this Group")
      return
    } 
    let payload={
      eventId:id,
      groupId:data?.groupId?._id||'',
      memberId:member._id
    }
  
    loader(true)
    ApiClient.post('api/event/request',payload).then(res=>{
      loader(false)
      if(res.success){
        toast.success(res.message)
      }
    })
  }

  const acceptReject=(id:any,joinRequest='')=>{
    if(window.confirm(`Do you want to ${joinRequest=='accepted'?'Accept':'Reject'} this request`)){
      loader(true)
      ApiClient.put('api/accept-reject/request',{id:id,status:joinRequest}).then(res=>{
        loader(false)
        if(res.success){
          toast.success(`Request ${joinRequest} successfully`)
          getAttendee()
          getInvites()
        }
      })
    }
    
  }

  const meetingStart=()=>{
    let value=false
    if(data&& new Date(datepipeModel.datetodatepicker(data.date)).getTime()<=new Date().getTime()) value=true
    return value
  }

  return (
    <>
      <PageLayout>
        <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="container mx-auto">
            <div className="banner-sectin">
              <img src="/assets/img/event-banner.png" className="w-full h-75 md:h-[450px] lg:[500px] object-cover rounded-3xl	 " />
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
                    <p className="text-[#0B0A0A] text-[19px] leading-5 lg:leading-8	 font-[400]" dangerouslySetInnerHTML={{ __html: data?.description }}></p>
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
                        {/* <p className="font-[400]">You Have RSVP’d . Yes to this event</p> */}
                        <p className="text-[#2B91EF] font-[600] cursor-pointer" onClick={()=>setRModal(true)}>RSVP List</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:mt-8 lg:mt-10">
                    <div className="borders_data p-6">
                      <div className="flex flex-col gap-y-4">

                        {requestCheck()?<>
                          <button className="bg-[#46454E] py-3 px-2 text-center text-white rounded-lg" onClick={request}>Request to Join</button>
                        </>:<></>}

                        {meetingStart()?<>
                          <div className="text-green-500">Meeting Started</div>
                        </>:<>
                        <div className="text-red-500">Meeting will start in {datepipeModel.getHoursAndMinutes(new Date().toISOString(),datepipeModel.datetodatepicker(data?.date))}</div>
                        </>}

                        {data?.meetingStatus != 'completed' ? <>
                          
                        {addPremit()?<>
                        <button className="bg-[#46454E] py-3 px-2 text-center text-white rounded-lg" onClick={()=>setModal('member')}>Invite Member</button>
                        <button className="bg-[#46454E] py-3 px-2 text-center text-white rounded-lg" onClick={()=>setModal('guest')}>Invite Guest</button>
                        </>:<></>}
                        {attendeeFilter('Yes').length?<>
                        {addPremit()?<>
                        {meetingStart()?<>
                          <button className="bg-[#EF7A2B] py-3 px-2  text-center text-white rounded-lg" onClick={markAttendance}>Mark Attendance</button>
                        </>:<></>}
                         
                          {meetingStart()?<>
                         <button className="bg-[#46454E] py-3 px-2 text-center text-white rounded-lg" onClick={endEvent}>End Meeting</button>
                          </>:<></>}
                        </>:<></>}
                      
                         </>:<></>}
                        </> : <>
                          <div className="text-red-500">Meeting Ended</div>
                        </>}

                        
                      </div>


                      {aloading ? <>
                        <div className="shine mb-3 mt-3"></div>
                        <div className="shine mb-3"></div>
                        <div className="shine mb-3"></div>
                        <div className="shine mb-3"></div>
                        <div className="shine mb-3"></div>
                        <div className="shine mb-3"></div>
                      </> : <>
                        <div className="mt-6 mb-6">
                          <h6 className="text-green-600 text-[19px] leading-2  lg:leading-6	 font-[600]">YES ({attendeeFilter('Yes').length})</h6>
                          <ul className="mt-3">
                            {attendeeFilter('Yes').map((itm: any) => {
                              return <>
                                <li className="text-[#3F3F3F] text-[14px] capitalize flex border-b py-3">
                                  <span>{itm.memberDetails?.fullName||itm?.fullName} {itm.memberDetails?.fullName?'':'(Guest)'}</span>

                                  {deletePremit(itm) ? <>
                                    <Tooltip placement="top" title="Delete" className='cursor-pointer ml-auto text-red-500'> <span onClick={() => deleteItem(itm.id)} >
                                      <BsTrash3 />
                                    </span> </Tooltip>
                                  </> : <></>}
                                </li>
                              </>
                            })}

                          </ul>
                        </div>

                        <div className="mt-6 mb-6">
                          <h6 className="text-[#C22020] text-[19px] leading-2  lg:leading-6	 font-[600]">No ({attendeeFilter('No').length})</h6>
                          <ul className="mt-3">
                            {attendeeFilter('No').map((itm: any) => {
                              return <>
                                <li className="text-[#3F3F3F] text-[14px] capitalize flex border-b py-3">
                                  <span>{itm.memberDetails?.fullName||itm?.fullName} {itm.memberDetails?.fullName?'':'(Guest)'}</span>

                                  {deletePremit(itm) ? <>
                                    <Tooltip placement="top" title="Delete" className='cursor-pointer ml-auto text-red-500'> <span onClick={() => deleteItem(itm.id)} >
                                      <BsTrash3 />
                                    </span> </Tooltip>
                                  </> : <></>}
                                </li>
                              </>
                            })}
                          </ul>
                        </div>

                        <div className="mt-6 mb-6">
                          <h6 className="text-[#C22020] text-[19px] leading-2  lg:leading-6	 font-[600]">VIEWED/NO RESPONSE YET ({attendeeFilter('Pending').length})</h6>
                          <ul className="mt-3">
                            {attendeeFilter('Pending').map((itm: any) => {
                              return <>
                                <li className="text-[#3F3F3F] text-[14px] capitalize flex border-b py-3">
                                  <span>{itm.memberDetails?.fullName||itm?.fullName} {itm.memberDetails?.fullName?'':'(Guest)'}</span>

                                  {deletePremit(itm) ? <>
                                    <Tooltip placement="top" title="Delete" className='cursor-pointer ml-auto text-red-500'> <span onClick={() => deleteItem(itm.id)} >
                                      <BsTrash3 />
                                    </span> </Tooltip>
                                  </> : <></>}
                                </li>
                              </>
                            })}
                          </ul>
                        </div>

                        {addPremit()&&invites.length?<>
                          <div className="mt-6 mb-6">
                          <h6 className="text-[#C22020] text-[19px] leading-2  lg:leading-6	 font-[600]">Invitations ({invites.length})</h6>
                          <ul className="mt-3">
                            {invites.map((itm: any) => {
                              return <>
                                <li className="text-[#3F3F3F] text-[14px] capitalize flex border-b py-3 gap-3">
                                  <span>{itm.memberDetails?.fullName||itm?.fullName} {itm.memberDetails?.fullName?'':'(Guest)'}</span>

                                  {deletePremit(itm) ? <>
                                    <Tooltip placement="top" title="Accept" className='cursor-pointer ml-auto text-green-500 text-lg'> <span onClick={() => acceptReject(itm.id,'accepted')} >
                                    <span className="material-symbols-outlined  text-base">done</span>
                                    </span> </Tooltip>
                                    <Tooltip placement="top" title="Reject" className='cursor-pointer text-red-500'> <span onClick={() => acceptReject(itm.id,'rejected')} >
                                    <span className="material-symbols-outlined  text-base">close</span>
                                    </span> </Tooltip>
                                  </> : <></>}
                                </li>
                              </>
                            })}
                          </ul>
                        </div>
                        </>:<></>}
        
                      </>}



                    </div>

                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>


      </PageLayout>

      {isModal ? <>
        <Modal
        title={`Invite ${isModal}`} 
        result={e=>{
          setModal('')
        }}
          body={<>
            <AddAttendee
              eventDetail={data}
              eventId={id}
              guest={isModal=='guest'?true:false}
              result={e => {
                if (e.event == 'submit') {
                  setModal('')
                  getAttendee()
                }
              }}
            />
          </>}
        />
      </> : <></>}

      {isRModal ? <>
            <Modal
                title="RSVP List"
                body={<>
                    <Members
                        eventId={id}
                        eventDetail={data}
                    />
                </>}
                result={e => {
                    setRModal(false)
                }}
            />
        </> : <></>}

    </>
  );
};

export default EventDetail;
