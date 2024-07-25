import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
// import './style.scss'
import pipeModel from "../../models/pipeModel";
import { FiCheck } from "react-icons/fi";
import datepipeModel from "../../models/datepipemodel";
import { useDispatch, useSelector } from "react-redux";
import { login_success } from "../actions/user";

const ActivePlan = () => {
  const user = useSelector((state) => state.user);
  const [activeplan, setActivePlan] = useState();
  const [card, setCard] = useState();
  const history = useNavigate();
  const dispatch=useDispatch()

  useEffect(() => {
    loader(true);

    const response=(res)=>{
      if (res.success) {
        setActivePlan(res.data);
        if (!res.data.id) {
          history("/plan");
        }
        let userDetail = {};
        if (res?.data?.isActive) {
          userDetail = { ...user, subscriptionId: res?.data?.subscription?.id };
        } else {
          userDetail = { ...user, subscriptionId: "" };
        }
     
        dispatch(login_success(userDetail));
      }
      loader(false);
    }

    ApiClient.get('api/my/plan',{id:user.id||user?._id}).then(response)

    const listresponse=(res)=>{
      if (res.success) {
        if (res.data.length) {
          setCard(res.data[0]);
        }
      }
      loader(false);
    }
    ApiClient.get('api/card/list',{ isDefault: true }).then(listresponse)
  }, []);

  return (
    <Layout>
      <div className="my-6">
        <h5 className="text-typo text-2xl font-semibold">Plan</h5>
        <p className="text-sm font-normal text-[#75757A]">
          Here you can see all about your product statistics
        </p>
      </div>

      <div className="mt-6 shadow-box bg-white rounded-lg overflow-hidden">
        <div className="bg-[#063688] !p-5 flex gap-[18px] items-center">
          <div className="rounded-lg border !border-[#FFFFFF4D] bg-[#8778EA] !p-3 flex flex-col !gap-1 min-w-[175px]">
            <h4 className="text-2xl font-medium text-white">
              {/* <span className="uppercase">{activeplan?.subscription?.plan?.currency}</span>  */}
              {pipeModel.currency((activeplan?.subscription?.plan?.amount / 1000 || 0), '', user.companyCurrencyFormat)} per {activeplan?.subscription?.plan?.interval_count == 1 ? '' : activeplan?.subscription?.plan?.interval_count} mo
            </h4>
            <p className="text-sm font-light text-white">Next Payment</p>
          </div>
          <div className="flex flex-col !gap-0">
            <h5 className="text-lg font-medium text-white">{activeplan?.planId?.name || ""} ({activeplan?.planInterval < 12 ? "Monthly" : "Annual"})</h5>
            <p className="text-sm font-light text-white">
              Next payment occurs after {datepipeModel.date(activeplan?.validUpTo, user?.companyDateFormat)}.
            </p>
          </div>
        </div>
        <div className="bg-white !px-8 !py-8 border-b border-gray-200">
          <h5 className="text-xl font-medium text-typo !mb-4">
            Your plan includes
          </h5>
          <div className="grid xl:grid-cols-4 grid-cols-2 !gap-4">
            {activeplan?.planId &&
              Object.keys(activeplan?.planId?.feature).map((oitm) => {
                return (
                  <div className="">
                    <h6 className="text-sm font-medium text-typo !mb-4">
                      {oitm}
                    </h6>
                    <ul className="!mt-2 space-y-2.5">
                      {activeplan?.planId?.feature[oitm].map((itm) => {
                        if (itm.checked)
                          return (
                            <li className="flex items-center !gap-1 capitalize text-[#3C3E49]">
                              <FiCheck className="text-base !text-success" />
                              {itm.name}
                            </li>
                          );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
        </div>
        {/* <div className="card-body borderCard">
            <div className='justify-content-between w-100 flex'>
                <div className='leftBilling'>
            <h5 className="card-title">Billing cycle</h5>
             <p>Monthly for $39.00 USD.</p>
             </div>
                <a>Change billing cycle</a>
             </div>
        </div> */}

        <div className="!p-5">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h6 className="text-base font-medium text-typo">Payment method</h6>
              <div className="flex items-center !gap-1">
                <img
                  src="/assets/img/visa.png"
                  className="object-contain w-10 h-10"
                />
                <p>
                  {card?.brand} ending in {card?.last4}
                </p>
              </div>
            </div>
            <div className="flex !gap-2 items-center">
              <Link
                to="/card"
                className="!px-4 text-typo hover:!text-typo hover:no-underline text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed whitespace-nowrap">
                Change payment method
              </Link>
              <Link
                className="bg-btn bg-[#063688] hover:no-underline !px-4 h-10 flex items-center justify-center text-sm font-normal text-white hover:!text-white rounded-lg"
                to="/plans">
                Change Plan
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="card-body borderCard text-right">
          <button className='btn btn-secondary discard mr-2'>Deactive store</button>
        </div> */}
      </div>
    </Layout>
  );
};

export default ActivePlan;
