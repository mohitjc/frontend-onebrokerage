import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './profile.scss'
import methodModel from '../../methods/methods';
import crendentialModel from '../../models/credential.model';


const Profile = () => {

  const user:any = crendentialModel.getUser()
  const [data, setData]:any = useState('');
console.log(data,"allGroupDetails")
  const gallaryData = () => {
    loader(true)
    ApiClient.get(`api/user/detail`, { id: user._id }).then(res => {
      if (res.success) {
        setData(res.data)
      }
      loader(false)

    })
  };

  useEffect(
    () => {
      if (user) {
        gallaryData();
      }
    },
    []
  );

  return (
    <Layout>


      <div className='wrapper_section'>
        <div className='flex items-center  justify-between'>
          <h3 className='text-2xl font-semibold text-[#111827]'>Basic Information</h3>
          <Link to="/profile/edit" className="!px-4 text-sm font-normal bg-orange-500 hover:bg-orange-700 text-white h-10 flex items-center justify-center gap-2 !bg-primary rounded-lg shadow-btn hover:opacity-80 transition-all focus:ring-2 ring-[#EDEBFC] disabled:bg-[#D0CAF6] disabled:cursor-not-allowed">

            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
            Edit Profile

          </Link>
        </div>

        <div className='inner_part sm:mt-3 md:mt-8 p-6 shadow-box overflow-hidden rounded-lg bg-white'>
          <div className='grid items-start grid-cols-12 gap-4'>

            <div className='col-span-12 md:col-span-3 lg:col-span-2'>
              <img src={methodModel.userImg(data && data.image)} className="h-32 w-32 mx-auto" />
            </div>

            <div className='col-span-12 md:col-span-9 lg:col-span-10 pl-5 ml-6 border-l  border-gray-300'>
                <div className='grid grid-cols-2 gap-4 '>
                   


                    <div className=''>
                      <div className='text_head'>
                        <label className='text-typo text-base font-normal max-w-sm w-full block mb-1'>Name</label>
                      </div>
                      <div className='sub_fatch'>
                        <p className='text-sm text-gray-500'>{data && data.fullName}</p>
                      </div>
                    </div>
                   


                    <div className=''>
                      <div className='text_head'>
                        <label className='text-typo text-base font-normal max-w-sm w-full block mb-1'>Email</label>
                      </div>
                      <div className='sub_fatch'>
                        <p className='text-sm text-gray-500' >{data && data.email}</p>
                      </div>
                    </div>
                  

                    {/* <div className=''>
                      <div className='text_head'>
                        <label className='text-typo text-base font-normal max-w-sm w-full block mb-1'>Role</label>
                      </div>
                      <div className='sub_fatch'>
                        <p className='text-sm text-gray-500' >{user.customerRole?.name}</p>
                      </div>
                    </div> */}
                  


                    <div className=''>
                      <div className='text_head'>
                        <label className='text-typo text-base font-normal max-w-sm w-full block mb-1'>Mobile No</label>
                      </div>
                      <div className='sub_fatch'>
                        <p className='text-sm text-gray-500'>{String(data.mobileNo?'+'+data.mobileNo:'N/A')}</p>
                      </div>
                    </div>

{/* {data?.groupId?<>
  <div className=''>
                      <div className='text_head'>
                        <label className='text-typo text-base font-normal max-w-sm w-full block mb-1'>Group</label>
                      </div>
                      <div className='sub_fatch'>
                        <p className='text-sm text-gray-500' >{data?.groupId?.name||'--'}</p>
                      </div>
                    </div>   
</>:<></>} */}



                                     
                </div>

                <div className='mt-8'>
                  <div className='overflow-auto'>
                  <table className='w-full'>
                  <thead className='border-y border-[#EAECF0]'>
                    <tr className='border-y border-[#EAECF0]'>
                        <th className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-2'><label className='text-typo text-base font-normal max-w-sm w-full block '>Group</label></th>
                        <th className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-2'><label className='text-typo text-base font-normal max-w-sm w-full block '>Role</label></th>

                    </tr>
                   
                 
                  
                  </thead>
                <tbody>

                {
                  data?.allGroupDetails?.map((e :any)=>{
                    return(
                      <tr>
                        <td className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-2'>{e?.groupId?.name}</td>
                        <td className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-2'>{e?.role}</td>

                      </tr>
                    
                    )

                  })
                }
                </tbody>
                </table>
                </div>

                </div>
            </div>


           
          


          </div>
        </div>
      </div>



    </Layout>
  );
};

export default Profile;
