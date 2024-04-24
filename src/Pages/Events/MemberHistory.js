import React from 'react'

const MemberHistory = ({ eventDetail = '' }) => {
  return (
    <>
      <div className=' overflow-y-auto'>
      <div className='scrollbar h-[500px] w-full overflow-auto'>
      <table className='w-full'>
        <thead className='text-xs text-gray-700 capitalize bg-gray-50  border-b border-[#EAECF0]'>
          <tr className='!border border-[#EAECF0]'>
            <th className='cursor-pointer  !border-l-0  !border border-[#EAECF0] !px-2 text-left bg-[#F7FAFF] !py-3'>Event</th>
            <th className='cursor-pointer  !border-l-0  !border border-[#EAECF0] !px-2 text-left bg-[#F7FAFF] !py-3'>Description</th>
            <th className='cursor-pointer  !border-l-0  !border border-[#EAECF0] !px-2 text-left bg-[#F7FAFF] !py-3'>Type</th>
            <th className='cursor-pointer  !border-l-0  !border border-[#EAECF0] !px-2 text-left bg-[#F7FAFF] !py-3'>Added By</th>
            <th className='cursor-pointer  !border-l-0  !border border-[#EAECF0] !px-2 text-left bg-[#F7FAFF] !py-3'>Address</th>
          </tr>
        </thead>
        <tbody>
        {eventDetail?.map((ele)=>{
            return (
              <tr>
                <td className=' text-typo !px-2 text-sm font-normal !py-3 !border text-left border-[#EAECF0]'>{ele?.eventsDetails?.title}</td>
                <td className=' text-typo !px-2 text-sm font-normal !py-3 !border text-left border-[#EAECF0]'>{ele?.eventsDetails?.description}</td>
                <td className=' text-typo !px-2 text-sm font-normal !py-3 !border text-left border-[#EAECF0]'>{ele?.eventsDetails?.type}</td>
                <td className=' text-typo !px-2 text-sm font-normal !py-3 !border text-left border-[#EAECF0]'>{ele?.emailFrom}</td>
                <td className=' text-typo !px-2 text-sm font-normal !py-3 !border text-left border-[#EAECF0]'>{ele?.eventsDetails?.address}</td>
              </tr>
            )
  
        })}
          
</tbody>
  
</table>
</div>
      </div>
    </>
   
  )
}

export default MemberHistory