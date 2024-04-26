import React, { useState , useEffect } from 'react';
import Layout from '../components/global/layout';
import ApiClient from '../methods/api/apiClient';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const Setting = () => {
  const [memberGroup, setMemberGroup] = useState('');
  const [getdata,setGetData] :any= useState()
  const user = useSelector((state: any) => state.user);
console.log(getdata ,"getdatagetdatagetdatagetdatagetdatagetdata")
  useEffect(() => {
    getSettingData();
  }, []);
  const getSettingData = () => {
    const id = user?.groupId?._id;
    ApiClient.get(`api/event-group/setting?groupId=${id}`).then(res => {
      if (res.success) {
        setGetData(res.data);
        if (res.data && res.data.length > 0) {
          setMemberGroup(res.data[0].groupMemberLimit);
        }
      }
    });
  };
  
  const handleSave = () => {
    
    if(getdata && getdata.length > 0){
      const id =getdata[0]?._id
    let  payload ={
      id:id,
    groupMemberLimit:memberGroup
    }
      ApiClient.put(`api/event-group/setting/update`, payload).then(res => {
        if (res.success) {
          toast(res?.message)
        }
      });
    }
   else{
    const id = user?.groupId?._id;
    let  payload ={
      groupId:id,
      groupMemberLimit:memberGroup
    }
      ApiClient.post(`api/event-group/setting`, payload).then(res => {
        if (res) {
       toast(res?.message)
        }
      });
   }
  };

  const handleChange = (event: any) => {
    setMemberGroup(event.target.value);
  };

  return (
    <Layout>
      <div className='shadow-box bg-white rounded-lg mt-6 p-2 lg:p-6 w-full lg:w-96'>
        <div className='inputs_date'>
          <label className='mb-1 block'>My group settings</label>
          <input 
            type="text" 
            placeholder="Member Group" 
            className='relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 border border-gray-100' 
            value={memberGroup} 
            onChange={handleChange} 
          />
        </div>
        <div className='flex items-center justify-end'>
          <button 
            className='bg-orange-500 px-4 py-2 rounded-lg text-white mt-4' 
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Setting;
