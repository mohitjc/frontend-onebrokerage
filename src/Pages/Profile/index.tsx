import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './profile.scss'
import methodModel from '../../methods/methods';
import { useSelector } from 'react-redux';
import { LiaUserSolid } from 'react-icons/lia';
import { MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';


const Profile = () => {

  const user = useSelector((state:any) => state.user);
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
      if (user.loggedIn) {
        gallaryData();
      }
    },
    []
  );

  return (
    <Layout>


      <div className='wrapper_section'>
        <div className='flex items-center  justify-between'>
          <h3 className=' text-lg lg:text-2xl font-semibold text-[#111827]'>Basic Information</h3>
          <Link to="/profile/edit" className="px-2 lg:!px-4 text-sm font-normal bg-orange-500 hover:bg-orange-700 text-white h-10 flex items-center justify-center gap-2 !bg-primary rounded-lg shadow-btn hover:opacity-80 transition-all focus:ring-2 ring-[#EDEBFC] disabled:bg-[#D0CAF6] disabled:cursor-not-allowed">

            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
            Edit Profile

          </Link>
        </div>

        <div className='inner_part sm:mt-3 md:mt-8 p-6 shadow-box overflow-hidden rounded-lg bg-white'>
          <div className='grid items-start grid-cols-12 gap-4'>

            <div className='col-span-12 md:col-span-5 lg:col-span-4'>
               <div className='flex items-center gap-4'>
               <div className=''>
                  <img src={methodModel.userImg(data && data.image)} className="h-32 w-32 rounded-md mx-auto" />
               </div>
               <div className='flex flex-col gap-y-2'>
                  <p className='text-sm text-gray-500 flex items-center gap-2'> <LiaUserSolid />{data && data.fullName}</p>
                  <p className='text-sm text-gray-500 flex items-center gap-2' ><MdOutlineEmail />{data && data.email}</p>
                  <p className='text-sm text-gray-500 flex items-center gap-2'><MdOutlinePhone />{String(data.mobileNo?'+'+data.mobileNo:'N/A')}</p>
               </div>
               </div>
            </div>

            <div className='col-span-12 md:col-span-7 lg:col-span-8 '>
            <div className='mt-2 '>
                  <div className='overflow-auto'>
                  <table className='w-full'>
                  <thead className='border-y border-[#EAECF0]'>
                    <tr className='border-y border-[#EAECF0]'>
                        <th className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-2'><label className='text-typo text-base font-normal max-w-sm w-full block capitalize'>Group</label></th>
                        <th className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-2'><label className='text-typo text-base font-normal max-w-sm w-full block capitalize'>Role</label></th>

                    </tr>
                  
                  </thead>
                <tbody>
                <td className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-2 capitalize'>{data?.groupId?.name||'--'}</td>
                <td className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-2 capitalize'>{data?.groupId?.name ? user.customerRole?.name : "--"}</td>
                     
                {
                  data?.allGroupDetails?.map((e :any)=>{
                    return(
                      <>
                     
                      <tr>
                      
                        <td className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-2 capitalize'>{e?.groupId?.name || "--"}</td>
                      
                       
                        <td className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-2 capitalize'>
                       { e?.groupId?.name ? (e?.role === "meetManager" ? "Connect Meet Manager" : (e?.role === "assistant" ? "Assistant Group Leader" : e?.role)) : "--"}

</td>

                      </tr>
                    </>
                     
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
