import React from 'react'

const MemberHistory = ({ eventDetail = '' }) => {
    console.log(eventDetail,"eventDetail")
  return (
    <>
    <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Type</th>
            <th>Added By</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
        {eventDetail?.map((ele)=>{
            return (
              <tr>
                <td>{ele?.eventsDetails?.title}</td>
                <td>{ele?.eventsDetails?.description}</td>
                <td>{ele?.eventsDetails?.type}</td>
                <td>{ele?.emailFrom}</td>
                <td>{ele?.eventsDetails?.address}</td>
              </tr>
            )
  
        })}
          
</tbody>
  
</table>

    </>
   
  )
}

export default MemberHistory