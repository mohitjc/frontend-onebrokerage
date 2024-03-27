import { Tooltip } from "antd";
import Table from "../../components/Table";
import datepipeModel from "../../models/datepipemodel";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import crendentialModel from "../../models/credential.model";
import AddAttendee from "./AddAttendee";

export default function AttendeeList({eventId}){
    const [data,setData]=useState([])
    const [total,setTotal]=useState(0)
    const [tab,setTab]=useState('list')
    const user=crendentialModel.getUser()
    const [filters,setFilter]=useState({page:1,count:50,search:'',addedBy:user._id})

    const columns = [
        {
            key: 'fullName', name: 'Name', sort: true,
            render: (row) => {
                return <>{row?.fullName}</>
            }
        },
        {
            key: 'email', name: 'Email',
            render: (row) => {
                return <>{row?.email}</>
            }
        },
        {
            key: 'createdAt', name: 'Created At',
            render: (row) => {
                return <>
                    {datepipeModel.datetime(row?.createdAt)}
                </>
            }
        },
        {
            key: 'action', name: 'Action',
            render: (itm) => {
                return <>
                    <div className="flex items-center justify-start gap-1.5">
                    {/* <Tooltip placement="top" title="View">
                                <a className="border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl">
                                <span class="material-symbols-outlined">visibility</span>
                                </a>
                            </Tooltip> */}
                            {/* <Tooltip placement="top" title="Edit">
                                <a className="border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl">
                                    <FiEdit3 />
                                </a>
                            </Tooltip> */}
                            <Tooltip placement="top" title="Delete"> <span className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-lg bg-[#FDE9EA] w-10 h-10 text-[#E92531] flex items-center justify-center text-xl'>
                            <BsTrash3 />
                        </span> </Tooltip> 
                    </div>
                </>
            }
        },
    ]


    const getData=(p={})=>{
        let f={...filters,...p}
        ApiClient.get('api/attendees/list',f).then(res=>{
            if(res.success){
                setData(res.data)
                setTotal(res.total)
            }
        })
    }
    useEffect(()=>{
        getData()
    },[])

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const sorting = (key) => {
        let sorder = 'asc'
        if (filters.key == key) {
            if (filters.sorder == 'asc') {
                sorder = 'desc'
            } else {
                sorder = 'asc'
            }
        }

        let sortBy = `${key} ${sorder}`;
        setFilter({ ...filters, sortBy, key, sorder })
        getData({ sortBy, key, sorder })
    }

    const clear=()=>{
        let f={
            search:'',
            page:1
        }
        setFilter({ ...filters, ...f})
        getData({ ...f })
    }

    return <>
    <div className="flex justify-end gap-2">
        {tab=='list'?<>
        <button onClick={()=>setTab('add')} className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2">
                            <FiPlus className="text-xl text-white" /> Add Attendee
                        </button>
        </>:<>
        <button onClick={()=>{setTab('list');clear()}} className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2">
                            Back
                        </button>
        </>}

        {filters.search?<>
            <button onClick={()=>clear()} className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2">
                            Reset
                        </button>
        </>:<></>}
      

    </div>

    {tab=='add'?<>
    <AddAttendee eventId={eventId} result={e=>{
        if(e.event=='submit'){
            clear()
            setTab('list')
        } 
    }} />
    </>:<>
    <Table
    data={data}
    columns={columns}
    page={filters.page}
    count={filters.count}
    total={total}
    result={(e) => {
        if (e.event == 'page') pageChange(e.value)
        if (e.event == 'sort') sorting(e.value)
    }}
   />
    </>}
   
  
    </>
}