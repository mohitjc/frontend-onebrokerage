import React, { useState } from 'react';
import Select from 'react-select';
import ApiClient from '../../methods/api/apiClient';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const RequestGroup = ({ eventDetail = '' ,data="" }: any) => {
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
    let payload={
      
        eventId: id,
        groupId:data?.groupId?._id,
        requestedBy: user?.email,
        attendeeIds:selectedIds
      
    
    }
    ApiClient.post("api/group/request",payload).then(res=>{
      if(res.success){
      console.log(res)
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
     <div>
      <button onClick={()=>handleSubmit()}>Save</button>
     </div>
    </div>
    
  );
};

export default RequestGroup;
