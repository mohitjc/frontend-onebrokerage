import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import ApiClient from "../methods/api/apiClient";
import loader from '../methods/loader';
import { MdOutlineEmail } from 'react-icons/md';
import { LuUser2, LuUserPlus } from 'react-icons/lu';
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
const Groups = ({ eventDetail = '', dataa = '' }: any) => {
    console.log(eventDetail, "eventDetaileventDetaileventDetaileventDetaileventDetail")
    const { id } = useParams()
    const location = useLocation();
    const receivedStateData = location.state;
    console.log(receivedStateData, "receivedStateDatareceivedStateDatareceivedStateDatareceivedStateDatareceivedStateData")
    const [groupList, setGroupList]: any = useState()
    const [attendeesGroup, setattendeesGroup] = useState()
    const [requestGroup, setRequestGroup] = useState(false)
    const [requestGroupList, setRequestGroupList]: any = useState("")
    const [data, setData] = useState()
    const [showDiv, setShowDiv] = useState(false)
    const eventIdd = receivedStateData?.eventId?.id
    const groupId = receivedStateData?.dataa?.data?.groupId?._id
    console.log(eventIdd, "eventIddeventIdd")
    const getAttendeesGroupPair = () => {
        loader(true)
        ApiClient.get(`api/event/groups?eventId=${eventIdd}`).then(res => {
            if (res.success) {

                setattendeesGroup(res?.data)
                loader(false)
                getGroupPair()
            }
        })
    }
    const importFile = (e: any) => {
        const file = e?.target?.files[0];
    
        if (file) {
            loader(true)
            const formData = new FormData();
            formData.append('file', file);
            fetch('http://66.179.251.9:6040/multiple/documents?modelName="users"', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                loader(false)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the response data as needed
                console.log('Response:', data);
                loader(true)
                const filepath = data?.data?.imagePath
                ApiClient.get(`api/import/event-group?groupId=${groupId}&filePath=${filepath}`).then(res => {
                    if (res.success) {
                        loader(false)
        console.log(res ,"responaseeeeeeeeeeeeeeeeeeeeee")
        toast.success(res.message)
                    }
                })
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
        }
    }
    


    const handleSelectValue = (e: any, element: any) => {
        loader(true)
        let payload = {
            data: [{
                id: element?.id,
                groupNo: e?.target?.value,
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
            let downloadAnchor: any = document.createElement("a")
            downloadAnchor.href = window.URL.createObjectURL(blob);
            downloadAnchor.download = `GroupsDetail.xlsx`;
            downloadAnchor.click()


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getAttendeesGroupPair()
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
            let downloadAnchor: any = document.createElement("a")
            downloadAnchor.href = window.URL.createObjectURL(blob);
            downloadAnchor.download = `SampleFile.xlsx`;
            downloadAnchor.click()


        } catch (error) {
            console.error('Error fetching data:', error);
        }


    };
    console.log(groupList, "groupList")
    return (
        <>

            <PageLayout>

                <div className="bg-white border-gray-200 px-4 pt-8 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="container mx-auto">

                        <div className=''>
                            <div className='flex items-center gap-4  mb-3'>

                                <div className='flex items-center justify-between w-full'>
                                    <div className='mt-2 flex items-center gap-2'>
                                        <div className=''>
                                            <button className='w-full text-sm bg-orange-500 rounded-lg px-4 py-2 text-white flex items-center gap-4 justify-center font-bold' onClick={() => setRequestGroup(true)}><FiPlus /> Add New Group</button>
                                        </div>
                                        <div className=''>
                                            <button className='w-full text-sm bg-orange-500 rounded-lg px-4 py-2 text-white flex items-center gap-4 justify-center font-bold' onClick={() => setShowDiv(true)}><LuUserPlus /> Request Group</button>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        {/* import File */}
                                        <div className="flex items-center justify-center bg-grey-lighter">
                                            <label htmlFor="fileInput" className="flex gap-2 items-center border-dashed border-gray-200 items-center px-2 py-2 bg-white text-blue rounded-lg tracking-wide border border-blue cursor-pointer">
                                                <IoMdCloudUpload className='text-md' />
                                                <span className="text-sm leading-normal">Import file</span>
                                            </label>
                                            <input id="fileInput" type="file" style={{ display: 'none' }} onChange={importFile} />
                                        </div>

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
                                <div className=''>
                                    {requestGroupList?.map((ele: any) => {
                                        return (<>
                                            <h4 className='mb-4 mt-4'>Requested By : <span className='bg-orange-500 px-2 py-1 pb-1 text-sm rounded-md ml-2 text-white'>{ele?.requestedBy}</span></h4>

                                            <table className='w-full'>
                                                <thead className='border border-gray-200'>
                                                    <tr className='border border-gray-200'>
                                                        <th className='border border-gray-200 text-left p-2'>Name</th>
                                                        <th className='border border-gray-200 text-left p-2'>Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ele?.attendeesDetails?.map((element: any) => {
                                                        return (<tr>
                                                            <td className='border border-gray-200 p-2'>{element?.fullName}</td>
                                                            <td className='border border-gray-200 p-2'>{element?.email}</td>
                                                        </tr>)

                                                    })}
                                                </tbody>
                                            </table>




                                        </>)


                                    })}
                                </div>

                            </div> : ""}
                            <div className='grid grid-cols-2 gap-2'>
                                {groupList?.sort((a: any, b: any) => a.groupNo - b.groupNo)?.map((ele: any) => {
                                    return (
                                        <>

                                            <div className='brouplists border border-1 rounded-lg shadow-lg p-3 mb-3'>

                                                <div className='flex items-center justify-between border-b border-1 pb-2 mb-2'>
                                                    <h2 className='font-bold text-[#2b2b2b] text-lg     '> Group{ele?.groupNo}</h2>
                                                    {ele?.isUnique === true ? <p className='bg-orange-500 p-2 text-xs  mb-0 text-white rounded-md'>New Pair</p> : ""}
                                                </div>
                                                <p className=''>{ele?.attendees?.map((element: any) => {
                                                    return (
                                                        <div className='card_inners border-b  last:border-0  items-center flex  flex-wrap gap-y-2 items-center justify-between  p-2                                        '>
                                                            <div className=''>
                                                                {element?.attendeesDetails?.fullName ? <p className='flex items-center mb-2 gap-1 text-[#75757A] capitalize text-[14px] '><LuUser2 className='text-black !text-[16px]' />{element?.attendeesDetails?.fullName}</p> : ""}
                                                                {element?.attendeesDetails?.email ? <p className='flex items-center gap-1 text-[#75757A]  text-[14px]'><MdOutlineEmail className='text-black !text-[16px]' />{element?.attendeesDetails?.email}</p> : ""}
                                                            </div>
                                                            {element?.attendeesDetails?.fullName || element?.attendeesDetails?.email ? <div className='rounded-full shdaow-md bg-orange-400 focus:outline-none cursor-pointer  px-2 pb-1 '>
                                                                <select className=" bg-transparent focus:outline-none cursor-pointer text-[14px]  text-white" onChange={(e: any) => handleSelectValue(e, element)}>
                                                                    <option value="" disabled selected>Move to</option>
                                                                    {groupList?.filter((data: any) => data.groupNo !== ele.groupNo)?.map((data: any) => (
                                                                        <option className='text-md text-black' key={data?.groupNo} value={data?.groupNo}>Group {data?.groupNo}</option>
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
                        {/* {Object.entries(eventDetail).map(([group, items] :any) => (
                <div key={group}>
                    <p>{group}</p>
                    {items?.map((item: any) => (
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
                    </div>
                </div>

            </PageLayout>
        </>


    )
}

export default Groups