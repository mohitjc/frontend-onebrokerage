import React from "react";
import Layout from "../../components/global/layout";
import Pagination from "react-pagination-js";
import "./style.scss";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";


const Html = ({
  tab,
  statusChange,
  pageChange,
  filters,
  loaging,
  data,
  total,
  handlePay,
  history,
}) => {
  return (
    <Layout>
      <div className="">
        <div className=" mb-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                className="!px-4  py-2 flex h-10 items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border  transition-all  mr-3"
                onClick={(e) => {
                  history.goBack();
                }}>
                <IoIosArrowBack className="text-lg font-bold" />

              </button>
              <h3 className="text-2xl font-semibold text-[#111827]">Select Payment Method</h3>
            </div>


            <div>
              <Link className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2" to="/card/add">
                <FaPlus className="" />  Add Card
              </Link>
            </div>

          </div>
        </div>
        {tab == "grid" ? (
          <></>
        ) : (
          <>
            <div className="shadow-box w-full bg-white rounded-lg mt-6">
              <div className="scrollbar w-full overflow-auto">
                <table className="w-full">
                  <thead className="border-b border-[#EAECF0]">
                    <tr className="border-b border-[#EAECF0]">
                      <th scope="col" className="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ">
                        Last Digits
                      </th>
                      <th scope="col" className="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ">
                        Brand
                      </th>
                      <th scope="col" className="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ">
                        Expire Month
                      </th>
                      <th scope="col" className="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ">
                        Expire Year
                      </th>
                      <th scope="col" className="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ">
                        Primary
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loaging &&
                      data &&
                      data.map((itm, i) => {
                        return (
                          <tr className="data_row">
                            <td className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">{itm.last4}</td>
                            <td className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0] pointer">{itm.brand}</td>
                            <td className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0] pointer">
                              {itm.exp_month}
                            </td>
                            <td className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0] pointer">{itm.exp_year}</td>
                            <td className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                              <div className={`user_hours`}>

                                <input id={`default-radio-${itm.card_id}`} checked={itm.isDefault} onChange={e => {
                                  if (!itm.isDefault) {
                                    statusChange(itm.card_id)
                                  }
                                }} type="radio" value="" name="primary" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for={`default-radio-${itm.card_id}`} class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>

              </div>

            </div>
            <span className="flex justify-end mt-4">


              {data?.length == 0 ? null : (
                <button
                  className="text-white bg-gradient-to-br from-purple-600 flex items-center gap-3 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={(e) => handlePay()}>
                  <RiSecurePaymentLine />
                  Pay
                </button>
              )}
            </span>
          </>
        )}
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
      </div>
    </Layout>
  );
};

export default Html;
