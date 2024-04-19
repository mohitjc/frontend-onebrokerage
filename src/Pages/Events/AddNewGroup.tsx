import React, { useState } from 'react'
import ApiClient from "../../methods/api/apiClient";
import { useNavigate, useParams, Link } from "react-router-dom";
const AddNewGroup = ({dataaa =''} :any) => {
    const [value ,setValue]= useState()
    const { id } = useParams()
    console.log(dataaa,"dataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaadataaa")
   const handletext=(e :any)=>{
    setValue(e?.target?.value)
   }
    const getInvites = () => {
        let f = {
            eventId:id,
            groupId: dataaa?.groupId?._id,
            groupNo:value ,
            attendeeIds: [
               
            ]
        }
        ApiClient.get('api/add/group-event',f).then(res => {
          if (res.success) {
            console.log(res)
          }
        })
      }
      const handleSubmit=()=>{

      }
  return (
    <>
    <div className=''>
        <div className='w-full'>
            <label className='mb-1 block'>Add New Group</label>
            <input type="text" className='shadow w-full h-10 p-2' placeholder='Group name' onChange={handletext}></input> 
        </div>   
         <button className='px-4 py-2 bg-orange-500 rounded-lg text-white mt-4' onClick={getInvites}>Add</button>
    </div>
    </>
  )
}

export default AddNewGroup