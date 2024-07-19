import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
import loader from "../../methods/loader";
import Html from "./html";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import datepipeModel from "../../models/datepipemodel";

const Orders = () => {
  const user = useSelector((state) => state.user);
  const searchState = { data: "" };
  const [filters, setFilter] = useState({
    page: 1,
    count: 50,
    search: "",
    startDate:datepipeModel.datetostring(new Date()),
    endDate:datepipeModel.datetostring(new Date()),
    customerId:''
  });

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const history = useNavigate();

  const handleUserChange = (e) => {
    setFilter((prev) => ({ ...prev, customerId: e }));
    const url = "orders/detail";
    let value = e.value || "";
    const parms = `Token=2f02f294-b57b-1783-2ef6-173f1fb628bb&id=${
      e.value || ""
    }`;

    if (value) {
      loader(true);
      ApiClient.get(url + "?" + parms).then((res) => {
        if (res?.success) {
          let customer=res?.data?.customers?.elements?.[0]?.id
          filter({customer,customerId:e});
        }
      });
    } 
  };


  const getOrderDetails = (p) => {
    let url = "orders/get/all";

    let filt={
      ...filters,
      ...p
    }

    let start=new Date(`${filt.startDate}T00:00:00`).getTime()
    let end=new Date(`${filt.endDate}T23:59:00`).getTime()

      let f={
        expand:'credits,credits.dccInfo,credits.employee,credits.tender,discounts,employee,lineItems,lineItems.discounts,lineItems.modifications,orderType,payments.additionalCharges,payments.dccInfo,payments.employee,payments.tender,refunds.additionalCharges,refunds.employee,refunds.payment.tender,refunds.overrideMerchantTender,refunds.payment.dccInfo,serviceCharge',
        filter1:'touched=true',
        filter:filt?.customer?`customer.id IN ('${filt?.customer}')`:'',
        filter2:`clientCreatedTime>${start}`,
        filter3:`clientCreatedTime<${end}`,
        orderBy:'clientCreatedTime DESC',
        count:filters.count,
        page:filters.page,
        number:'1721365711318',
        Token:'2f02f294-b57b-1783-2ef6-173f1fb628bb',
        search:filt.search
      }

      if(f.filter){
        url="orders/get"
      }

      loader(true)
    ApiClient.get(url,f).then((res) => {
      if (res.success) {
        let data=res?.data?.elements||res?.data||[]
        // console.log("ApiClient ddd",data)
        setOrders(data);
        setTotal(res?.data?.total);
      }
      loader(false);
    });
  };

  const clear = () => {
    let f = {
      search: "",
      page: 1,
      customerId:'',
      customer:''
    };
    setFilter({ ...filters, ...f });
    getOrderDetails(f);
  };

  const filter = (p = {}) => {
    let f = {
      page: 1,
      ...p,
    };
    setFilter({ ...filters, ...f });
    getOrderDetails(f);
  };

  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    // getData({ page: e });
  };
  const count = (e) => {
    setFilter({ ...filters, count: e });
    // getData({ ...filters, count: e });
  };

  const isAllow = (key = "") => {
    let permissions = user.role?.permissions?.[0];
    let value = permissions?.[key];
    // return true;
    return value;
  };

  useEffect(() => {
    if (user && user.loggedIn) {
      setFilter({ ...filters, search: searchState.data });
      // getData({ search: searchState.data, page: 1 });
    }
  }, []);

  useEffect(() => {
    if (user && user.loggedIn) {
      filter();
    }
  }, []);

  return (
    <>
      <Html
        clear={clear}
        isAllow={isAllow}
        count={count}
        pageChange={pageChange}
        filters={filters}
        setFilter={setFilter}
        filter={filter}
        data={orders}
        total={total ? total : ""}
        hanldeUserChange={handleUserChange}
      />
    </>
  );
};

export default Orders;
