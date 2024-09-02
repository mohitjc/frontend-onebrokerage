import React from "react";
import Layout from "../../components/global/layout";
import Pagination from "react-pagination-js";
// import "./style.scss";
import Table from "../../components/Table";
import Select from "react-select";
import shared from "./shared";
import { Tooltip } from "antd";
import { PiEyeLight } from "react-icons/pi";
const Html = ({
  sortClass,
  sorting,
  isAllow,
  reset,
  view,
  clear,
  ChangeStatus,
  statusChange,
  handleFilter,
  pageChange,
  filters,
  setFilter,
  filter,
  handleFilters,
  loaging,
  data,
  total,
  statusOptions,
  count,
}) => {
  const columns = [
    {
      key: "transaction_id",
      name: "Transaction Id",
      // sort: true,
      render: (row) => {
        return (
          <span className="capitalize" onClick={(e) => view(row.id)}>
            {row?.payment_intent_id}
          </span>
        );
      },
    },
    {
      key: "paln name",
      name: "Plan Name",
      sort: true,
      render: (row) => {
        return (
          <span className="capitalize">{row?.subscription_plan_name}</span>
        );
      },
    },
    {
      key: "user name",
      name: "Carrier Name",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.user_id_name}</span>;
      },
    },
    {
      key: "amount",
      name: "Amount",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.amount}</span>;
      },
    },

    {
      key: "transaction_status",
      name: "Status",
      render: (row) => {
        return <span className="capitalize badge badge-primary">{row?.transaction_status}</span>;
      },
    },
    {
      key: "action",
      name: "Actions",
      render: (itm) => {
        return (
          <>
            <div className="flex items-center justify-start gap-1.5">
              {isAllow(`read${shared.check}`) ? (
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
          <h3 className="text-2xl font-semibold text-[#111827]">Transaction</h3>
          <p class="text-sm font-normal text-[#75757A]">
            Here you can see all about your Transactions
          </p>
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
          
            <Select
              className="rounded-lg"
              options={statusOptions}
              value={filters?.transaction_status}
              onChange={(e) => handleFilters(e, "transaction_status")}
              isClearable
              placeholder="Select Status"
            />
            {filters.transaction_status ? (
              <>
                <button
                  className="bg-primary leading-10  h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2"
                  onClick={(e) => {
                    reset("transaction_status");
                  }}
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
