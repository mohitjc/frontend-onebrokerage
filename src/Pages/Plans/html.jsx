import React from "react";
import Layout from "../../components/global/layout";
import Pagination from "react-pagination-js";
import "./style.scss";
import { Link } from "react-router-dom";
import SelectDropdown from "../../components/common/SelectDropdown";
import methodModel from "../../methods/methods";
import { Tooltip } from "antd";
import { PiEyeLight, PiEyesLight, PiFileCsv } from "react-icons/pi";
import { HiOutlineArrowDown } from "react-icons/hi";
import { FiEdit3, FiPlus } from "react-icons/fi";
import Table from "../../components/Table";
import statusModel from "../../models/status.model";
import shared from "./shared";
import { LiaEdit, LiaTrashAlt } from "react-icons/lia";
const Html = ({
  sortClass,
  sorting,
  tab,
  edit,
  reset,
  count,
  filter,
  currencys,
  view,
  tabChange,
  colClick,
  ChangeRole,
  ChangeStatus,
  openModal,
  statusChange,
  pageChange,
  addCol,
  deleteItem,
  exportCsv,
  uTableCols,
  removeCol,
  filters,
  setFilter,
  clear,
  tableCols,
  loaging,
  data,
  // types,
  exportfun,
  total,
 
  isAllow,
  showData,
}) => {
  const columns = [
    {
      key: "Name",
      name: "Name",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.name}</span>;
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
                    onClick={(e) => edit(itm.id,"false")}
                  >
                    <LiaEdit />
                  </a>
                </Tooltip>
              {/* ) : (
                <></>
              )} */}
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
  return (
    <Layout>
      <div className="flex flex-wrap justify-between items-center gap-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-[#111827]">{shared?.title}</h3>
          <p class="text-sm font-normal text-[#75757A]">
            Here you can see all about your {shared?.title}
          </p>
        </div>

        <div className="flex ">
          {/* <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                        <PiFileCsv className="text-typo text-xl" />  Export CSV
                    </button> */}
          {/* {isAllow('addPlan') ? */}
          <Link
            className="bg-primary leading-10  h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2"
            to="/plans/add"
          >
            <FiPlus className="text-xl text-white" /> Add Plan
          </Link>
          {/* : <></>} */}

          <div className="flex justify-end items-center gap-2">

          </div>
        </div>
      </div>

      <div className="shadow-box w-full bg-white rounded-lg mt-6">

   
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
            <SelectDropdown
              id="statusDropdown"
              displayValue="name"
              placeholder="All Status"
              intialValue={filters?.status}
              result={(e) => {
                ChangeStatus(e.value);
              }}
              options={statusModel.list}
            />
            {filters.status ? (
              <>
                <button
                  className="bg-primary leading-10  h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2"
                  onClick={reset}
                >
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

        {/* {tab == "grid" ? (
          <></>
        ) : (
          <>
            <div className="w-full bg-white rounded-lg">
              <div className="scrollbar w-full overflow-auto">
                <table class="w-full">
                  <thead className="text-xs text-gray-700 capitalize bg-gray-50  border-b border-[#EAECF0]">
                    <tr className="border-b border-[#EAECF0]">
                      <th
                        scope="col"
                        className="!px-3.5 py-3 capitalize cursor-pointer text-left"
                        onClick={(e) => sorting("name")}
                      >
                        Name{" "}
                        <span className="ml-2">
                          <HiOutlineArrowDown className="shrink-0 inline text-sm" />
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="!px-3.5 py-3 capitalize cursor-pointer text-left"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="!px-3.5 py-3 capitalize cursor-pointer text-left"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="planDrag">
                    {!loaging &&
                      data &&
                      showData().map((itm, index) => {
                        return (
                          <tr>
                            <td
                              className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]"
                              onClick={(e) => view(itm.id)}
                            >
                              {methodModel.capitalizeFirstLetter(itm.name)}
                            </td>
                            <td className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                              {" "}
                              <div
                                className={`user_hours ${itm.status}`}
                                onClick={() => statusChange(itm)}
                              >
                                <Tooltip
                                  placement="top"
                                  title={
                                    itm.status != "deactive"
                                      ? "Inactive"
                                      : "Active"
                                  }
                                >
                                  <span
                                    className={`text-sm !px-3 h-[30px] flex items-center justify-center border border-[#EBEBEB] w-32  text-white !rounded capitalize ${itm.status === "active"
                                        ? "bg-green-400"
                                        : "bg-red-400 "
                                      }`}
                                  >
                                    {itm.status == "deactive"
                                      ? "Inactive"
                                      : "Active"}
                                  </span>
                                </Tooltip>
                              </div>
                            </td>

                 
                            <td className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                              <div className="flex items-center justify-start gap-1.5">
                                <Tooltip placement="top" title="Edit">
                                  <a
                                    className="border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-md bg-[#fff] w-9 h-9 text-[#E92531] flex items-center justify-center text-md"
                                    onClick={(e) => edit(itm.id, "false")}
                                  >
                                    <FiEdit3 />
                                  </a>
                                </Tooltip>

                                {!itm.activeSubscription ? (
                                  <>
                                    <Tooltip placement="top" title="Delete">
                                      <span
                                        className="border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-md bg-[#fff] w-9 h-9 text-[#E92531] flex items-center justify-center text-md "
                                        onClick={() => deleteItem(itm.id)}
                                      >
                                        <BsTrash3 />
                                      </span>
                                    </Tooltip>
                                  </>
                                ) : (
                                  <></>
                                )}
                                <Tooltip placement="top" title="View">
                                  <a
                                    className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#494f9f14] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                                    onClick={(e) => view(itm.id)}
                                  >
                                    <PiEyesLight />
                                  </a>
                                </Tooltip>
                              </div>
                            </td>
                   
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
         

            </div>
          </>
        )} */}

        {!loaging && total == 0 ? (
          <div className="py-3 text-center">No Data</div>
        ) : (
          <></>
        )}
        {!loaging && total > filters.count ? (
          <div className="paginationWrapper  mt-15">
            {/* <span className='text-sm text-gray-600'>Show {filters.count} from {total} Categories</span> */}
            <Pagination
              currentPage={filters.page}
              totalSize={total}
              sizePerPage={filters.count}
              changeCurrentPage={pageChange}
            />
          </div>
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
