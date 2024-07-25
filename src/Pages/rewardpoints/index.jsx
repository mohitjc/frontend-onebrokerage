import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
import loader from "../../methods/loader";
import Html from "./html";
import { useNavigate } from "react-router-dom";
import environment from "../../environment";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import shared from "./shared";

const RewardPoints = () => {
  const user = useSelector((state) => state.user);
  const searchState = { data: "" };
  const [filters, setFilter] = useState({
    page: 1,
    count: 10,
    search: "",
    // transaction_for: "",
  });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loaging, setLoader] = useState(true);
  const history = useNavigate();

  const getData = (p = {}) => {
    setLoader(true);
    let filter = { ...filters, ...p };

    ApiClient.get(shared.listApi, filter).then((res) => {
      if (res.success) {
        setData(
          res.data.map((itm) => {
            itm.id = itm._id;
            return itm;
          })
        );
        setTotal(res.total);
      }
      setLoader(false);
    });
  };

  const clear = () => {
    let f = {
      search: "",
      // transaction_for: "",
      page: 1,
    };
    setFilter({ ...filters, ...f });
    getData({ ...f });
  };

  const filter = (p = {}) => {
    let f = {
      page: 1,
      ...p,
    };
    setFilter({ ...filters, ...f });
    getData({ ...f });
  };

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete this`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        loader(true);
        ApiClient.delete(shared.deleteApi, { id: id }).then((res) => {
          if (res.success) {
            clear();
          }
          loader(false);
        });
      }
    });
  };

  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    getData({ page: e });
  };
  const count = (e) => {
    setFilter({ ...filters, count: e });
    getData({ ...filters, count: e });
  };
  const changestatus = (e) => {
    setFilter({ ...filters,   page: 1 });
    getData({   page: 1 });
  };

  const handleMarkPopular = (e, id) => {
    let checked = e.target.checked;
    let f = { id: id, isPopular: checked };
    ApiClient.put(shared.editApi, f).then((res) => {
      if (res.success) {
        getData();
      }
    });
  };

  const edit = (id) => {
    history(`/${shared.url}/edit/${id}`);
  };

  const view = (id) => {
    let url = `/${shared.url}/detail/${id}`;
    history(url);
  };

  const exportfun = async () => {
    const token = await localStorage.getItem("token");
    const req = await axios({
      method: "get",
      url: `${environment.api}api/export/excel`,
      responseType: "blob",
      body: { token: token },
    });
    var blob = new Blob([req.data], {
      type: req.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${shared.title}.xlsx`;
    link.click();
  };

  const isAllow = (key = "read") => {
    let permissions = user.role?.permissions?.[0];
    let value = permissions?.[key];
    // return true;
    return value;
  };

  useEffect(() => {
    if (user && user.loggedIn) {
      setFilter({ ...filters, search: searchState.data });
      getData({ search: searchState.data, page: 1 });
    }
  }, []);

  const list = [
    { name: "login", id: "login" },
    { name: "Add reviews", id: "addreviews" },
    { name: "My Favourite ", id: "myfavourite" },
  ];

  return (
    <>
      <Html
        edit={edit}
        view={view}
        clear={clear}
        isAllow={isAllow}
        count={count}
        pageChange={pageChange}
        deleteItem={deleteItem}
        filters={filters}
        setFilter={setFilter}
        filter={filter}
        loaging={loaging}
        data={data}
        total={total}
        changestatus={changestatus}
        exportfun={exportfun}
        handleMarkPopular={handleMarkPopular}
        list={list}
      />
    </>
  );
};

export default RewardPoints;
