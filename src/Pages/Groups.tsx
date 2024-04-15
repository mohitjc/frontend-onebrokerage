import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import ApiClient from "../methods/api/apiClient";
import loader from '../methods/loader';
import { MdOutlineEmail } from 'react-icons/md';
import { LuUser2 } from 'react-icons/lu';
const Groups = ({ eventDetail = '' }: any) => {
    const { id } = useParams()
    const [groupList, setGroupList]: any = useState()
    const handleSelectValue = (e : any ,element: any ) => {
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
        ApiClient.put('api/event/group/edit',payload).then(res => {
            if (res.success) {
                loader(false)
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
    useEffect(() => {
            getGroupPair()
     
    }, [])

    console.log(groupList, "groupList")
    return (
        <>
        <div className='max-h-96 overflow-y-auto'>

       
        <div className='grid grid-cols-2 gap-2 '>
            {groupList?.map((ele: any) => {
                return (
                    <>

                        <div className='brouplists border border-1 p-3 '>

                            <h2 className='font-bold text-[#2b2b2b] text-lg border-b border-1 pb-2'> Group{ele?.groupNo}</h2>
                            <p className=''>{ele?.attendees?.map((element: any) => {
                                return (
                                    <div className='card_inners border-b  last:border-0  flex gap-1 items-center flex-wrap justify-between p-2'>
                                        <div className='text-[14px]'>
                                            <p className='flex items-center gap-1 text-[#75757A]'><LuUser2 />{element?.attendeesDetails?.fullName}</p>
                                            <p className='flex items-center gap-1 text-[#75757A]'><MdOutlineEmail />{element?.attendeesDetails?.email}</p>
                                        </div>

                                       <div className=''>
                                            <select className="rounded-full bg-orange-400 focus:outline-none cursor-pointer text-[14px] p-2 text-white" onChange={(e :any)=>handleSelectValue(e , element )}>
                                                <option value="" disabled selected>Move to</option>
                                                {groupList?.map((data: any) => (
                                                    <option key={data.groupNo} value={data.groupNo}>Group {data.groupNo}</option>
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