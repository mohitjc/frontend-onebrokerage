import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/global/PageLayout";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { CheckIcon } from "@heroicons/react/24/outline";
import methodModel from "../../methods/methods";
// import "./style.scss";

const ActivePlan = () => {
  const [activeplan, setActivePlan] = useState();
  const [card, setCard] = useState();
  const history = useNavigate();

  useEffect(() => {
    loader(true);
    ApiClient.get("active-plan").then((res) => {
      if (res.success) {
        setActivePlan(res.data);
        if (!res.data.id) {
          history("/plans");
        }
      }
      loader(false);
    });

    // ApiClient.get("api/cards/listing", { isDefault: true }).then((res) => {
    //   if (res.success) {
    //     if (res.data.length) {
    //       setCard(res.data[0]);
    //     }
    //   }
    //   loader(false);
    // });
  }, []);

 
  return (
    <PageLayout>
     <div className="mb-4">
                <h1 class="text-[25px] font-semibold leading-[28px]">Active plan</h1>
                </div>
        <div className="rounded-lg bg-card flex justify-between items-center p-3 w-full">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white ring-1 ring-gray-200  lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">{methodModel.capitalizeFirstLetter(activeplan?.name)}</h3>
            
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-primary">What’s included</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {activeplan?.subscription_plan_id?.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-primary" />
                  {methodModel.capitalizeFirstLetter(feature?.name)}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0  lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Active Plan</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">${activeplan?.amount/100||0}</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                </p>
                <a
                  href="/plan"
                  className="mt-10 block w-full rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Change Plan
                </a>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                 
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>

    </PageLayout>
  );
};

export default ActivePlan;
