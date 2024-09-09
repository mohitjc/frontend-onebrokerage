import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
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
import { IoIosRefresh } from "react-icons/io";
import { useSelector } from "react-redux";
import { PiEyeLight } from "react-icons/pi";
import { LiaEdit, LiaTrashAlt } from "react-icons/lia";
import { LuImport } from "react-icons/lu";
import moment from "moment";
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
  sampledownload,
  ImportFile,
  changestatus,
  isAllow,
  total = { total },
  sortClass,
  uploadFile,
}) => {
  const user = useSelector((state) => state.user);
  const columns = [
    {
      key: "fullName",
      name: "Driver Name",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.fullName}</span>;
      },
    
    },
    {
      key: "email",
      name: "Email",
      sort: true,
      render: (row) => {
        return <span className="">{row?.email}</span>;
      },
    },
    {
      key: "licence_number",
      name: "License Number",
      render: (row) => {
        return (
          <>
          <span className="">{row?.licence_number}</span>
           </>
        );
      },
    },

    {
      key: "createdAt",
      name: "Date Created",
      sort: true,
      render: (row) => {
        return <span className="">{moment(row?.createdAt).format("DD-MM-YYYY")}</span>
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
                          ${
                            row.status == "deactive"
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
                <Tooltip placement="top" title="Edit">
                  <a
                    className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#494f9f14] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                    onClick={(e) => edit(itm.id)}
                  >
                    <LiaEdit />
                  </a>
                </Tooltip>
            {/* //   ) : (
            //     <></>
            //   )} */}
              {/* {isAllow(`delete${shared.check}`) ? ( */}
                <Tooltip placement="top" title="Delete">
                  <span
                    className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#494f9f14] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                    onClick={() => deleteItem(itm.id)}
                  >
                    <LiaTrashAlt />
                  </span>
                </Tooltip>
              {/* ) : (
                <></>
              )} */}
            </div>
          </>
        );
      },
    },
  ];

  /*  const getGroups = () => {
    let f = {
      page: 1,
      count: 10,
    };
    ApiClient.get("api/group/list", f).then((res) => {
      if (res.success) {
        setGroup(res.data);
      }
    });
  };
 */
  //   useEffect(() => {
  //       getGroups()
  //   }, [])

  return (
    <Layout>
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
            <Link
              className="bg-primary leading-10  h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2"
              to={`/${shared.url}/add`}
            >
              <FiPlus className="text-xl text-white" /> Add {shared.addTitle}
            </Link>
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
          <div>
                <button
                  onClick={(e) => sampledownload()}
                  className="btn dark-btn  btn-set"
                 >
                  <i className="fa fa-download me-2"></i>Download
                </button>
              </div>

              <div className="result-set">
                <div className="relative text-center">
                  <label className="cursor-pointer  dark-btn btn">
                    <i className="fa fa-download me-2"></i>
                    <span>Import</span>
                    <input
                      id="bannerImage"
                      type="file"
                      className="hidden"
                      accept=".xlsx,.csv"
                      onChange={(e) => {
                        ImportFile(e);
                      }}
                    />
                  </label>
                </div>
              </div>

          {/* <div className="flex gap-2 ml-auto">
            <SelectDropdown
              id="statusDropdown"
              displayValue="name"
              placeholder="All Status"
              intialValue={filters.status}
              result={(e) => {
                changestatus(e.value);
              }}
              options={statusModel.list}
            />
           
            {filters.status || filters.groupId ? (
              <>
              <button
                className="bg-primary leading-10 h-10 inline-block shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg flex items-center w-fit "
                onClick={() => clear()}
              >

          <IoIosRefresh class="me-2"/>


                Reset
              </button>
            </>
            ) : (
              <></>
            )}
          </div> */}
        </div>

        {!loaging ? (
          <>
           <div className="">
          <Table
              className=""
              data={data}
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
    </Layout>
  );
};

export default Html;
