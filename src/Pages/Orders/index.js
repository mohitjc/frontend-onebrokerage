import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
import loader from "../../methods/loader";
import Html from "./html";
import { useNavigate } from "react-router-dom";
import environment from "../../environment";
import axios from "axios";
import shared from "./shared";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import SweetAlert from "../../components/SweetAlert/SweetAlert";

const Orders = () => {
  const user = useSelector((state) => state.user);
  const searchState = { data: "" };
  const [filters, setFilter] = useState({
    page: 1,
    count: 5,
    search: "",
  });
  const [customer, setCustomer] = useState({
    customerId: { value: "51TQ1AAFHREX2", label: "A Danielle Adams" },
  });

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const history = useNavigate();

  const handleUserChange = (e) => {
    setCustomer((prev) => ({ ...prev, customerId: e }));
    const url = "orders/detail";
    let value = e.value || "";
    const parms = `Token=2f02f294-b57b-1783-2ef6-173f1fb628bb&id=${
      e.value || ""
    }`;

    if (value) {
      loader(true);
      ApiClient.get(url + "?" + parms).then((res) => {
        if (res?.success) {
          getOrderDetails(res?.data?.customers?.elements?.[0]?.id);
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

  const getOrderDetails = (customerId) => {
    let url = "orders/get";
    let encodedString = customerId
      ? "%20IN%20%28%27" + encodeURIComponent(customerId) + "%27%29"
      : "%20IN%20%28%2751TQ1AAFHREX2%27%29";

    let params = `expand=credits%2Cdiscounts%2Cemployee%2ClineItems%2ClineItems.discounts%2ClineItems.modifications%2CorderType%2Cpayments%2Crefunds%2CserviceCharge%2CorderAdditionalCharges&filter=customer.id${encodedString}&limit=${filters?.count}&offset=${filters?.page}&Token=2f02f294-b57b-1783-2ef6-173f1fb628bb&search=${filters.search}
`;

    ApiClient.get(url + "?" + params).then((res) => {
      if (res.success) {
        setOrders(res.data.elements);
        setTotal(res?.data?.total);
      }
      loader(false);
    });
  };

  const clear = () => {
    let f = {
      type: "",
      search: "",
      status: "",
      category: "",
      page: 1,
    };
    setFilter({ ...filters, ...f });
    getOrderDetails(customer?.customerId.value || null);
  };

  const filter = (p = {}) => {
    let f = {
      page: 1,
      ...p,
    };
    setFilter({ ...filters, ...f });
    getOrderDetails(customer?.customerId.value || null);
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
        customer={customer}
      />
    </>
  );
};

export default Orders;
