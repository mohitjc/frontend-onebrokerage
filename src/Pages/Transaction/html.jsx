import React from "react";
import Layout from "../../components/global/layout";
import Pagination from "react-pagination-js";
// import "./style.scss";
import statusModel from "../../models/status.model";
import methodModel from "../../methods/methods";
import { Tooltip } from "antd";
import { PiEyeLight, PiEyesLight, PiFileCsv } from "react-icons/pi";
import Select from "react-select";

const Html = ({
  sortClass,
  sorting,
  tab,
  edit,
  reset,
  view,
  ChangeStatus,
  statusChange,
  handleFilter,
  pageChange,
  filters,
  handleFilters,
  loaging,
  data,
  total,
  statusOptions,
  showData,
}) => {

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

      <div className="shadow-box w-full bg-white rounded-lg mt-6">

      <div className="flex gap-2 ml-auto">
      <Select className="rounded-lg" options={statusOptions} value={filters?.transaction_status} onChange={e => handleFilters (e, 'transaction_status')} isClearable placeholder='Select Status' />
            {filters.transaction_status ? (
              <>
                <button
                  className="bg-primary leading-10  h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2"
                  onClick={(e)=>{reset('transaction_status')}}
                >
                  Reset
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        {tab == "grid" ? (
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
                        // onClick={(e) => sorting("name")}
                      >
                        Transaction_id{" "}
                        {/* <span className="ml-2">
                          <HiOutlineArrowDown className="shrink-0 inline text-sm" />
                        </span> */}
                      </th>
                      <th
                        scope="col"
                        className="!px-3.5 py-3 capitalize cursor-pointer text-left"
                      >
                        Plan Name
                      </th>
                      <th
                        scope="col"
                        className="!px-3.5 py-3 capitalize cursor-pointer text-left"
                      >
                        Carrier Name
                      </th>
                      <th
                        scope="col"
                        className="!px-3.5 py-3 capitalize cursor-pointer text-left"
                      >
                        Amount
                      </th>
                      {/* <th
                        scope="col"
                        className="!px-3.5 py-3 capitalize cursor-pointer text-left"
                      >
                        Created At
                      </th> */}
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
                             {itm?.payment_intent_id}
                            </td>
                            <td
                              className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]"
              
                            >
                              {methodModel.capitalizeFirstLetter(itm.subscription_plan_name)||"--"}
                            </td>
                            <td
                              className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]"
                        
                            >
                              {methodModel.capitalizeFirstLetter(itm.user_id_name)||"--"}
                            </td>
                            <td
                              className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]"
                        
                            >
                              {`$ ${itm?.amount}`}
                            </td>
                            <td className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                              {" "}
                              <div
                                className={`user_hours ${itm.transaction_status}`}
                              >
                              {methodModel.capitalizeFirstLetter(itm?.transaction_status)}
                              </div>
                            </td>

                            {/* dropdown */}
                            <td className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                              <div className="flex items-center justify-start gap-1.5">
                             
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
                            {/* end */}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
         

            </div>
          </>
        )}
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
