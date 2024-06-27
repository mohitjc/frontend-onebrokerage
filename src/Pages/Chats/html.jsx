import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import "./style.scss";
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
import { LiaEdit, LiaTrashAlt } from "react-icons/lia";
import { PiEyeLight } from "react-icons/pi";
import Lists from "./lists";
import Chat from "./chat";
import { IoSearchOutline } from "react-icons/io5";
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
}) => {
  const user = useSelector((state) => state.user);

  return (
    <Layout>
      <div className="flex flex-wrap justify-between items-center gap-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-[#111827]">
            {" "}
            {shared.title}
          </h3>
          <p className="text-sm font-normal text-[#75757A]">
            Here you can see all about your {shared.title}
          </p>
        </div>
      </div>

      <div className="shadow-box w-full bg-white rounded-lg mt-6">
        <div className="">
          <div className="grid grid-cols-12 gap-4  ">
            <div className="col-span-4 2xl:col-span-3">
              <div className="bg-gray-100 p-6 h-full">
                <form
                  className="flex items-center max-w-sm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    filter();
                  }}
                >
                  <label for="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="simple-search"
                      value={filters.search}
                      onChange={(e) => {
                        setFilter({ ...filters, search: e.target.value });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  h-10 focus:ring-orange-500 focus:border-[#EB6A59]block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 pr-10"
                      placeholder="Search"
                      required
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
                    className="p-2.5 text-sm font-medium h-10 text-white  border border-[#EB6A59] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <IoSearchOutline />
                  </button>
                </form>
                <Lists />
              </div>
            </div>

            <Chat />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Html;
