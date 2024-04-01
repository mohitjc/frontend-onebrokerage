import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import Pagination from "react-pagination-js";
// import './style.scss';
import { Link } from "react-router-dom";
import userTableModel from "../../models/table.model";
import methodModel from "../../methods/methods";
import datepipeModel from "../../models/datepipemodel";
import statusModel from "../../models/status.model";
import SelectDropdown from "../../components/common/SelectDropdown";
import planTypeModel from "../../models/planType.model";
import { FaPlus } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import ApiClient from "../../methods/api/apiClient";

const Html = ({
  tab,
  edit,
  reset,
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
  tableCols,
  loaging,
  data,
  types,
  exportfun,
  total,
}) => {
  const user = useSelector(state => state.user)

  

  return (
    <Layout>
      <h4 className="text-2xl font-semibold text-typo">Billings</h4>
      <>
        <div className="bg-white shadow-box rounded-lg w-full max-w-[1020px] mt-8 mb-6">
          <div className="flex justify-between items-center !px-5 !py-4 border-b border-[#EBEBEB]">
            <h5 className="text-lg font-medium text-typo">Payment methods</h5>
            <Link
              className="!px-4 text-sm font-normal text-white hover:!text-white hover:!no-underline h-10 flex items-center justify-center gap-2 !bg-primary rounded-lg shadow-btn hover:opacity-80 transition-all focus:ring-2 ring-[#EDEBFC] disabled:bg-[#D0CAF6] disabled:cursor-not-allowed"
              to="/card/add">
              <FaPlus />
              Add Payment Method
            </Link>
          </div>
          <div className="!pt-2 !px-5">
            {data &&
              data.map((item, index) => {
                const isLastItem = index === data.length - 1;
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between${isLastItem ? "" : " border-b border-[#E8EBED]"
                      } !py-3`}>
                    <div className="flex items-center !gap-4">
                      <img
                        src="/assets/img/visa.png"
                        className="w-12 h-12 shrink-0 object-contain"
                        alt=""
                      />
                      <div className="flex flex-col !gap-2">
                        <div className="flex items-center !gap-2">
                          <span className="text-sm font-medium text-typo border-r border-[#E3E4E5] !pr-2">
                            {item.last4}
                          </span>
                          {item?.isDefault ? (
                            <span className="px-1.5 !py-1 rounded bg-[#F6F6F6] text-xs font-medium text-[#666B78]">
                              Primary
                            </span>
                          ) : (
                            <button
                              className="px-1.5 !py-1 rounded !bg-primary/10 text-xs font-medium !text-primary"
                              onClick={() => statusChange(item.card_id)}>
                              Set Primary
                            </button>
                          )}
                        </div>
                        <p className="card-text">Ending in {item.exp_year}</p>
                      </div>
                    </div>
                    {item?.isDefault ? (
                      <></>
                    ) : (
                      <button
                        type="button"
                        className="px-2.5 !py-2 bg-[#FDE9EA] !rounded-md flex items-center justify-center !gap-1 text-sm font-normal text-[#E92531] outline-none"
                        onClick={() => deleteItem(item.card_id)}>
                        <FiTrash2 />
                        Delete
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="bg-white shadow-box rounded-lg w-full max-w-[1020px]">
          <div className="flex justify-between items-center !px-5 !py-4 border-b border-[#EBEBEB]">
            <h5 className="text-lg font-medium text-typo">
              Billing currency
            </h5>
          </div>
          <div className="!pt-2 !px-5">
            <div className="py-[18px] flex justify-between items-center">
              <span>
                Your current billing currency is set to{" "}
                <b><span className="uppercase">{user.subscription_currency||'aud'}</span>.</b>
              </span>
              {/* <button
                  type="button"
                  className="px-2.5 !py-2 bg-[#EDECF9] !rounded-md flex items-center justify-center !gap-1 text-sm font-normal text-[#705EE6] outline-none">
                  Change
                </button> */}
            </div>
          </div>
        </div>
      </>
      {!loaging && !total ? (
        <div className="py-3 text-center">No Data</div>
      ) : (
        <></>
      )}
      {!loaging && total > filters.count ? (
        <div className="paginationWrapper">
          <span>
            Show {filters.count} from {total} Cards
          </span>
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
        <div className="loaderDiv text-center py-4">
          <img
            src="/assets/img/loader.gif"
            width="auto"
            height="auto"
            className="pageLoader"
          />
        </div>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default Html;
