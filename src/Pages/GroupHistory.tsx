import React from 'react'

const GroupHistory = ({data=""}) => {
  console.log(data,"historyDatahistoryDatahistoryData")
  return (
    <div className='flex gap-4'>
      <div className='flex flex-col gap-y-2'>
        <div className=''>
            <h4>Event Name</h4>
            <p>dragonz ball</p>
          </div>
          <div className=''>
            <h4>Event Name</h4>
            <p>dragonz ball</p>
          </div>
      </div>
      <div className=''>
        <ul className='flex gap-2'>
          <li>Name</li>
          <li>Name</li>
          <li>Name</li>
          
        </ul>
      </div>
    </div>
  )
}

export default GroupHistory