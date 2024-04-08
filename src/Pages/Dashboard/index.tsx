import { useEffect, useState } from "react"
import Layout from "../../components/global/layout"
import ApiClient from "../../methods/api/apiClient"
import crendentialModel from "../../models/credential.model"
import datepipeModel from "../../models/datepipemodel"
import Modal from "../../components/common/Modal"
import Members from "../../components/Events/Member"
import Table from "../../components/Table"
import loader from "../../methods/loader"
import methodModel from "../../methods/methods"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const [events, setEvents] = useState([])
    const [filters, setFilter] = useState({ page: 1, count: 50, status: '', key: '', sorder: '', sortBy: '', type: 'ongoing' })
    const [loading, setLoader] = useState(false)
    const [total, setTotal] = useState(0)
    const [modalData, setModalData]: any = useState()
    const user: any = crendentialModel.getUser()
    const history=useNavigate()

    const getEvents = (p = {}) => {
        let f = {
            ...filters,
            ...p,
            email:user.email,
            addedBy:user?._id||'',
        }
        setLoader(true)
        ApiClient.get('api/user-events', f).then((res: any) => {
            setLoader(false)
            if (res.success) {
                let data = res?.data?.[0]?.eventDetails || []
                // let data = res?.data
                setEvents(data.map((itm: any) => {
                    itm.id = itm._id
                    return {
                        ...itm,
                        // ...itm.eventDetails
                    }
                }))
                console.log("setEvents", data)
                setTotal(res.total || data.length)
            }
        })
    }

    const typeFilter = (t = '') => {
        let f = {
            page: 1,
            type: t
        }
        setFilter({ ...filters, ...f })
        getEvents(f)
    }


    const pageChange = (e: any) => {
        setFilter({ ...filters, page: e })
        getEvents({ page: e })
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
        getEvents({ sortBy, key, sorder })
    }

    const eventDetail = (id: any) => {
        loader(true)
        ApiClient.get('api/event/details', { id: id }).then(res => {
            loader(false)
            if (res.success) {
                let data = res.data
                data.id = data._id
                setModalData(data)
            }
        })
    }

    const endEvent = (id: any) => {
        if (window.confirm("Do you want to End this Event")) {
            loader(true)
            ApiClient.put('api/event/edit', { id: id, meetingStatus: "completed" }).then(res => {
                loader(false)
                if (res.success) {
                    getEvents()
                }
            })
        }
    }

    useEffect(() => {
        getEvents()
        let eventId = methodModel.getPrams('eventId')
        if (eventId) eventDetail(eventId)
    }, [])

    const ListHtml = ({ row }: any) => {
        let itm = row
        return <>
            <div className="border border-gray-100 shadow-lg  bg-white rounded p-4 flex flex-col  justify-between leading-normal">
                <div className="mb-8 flex flex-col gap-y-2">
                    <p className="text-sm text-gray-600 flex items-center">
                        <span className="material-symbols-outlined mr-1">calendar_today</span>
                        {datepipeModel.datetime(itm?.date)}
                    </p>
                    <div className="text-gray-900 font-bold text-xl mb-2 capitalize">{itm?.title}</div>
                    <p className="text-gray-700 text-base" dangerouslySetInnerHTML={{ __html: itm?.address }}></p>
                    <p className="text-sm">Max Member: {itm?.capacity}</p>
                </div>
                <div className="flex  gap-4">
                    <button type="button"
                        onClick={() => history(`/event/detail/${itm.id}`)}
                        className="text-white bg-orange-500 w-[49%] hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">View Event</button>
                    {/* {itm.meetingStatus == 'completed' || filters.type != 'ongoing'? <></> : <>
                        <button type="button" onClick={() => endEvent(itm.id)}
                            className="text-white bg-gradient-to-r w-[49%] from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">End Event</button>
                    </>} */}


                </div>
                {/* <div className="flex items-center">
                            <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"/>
                                <div className="text-sm">
                                    <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                                    <p className="text-gray-600">Aug 18</p>
                                </div>
                        </div> */}
            </div>
        </>
    }

    return <>
        <Layout>
            <h4 className="text-lg font-bold mb-3">My Events</h4>


            <div className="text-sm mb-8 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-3">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <span
                            onClick={() => typeFilter('ongoing')}
                            className={`cursor-pointer ${filters.type == 'ongoing' ? 'inline-block p-4 text-orange-600 border-b-2 border-orange-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500' : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                        >Ongoing</span>
                    </li>
                    <li className="me-2">
                        <span
                            onClick={() => typeFilter('upcoming')}
                            className={`cursor-pointer ${filters.type == 'upcoming' ? 'inline-block p-4 text-orange-600 border-b-2 border-orange-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500' : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                        >Upcoming</span>
                    </li>
                    <li className="me-2">
                        <span
                            onClick={() => typeFilter('completed')}
                            className={`cursor-pointer ${filters.type == 'completed' ? 'inline-block p-4 text-orange-600 border-b-2 border-orange-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500' : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                        >Completed</span>
                    </li>
                </ul>
            </div>

            {loading ? <>
                <div className="grid grid-cols-4 gap-3">
                    <div className="shine shineCard"></div>
                    <div className="shine shineCard"></div>
                    <div className="shine shineCard"></div>
                    <div className="shine shineCard"></div>
                </div>
            </> : <>

                <Table
                    data={events}
                    columns={[]}
                    page={filters.page}
                    count={filters.count}
                    total={total}
                    theme="list"
                    ListHtml={ListHtml}
                    rowClass="grid grid-cols-4 gap-4"
                    result={(e) => {
                        if (e.event == 'page') pageChange(e.value)
                        if (e.event == 'sort') sorting(e.value)
                    }}
                />
            </>}

        </Layout>

        {modalData ? <>
            <Modal
                title={modalData.title}
                body={<>
                    <Members
                        eventId={modalData.id}
                        eventDetail={modalData}
                    />
                </>}
                result={e => {
                    setModalData('')
                }}
            />
        </> : <></>}

    </>
}

export default Dashboard