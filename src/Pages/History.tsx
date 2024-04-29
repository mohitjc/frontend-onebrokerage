import React, { useState, useEffect } from 'react'
import Layout from '../components/global/layout'
import { IoMdCloudDownload, IoMdCloudUpload } from 'react-icons/io';
import ApiClient from "../methods/api/apiClient";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import datepipeModel from '../models/datepipemodel';
import loader from '../methods/loader';
const History = () => {
    const user = useSelector((state: any) => state.user);
    console.log(user, "userdata")
    const [list, setList] = useState([])
    const importFile = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event: any) => {
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
    const getdata = () => {
        loader(true)
        ApiClient.get(`api/import/event-group/list`).then(res => {
            if (res.success) {
                loader(false)
                setList(res?.data);
                toast.success(res.message);
            }
        });
    }
    console.log(list, "listlistlistlistlistlistlist")
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
                        <table className='w-full text-sm text-left  text-gray-500 '>
                            <thead className='text-xs text-gray-700 capitalize bg-gray-50'>
                                <th className='px-6 py-3 cursor-pointer'> Name</th>
                                <th className='px-6 py-3 cursor-pointer'>E-mail</th>
                                <th className='px-6 py-3 cursor-pointer'>ConnectMeet Date</th>
                                <th className='px-6 py-3 cursor-pointer'>
                                    Event Name
                                </th>
                                <th className='px-6 py-3 cursor-pointer'>Event Date</th>
                            </thead>
                            <tbody>
                                {list?.map((ele :any) => {
                                    return (<tr>
                                        <td className='bg-white px-6 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>{ele?.fullName}</td>
                                        <td className='bg-white px-6 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>{ele?.email}</td>
                                        <td className='bg-white px-6 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>{ele?.connectMeetDate ? datepipeModel.datetime(ele?.connectMeetDate) : "N/A"}</td>
                                        <td className='bg-white px-6 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>{ele?.eventName}</td>
                                        <td className='bg-white px-6 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>{ele?.eventDate ? datepipeModel.datetime(ele?.eventDate) : "N/A"}</td>
                                    </tr>)
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default History