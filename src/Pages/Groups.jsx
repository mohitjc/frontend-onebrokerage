import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import ApiClient from "../methods/api/apiClient";
import loader from '../methods/loader';
import { MdOutlineEmail } from 'react-icons/md';
import { GoHistory } from "react-icons/go";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { LuUser2, LuUserPlus } from 'react-icons/lu';
import { MdClear } from "react-icons/md";
import axios from 'axios';
import { TbFileExport } from "react-icons/tb";
import environment from '../environment';
import Modal from "../components/common/Modal";
import AddNewGroup from './Events/AddNewGroup';
import { IoMdCloudDownload, IoMdCloudUpload } from 'react-icons/io';
import { FiPlus } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import PageLayout from '../components/global/PageLayout';
import { toast } from 'react-toastify';
import datepipeModel from '../models/datepipemodel';
import GroupHistory from "./GroupHistory"
const Groups = ({ eventDetail = '', dataa = '' }) => {
    console.log(eventDetail, "eventDetaileventDetaileventDetaileventDetaileventDetail")
    const { id } = useParams()
    const location = useLocation();
    const history = useNavigate();
    const receivedStateData = location.state;
    console.log(receivedStateData, "receivedStateDatareceivedStateDatareceivedStateDatareceivedStateDatareceivedStateData")
    const [groupList, setGroupList] = useState()
    const [attendeesGroup, setattendeesGroup] = useState()
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [requestGroup, setRequestGroup] = useState(false)
    const [requestGroupList, setRequestGroupList] = useState("")
    const [historyData, setHistoryData] = useState()
    const [historyModal, setHistoryModal] = useState(false)
    const [data, setData] = useState()
    const [showDiv, setShowDiv] = useState(false)
    const eventIdd = receivedStateData?.eventId?.id
    const groupId = receivedStateData?.dataa?.data?.groupId?._id
    
    console.log(eventIdd, "eventIddeventIdd")
    console.log(groupList,"groupListgroupListgroupListgroupListgroupList")
console.log(requestGroupList,"requestGroupListrequestGroupListrequestGroupListrequestGroupListrequestGroupListrequestGroupList")
const handleCloseModal =()=>{
    setShowDiv(false)
}
const importFile = (e ) => {
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (event ) => {
            const base64String = event.target.result;

            let payload = {
                groupId: groupId,
                eventId: eventIdd,
                base64String: base64String
            };

            ApiClient.post(`api/import/event-group`, payload).then(res => {
                if (res.success) {
                    toast.success(res.message);
                }
            });
        };

        reader.readAsDataURL(file);
    }
};

    const handleSelectValue = (e, element) => {
        loader(true)
        let payload = {
            data: [{
                id: element?.id,
                ConnectMeetId: e?.target?.value,
                attendeeId: element?.attendeesDetails?._id,
                eventId: element?.attendeesDetails?.eventId,
                groupId: element?.attendeesDetails?.groupId
            }]
        };
        ApiClient.put('api/event/group/edit', payload).then(res => {
            if (res.success) {
                loader(false)
                e.target.value = "";
                getGroupPair()
            }
        })
    }
    const getGroupPair = () => {
        loader(true)
        ApiClient.get(`api/event/group/list?eventId=${eventIdd}`).then(res => {
            if (res.success) {
                loader(false)
                setGroupList(res?.data)
            }
        })
    }
    const getGroupRequest = () => {
        let payload = {
            eventId: eventIdd
        }
        ApiClient.get(`api/group-request/list`, payload).then(res => {
            if (res.success) {
                setRequestGroupList(res?.data)
            }
        })
    }

    const getGroupExport = async () => {
        try {

            const res = await axios({
                method: "get",
                url: `${environment.api}api/export/event-group?eventId=${eventIdd}`,
                responseType: 'blob',

            });
            var blob = new Blob([res.data], {
                type: res.headers["content-type"],
            });
            let downloadAnchor = document.createElement("a")
            downloadAnchor.href = window.URL.createObjectURL(blob);
            downloadAnchor.download = `GroupsDetail.xlsx`;
            downloadAnchor.click()


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // getAttendeesGroupPair()
        getGroupPair()
        getGroupRequest()
    }, [])
    const handleInputField = async () => {





        try {

            const res = await axios({
                method: "get",
                url: `${environment.api}api/sample/group-import`,
                responseType: 'blob',

            });
            var blob = new Blob([res.data], {
                type: res.headers["content-type"],
            });
            let downloadAnchor = document.createElement("a")
            downloadAnchor.href = window.URL.createObjectURL(blob);
            downloadAnchor.download = `SampleFile.xlsx`;
            downloadAnchor.click()


        } catch (error) {
            console.error('Error fetching data:', error);
        }


    };
    const handleCheckboxClick = (e, email) => {
        if (e.target.checked) {
            setSelectedEmails(prevSelectedEmails => [...prevSelectedEmails, email]);
        } else {
            setSelectedEmails(prevSelectedEmails => prevSelectedEmails.filter(selectedEmail => selectedEmail !== email));
        }
    };
    const handleSelectAllClick = (e, attendees) => {
        const emails = attendees?.map(attendee => attendee?.attendeesDetails?.email);
        if (e?.target?.checked) {
            setSelectedEmails(prevSelectedEmails => [...prevSelectedEmails, ...emails]);
            setHistoryModal(true)
        } else {
            setSelectedEmails(prevSelectedEmails => prevSelectedEmails.filter(selectedEmail => !emails.includes(selectedEmail)));
        }
    };
    const getselectedEmailsData=()=>{
        const emails = selectedEmails.join(',');
        ApiClient.get(`api/import/event-group/list?email=${emails}`).then(res => {
            if (res.success) {
                setHistoryData(res?.data)
            }
        })
    }
    console.log(historyData,"historyData")
    return (
        <>


     
            <PageLayout>
       
                <div className="bg-white border-gray-200 px-4 pt-8 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="container mx-auto">
                    <div
            className="mb-4 pt-1  pointer"
          onClick={() => history(-1)}
          >
            <span>


              <i className="fa fa-arrow-left mr-2"></i>
            </span>
            Back
          </div>
          <buuton onClick={getselectedEmailsData}>Search</buuton>
                        <div className=''>
                            <div className='flex items-center gap-4  mb-3'>

                                <div className='flex items-center justify-between flex-wrap w-full'>
                                    <div className='mt-2 flex  items-center gap-2'>
                                        <div className=''>
                                            <button className='w-full text-sm bg-orange-500 rounded-lg px-1 lg:px-4 py-2 text-white flex items-center gap-4 justify-center font-bold' onClick={() => setRequestGroup(true)}><FiPlus /> Add New Group</button>
                                        </div>
                                        <div className=''>
                                            <button className='w-full text-sm bg-orange-500 rounded-lg px-4 py-2 text-white flex items-center gap-4 justify-center font-bold' onClick={() => setShowDiv(true)}><LuUserPlus /> Request Group</button>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2 flex-wrap'>
                                        {/* {/ import File /} */}
                                        {/* <div className="flex items-center justify-center bg-grey-lighter">
                                            <label htmlFor="fileInput" className="flex gap-2 items-center border-dashed border-gray-200 items-center px-2 py-2 bg-white text-blue rounded-lg tracking-wide border border-blue cursor-pointer">
                                                <IoMdCloudUpload className='text-md' />
                                                <span className="text-sm leading-normal">Import file</span>
                                            </label>
                                            <input id="fileInput" type="file" style={{ display: 'none' }} onChange={importFile} />
                                        </div> */}

                                        <div className=''>
                                            <div className="flex  items-center justify-center bg-grey-lighter">
                                                <label className=" flex gap-2 items-center border-dashed border-gray-200 items-center px-2 py-2 bg-white text-blue rounded-lg tracking-wide  border border-blue cursor-pointer ">
                                                    <IoMdCloudDownload className='text-md' />

                                                    <span className="text-sm leading-normal" onClick={() => handleInputField()}>Download file</span>

                                                </label>
                                            </div>
                                        </div>
                                        <button className='bg-orange-500 px-2 py-2 rounded-md text-sm flex items-center gap-2 text-white' onClick={getGroupExport}><TbFileExport className='text-md' /> Export Data</button>

                                    </div>


                                </div>

                            </div>


                            {showDiv ? <div className='w-full border border-1 mt-4 rounded-lg p-3 mb-4'>
                                <div className="flex items-center justify-end">
                                <button className='bg-orange-500 text-sm px-2 py-1 flex items-center gap-1 rounded-md text-white' onClick={handleCloseModal}><MdClear />  Close</button>
                                </div>
                                <div className='grid grid-cols-1 lg:grid-cols-2'>
                                    {requestGroupList?.length ? requestGroupList?.map((ele) => {
                                        return (<><div className="shwoing-requeted">
                                            <h4 className='mb-4 mt-4 text-xs'>Requested By : <span className='bg-orange-500 px-2 py-1 pb-1 text-sm rounded-md ml-2 text-white'>{ele?.requestedBy}</span></h4>

                                            <table className='w-full'>
                                                <thead className='border border-gray-200'>
                                                    <tr className='border border-gray-200'>
                                                        <th className='border border-gray-200 text-left p-2'>Name</th>
                                                        <th className='border border-gray-200 text-left p-2'>Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ele?.attendeesDetails?.map((element) => {
                                                        return (<tr>
                                                            <td className='border border-gray-200 p-2'>{element?.fullName}</td>
                                                       <td className='border border-gray-200 p-2'>{element?.email}</td>
                                                        </tr>)

                                                    })}
                                                </tbody>
                                            </table>




                                        </div></>)


                                    }) :"No Data Available"}
                                </div>

                            </div> : ""}
                            
                            <div className='grid grid-cols-12 gap-x-4'>
                                    <div className='col-span-12 md:col-span-12'>

                                        <div className='grid grid-cols-1 lg:grid-cols-2  gap-2'>
                                           
                                            {groupList?.sort((a, b) => a.groupNo - b.groupNo)?.map((ele) => {
                                                return (
                                                    <>
 
                                                        <div className='brouplists border border-1 rounded-lg shadow-lg p-3 mb-3'>

                                                            <div className='flex items-center justify-between border-b border-1 pb-2 mb-2'>
                                                                <div className='flex items-center gap-1'>
                                                                { ele?.attendees ?  <input type="checkbox" onChange={(e) => handleSelectAllClick(e, ele?.attendees)} /> :""} 
                                                                <h2 className='font-bold text-[#2b2b2b] text-lg'> Group{ele?.groupNo}</h2>
                                                                </div>
                                                               
                                                                {ele?.isUnique === true ? <span className='bg-orange-500 p-2 text-xs  mb-0 text-white rounded-md inline-flex'>New Pair</span> : ""}
                                                            </div>
                                                            <p className=''>{ele?.attendees?.map((element) => {
                                                                return (
                                                                    <div className='card_inners border-b  last:border-0  items-center flex  flex-wrap gap-y-2 items-center justify-between  p-2'>
                                                                        <div className='flex items-start gap-1'>
                                                                            {/* <input type="checkbox" className='mt-1'onChange={(e) => handleCheckboxClick(e, element?.attendeesDetails?.email)} />      */}
                                                                        <div>
                                                                            {element?.attendeesDetails?.fullName ? <p className='flex items-center mb-2 gap-1 text-[#75757A] capitalize text-[14px] '><LuUser2 className='text-black !text-[16px]' />{element?.attendeesDetails?.fullName}</p> : ""}
                                                                            {element?.attendeesDetails?.email ? <p className='flex items-center gap-1 text-[#75757A]  text-[14px]'><MdOutlineEmail className='text-black !text-[16px]' />{element?.attendeesDetails?.email}</p> : ""}
                                                                    
                                                                        </div>
                                                                        </div>
                                                                        {element?.attendeesDetails?.fullName || element?.attendeesDetails?.email ? <div className='rounded-md shdaow-md bg-orange-400 focus:outline-none cursor-pointer  px-2 pb-1 '>
                                                                            <select className=" bg-transparent focus:outline-none cursor-pointer text-[14px]  text-white" onChange={(e) => handleSelectValue(e, element)}>
                                                                                <option value="" disabled selected>Move to</option>
                                                                                {groupList?.filter((data) => data.groupNo !== ele.groupNo)?.map((data) => (
                                                                                    <option className='text-md text-black' key={data?.groupNo} value={data?._id?.ConnectMeetId}>Group {data?.groupNo}</option>
                                                                                ))}
                                                                            </select>

                                                                        </div> : ""}

                                                                    </div>

                                                                )
                                                            })}</p>
                                                        </div>
                                                    </>
                                                )

                                            })}
                                        </div>

                                    </div>
                                    {/* <div className='col-span-12 md:col-span-4'>
                                        <div className='histroy_showinf p-4 rounded-md border border-gray-300'>
                                            <h6 className='text-black text-xl flex items-center gap-2  mb-4'><GoHistory /> History</h6>
                                            

                                           


                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                               

                                                <div className="w-full ">
                                                        <div className="mb-4 border border-gray-200 rounded-lg">
                                                            <Disclosure >
                                                            {({ open }) => (
                                                                <>
                                                                <Disclosure.Button className="flex w-full items-center cursor-pointer justify-between rounded-lg bg-orange-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                                                    <div className=' '>
                                                                        <div className='flex flex-col gap-y-1'>
                                                                            <h4 className='text-lg font-bold text-[#2b2b2b]'> Name </h4>
                                                                            <p className='text-sm text-gray-500'>11:30pm - <span>1/02/2022</span></p>
                                                                        </div>
                                                                    </div>
                                                                    <ChevronUpIcon
                                                                    className={`${
                                                                        open ? 'rotate-180 transform' : ''
                                                                    } h-5 w-5 text-black`}
                                                                    />
                                                                </Disclosure.Button>
                                                                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                                                <div className=''>
                                                                    <p className='flex items-center mb-2 gap-1 text-[#75757A] capitalize text-[14px] '><LuUser2 className='text-black !text-[16px]' />wdwd</p>
                                                                    <p className='flex items-center mb-2 gap-1 text-[#75757A] capitalize text-[14px] '><MdOutlineEmail className='text-black !text-[16px]' />wdwd</p>
                                                                </div>
                                                                </Disclosure.Panel>
                                                                </>
                                                            )}
                                                            </Disclosure>
                                                            {historyData?.map((ele)=>{
return(<div><h4>Name{ele?.fullName}</h4>
<h4>E-mail{ele?.email}</h4>
<div>
    <h5>{historyData?.eventDetail?.map((element)=>{
        return(
            <>
               <p> EventName{element?.
                eventName
                }</p>
                <p>EventDate{datepipeModel.datetime(element?.eventDate)} </p>
                <p>connectMeetDate {datepipeModel.datetime(element?.connectMeetDate)} </p>
            </>
         
        )
    })}</h5>
    </div>
</div>)
                                                            })}
                                                            
                                                            <div></div>
                                                        </div>
                                                </div>



                                            </div>


                                        </div>

                                    </div> */}
                            </div>


                        </div>
                        {/* {Object.entries(eventDetail).map(([group, items] :any) => (
                <div key={group}>
                    <p>{group}</p>
                    {items?.map((item) => (
                        <div key={item.id} style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <p>{item.fullName}</p>
                            <p>{item.email}</p>
                            <select className="form-select" onChange={handleSelectValue}>
                                <option value="" disabled selected>Move to</option>
                                <option value="group1">1</option>
                                <option value="group2">2</option>
                                <option value="group3">3</option>
                                <option value="group4">4</option>
                            </select>
                        </div>
                    ))}
                </div>
            ))} */}
                        {requestGroup ? <>
                            <Modal

                                title="Request Group"
                                body={<>
                                    <AddNewGroup dataaa={receivedStateData?.dataa} setRequestGroup={setRequestGroup} getGroupPair={getGroupPair} receivedStateData={receivedStateData} />
                                </>}
                                result={e => {
                                    setRequestGroup(false)
                                }}
                            />
                        </> : <></>}
                        {historyModal ? <>
        <Modal
          
          title=" History"
          body={<>
         <GroupHistory />
          </>}
          result={e => {
            setHistoryModal(false)
          }}
        />
      </> : <></>}
                    </div>
                </div>

            </PageLayout>
        </>


    )
}

export default Groups