import { IoLocationSharp } from "react-icons/io5";
import PageLayout from "../components/global/PageLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import loader from "../methods/loader";
import ApiClient from "../methods/api/apiClient";
import datepipeModel from "../models/datepipemodel";
import { Tooltip } from "antd";
import { BsCheck, BsCrosshair, BsTrash3 } from "react-icons/bs";
import Modal from "../components/common/Modal";
import AddAttendee from "./Events/AddAttendee";
import { toast } from "react-toastify";
import Members from "../components/Events/Member";
import rolesModel from "../models/roles.model";
import { FiPrinter } from "react-icons/fi";
import { MdOutlineShare } from "react-icons/md";
import Groups from "./Groups";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useSelector } from "react-redux";
import MemberHistory from "./Events/MemberHistory";
import RequestGroup from "./Events/RequestGroup";
import { LiaUserClockSolid } from "react-icons/lia";

const EventDetail = () => {
  const [host, setHost]: any = useState()
  const [data, setData]: any = useState()
  const [attendee, setAttendee]: any = useState([])
  const [aloading, setALoader] = useState(false)
  const [isModal, setModal] = useState('')
  const [isRModal, setRModal] = useState(false)
  const [group, setGroup] = useState(false)
  const [memberHistory, setmemberHistory] = useState(false)
  const [invites, setInvites] = useState([])
  const [requestGroup,setRequestGroup] = useState(false)
  const [memberHistoryData , setmemberHistoryData] = useState()
  const [attendeesGroup , setattendeesGroup] = useState()
  const user = useSelector((state:any) => state.user);
  const history = useNavigate()
  const [role, setRole] = useState()
  const [me, setMe] = useState()
  const [member, setMember]: any = useState()
  const { id } = useParams()
console.log(attendeesGroup,"attendeesGroup")
console.log(user,"nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
  const getDetail = () => {
    loader(true)
    ApiClient.get('api/event/details', { id: id, email: user?.email }).then(res => {
      loader(false)
      if (res.success) {
        setData(res.data)
        if (res.data?.addedBy?._id) getHostDetail(res.data.addedBy._id)
        if (res.data?.groupId?._id) getMember(res.data.groupId._id)

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
      joinRequest: ''
    }
    setALoader(true)
    ApiClient.get('api/attendees/list', f).then(res => {
      setALoader(false)
      if (res.success) {
        let data: any = res.data.map((itm: any) => {
          return {
            ...itm,
            email: itm?.memberDetails?.email || itm.email
          }
        })

        setAttendee(data)
        let ext = data.find((itm: any) => itm.email == user.email)
        if (ext) {
          console.log("ext", ext)
          setRole(ext?.memberDetails?.role || 'member')
          setMe(ext)
        }
      }
    })
  }

  const getInvites = () => {
    let f = {
      eventId: id,
      joinRequest: 'pending'
    }
    ApiClient.get('api/attendees/list', f).then(res => {
      if (res.success) {
        setInvites(res.data)
      }
    })
  }



  const getAttendeesGroupPair  = () => {
    ApiClient.get(`api/event/groups?eventId=${id}`).then(res => {
      if (res.success) {
        setattendeesGroup(res?.data)
      }
    })
  }
const getMemberHistory=()=>{
  ApiClient.get(`api/member/event/groups?email=${user?.email}`).then(res=>{
    if(res.success){
      setmemberHistoryData(res?.data)
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
        if (res.success) {
          getDetail()
        } else {
          loader(false)
        }
      })
    }
  }

  const deletePremit = (row: any) => {
    let value = false
    if (row?.addedBy === user._id || data?.addedBy?._id === user?._id) value = true
    if (role == 'assistant' || role == 'meetManager') value = true
    if (data?.meetingStatus == 'completed') value = false
    return value
  }

  const addPremit = () => {
    let value = false
    if (data?.addedBy?._id === user._id) value = true
    if (role == 'assistant' || role == 'meetManager') value = true
    return value
  }

  const getMember = (groupId = '') => {
    let f = {
      search: user.email,
      groupId: groupId,
      count: 1,
      page: 1
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

  const markAttendance = () => {
    loader(true)
    ApiClient.post('api/sentEmail', { eventId: id }).then(res => {
      loader(false)
      if (res.success) {
        toast.success(res.message)
        getDetail()
      }
    })
  }

  useEffect(() => {
    getDetail()
    getAttendee()
    getInvites()
    getMemberHistory()
    // getAttendeesGroupPair()
  }, [])

  const requestCheck = () => {
    let value = false
    if (data?.addedBy?._id != user._id && !me) value = true
    return value
  }

  const request = () => {
    if (!member) {
      toast.error("You are not a member of this Group")
      return
    }
    let payload = {
      eventId: id,
      groupId: data?.groupId?._id || '',
      memberId: member._id
    }

    loader(true)
    ApiClient.post('api/event/request', payload).then(res => {
      loader(false)
      if (res.success) {
        getDetail()
        toast.success(res.message)
      }
    })
  }

  const acceptReject = (id: any, joinRequest = '') => {
    if (window.confirm(`Do you want to ${joinRequest == 'accepted' ? 'Accept' : 'Reject'} this request`)) {
      loader(true)
      ApiClient.put('api/accept-reject/request', { id: id, status: joinRequest }).then(res => {
        loader(false)
        if (res.success) {
          toast.success(`Request ${joinRequest} successfully`)
          getAttendee()
          getInvites()
        }
      })
    }

  }

  const meetingStart = () => {
    let value = false
    if (data && new Date(datepipeModel.datetodatepicker(data.date)).getTime() <= new Date().getTime()) value = true
    return value
  }
  
  function handlePrint() {
    const imgElement = document.createElement("img");
    imgElement.src = data?.qrCode;
    console.log(data?.qrCode, "qrCode")
    const printWindow = window.open("", "_blank") as Window;
    if (printWindow) {
        printWindow.document.write(`<html><head><title>Print Image</title></head><body style='margin: 0; text-align: center;'><img src='${data?.qrCode}' style='max-width: 100%; max-height: 100%;'></body></html>`);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    } else {
        console.error("Failed to open print window.");
    }
}
// const handleInputField=(e :any)=>{
// console.log(e?.target?.files[0] ,"vvvvvvvvvvvvvvv")
// const file = e.target?.files[0]; // Get the selected file

// // Create FormData object to send file
// const formData = new FormData();
// formData.append('file', file);
// if (file){
//   ApiClient.post('api/importGroupEvent',formData).then(res => {

//     if (res.success) {
//    console.log(res,"bbbbbbbbbbbbb")
//     }
//   })
// }}


const handleMemberHistoryPage=()=>{

}
  return (
    <>
      <PageLayout>
      
        <div className="bg-white border-gray-200 px-4 pt-8 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="container mx-auto">
          <Link to="/event" >
          <div
            className="mb-4 cp pt-1 ms-2 pointer"
          // onClick={() => history.go(-1)}
          >
            <span>


              <i className="fa fa-arrow-left mr-2"></i>
            </span>
            Back
          </div>
        </Link>

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
                        <p className="text-[#2B91EF] font-[600] cursor-pointer" onClick={() => setRModal(true)}>RSVP List</p>
                      </div>
                      <div><button className="text-sm hover:text-blue-500 underline text-blue-500 underline-offset-4" onClick={() => setmemberHistory(true)}> Member history</button></div>
                    </div>
                  </div>
                  <div className="md:mt-8 lg:mt-10">
                    <div className="borders_data p-6">
                      <div className="flex flex-col gap-y-4">

                        {requestCheck() ? <>
                          <button className="bg-[#46454E] py-3 px-2 text-center text-white rounded-lg" disabled={data?.isRequested ? true : false} onClick={request}>{data?.isRequested ? 'Requested' : 'Request to Join'}</button>
                        </> : <></>}
                        {/* 
                        {meetingStart() ?<>
                          <div className="text-green-500">Meeting Started</div>
                        </>:<>
                        <div className="text-red-500">Meeting will start in {datepipeModel.getHoursAndMinutes(new Date().toISOString(),datepipeModel.datetodatepicker(data?.date))}</div>
                        </>} */}
                        {data?.meetingStatus !== "completed" ? (
                          meetingStart() ? (
                            <div className="text-green-500">Meeting Started</div>
                          ) : (
                            <div className="text-red-500">Meeting will start in {datepipeModel.getHoursAndMinutes(new Date().toISOString(), datepipeModel.datetodatepicker(data?.date))}</div>
                          )
                        ) : null}

                        {data?.meetingStatus != 'completed' ? <>

                          {addPremit() ? <>
                            <button className="bg-[#46454E] py-3 px-2 text-center text-white rounded-lg" onClick={() => setModal('member')}>Invite Member</button>
                            <button className="bg-[#46454E] py-3 px-2 text-center text-white rounded-lg" onClick={() => setModal('guest')}>Invite Guest</button>
                          </> : <></>}
                          {attendeeFilter('Yes').length ? <>
                            {addPremit() ? <>
                              {meetingStart() ? <>
                                <button className="bg-[#EF7A2B] py-3 px-2  text-center text-white rounded-lg" onClick={markAttendance}>Mark Attendance</button>
                              </> : <></>}

                              {meetingStart() ? <>
                                <button className="bg-[#46454E] py-3 px-2 text-center text-white rounded-lg" onClick={endEvent}>End Meeting</button>
                              </> : <></>}
                            </> : <></>}

                          </> : <></>}
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
                                  <span>{itm.memberDetails?.fullName || itm?.fullName} {itm.memberDetails?.fullName ? `(${rolesModel.name(itm.memberDetails.role)})` : '(Guest)'}</span>

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
                                  <span>{itm.memberDetails?.fullName || itm?.fullName} {itm.memberDetails?.fullName ? `(${rolesModel.name(itm.memberDetails.role)})` : '(Guest)'}</span>

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
                                  <span>{itm.memberDetails?.fullName || itm?.fullName} {itm.memberDetails?.fullName ? `(${rolesModel.name(itm.memberDetails.role)})` : '(Guest)'}</span>

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

                        {addPremit() && invites.length ? <>
                          <div className="mt-6 mb-6">
                            <h6 className="text-[#C22020] text-[19px] leading-2  lg:leading-6	 font-[600]">Invitations ({invites.length})</h6>
                            <ul className="mt-3">
                              {invites.map((itm: any) => {
                                return <>
                                  <li className="text-[#3F3F3F] text-[14px] capitalize flex border-b py-3 gap-3">
                                    <span>{itm.memberDetails?.fullName || itm?.fullName} {itm.memberDetails?.fullName ? `(${rolesModel.name(itm.memberDetails.role)})` : '(Guest)'}</span>

                                    {deletePremit(itm) ? <>
                                      <Tooltip placement="top" title="Accept" className='cursor-pointer ml-auto text-green-500 text-lg'> <span onClick={() => acceptReject(itm.id, 'accepted')} >
                                        <span className="material-symbols-outlined  text-base">done</span>
                                      </span> </Tooltip>
                                      <Tooltip placement="top" title="Reject" className='cursor-pointer text-red-500'> <span onClick={() => acceptReject(itm.id, 'rejected')} >
                                        <span className="material-symbols-outlined  text-base">close</span>
                                      </span> </Tooltip>
                                    </> : <></>}
                                  </li>
                                </>
                              })}
                            </ul>
                          </div>
                        </> : <></>}

                      </>}
                     <div className="flex items-center justify-between">
                     <div className=""><button className="flex items-center gap-2 border border-gray-300 py-3 px-3 rounded-xl hover:bg-orange-500 hover:text-white" onClick={() => setRequestGroup(true)}><LiaUserClockSolid /> Request Generate Group</button></div>
                     
                     {data?.isGroupGenerated === true ? <div className="flex justify-end">
                                   <button  onClick={() => setGroup(true)} className="bg-[#46454E] inline-flex py-3 px-3 flex items-center justify-center gap-x-2 text-white shadow hover:shadow-lg rounded-xl" > <AiOutlineUsergroupAdd />See All Groups</button>
                                 </div>:<div className="flex justify-end">
                                   <button  onClick={() => setGroup(true)} className="bg-[#46454E] inline-flex py-3  px-3 flex items-center justify-center gap-x-2 text-white shadow hover:shadow-lg rounded-xl" > <AiOutlineUsergroupAdd />Generate Connect meets</button>
                                 </div>}
                     </div>
                     

                    </div>

                  </div>

                  {data?.qrCode && data?.addedBy?._id === user?._id  ||  data?.memberId?.role === "assistant" || data?.memberId?.role === "meetManager"? <>
                  <div className="md:mt-8 lg:mt-10">
                      <div className="borders_data p-6 flex items-center justify-between gap-x-4">
                       
                          <div>
                            <img className="w-full" src={data?.qrCode}></img>
                          </div>
                      <div>
                        
                      <div className="flex flex-col items-center justify-center gap-y-4">
                          <button className="bg-[#EF7A2B] w-44 py-3 flex items-center justify-center gap-x-2 text-white shadow hover:shadow-lg rounded-xl" onClick={handlePrint}><FiPrinter /> Print</button>
                          {/* <button className="bg-[#46454E] w-44 py-3 flex items-center justify-center gap-x-2 text-white shadow hover:shadow-lg rounded-xl"  onClick={() => window.open(data?.qrCode, '_blank')}><MdOutlineShare />Share</button> */}
                        </div>
                      </div>
                    
                    

                      </div>
                  </div>
                  </>  : ""}


                  
                </div>
               
                


              </div>
            </div>
          </div>
        </div>


      </PageLayout>

      {isModal ? <>
        <Modal
          title={`Invite ${isModal}`}
          result={e => {
            setModal('')
          }}
          body={<>
            <AddAttendee
              eventDetail={data}
              eventId={id}
              guest={isModal == 'guest' ? true : false}
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


      {group ? <>
        <Modal
          
          title="Group List"
          body={<>
         <Groups
         eventDetail={attendeesGroup}
         />
          </>}
          result={e => {
            setGroup(false)
          }}
        />
      </> : <></>}
      {memberHistory ? <>
        <Modal
          
          title="Member History"
          body={<>
         <MemberHistory eventDetail = {memberHistoryData}/>
          </>}
          result={e => {
            setmemberHistory(false)
          }}
        />
      </> : <></>}

      {requestGroup ? <>
        <Modal
          
          title="Request Group"
          body={<>
         <RequestGroup eventDetail = {attendeeFilter} data={data}/>
          </>}
          result={e => {
            setRequestGroup(false)
          }}
        />
      </> : <></>}
    </>
  );
};

export default EventDetail;
