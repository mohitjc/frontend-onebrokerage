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

const Content = () => {
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
    let filter = { ...filters, ...p, email: user.email };

    ApiClient.get(shared.listApi, filter).then((res) => {
      if (res.success) {
        let data=res.data.map((itm) => {
          itm.id = itm._id;
          return itm;
        })
        setData(data);
        setTotal(res?.total||data.length);
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

  const deleteItem = (id) => {
    // if (window.confirm("Do you want to delete this")) {
    //     loader(true)
    //     ApiClient.delete(shared.deleteApi, { id: id }).then(res => {
    //         if (res.success) {
    //             // ToastsStore.success(res.message)
    //             clear()
    //         }
    //         loader(false)
    //     })
    // }
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete this`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#494f9f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        loader(true);
        ApiClient.delete(shared.deleteApi, { slug: id }).then((res) => {
          if (res.success) {
            // ToastsStore.success(res.message)
            clear();
          }
          loader(false);
        });
        //   Swal.fire({
        //     icon: "success"
        //   });
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
    setFilter({ ...filters, status: e, page: 1 });
    getData({ status: e, page: 1 });
  };

  const statusChange = (itm) => {
    // if (!(isAllow(`edit${shared.check}`) && itm.addedBy == user._id)) return;
    if (!isAllow(`edit${shared.check}`)) return;
    let status = "active";
    if (itm.status == "active") status = "deactive";

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        status == "active" ? "Activate" : "Deactivate"
      } this`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#494f9f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        loader(true);
        ApiClient.put(shared.statusApi, { id: itm.id, status }).then((res) => {
          if (res.success) {
            getData();
          }
          loader(false);
        });
      }
    });
  };

  const edit = (id) => {
    history(`/${shared.url}/edit/${id}`);
  };

  const view = (slug) => {
    let url = `/${shared.url}/detail/${slug}`;
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

  const isAllow = (key = "") => {
    let permissions = user?.permissions?.[0];
    let value = permissions?.[key];
    if(user.role=='admin'|| user?.role=="carrier") value=true
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
        edit={edit}
        view={view}
        clear={clear}
        sortClass={sortClass}
        sorting={sorting}
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
        statusChange={statusChange}
        changestatus={changestatus}
        exportfun={exportfun}
      />
    </>
  );
};

export default Content;
