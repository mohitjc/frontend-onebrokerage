import React, { useState, useEffect } from 'react'
import Layout from '../components/global/layout'
import { IoMdCloudDownload, IoMdCloudUpload } from 'react-icons/io';
import ApiClient from "../methods/api/apiClient";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import datepipeModel from '../models/datepipemodel';
import loader from '../methods/loader';
import Table from "../components/Table";

const History = () => {
    const user = useSelector((state) => state.user);
    console.log(user, "userdata")
    const [loaging, setLoader] = useState(true)
    const [list, setList] = useState([])
    
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0)
    const [totalPages, setTotalPages] = useState(1);
     const [filters, setFilter] = useState({ page: 1, count: 10, search: '' })
     const columns = [
        {
            key: 'fullName', name: 'Name',
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
            key: 'connectMeetDate', name: 'ConnectMeet Date',
            render: (row) => {
                return <>{  datepipeModel.datetime(row?.connectMeetDate)}</>
            }
        },
        {
            key: 'eventName', name: 'Event Name	',
            render: (row) => {
                return <>{row?.eventName}</>
            }
        },
        {
            key: 'eventDate', name: 'Event Date	',
            render: (row) => {
                return <>{ datepipeModel.datetime(row?.eventDate)}</>
            }
        },
    ]
    const importFile = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64String = event.target.result;

                let payload = {
                    groupId: user?.groupId?._id,
                    // eventId: eventIdd,
                    addedBy: user?._id,

                    base64String: base64String
                };

                ApiClient.post(`api/import/event-group`, payload).then(res => {
                    if (res.success) {
                        toast.success(res.message);
                        getdata()
                    }
                });
            };

            reader.readAsDataURL(file);
        }
    };
    
    const pageChange = (e) => {
    setFilter({ ...filters, page:e })
          getdata({ ...filters ,page: e })
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
        getdata({ sortBy, key, sorder })
    }

    const getdata = (p) => {
        loader(true)
        setLoader(true)
        let payload ={
            ...filters , ...p
        }
        ApiClient.get(`api/import/event-group/list`,payload).then(res => {
            if (res.success) {
                loader(false)
                setList(res?.data);
                toast.success(res.message);
                setTotal(res?.total)
            }
            setLoader(false)
        });
    }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <>
            <Layout>
                <div className='mb-8'>
                {/* /* import File  */}
                
                    <div className="flex items-center justify-between bg-grey-lighter">
                        <div className="flex flex-col">
                        <h4 className="text-typo text-2xl font-semibold">History</h4>
                        </div>
                        
                          <div className=''>
                            <label htmlFor="fileInput" className="flex gap-2 items-center border-dashed border-gray-200 items-center px-2 py-2 bg-white text-blue rounded-lg tracking-wide border border-blue cursor-pointer">
                                    <IoMdCloudUpload className='text-md' />
                                    <span className="text-sm leading-normal">Import file</span>
                                </label>
                                <input id="fileInput" type="file" style={{ display: 'none' }} onChange={importFile} />
                          </div>
                    </div>
                </div>

                <div>
                   
                    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
                       
                        {!loaging ? <>
                    <Table
                        className='mb-3'
                        data={list}
                        columns={columns}
                        page={filters.page}
                        count={filters.count}
                        total={total}
                        result={(e) => {
                            if (e.event == 'page') pageChange(e.value)
                            if (e.event == 'sort') sorting(e.value)
                        }}
                    />

                </> : <></>}
                    </div>
                   
                </div>
            </Layout>
        </>
    )
}

export default History