import React, { useState } from 'react';
import Select from 'react-select';
import ApiClient from '../../methods/api/apiClient';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import loader from '../../methods/loader';
const RequestGroup = ({ eventDetail = '' ,data="" ,setRequestGroup=""}: any) => {
  const { id } = useParams()
  const user = useSelector((state:any) => state.user);
  console.log(data,"datatatatattatattaattataatt")
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const options = eventDetail('Yes').map((itm: any) => ({
    value: itm.id,
    label: itm.memberDetails?.fullName
  }));

  const handleSelectChange = (selectedOptions: any) => {
    const selectedIdsArray = selectedOptions.map((option: any) => option.value);
    setSelectedIds(selectedIdsArray);
  };
  const handleSubmit=()=>{
    loader(true)
    let payload={
      
        eventId: id,
        groupId:data?.groupId?._id,
        requestedBy: user?.email,
        attendeeIds:selectedIds
      
    
    }
    ApiClient.post("api/group/request",payload).then(res=>{
     
      if(res){
   toast(res.message)
   loader(false)
   setRequestGroup(false)
      }
    })
  }
console.log(selectedIds,"selectedIdsselectedIdsselectedIdsselectedIds")
  return (
    <div>
      <label>Members</label>
      <Select
        isMulti
        options={options}
        onChange={handleSelectChange}
      />
     <div className='mt-4 flex items-center justify-end'>
       <button className='bg-[#EF7A2B] inline-flex py-2 px-6 flex items-center justify-center gap-x-2 text-white shadow hover:shadow-lg rounded-xl' onClick={()=>handleSubmit()}>Save</button>
     </div>
    </div>
    
  );
};

export default RequestGroup;
