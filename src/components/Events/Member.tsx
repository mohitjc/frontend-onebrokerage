import { useEffect, useState } from "react"
import ApiClient from "../../methods/api/apiClient"
import loader from "../../methods/loader"
import Table from "../Table"
import { BsTrash3 } from "react-icons/bs"
import SelectDropdown from "../common/SelectDropdown"
import crendentialModel from "../../models/credential.model"
import { Tooltip } from "antd"
import methodModel from "../../methods/methods"
import { FiPlus } from "react-icons/fi"
import AddAttendee from "../../Pages/Events/AddAttendee"

export default function Members({ eventDetail = '', eventId = '' }: any) {
    const [data, setData] = useState([])
    const [loading, setLoader] = useState(false)
    const [total, setTotal] = useState(0)
    const [tab, setTab] = useState('list')
    const [role, setRole] = useState()
    const user: any = crendentialModel.getUser()
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '', eventId: eventId, sortBy: '', key: '', sorder: '' })

    const attendPremit = (row: any) => {
        let value = false
        if (row?.addedBy === user._id || eventDetail?.addedBy === user._id) value = true
        if (role == 'meetManager' || role == 'assistant') value = true
        return value
    }

    const deletePremit = (row: any) => {
        let value = false
        if (row?.addedBy === user._id || eventDetail?.addedBy === user._id) value = true
        if (role == 'assistant') value = true
        return value
    }

    const columns = [
        {
            key: 'fullName', name: 'Name', sort: true,
            render: (row: any) => {
                return <>{row?.fullName}</>
            }
        },
        {
            key: 'email', name: 'Email',
            render: (row: any) => {
                return <>{row?.email}</>
            }
        },
        {
            key: 'isConnectedMeating', name: 'Connect Meet',
            render: (row: any) => {
                return <>

                    <label className={`inline-flex items-center cursor-pointer ${attendPremit(row) ? '' : 'opacity-50'}`}>
                        <input type="checkbox" value="" className="sr-only peer"
                            disabled={attendPremit(row) ? false : true}
                            onChange={e => connectToggle(row)} checked={row.isConnectedMeating} />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                    </label>
                </>
            }
        },
        {
            key: 'attended', name: 'Attended',
            render: (row: any) => {
                return <>
                    <label className={`inline-flex items-center cursor-pointer ${attendPremit(row) ? '' : 'opacity-50'}`}>
                        <input type="checkbox" value="" className="sr-only peer"
                            disabled={attendPremit(row) ? false : true}
                            onChange={e => attend(row)} checked={row.attended} />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                    </label>
                </>
            }
        },
        {
            key: 'role', name: 'Role',
            render: (row: any) => {
                return <>
                    <SelectDropdown
                        placeholder="Select Role"
                        intialValue={row.attendeeRole}
                        disabled={(eventDetail?.addedBy === user._id) ? false : true}
                        options={
                            [
                                { id: 'assistant', name: 'Assistant Group Leader' },
                                { id: 'meetManager', name: 'Connect Meet Manager' },
                                { id: 'member', name: 'Member' },
                            ]
                        }
                        result={(e: any) => {
                            roleUpdate(row, e.value)
                        }}
                    />
                </>
            }
        },
        {
            key: 'action', name: 'Action',
            render: (itm: any) => {
                return <>
                    <div className="flex items-center justify-start gap-1.5">
                        {/* <Tooltip placement="top" title="View">
                                <a className="border cursor-pointer border-[#ff7641] hover:opacity-70 rounded-lg bg-[#ff764114] w-10 h-10 !text-primary flex items-center justify-center text-xl">
                                <span className="material-symbols-outlined">visibility</span>
                                </a>
                            </Tooltip> */}
                        {/* <Tooltip placement="top" title="Edit">
                                <a className="border cursor-pointer border-[#ff7641] hover:opacity-70 rounded-lg bg-[#ff764114] w-10 h-10 !text-primary flex items-center justify-center text-xl">
                                    <FiEdit3 />
                                </a>
                            </Tooltip> */}
                        {deletePremit(itm) ? <>
                            <Tooltip placement="top" title="Delete"> <span onClick={() => deleteItem(itm.id)} className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-lg bg-[#FDE9EA] w-10 h-10 text-[#E92531] flex items-center justify-center text-xl'>
                                <BsTrash3 />
                            </span> </Tooltip>
                        </> : <></>}

                    </div>
                </>
            }
        },
    ]


    const connectToggle = (row: any) => {
        let isConnectedMeating = row.isConnectedMeating ? false : true
        loader(true)
        ApiClient.put('api/attendees/update', { id: row.id, isConnectedMeating: isConnectedMeating }).then(res => {
            if (res.success) {
                getData()
            }
            loader(false)
        })
    }

    const attend = (row: any) => {
        let attended = row.attended ? false : true
        loader(true)
        ApiClient.put('api/attendees/update', { id: row.id, attended: attended }).then(res => {
            if (res.success) {
                getData()
            }
            loader(false)
        })
    }

    const roleUpdate = (row: any, role: any) => {
        loader(true)
        ApiClient.put('api/attendees/update', { id: row.id, attendeeRole: role }).then(res => {
            if (res.success) {
                getData()
            }
            loader(false)
        })
    }

    const getData = (p = {}) => {
        let f = { ...filters, ...p }
        setLoader(true)
        ApiClient.get('api/attendees/list', f).then(res => {
            if (res.success) {
                setData(res.data)
                setTotal(res.total)
            }
            setLoader(false)
        })
    }

    const getRole = () => {
        let f = {
            search: user.email,
            count: 1
        }
        ApiClient.get('api/attendees/list', f).then(res => {
            if (res.success) {
                let data = res.data?.[0]
                setRole(data?.attendeeRole || 'member')
            }
        })
    }

    useEffect(() => {
        getData()
        getRole()
    }, [])

    const pageChange = (e: any) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const sorting = (key: any) => {
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

    const clear = () => {
        let f = {
            search: '',
            page: 1
        }
        setFilter({ ...filters, ...f })
        getData({ ...f })
    }

    const deleteItem = (id: any) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('api/attendees', { id: id }).then(res => {
                if (res.success) {
                    clear()
                }
                loader(false)
            })
        }
    }


    const ListHtml = ({ row }: any) => {
        return <>

            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src={methodModel.userImg('')} alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {row.fullName}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {row.email}
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white gap-2">
                            {/* <label className={`inline-flex items-center cursor-pointer ${attendPremit(row)?'':'opacity-70'}`}>
                        <input type="checkbox" value="" className="sr-only peer" 
                        disabled={attendPremit(row)?false:true}
                        onChange={e=>connectToggle(row)} checked={row.isConnectedMeating} />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Connect Meet</span>
                    </label> */}
                            <label className={`inline-flex items-center cursor-pointer ${attendPremit(row) ? '' : 'opacity-70'}`}>
                                <input type="checkbox" value="" className="sr-only peer"
                                    disabled={attendPremit(row) ? false : true}
                                    onChange={e => attend(row)} checked={row.attended} />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Attended</span>
                            </label>

                            {deletePremit(row)?<>
                                <Tooltip placement="top" title="Delete"> <button
                            type="button" onClick={() => deleteItem(row.id)} className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-lg bg-[#FDE9EA] w-10 h-10 text-[#E92531] flex items-center justify-center text-xl'>
                                    <BsTrash3 />
                                </button> </Tooltip>
                            </>:<></>}
                            
                        </div>
                    </div>
                </li>
            </ul>

        </>
    }

    return <>
    <div>
    {tab == 'list' ? <>
            {eventDetail?.addedBy==user._id||role == 'meetManager' || role == 'assistant'?<>
                <button onClick={() => setTab('add')} className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2">
                    <FiPlus className="text-xl text-white" /> Add Member
                </button>
            </>:<></>}
                
            </> : <>
                <button onClick={() => { setTab('list');}} className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2">
                    Back
                </button>
            </>}
    </div>

    {tab=='add'?<>
    <AddAttendee eventId={eventId} eventDetail={eventDetail} result={(e:any) => {
                if (e.event == 'submit') {
                    clear()
                    setTab('list')
                }
            }} />
    </>:<>
    {loading ? <>
            <div className="text-center">Loading...</div>
        </> : <>
            <Table
                data={data}
                columns={columns}
                page={filters.page}
                count={filters.count}
                total={total}
                theme="list"
                ListHtml={ListHtml}
                result={(e) => {
                    if (e.event == 'page') pageChange(e.value)
                    if (e.event == 'sort') sorting(e.value)
                }}
            />
        </>}
    </>}
        
    </>
}