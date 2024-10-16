import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
import loader from "../../methods/loader";
import userTableModel from "../../models/table.model";
import Html from "./html";
import { useNavigate } from "react-router-dom";
import environment from "../../environment";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Roles = (p) => {
  const user = useSelector((state) => state.user);
  const searchState = { data: "" };
  const [filters, setFilter] = useState({
    page: 1,
    count: 50,
    search: "",
    catType: "",
  });
  const [data, setData] = useState([]);
  const [tab, setTab] = useState("list");
  const [total, setTotal] = useState(0);
  const [loaging, setLoader] = useState(true);
  const [tableCols, setTableCols] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    let cols = [];
    for (let i = 0; i <= 2; i++) {
      cols.push(userTableModel.category[i]);
    }
    setTableCols(cols);
  }, []);

  useEffect(() => {
    if (user.loggedIn) {
      setFilter({ ...filters, search: searchState.data });
      getData({ search: searchState.data, page: 1 });
    }
  }, []);

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

  const uTableCols = () => {
    let exp = [];
    if (tableCols) exp = tableCols;
    let value = [];
    userTableModel.category.map((itm) => {
      if (itm != exp.find((it) => it.key == itm.key)) {
        value.push(itm);
      }
    });
    return value;
  };

  const addCol = (itm) => {
    setTableCols([...tableCols, itm]);
  };

  const removeCol = (index) => {
    let exp = tableCols;
    exp.splice(index, 1);
    setTableCols([...exp]);
  };

  const getData = (p = {}) => {
    setLoader(true);
    let filter = { ...filters, ...p };
    ApiClient.get("role/listing", filter).then((res) => {
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
      status: "",
      page: 1,
    };
    setFilter({ ...filters, ...f });
    getData(f);
  };

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete this role.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#494f9f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        loader(true);
        ApiClient.delete("role/delete", { id: id }).then((res) => {
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

  const ChangeRole = (e) => {
    setFilter({ ...filters, catType: e, page: 1 });
    getData({ catType: e, page: 1 });
  };
  const ChangeStatus = (e) => {
    setFilter({ ...filters, status: e, page: 1 });
    getData({ status: e, page: 1 });
  };

  const exportCsv = () => {
    loader(true);
    ApiClient.get("user/csv").then((res) => {
      if (res.success) {
        let url = res.path;
        let downloadAnchor = document.getElementById("downloadJS");
        downloadAnchor.href = url;
        downloadAnchor.click();
      }
      loader(false);
    });
  };

  const colClick = (col, itm) => {
    if (col.key == "healthClinicId") {
    }
  };

  const statusChange = (itm) => {
    if (!isAllow("editRoles")) {
      return;
    }

    let status = "active";

    // if (
    //   itm.id == "64b15102b14de6c28838f7d2" ||
    //   itm.id == "64b152a909d268f038611929"
    // ) {
    //   return;
    // }
    if (itm.status == "active") status = "deactive";
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        status == "active" ? "Activate" : "Deactivate"
      } this role.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#494f9f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        loader(true);
        ApiClient.put(`role/status/change`, { id: itm.id, status }).then(
          (res) => {
            if (res.success) {
              getData();
            }
            loader(false);
          }
        );
      }
    });
  };

  const view = (id) => {
    history("/roles/" + id);
  };

  const edit = (id) => {
    history(`/roles/edit/${id}`);
  };

  const tabChange = (tab) => {
    setTab(tab);
  };

  const exportfun = async () => {
    const token = await localStorage.getItem("token");
    const req = await axios({
      method: "get",
      url: `${environment.api}api/export/region`,
      responseType: "blob",
      body: { token: token },
    });
    var blob = new Blob([req.data], {
      type: req.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Roles.xlsx`;
    link.click();
  };

  const isAllow = (key = "") => {
    let permissions = user.role?.permissions?.[0];
    let value = permissions?.[key];
    // if (user?.role?._id === environment.adminRoleId) value = true;
    // return true;
    return value;
  };

  return (
    <>
      <Html
        clear={clear}
        view={view}
        sortClass={sortClass}
        sorting={sorting}
        isAllow={isAllow}
        edit={edit}
        colClick={colClick}
        tabChange={tabChange}
        exportfun={exportfun}
        tab={tab}
        ChangeRole={ChangeRole}
        ChangeStatus={ChangeStatus}
        pageChange={pageChange}
        addCol={addCol}
        deleteItem={deleteItem}
        exportCsv={exportCsv}
        uTableCols={uTableCols}
        removeCol={removeCol}
        filters={filters}
        tableCols={tableCols}
        loaging={loaging}
        data={data}
        total={total}
        statusChange={statusChange}
      />
    </>
  );
};

export default Roles;
