import React from 'react'

const MemberHistory = ({ eventDetail = '' }) => {
  return (
    <>
      <div className=' overflow-y-auto'>
      <div className='scrollbar h-[600px] w-full overflow-auto'>
      <table className='w-full'>
        <thead className='!border border-[#EAECF0]'>
          <tr className='!border border-[#EAECF0]'>
            <th className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] !px-5 text-left bg-[#F7FAFF] !py-3'>Event</th>
            <th className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] !px-5 text-left bg-[#F7FAFF] !py-3'>Description</th>
            <th className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] !px-5 text-left bg-[#F7FAFF] !py-3'>Type</th>
            <th className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] !px-5 text-left bg-[#F7FAFF] !py-3'>Added By</th>
            <th className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] !px-5 text-left bg-[#F7FAFF] !py-3'>Address</th>
          </tr>
        </thead>
        <tbody>
        {eventDetail?.map((ele)=>{
            return (
              <tr>
                <td className=' text-typo !px-2 text-sm font-normal !py-3 !border text-center border-[#EAECF0]'>{ele?.eventsDetails?.title}</td>
                <td className=' text-typo !px-2 text-sm font-normal !py-3 !border text-center border-[#EAECF0]'> <div dangerouslySetInnerHTML={{ __html: ele?.eventsDetails?.description }} /></td>
                <td className=' text-typo !px-2 text-sm font-normal !py-3 !border text-center border-[#EAECF0]'>{ele?.eventsDetails?.type}</td>
                <td className=' text-typo !px-2 text-sm font-normal !py-3 !border text-center border-[#EAECF0]'>{ele?.emailFrom}</td>
                <td className=' text-typo !px-2 text-sm font-normal !py-3 !border text-center border-[#EAECF0]'>{ele?.eventsDetails?.address}</td>
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