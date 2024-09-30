import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import "./style.scss";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { FiEdit3, FiPlus } from "react-icons/fi";
import loader from "../../methods/loader";
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
import PageLayout from "../../components/global/PageLayout";
import { useNavigate } from "react-router-dom";
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
  sampledownload,
  ImportFile,
  data,
  changestatus,
  isAllow,
  total = { total },
  sortClass,
  uploadFile,
}) => {
  const [activeplan, setActivePlan] = useState();
  const history = useNavigate();
  console.log(activeplan, "activeplan")
  useEffect(() => {
    // loader(true);
    ApiClient.get("active-plan").then((res) => {
      if (res.success) {
        setActivePlan(res.data);
        if (!res.data.id) {
          history("/plans");
        }
      }
      // loader(false);
    });

  }, []);
  const user = useSelector((state) => state.user);
  const columns = [
    {
      key: "truck_number",
      name: "Truck Number",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.truck_number}</span>;
      },

    },
   

    {
      key: "vin_number",
      name: "vin Number",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.vin_number}</span>;
      },
    },
    {
      key: "",
      name: " createdAt",
      // sort: true,
      render: (row) => {
        return (
          <span className="">{moment(row?.createdAt).format("DD-MM-YYYY")}</span>
        );
      },
    },
  
  ];

  const addtruck = () => {

    history(`/${shared.url}/add`)
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
   
          <button
            className="bg-primary leading-10  h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2"
            onClick={addtruck}

          >
            <FiPlus className="text-xl text-white" /> Add {shared.addTitle}
          </button>
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

        </div>

           

        {!loaging ? (
          <>
            <div className="">
              <Table
                className=""
                data={data}
                modelName={shared?.title}
                sort_key={filters?.key}
                sorter={filters?.sorder}
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
