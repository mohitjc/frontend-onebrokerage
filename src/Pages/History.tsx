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
            <Layout><div>
                {/* /* import File  */}
                <div className="flex items-center justify-center bg-grey-lighter">
                    <label htmlFor="fileInput" className="flex gap-2 items-center border-dashed border-gray-200 items-center px-2 py-2 bg-white text-blue rounded-lg tracking-wide border border-blue cursor-pointer">
                        <IoMdCloudUpload className='text-md' />
                        <span className="text-sm leading-normal">Import file</span>
                    </label>
                    <input id="fileInput" type="file" style={{ display: 'none' }} onChange={importFile} />
                </div></div>

                <div>
                    <h4>History</h4>
                    <div>
                        <table>
                            <thead>
                                <th> Name</th>
                                <th>E-mail</th>
                                <th>ConnectMeet Date</th>
                                <th>
                                    Event Name
                                </th>
                                <th>Event Date</th>
                            </thead>
                            <tbody>
                                {list?.map((ele :any) => {
                                    return (<tr>
                                        <td>{ele?.fullName}</td>
                                        <td>{ele?.email}</td>
                                        <td>{ele?.connectMeetDate ? datepipeModel.datetime(ele?.connectMeetDate) : "N/A"}</td>
                                        <td>{ele?.eventName}</td>
                                        <td>{ele?.eventDate ? datepipeModel.datetime(ele?.eventDate) : "N/A"}</td>
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