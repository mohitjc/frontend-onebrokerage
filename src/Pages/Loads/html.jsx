import React, { useEffect, useState } from "react";
import PageLayout from "../../components/global/PageLayout";
// import "./style.scss";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import Table from "../../components/Table";
import SelectDropdown from "../../components/common/SelectDropdown";
import statusModel from "../../models/status.model";
import datepipeModel from "../../models/datepipemodel";
import shared from "./shared";
import ApiClient from "../../methods/api/apiClient";
import { useSelector } from "react-redux";
import { PiEyeLight } from "react-icons/pi";
import { IoIosRefresh } from "react-icons/io";
import { LiaEdit, LiaTrashAlt } from "react-icons/lia";
import { LuImport } from "react-icons/lu";
import methodModel from "../../methods/methods";
import Select from "react-select";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { GoDotFill } from "react-icons/go";
import MultiSelectDropdown from "../../components/common/MultiSelectDropdown";
import { Dialog } from "@headlessui/react";

const Html = ({
  sorting,
  filter,
  edit,
  view,
  statusChange,
  pageChange,
  count,
  deleteItem,
  clear,
  filters,
  setFilter,
  loaging,
  data,
  changestatus,
  isAllow,
  total = { total },
  sortClass,
  uploadFile,
  statusOptions,
  handleFilters,
  getData,
}) => {
  const user = useSelector((state) => state.user);

  const handleColumnToggle = (columnName) => {
    const isColumnVisible = visibleColumns.find(
      (item) => item.key == columnName.key
    )
      ? true
      : false;

    // Toggle the column visibility
    const updatedColumns = isColumnVisible
      ? visibleColumns.filter((col) => col.key !== columnName.key)
      : [...visibleColumns, columnName];

    setVisibleColumns(updatedColumns);

    // setVisibleColumns([...visibleColumns,columnName])
  };


  function findUniqueElements(arr1, arr2) {
    const uniqueInArr1 = arr1.filter((item) =>
      !arr2.find((itema) => itema.key == item.key) ? true : false
    );
    const uniqueInArr2 = arr2.filter((item) =>
      !arr1.find((itema) => itema.key == item.key) ? true : false
    );

    const uniqueElements = [...uniqueInArr1, ...uniqueInArr2];

    return uniqueElements;
  }

  const columns = [
    {
      key: "load_id",
      name: "Load ID",
      sort: true,
      render: (row) => {
        return (
          <span
            className="capitalize cursor-pointer"
            onClick={(e) => {
              view(row.id);
            }}
          >
            {row?.load_id || row?.lane_id}
          </span>
        );
      },
    },
    {
      key: "stops",
      name: "Stops",
      // sort: true,
      render: (row) => {
        return (
          <ul>
            <span className="">
              {row?.stops.length > 0
                ? row?.stops?.map((itm) => <li>{itm?.address}</li>)
                : "--"}
            </span>
          </ul>
        );
      },
    },

    {
      key: "origin_address",
      name: "Origin Address",
      sort: true,
      isClose: true,
      render: (row) => {
        return <span>{row?.origin_address}</span>;
      },
    },
    {
      key: "origin_city",
      name: "Origin City",
      isClose: true,
      sort: true,
      render: (row) => {
        return <span>{row?.origin_location_city}</span>;
      },
    },
    {
      key: "origin_state",
      name: "Origin State",
      isClose: true,
      sort: true,
      render: (row) => {
        return <span>{row?.origin_location_state}</span>;
      },
    },
    {
      key: "origin_zip",
      name: "Origin Zip",
      isClose: true,
      sort: true,
      render: (row) => {
        return <span>{row?.destination_location_postal_code}</span>;
      },
    },
    {
      key: "destination_address",
      name: "Destination Address",
      isClose: true,
      sort: true,
      render: (row) => {
        return <span>{row?.destination_address}</span>;
      },
    },
    {
      key: "destination_city",
      name: "Destination City",
      isClose: true,
      sort: true,
      render: (row) => {
        return <span>{row?.origin_location_city}</span>;
      },
    },
    {
      key: "destination_state",
      name: "Destination State",
      isClose: true,
      sort: true,
      render: (row) => {
        return <span>{row?.origin_location_state}</span>;
      },
    },
    {
      key: "destination_zip",
      name: "Destination Zip",
      isClose: true,
      sort: true,
      render: (row) => {
        return <span>{row?.destination_location_postal_code}</span>;
      },
    },
  ];
  const getStoredColumns = () => {
    const storedColumns = JSON.parse(localStorage.getItem("LoadColumn")) || [];
    return columns.filter(column => 
      storedColumns.some(stored => stored.key === column.key)
    );
  };
  
  const [visibleColumns, setVisibleColumns] = useState(getStoredColumns()?.length>0?getStoredColumns():columns.slice(0,2));

  useEffect(() => {
    localStorage.setItem("LoadColumn", JSON.stringify(visibleColumns));
  }, [visibleColumns]);


  useEffect(() => {
    destinationState();
    destinationCity();
    handleOriginStateList();
  }, []);
  
  const [DesitinationStates, setDestinationStates] = useState([]);
  const [DesitinationCity, setDestinationCity] = useState([]);
  const destinationState = () => {
    ApiClient.get("load/destination/state?page=1&count=100").then((res) => {
      if (res.success) {
        setDestinationStates(
          res?.data?.data?.map((item) => ({
            id: item?.state,
            name: item?.state,
          }))
        );
      }
    });
  };

  
  const destinationCity = () => {
    ApiClient.get("load/destination/city-state", { ...filters }).then((res) => {
      if (res.success) {
        setDestinationCity(
          res?.data?.data?.map((item) => ({ id: item?.city, name: item?.city }))
        );
      }
    });
  };
  const handledestinationCity = (e) => {
    const newFilters = {
      ...filters,
      destination_location_city: e?.value,
    };
    setFilter(newFilters);
    getData(newFilters);
  };
  const [OriginStates, setOriginStates] = useState([]);
  const [OriginCities, setOriginCities] = useState([]);
  const handleOriginStateList = () => {
    // const newFilters = {
    //   ...filters,
    //   origin_location_state: e?.value
    // };
    // setFilter(newFilters);
    // getData(newFilters)

    ApiClient.get("load/origin/state?page=1&count=100").then((res) => {
      if (res.success) {
        setOriginStates(
          res?.data?.data?.map((item) => ({
            id: item?.state,
            name: item?.state,
          }))
        );
      }
    });
  };
  const handleOriginState = (e) => {
    const newFilters = {
      ...filters,
      origin_location_state: e?.value,
    };
    let filternew = {
      ...filters,
      state: e?.value.toString(),
    };
    filternew.origin_location_state =
      filternew.origin_location_state?.toString();
    setFilter(newFilters);
    getData(newFilters);
    ApiClient.get("load/origin/city-state", filternew).then((res) => {
      if (res.success) {
        setOriginCities(
          res?.data?.data?.map((item) => ({ id: item?.city, name: item?.city }))
        );
      }
    });
  };
  const handleOriginCity = (e) => {
    const newFilters = {
      ...filters,
      origin_location_city: e?.value,
    };
    setFilter(newFilters);
    getData(newFilters);
  };
  const handledestination = (e) => {
    const newFilters = {
      ...filters,
      destination_location_state: e?.value,
    };
    setFilter(newFilters);
    getData(newFilters);
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <PageLayout>
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

          {isAllow(`${shared.check}_add`) ? (
            <Link
              className="bg-primary leading-10  h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2"
              to={`/${shared.url}/add`}
            >
              <FiPlus className="text-xl text-white" /> Add {shared.addTitle}
            </Link>
          ) 
          : (
            <></>
          )} 
        </div>
      </div>

      <div className="border w-full bg-white rounded-lg mt-6">
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
                placeholder="Search By Load Id,City,State"
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

          <div className="flex items-center gap-4 ml-auto">
            <Menu as="div" className="relative">
              <div className="flex items-center">
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3  text-sm font-semibold text-gray-900 ">
                  <div className="flex items-center capitalize inline-flex w-full border justify-start gap-x-1.5 rounded-md bg-white px-3 py-2.5 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-inset h-[42px]  ring-gray-300 hover:bg-gray-200 ">
                    <div className="flex items-center">
                      <div className="  ">Add Column</div>
                    </div>
                    <i
                      className="fa fa-angle-down top-1 relative h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </Menu.Button>
                <div className=" ">
                <button
                  type="button"
                  id="OpenReasonModel"
                  onClick={openModal}
                  className="  bg-primary leading-10  h-[42px] flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg "
                >
                 Filter
                </button>
              </div>
              </div>
              
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-[99]"
                  onClose={closeModal}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black/25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center h-full justify-end  text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md h-full transform overflow-hidden rounded-tl-2xl rounded-bl-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          ></Dialog.Title>
                          <div className="mt-2 text-center">
                            <h5 className="text-lg font-semibold">Filter</h5>
                          </div>
                          <div className="mt-5">
                            <form>
                              <div class="modal-body">
                                <div className="mb-4">
                                  <label className="mb-1 block">Select Destination State</label>
                                  <MultiSelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="Select Destination State"
                                    intialValue={
                                      filters?.destination_location_state
                                    }
                                    result={handledestination}
                                    options={DesitinationStates}
                                    theme="search"
                                  />
                                </div>
                                 <div className="mb-4">
                                  <label className="mb-1 block">Select Destination City</label>
                                  <MultiSelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="Select Destination City"
                                    intialValue={
                                      filters?.destination_location_city
                                    }
                                    result={handledestinationCity}
                                    options={DesitinationCity}
                                    theme="search"
                                  />
                                </div>
                                 <div className="mb-4">
                                  <label className="mb-1 block">Select Origin State</label>
                                  <MultiSelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="Select Origin State"
                                    intialValue={filters?.origin_location_state}
                                    result={handleOriginState}
                                    options={OriginStates}
                                    theme="search"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label className="mb-1 block">Select Origin City</label>
                                  <MultiSelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="Select Origin City"
                                    intialValue={filters?.origin_location_city}
                                    result={handleOriginCity}
                                    options={OriginCities}
                                    theme="search"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  id="CloseReasonModel"
                                  className=" justify-center bg-gray-400 text-white rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                                  onClick={closeModal}
                                >
                                  Close
                                </button>
                                <button type="submit" class="btn btn-primary">
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>

              {visibleColumns?.length == columns?.length ? <></> :   <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-3">
                  {/* <Menu.Item> */}
                  {findUniqueElements(visibleColumns, columns).map((itm) => {
                    return (
                      <a
                        className="flex items-center text-[14px] py-[6px] px-2 rounded-[5px] mb-1 hover:bg-[#f0f1f7] text-[#393737]"
                        onClick={() => handleColumnToggle(itm)}
                      >
                        <GoDotFill className="me-2 text-[#494f9f]" />

                        {itm?.name}
                      </a>
                    );
                  })}
                  {/* </Menu.Item>  */}
                </Menu.Items>
              </Transition>}
            </Menu>
          </div>
        </div>

        {!loaging ? (
          <>
            <div className=" ">
              <Table
                className=""
                data={data}
                sort_key={filters?.key}
                sorter={filters?.sorder}
                columns={[
                  ...visibleColumns,
                  {
                    key: "action",
                    name: "Actions",
                    render: (itm) => {
                      return (
                        <>
                          <div className="flex items-center justify-start gap-1.5">
                            {isAllow(`${shared.check}_get`) ? (
                              <Tooltip placement="top" title="View">
                                <a
                                  className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#494f9f14] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                                  onClick={(e) => view(itm.id)}
                                >
                                  <PiEyeLight />
                                </a>
                              </Tooltip>
                             ) : (
                              <></>
                            )} 
                            {/* {isAllow(`edit${shared.check}`) ? (
                            <Tooltip placement="top" title="Edit">
                              <a
                                className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#494f9f14] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                                onClick={(e) => edit(itm.id)}
                              >
                                <LiaEdit />
                              </a>
                            </Tooltip>
                          ) : (
                            <></>
                          )} */}
                            {isAllow(`${shared.check}_delete`) ? (
                              <Tooltip placement="top" title="Delete">
                                <span
                                  className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#494f9f14] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                                  onClick={() => deleteItem(itm.id)}
                                >
                                  <LiaTrashAlt />
                                </span>
                              </Tooltip>
                            ) : (
                              <></>
                            )} 
                          </div>
                        </>
                      );
                    },
                  },
                ]}
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
                  if (e.event == "isClose") {
                    handleColumnToggle(e.value);
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
