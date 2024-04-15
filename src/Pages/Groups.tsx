import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import ApiClient from "../methods/api/apiClient";
import loader from '../methods/loader';
const Groups = ({ eventDetail = '' }: any) => {
    const { id } = useParams()
    const [groupList, setGroupList]: any = useState()
    const handleSelectValue = (e : any ,element: any ) => {
        loader(true)
        console.log(element,"newwwwww")
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
            {groupList?.map((ele: any) => {
                return (
                    <>

                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly"
                        }}>
                            <h2> Group{ele?.groupNo}</h2>
                            <p>{ele?.attendees?.map((element: any) => {
                                return (
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-evenly"
                                    }}>
                                        <p>{element?.attendeesDetails?.fullName}</p>
                                        <p>{element?.attendeesDetails?.email}</p>
                                        <select className="form-select" onChange={(e :any)=>handleSelectValue(e , element )}>
                                <option value="" disabled selected>Move to</option>
                                {groupList?.map((data: any) => (
                                    <option key={data.groupNo} value={data.groupNo}>Group {data.groupNo}</option>
                                ))}
                                
                            </select>
                                    </div>

                                )
                            })}</p>
                        </div>
                    </>
                )

            })}

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