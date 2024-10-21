import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/global/PageLayout';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import debounce from 'lodash.debounce';
import { PiEyeLight } from 'react-icons/pi';
import { LiaEdit } from 'react-icons/lia';
import shared from './shared';
import { FiPlus, FiUsers } from 'react-icons/fi';
import Table from '../../components/Table';
import { Tooltip } from 'antd';
import { toast } from "react-toastify";
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import methodModel from '../../methods/methods';
import SelectDropdown from '../../components/common/SelectDropdown';
import statusModel from '../../models/status.model';
import { IoIosRefresh, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link } from 'react-router-dom';
import { IoChevronDownSharp, IoGitPullRequestOutline } from 'react-icons/io5';
import { RxCrossCircled } from 'react-icons/rx';


const Html = ({
  view,
  addressResult,
  edit,
  user,
  filter,
  clear,
  sortClass,
  sorting,
  count,
  ChangeStatus,
  ChangeRequestStatus,
  ChangeFilter,
  deleteLoad,
  reset,
  add,
  colClick,
  tab,
  tabChange,
  ChangeRole,
  openModal,
  statusChange,
  pageChange,
  filters,
  ChangeDocumentStatus,
  tableCols,
  setFilter,
  blockunblock,
  loaging,
  getData,
  data,
  ChatUser,

  total = { total },
}) => {
  const Navigate = useNavigate();
  const [Min_rate, setMin_rate] = useState('');
  const [Max_rate, setMax_rate] = useState('');



  //   useEffect(() => {
  //     loader(true);
  //     ApiClient.get("active-plan").then((res) => {   
  //       if (res.success) {
  //         setActivePlan(res.data);
  //         if (!res.data.id) {
  //             Navigate("/plans");
  //         }
  //       }
  //       loader(false);
  //     });

  //   }, []);


  useEffect(() => {
    setMin_rate(0);
    setMax_rate(4000);
  }, []);

  const Permission = JSON.parse(localStorage.getItem('permission'));


  let ListingData = [];
  if (user?.role == 'staff') {
    ListingData = data?.filter((itm) => itm?.id != user?.id);
  } else {
    ListingData = data;
  }


  const columns = [
    {
      key: "fullName",
      name: "User Name",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.fullName}</span>;
      },

    },
    {
      key: "email",
      name: "Email",
      //   sort: true,
      render: (row) => {
        return <span className="">{row?.email}</span>;
      },
    },


    {
      key: "createdAt",
      name: "Date Created",
      //   sort: true,
      render: (row) => {
        return <span className="">{moment(row?.createdAt).format("DD-MM-YYYY")}</span>
      },
    },

    {
      key: "request_status",
      name: "Request Status",
      // sort: true,
      render: (row) => {
        return <span className={`${row?.request_status}`}>{methodModel.capitalizeFirstLetter(row?.request_status)}</span>
      },
    },

    {
      key: "status",
      name: "Status",
      render: (row) => {
        return (
          <>
            <div className="w-32" onClick={() => statusChange(row)}>
              <span
                className={`bg-[#494f9f] cursor-pointer text-sm !px-3 h-[30px] w-[100px] flex items-center justify-center border border-[#EBEBEB] text-[#3C3E49A3] !rounded capitalize 
                          ${row.status == "deactive"
                    ? " bg-gray-200 text-black"
                    : "bg-[#494f9f] text-white"
                  }`}
              >
                {row.status == "deactive" ? "inactive" : "active"}
              </span>
            </div>
          </>
        );
      },
    },
    {
      key: "action",
      name: "Actions",
      render: (itm) => {
        return (
          <>
            <div className="flex items-center justify-start gap-1.5">
              {/* {isAllow(`read${shared.check}`) ? ( */}
              <Tooltip placement="top" title="View">
                <a
                  className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#494f9f14] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                  onClick={(e) => view(itm.id)}
                >
                  <PiEyeLight />
                </a>
              </Tooltip>
              {/* ) : (
                <></>
              )} */}
              {/* {isAllow(`edit${shared.check}`) ? ( */}
              {user?.role=="driver"?<></>:<> <Tooltip placement="top" title="Edit">
                <a
                  className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#494f9f14] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                  onClick={(e) => edit(itm.id)}
                >
                  <LiaEdit />
                </a>
              </Tooltip></>}
             
             
     

            </div>
          </>
        );
      },
    },
  ];
  //   const addCarrier=()=>
  //     {
  //       if(activeplan?.subscription_plan_id?.number_of_drivers>total)
  //       {
  //         Navigate(`/${shared.url}/add`)
  //       }
  //       else{

  //         toast.error(`You can add only ${activeplan?.subscription_plan_id?.number_of_carrier} carrier`)
  //       }

  //     }
  return (
    <PageLayout title="Carriers" title2="Carriers">
      <div className="flex flex-wrap justify-between items-center gap-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-[#111827]">
            {" "}
            {shared.title}
          </h3>
          <p class="text-sm font-normal text-[#75757A]">
            Here you can see all about your {shared.title}
          </p>
        </div>

        <a id="downloadFile"></a>

        <div className="flex">
          {/* <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                        <PiFileCsv className="text-typo text-xl" />  Export CSV
                    </button> */}

          {/* {isAllow(`add${shared.check}`) ? ( */}
          {/* <button
              className="bg-primary leading-10  h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2"
              onClick={addCarrier}        
            >
              <FiPlus className="text-xl text-white" /> Add {shared.addTitle}
            </button> */}
          {/* ) : (
            <></>
          )} */}
        </div>
      </div>

      <div className=" w-full bg-white rounded-lg mt-6 border">
        <div className="flex p-4 items-center flex-wrap">
          <form
            class="flex items-center max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              filter();
            }}
          >
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-full">
              {/* <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                                </svg>
                            </div> */}
              <input
                type="text"
                id="simple-search"
                value={filters.search}
                onChange={(e) => {
                  setFilter({ ...filters, search: e.target.value });
                }}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-[#494f9f]block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 pr-10"
                placeholder="Search"
              // required
              />
              {filters?.search && (
                <i
                  className="fa fa-times absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                  aria-hidden="true"
                  onClick={(e) => clear()}
                ></i>
              )}
            </div>
            <button
              type="submit"
              class="p-2.5 m-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-[#494f9f] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </form>

      

          <div className="flex gap-2 ml-auto">

            <div className=''>
            <Menu as="div" className="relative ">
            <div>
              <MenuButton className="border-primary border leading-10 h-10 gap-2 inline-flex shadow-btn px-6 hover:opacity-80 text-sm text-primary hover:bg-primary rounded-lg  items-center w-fit">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                {filters?.request_status
                  ? filters?.request_status == "accepted" ? "Accepted" : filters?.request_status == "rejected" ? "Rejected" : "Pending"
                  : "All Request Status"}
                  <span><IoChevronDownSharp />                  </span>
              </MenuButton>
            </div>
            <MenuItems
              transition
              anchor="bottom end"
              className="w-52 origin-top-right mt-4 rounded-xl border border-white/5 bg-white shadow p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
            
                  <button className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-[#3E549D] group hover:text-white"  onClick={() => ChangeRequestStatus("")}>
                    <FiUsers className="size-4 stroke-black group-hover:stroke-white" />
                    All Carriers
                  </button>
         
              </MenuItem>
              <MenuItem>
         
                  <button className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-[#3E549D] hover:text-white"   onClick={() => ChangeRequestStatus("accepted")}>
                    <IoMdCheckmarkCircleOutline className="size-4 stroke-black group-hover:stroke-white" />
                    Accepted Carriers
                  </button>
      
              </MenuItem>
              <MenuItem>
                <button className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-[#3E549D] group hover:text-white"  onClick={() => ChangeRequestStatus("pending")}>
                  <IoGitPullRequestOutline className="size-4 stroke-black group-hover:stroke-white" />
                  Pending Carriers
                </button>
              </MenuItem>
              {/* <div className="my-1 h-px bg-gray-200" /> */}
              <MenuItem>
                <button className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-black hover:bg-[#3E549D] hover:text-white"
                 onClick={() => ChangeRequestStatus("rejected")}>
                  <RxCrossCircled className="size-4 stroke-black/30 hover:stroke-white" />
                  Rejected Carriers

                </button>
              </MenuItem>
            </MenuItems>



          </Menu>
            </div>

            <SelectDropdown
              id="statusDropdown"
              displayValue="name"
              placeholder="All Status"
              intialValue={filters.status}
              result={(e) => {
                ChangeStatus(e.value);
              }}
              options={statusModel.list}
            />

            {filters.status || filters.groupId ? (
              <>
                <button
                  className="bg-primary leading-10 h-10 inline-flex shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg  items-center w-fit "
                  onClick={() => reset()}
                >

                  <IoIosRefresh class="me-2" />


                  Reset
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {!loaging ? (
          <>
            <div className="">
              <Table
                className=""
                data={data}
                sort_key={filters?.key}
                sorter={filters?.sorder}
                modelName={shared?.title}
                columns={columns}
                page={filters.page}
                count={filters.count}
                filters={filters}
                total={total}
                result={(e) => {
                  if (e.event == "page") pageChange(e.value);
                  if (e.event == "sort") {
                    sorting(e.value);
                    sortClass(e.value);
                  }
                  if (e.event == "count") count(e.value);
                }}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {loaging ? (
          <div className="text-center py-4">
            <img src="/assets/img/loader.gif" className="pageLoader" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </PageLayout>
  );
};

export default Html;
