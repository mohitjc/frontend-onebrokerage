import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
// import "./style.scss";
import loader from "../../methods/loader";
import Html from "./html";
import { useNavigate } from "react-router-dom";
import environment from "../../environment";
import axios from "axios";
import shared from "./shared";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const Transaction = () => {
  const user = useSelector((state) => state.user);
  const searchState = { data: "" };
  const [filters, setFilter] = useState({ page: 1, count: 10, search: "" });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loaging, setLoader] = useState(true);
  const history = useNavigate();

  const sortClass = (key) => {
    let cls = "fa-sort";
    if (filters.key == key && filters.sorder == "asc") cls = "fa-sort-up";
    else if (filters.key == key && filters.sorder == "desc")
      cls = "fa-sort-down";
    return "fa " + cls;
  };

  const sorting = (key) => {
    let sorder = "asc";
    if (filters.key == key) {
      if (filters.sorder == "asc") {
        sorder = "desc";
      } else {
        sorder = "asc";
      }
    }

    let sortBy = `${key} ${sorder}`;
    setFilter({ ...filters, sortBy, key, sorder });
    getData({ sortBy, key, sorder });
  };

  const getData = (p = {}) => {
    setLoader(true);
    let filter = { ...filters,...p,user_id:user?.id};

    ApiClient.get(shared.listApi, filter).then((res) => {
      if (res.success) {
        setData(
          res?.data?.data?.map((itm) => {
            itm.id = itm._id;
            return itm;
          })
        );
        setTotal(res?.data?.total);
      }
      setLoader(false);
    });
  };

  const clear = () => {
    let f = {
      groupId: "",
      search: "",
      status: "",
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

  const statusOptions = [
    { value: 'successful', label: 'Successful' },
    { value: 'failed', label: 'Failed' },
  ]

  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    getData({ page: e });
  };
  const count = (e) => {
    setFilter({ ...filters, count: e });
    getData({ ...filters, count: e });
  };

//   const changestatus = (e) => {

//     setFilter({ ...filters, status: e, page: 1 });
//     getData({ status: e, page: 1 });
//   };

  const handleFilters = (e, key) => {
    if (e?.value) {
     setFilter(prev => ({ ...prev, [key]: e }))
      getData({ [key]: e?.value })
    } else {
        setFilter(prev => ({ ...prev, [key]: '' }))
      getData({ [key]: '' })
    }
  }
  const reset = (key) => {
    setFilter(prev => ({ ...prev, [key]: '' }))
    getData({ [key]: '' })
  }


  const view = (id) => {
    let url = `/${shared.url}/detail/${id}`;
    history(url);
  };

  const exportfun = async () => {
    const token = await localStorage.getItem("token");
    const req = await axios({
      method: "get",
      url: `${environment.api}transaction/all?export_to_xls=yes`,
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

  const uploadFile = (e) => {
    let files = e.target.files;
    let file = files?.item(0);
    let url = "user/import-users";
    if (!file) return;
    loader(true);
    ApiClient.postFormFileData(url, { file }).then((res) => {
      if (res.success) {
       
      }
      loader(false);
    });
  };
 
  const isAllow = (key = "") => {
    let permissions = user?.permissions;
    let value = permissions?.[key];
    if(user.role=='admin'||user?.role=="carrier") value=true
    // return true;
    return value;
  };

  useEffect(() => {
    if (user && user.loggedIn) {
      setFilter({ ...filters, search: searchState.data });
      getData({ search: searchState.data, page: 1 });
    }
  }, []);

  return (
    <>
      <Html
        view={view}
        clear={clear}
        sortClass={sortClass}
        sorting={sorting}
        isAllow={isAllow}
        count={count}
        pageChange={pageChange}
        filters={filters}
        setFilter={setFilter}
        filter={filter}
        loaging={loaging}
        data={data}
        total={total}
        // changestatus={changestatus}
        exportfun={exportfun}
        // uploadFile={uploadFile}
        handleFilters={handleFilters}
        statusOptions={statusOptions}
        reset={reset}
      />
    </>
  );
};

export default Transaction;
