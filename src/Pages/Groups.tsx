import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import ApiClient from "../methods/api/apiClient";
import loader from '../methods/loader';
import { MdOutlineEmail } from 'react-icons/md';
import { LuUser2 } from 'react-icons/lu';
import axios from 'axios';
import { TbFileExport } from "react-icons/tb";
import environment from '../environment';
const Groups = ({ eventDetail = '' }: any) => {
    const { id } = useParams()
    const [groupList, setGroupList]: any = useState()
    const [attendeesGroup , setattendeesGroup] = useState()
    const [data,setData]=useState()
    const getAttendeesGroupPair  = () => {
        loader(true)
        ApiClient.get(`api/event/groups?eventId=${id}`).then(res => {
          if (res.success) {
         
            setattendeesGroup(res?.data)
            loader(false)
            getGroupPair()
          }
        })
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
        ApiClient.get(`api/event/group/list?eventId=${id}`).then(res => {
            if (res.success) {
                loader(false)
                setGroupList(res?.data)
            }
        })
    }
 

const getGroupExport = async () => {
    try {
   
  const res=await axios({
      method:"get",
      url: `${environment.api}api/export/event-group?eventId=${id}`,
      responseType:'blob',
   
  });
  var blob=new Blob([res.data],{
      type:res.headers["content-type"],
  });
  let downloadAnchor :any= document.createElement("a")
  downloadAnchor.href = window.URL.createObjectURL(blob);
  downloadAnchor.download = `GroupsDetail.xlsx`;
  downloadAnchor.click()
      
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
    useEffect(() => {
        getAttendeesGroupPair()
    }, [])
    const handleInputField = (e: any) => {
        const file = e.target.files?.[0]; // Get the selected file
       
          const formData = new FormData();
          formData.append('file', file);
         let body={
          file:e.target.files?.[0]
         }
          ApiClient.postFormData('api/importGroupEvent', body)
            .then(res => {
              if (res.success) {
                console.log(res.data); // Log the response data if needed
              } else {
                console.error('Failed to import file:', res.error); // Handle error response
              }
            })
            .catch(error => {
              console.error('Network error:', error); // Handle network errors
            });
        
      };
    console.log(groupList, "groupList")
    return (
        <>
        
                    <div className='max-h-96 overflow-y-auto'>
                    <div className='flex items-center justify-end'>
                            <button className='bg-orange-500 px-2 py-2 rounded-md text-sm flex items-center gap-2 text-white' onClick={getGroupExport}><TbFileExport className='text-md' /> Export Data</button>
                            </div>
                        <div className=''>
                            
                            {/* import button */}
                            <div>

                            <div className="flex w-full mt-2 items-center justify-center bg-grey-lighter">
                                    <label className="w-full flex flex-col border-dashed border-gray-200 items-center px-2 py-3 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:shadow-lg ">
                                        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                        </svg>
                                        <span className="mt-2 text-xs leading-normal">Select a file</span>
                                        <input type='file' onChange={(e :any)=>handleInputField(e)} className="hidden" />
                                    </label>
                                </div>


                            
                            </div>
                      {/*  */}
                        </div>
                    <div className='grid grid-cols-2 gap-2'>
                        {groupList?.sort((a : any, b : any) => a.groupNo - b.groupNo)?.map((ele: any) => {
                            return (
                                <>

                                    <div className='brouplists border border-1 rounded-lg shadow-lg p-3'>

                                        <h2 className='font-bold text-[#2b2b2b] text-lg border-b border-1 pb-2'> Group{ele?.groupNo}</h2>
                                        <p className=''>{ele?.attendees?.map((element: any) => {
                                            return (
                                                <div className='card_inners border-b  last:border-0  items-center flex  flex-wrap gap-y-2 items-center justify-between  p-2                                        '>
                                                    <div className='text-[14px]'>
                                                        <p className='flex items-center gap-1 text-[#75757A] capitalize '><LuUser2 className='text-black'/>{element?.attendeesDetails?.fullName}</p>
                                                        <p className='flex items-center gap-1 text-[#75757A] '><MdOutlineEmail className='text-black'/>{element?.attendeesDetails?.email}</p>
                                                    </div>

                                                    <div className=''>
                                                        <select className="rounded-full shdaow-md bg-orange-400 focus:outline-none cursor-pointer text-[12px] p-1 text-white" onChange={(e: any) => handleSelectValue(e, element)}>
                                                            <option value="" disabled selected>Move to</option>
                                                            {groupList?.filter((data: any) => data.groupNo !== ele.groupNo)?.map((data: any) => (
                                                                <option key={data?.groupNo} value={data?.groupNo}>Group {data?.groupNo}</option>
                                                            ))}
                                                        </select>

                                                    </div>
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

        </>


    )
}

export default Groups