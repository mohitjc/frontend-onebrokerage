import  { useEffect, useState } from 'react';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import crendentialModel from '../../models/credential.model';
import shared from './shared';
import Table from '../../components/Table';
import Layout from '../../components/global/layout';
import SelectDropdown from '../../components/common/SelectDropdown';
import statusModel from '../../models/status.model';
import { Tooltip } from "antd";
import datepipeModel from '../../models/datepipemodel';

const AssignedEvents = () => {
    const user = crendentialModel.getUser()
    const searchState = {data:''}
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '', catType: '',type:'ongoing' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const history = useNavigate()

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [])

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

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p ,email:user.email}
        ApiClient.get('api/user-events', filter).then(res => {
            if (res.success) {
                let data=res?.data?.[0]?.eventDetails||[]
                setData(data.map(itm => {
                    itm.id = itm._id
                    return itm
                }))
                setTotal(res.total)
            }
            setLoader(false)
        })
    }


    const clear = () => {
        setFilter({ ...filters, search: '',status:'', page: 1 })
        getData({ search: '', status:'',page: 1 })
    }


    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const changestatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getData({ status: e, page: 1 })
    }
    const view = (id) => {
        let url=`/${shared.url}/detail/${id}`
        history(url)
    }

    

    const columns = [
        {
            key: 'title', name: 'Title', sort: true,
            render: (row) => {
                return <>{row?.title}</>
            }
        },
        {
            key: 'date', name: 'Event Date',
            render: (row) => {
                return <>
                    {datepipeModel.datetime(row?.date)}
                </>
            }
        },
        {
            key: 'timezone', name: 'Timezone',
            render: (row) => {
                return <>{row?.timezone}</>
            }
        },
        {
            key: 'status', name: 'Status',
            render: (row) => {
                return <>
                    <div className='w-32'>
                        
                            <span className='bg-[#EEE] text-sm !px-3 h-[30px] flex items-center justify-center border border-[#EBEBEB] text-[#3C3E49A3] !rounded capitalize'>
                                {row.status == 'deactive' ? 'inactive' : 'active'}
                            </span>
                        
                    </div>
                </>
            }
        },
        {
            key: 'action', name: 'Action',
            render: (itm) => {
                return <>
                    <div className="flex items-center justify-start gap-1.5">
                    <Tooltip placement="top" title="View">
                                <a className="border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl" onClick={e => view(itm.id)}>
                                <span class="material-symbols-outlined">visibility</span>
                                </a>
                            </Tooltip>
                    </div>
                </>
            }
        },
    ]

    const typeFilter=(t='')=>{
        let f={
            page:1,
            type:t
        }
        setFilter({...filters,...f})
        getData(f)
    }

    return <>
    <Layout>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-semibold text-[#111827]">My Events</h3>
                    <p class="text-sm font-normal text-[#75757A]">Here you can see all about your Event</p>
                </div>

                <a id='downloadFile'></a>

                <div className="flex">
                    
                </div>


            </div>



            <div className='shadow-box w-full bg-white rounded-lg mt-6'>
                <div className='flex p-4 justify-end'>
                    <div className="flex gap-2">
                        <SelectDropdown
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Status'
                            intialValue={filters.status}
                            result={e => { changestatus(e.value) }}
                            options={statusModel.list}
                        />
                        {filters.status ? <>
                            <button
                                className="bg-primary leading-10 h-10 inline-block shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg"
                                onClick={() => clear()}>
                                Reset
                            </button>
                        </> : <></>}


                    </div>
                </div>

                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-3">
    <ul className="flex flex-wrap -mb-px">
        <li className="me-2">
            <span 
            onClick={()=>typeFilter('ongoing')}
            className={`cursor-pointer ${filters.type=='ongoing'?'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
            >Ongoing</span>
        </li>
        <li className="me-2">
            <span 
            onClick={()=>typeFilter('upcoming')}
            className={`cursor-pointer ${filters.type=='upcoming'?'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
            >Upcoming</span>
        </li>
        <li className="me-2">
            <span 
            onClick={()=>typeFilter('completed')}
            className={`cursor-pointer ${filters.type=='completed'?'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
            >Completed</span>
        </li>
    </ul>
</div>

                {!loaging ? <>
                    <Table
                        className='mb-3'
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

                </> : <></>}

                {
                    loaging ? <div className="text-center py-4">
                        <img src="/assets/img/loader.gif" className="pageLoader" />
                    </div> : <></>
                }

            </div>
        </Layout >
    </>;
};

export default AssignedEvents;
