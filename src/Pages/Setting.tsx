import React from 'react'
import Layout from '../components/global/layout'
const Setting = () => {
  return (
    <>
     <Layout>

    <div>
        <h3 className="text-2xl font-semibold text-[#111827]"> Setting</h3>
        <p className="text-sm font-normal text-[#75757A]">Here you can see all about your Setting</p>
    </div>

    <div className='shadow-box  bg-white rounded-lg mt-6 p-6 w-96'>
        <div className='imputs_date'>
          <label className='mb-1 block'>Members Per Group</label>
          <input type="text" placeholder="Member Group" className='relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 border border-gray-100' />
        </div>
        <div className='flex items-center justify-end'>
        <button className='bg-orange-500 px-4 py-2 rounded-lg text-white mt-4'>Save</button>
        </div>
    </div>

    
    
   
    
    
      </Layout>
    </>
    
  )
}

export default Setting