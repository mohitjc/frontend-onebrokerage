import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
import loader from "../../methods/loader";
import Html from "./html";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import datepipeModel from "../../models/datepipemodel";

const Video = () => {
  const user = useSelector((state) => state.user);
  const searchState = { data: "" };
  const [filters, setFilter] = useState({
    page: 1,
    count: 5,
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
    } else {
      loader(true);
      getOrderDetails("");
    }
  };

  const getInitialOrders = () => {
    let url = "orders/get/all";

    let params = `expand=credits%2Ccredits.dccInfo%2Ccredits.employee%2Ccredits.tender%2Cdiscounts%2Cemployee%2ClineItems%2ClineItems.discounts%2ClineItems.modifications%2CorderType%2Cpayments.additionalCharges%2Cpayments.dccInfo%2Cpayments.employee%2Cpayments.tender%2Crefunds.additionalCharges%2Crefunds.employee%2Crefunds.payment.tender%2Crefunds.overrideMerchantTender%2Crefunds.payment.dccInfo%2CserviceCharge&filter1=touched%3Dtrue&filter2=clientCreatedTime%3E1718856000000&filter3=clientCreatedTime%3C1721447999000&orderBy=clientCreatedTime%20DESC&limit=51&number=1721365711318&Token=2f02f294-b57b-1783-2ef6-173f1fb628bb`;

    ApiClient.get(url + "?" + params).then((res) => {
      if (res.success) {
        setOrders(res.data.elements);
        setTotal(res?.data?.total);
      }
      loader(false);
    });
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
        limit:51,
        number:'1721365711318',
        Token:'2f02f294-b57b-1783-2ef6-173f1fb628bb',
        search:filt.search
      }

      // if(f.filter){
      //   url="orders/get"
      // }

      loader(true)
    ApiClient.get(url,f).then((res) => {
      if (res.success) {
        let data=res?.data?.elements||res?.data||[]
        console.log("ApiClient ddd",data)
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
    getOrderDetails({ ...f });
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
      // getOrderDetails();
      getInitialOrders();
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

export default Video;
