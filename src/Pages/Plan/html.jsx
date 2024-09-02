import React from "react";
import Layout from "../../components/global/layout";
import datepipeModel from "../../models/datepipemodel";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import environment from "../../environment";
import methodModel from "../../methods/methods";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { AiOutlineInfo } from "react-icons/ai";

const Html = ({
  interval,
  getPrice,
  loaging,
  data,
  total,
  getplandetails,
  activeplan,
  cancelplan,
  appliedcurrency,
  setcurrencyiso,
  currencyiso,
  features,
  changeInterval,
  isChecked,
  user,
}) => {
  return (
    <Layout>
      <div className="">
      <div className="flex flex-wrap justify-between items-center gap-y-4">
        <div className="flex flex-col">
          <h4 className="text-typo text-2xl font-semibold">Plan</h4>
          {!user?.on_trial && !user?.trial_ended ? (
                              <p className="text--sm font-normal text-[#75757A]">
                              Please choose your plan 
                              </p>
                          ) : <></>}


         
        </div>

        <p>
          {user?.subscription_currency ? null : (
            <span className="div_section flex justify-end ">
              {appliedcurrency &&
                appliedcurrency.map((item) => {
                  return (
                    <span
                      className="span_section flex items-center gap-x-1 text-uppercase text-primary h6 currency-format pointer bg-white shadow-btn text-center !px-2 !py-2 ml-3"
                      onClick={(e) =>
                        setcurrencyiso(item?.isoCode.toLowerCase())
                      }>
                      <img
                        src={methodModel.userImg(item?.countryFlagImage)}
                        
                        className="mr-1 h-14 w-14 rounded-full object-cover"
                      />
                      <span className="text_bg text-md text-center bg-[#F7F7FE] "> {item?.isoCode} </span>
                    </span>
                  );
                })}

            </span>
          )}
        </p>
        </div>
      </div>
      <div className="border !border-[#EBEBEB] bg-white rounded-[10px] p-0 lg:!p-5 mt-6">
        <div className="flex md:items-center flex-col md:flex-row md:flex-wrap justify-between border-b border-[#EBEBEB] pb-6 mb-6">
          <div>
            <h4 className="text-typo text-base font-semibold">Choose Plan</h4>
          </div>
          <ul className="flex flex-wrap items-center justify-center md:ml-auto mt-2 !gap-2 !p-1 w-fit bg-[#FAFBFC] border border-[#EAECF0] rounded-lg">
            <li>
              <a
                className={`!px-3 !py-2 whitespace-nowrap text-sm block cursor-pointer text-center min-w-[120px] font-medium ${interval == 1
                  ? "shadow-btn rounded-md font-semibold text-[#344054]  bg-[#494f9f] text-white"
                  : "!text-[#667085] hover:!text-[#667085]"
                  }`}
                onClick={(e) => changeInterval(1)}>
                1 Month
              </a>
            </li>
            <li>
              <a
                className={`!px-3 !py-2 whitespace-nowrap text-sm block cursor-pointer text-center min-w-[120px] font-medium ${interval == 3
                  ? "shadow-btn rounded-md font-semibold text-[#344054]  bg-[#494f9f] text-white"
                  : "!text-[#667085] hover:!text-[#667085]"
                  }`}
                onClick={(e) => changeInterval(3)}>
                3 Months
              </a>
            </li>
            <li>
              <a
                className={`!px-3 !py-2 whitespace-nowrap text-sm block cursor-pointer text-center min-w-[120px] font-medium ${interval == 6
                  ? "shadow-btn rounded-md font-semibold text-[#344054]  bg-[#494f9f] text-white"
                  : "!text-[#667085] hover:!text-[#667085]"
                  }`}
                onClick={(e) => changeInterval(6)}>
                6 Months
              </a>
            </li>
            <li>
              <a
                className={`!px-3 !py-2 whitespace-nowrap text-sm block cursor-pointer text-center min-w-[120px] font-medium ${interval == 12
                  ? "shadow-btn rounded-md font-semibold text-[#344054]  bg-[#494f9f] text-white"
                  : "!text-[#667085] hover:!text-[#667085]"
                  }`}
                onClick={(e) => changeInterval(12)}>
                12 Months
              </a>
            </li>
          </ul>
        </div>
        <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data &&
            data.map((item, index) => {
              return (
                <>
                  <div>
                    <div className={`shadow-xl !rounded-xl hover:shadow-2xl !p-5 ${item.id == activeplan?.planId?'border border-orange-400 shadow-2xl':''}`}>
                      <div className="flex !gap-3 flex-wrap items-center mb-6">
                        <div className="w-12 h-12 shrink-0 flex items-center justify-center border-4 !border-[#ECEAFC] !rounded-xl bg-[#F7F7FE] shadow-[0_0.5px_1px_0_rgba(0,0,0,0.05)]">
                          {item.name === "Advance" ? (
                            <img
                              src="/assets/img/svgs/zap.svg"
                              alt=""
                              className="w-6 h-6"
                            />
                          ) : (
                            <img
                              src="/assets/img/svgs/bulb.svg"
                              alt=""
                              className="w-6 h-6"
                            />
                          )}
                        </div>
                        <h5 className="text-typo text-lg font-medium">
                          {item.name}
                        </h5>
                      </div>
                      <div className="flex !gap-1 items-center flex-wrap">
                        <h2 className="text-typo text-3xl font-semibold">
                          {getPrice(item)} {currencyiso?.toUpperCase()}
                        </h2>
                        <div className="border !border-[#E9E7FB]  !rounded-md bg-[#494f9f] !px-2 py-0.5 text-xs font-medium !text-[#fff]">
                          0% off
                        </div>
                        <p>
                          {item.id == activeplan?.planId &&
                            activeplan?.isActive ? (
                            <>
                              {activeplan?.on_trial ? (
                                <p className="!text-primary mb-0">
                                  Free Trial
                                  <br />
                                </p>
                              ) : null}
                              Valid Upto :{" "}
                              <span className="!text-primary">
                                {datepipeModel.date(activeplan?.validUpTo)}
                              </span>
                              <br />
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <p className="text-xs font-normal text-[#75757A] mt-2.5">
                        per user/month, billed annualy
                      </p>
                      <div className="!mt-5">
                        {features &&
                          Object.keys(features).map((oitm) => {
                            return (
                              <>
                                <h6 className="text-sm font-medium text-typo !my-5 capitalize">
                                  {oitm}
                                </h6>
                                <ul className="!mt-3.5 !mb-3 space-y-3.5">
                                  {features[oitm].map((fitm) => {
                                    return (
                                      <li>
                                        <div className="flex items-center gap-1.5 text-[#3C3E49] capitalize">
                                          {isChecked(item, fitm) ? (
                                            <IoCheckmarkCircle className="text-xl text-green-700" />
                                          ) : (
                                            <IoCloseCircle className="text-xl text-[#494f9f]" />
                                          )}
                                          {/* <i class={`material-icons ${isChecked(item, fitm) ? 'text-success' : 'text-danger'} planIcon`}>{isChecked(item, fitm) ? 'check' : 'close'}</i> */}
                                      <p className="capitalize">{fitm.name}</p>    
                                          {fitm.description ? (
                                            <>
                                              <a
                                                id={`app-title_${fitm.id}_${item.id}`}
                                                className="border !border-[#808080] w-4 h-4 flex items-center justify-center rounded-full relative ml-2.5 text-[10px]">
                                                <AiOutlineInfo className="text-[8px]" />
                                              </a>
                                              <ReactTooltip
                                                anchorId={`app-title_${fitm.id}_${item.id}`}
                                                place="top"
                                                content={fitm.description}
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </>
                            );
                          })}
                      </div>
                      {item.id == activeplan?.planId &&
                        activeplan?.isActive ? (
                        <>
                          {activeplan?.isActive &&
                            (activeplan?.planInterval == interval||item.planType=='free') ? (
                            <>
                              <button
                                className="!px-4 text-typo text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed w-full mt-8"
                                onClick={(e) => cancelplan(item.id)}>
                                Cancel Subscription
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="!px-4  hover:opacity-80 text-typo text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed w-full mt-8"
                                onClick={(e) => getplandetails(item)}>
                                {activeplan?.isActive
                                  ? "Upgrade"
                                  : "Get Started"}
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {!user?.on_trial &&
                            !user?.trial_ended &&
                            item?.trial_period_days ? (
                            <p className="text-primary mb-0">
                              {item?.trial_period_days} Days Free Trail
                            </p>
                          ) : null}
                          <button
                            className="!px-4 bg-[#fff] text-black hover:text-black  text-typo text-sm font-normal py-2.5 flex items-center justify-center gap-2 border-[#494f9f] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed w-full mt-8"
                            disabled={getPrice(item)||item.planType=='free' ? false : true}
                            onClick={(e) => getplandetails(item)}>
                            {activeplan?.isActive ? "Upgrade" : "Get Started"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
      {!loaging && total == 0 ? (
        <div className="py-3 text-center">No Data</div>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default Html;
