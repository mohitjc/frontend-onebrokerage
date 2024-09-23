import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ApiClient from "../../../methods/api/apiClient";
// import "./style.scss"
import loader from "../../../methods/loader";
import Html from "./html";
import { userType } from "../../../models/type.model";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import environment from "../../../environment";
import { toast } from "react-toastify";
import addressModel from "../../../models/address.model";
import userTableModel from "../../../models/table.model";
import shared from "../shared";

const RejectedCarrier = (p) => {
  const user = useSelector((state) => state.user);
  const [DataLength, setDataLength] = useState(0);
  const [ShowDeleteModal, setShowDeleteModal] = useState("none");
  const [ShowActiveModal, setShowActiveModal] = useState("none");
  const { role } = useParams();

  const searchState = useSelector((state) => state.search);
  const [filters, setFilter] = useState({
    page: 1,
    count: 10,
    search: "",
    role: role || "",
    isDeleted: false,
    isInvited: true,
    request_status:"rejected",
    addedBy: user?.id,
  });

  const [data, setData] = useState([]);
  const [tab, setTab] = useState("list");
  const [total, setTotal] = useState(0);

  const [loaging, setLoader] = useState(true);
  const [tableCols, setTableCols] = useState([]);
  const [form, setform] = useState(userType);
  const [roles, setRoles] = useState([]);

  const history = useNavigate();

  useEffect(() => {
    // getRoles()
  }, []);

  useEffect(() => {
    if (user && user.loggedIn) {
      setFilter({ ...filters, search: searchState.data, role });
      getData({ search: searchState.data, role, page: 1 });
    }
  }, [searchState, role]);

  const uTableCols = () => {
    let exp = [];
    if (tableCols) exp = tableCols;
    let value = [];
    userTableModel.list.map((itm) => {
      if (itm != exp.find((it) => it.key == itm.key)) {
        value.push(itm);
      }
    });
    return value;
  };

  const addCol = (itm) => {
    setTableCols([...tableCols, itm]);
  };

  const addressResult = async (e) => {
    let address = {};
    if (e.place) {
      address = await addressModel.getAddress(e.place);
    }

    setFilter({
      ...filters,
      origin_location_street: e.value,
      origin_location_country: address.country || "",
      origin_location_city: address.city || "",
      origin_location_state: address.state || "",
      origin_location_postal_code: address.zipcode || "",
      // lat: `${address.lat}` || '',
      // lng: `${address.lng}` || ''
    });
    getData({ origin_location_city: address.city });

  };
  const removeCol = (index) => {
    let exp = tableCols;
    exp.splice(index, 1);
    setTableCols([...exp]);
  };

  const getData = (p = {}) => {
    setLoader(true);
    let filter = { ...filters, ...p, addedBy: user?.id };
    let url = shared?.listApi;

    ApiClient.get(url, filter).then((res) => {
      if (res.success) {
        const data = res?.data?.data;
        setData(data);
        setDataLength(data.length);
        setTotal(res?.data?.total);
      }
      setLoader(false);
    });
  };

  const ChangeFilter = (e) => {
    setFilter(e);
    getData(e);
  };

  const clear = () => {
    setFilter({ ...filters, search: "" });
    getData({ search: "" });
  };

  const deleteItem = (id) => {
    // if (window.confirm("Do you want to delete this")) {
    loader(true);
    ApiClient.delete(`delete?model=loadmanagement&id=${id}`).then((res) => {
      if (res.success) {
        toast.success(res.message);
        setShowDeleteModal("none");
        if (DataLength == 0) {
          setFilter({ ...filters, search: "", page: 1 });
          getData({ search: "", page: 1 });
        } else {
          clear();
        }
      }
      loader(false);
    });
    // }
  };

  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    getData({ page: e });
  };


  const openModal = (itm) => {
    let extra = new Date().getTime();
    setform({ ...itm, extra, role });
    document.getElementById("openuserModal").click();
  };

  const ChangeRole = (e) => {
    setFilter({ ...filters, role: e, page: 1 });
    getData({ role: e, page: 1 });
  };
  const ChangeStatus = (e) => {
    setFilter({ ...filters, status: e, page: 1 });
    getData({ status: e, page: 1 });
  };
  const ChangeDocumentStatus = (e) => {
    setFilter({ ...filters, isVerifiedDocument: e, page: 1 });
    getData({ isVerifiedDocument: e, page: 1 });
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
    let modal = "loadmanagement";
    let status = "active";
    if (itm.status == "active") status = "deactive";

    loader(true);
    ApiClient.put(
      `change/status?model=users&id=${itm?.id}&status=${status}`
    ).then((res) => {
      if (res.success) {
        getData();
        toast.success(
          ` Load ${status == "active" ? "Enabled" : "Disabled"} Successfully`
        );
        setShowActiveModal("none");
      }
      loader(false);
    });
  };

  const blockunblock = (itm) => {
    if (
      window.confirm(
        `Do you want to ${!itm.isBlock ? "Block" : "Un-block"} this user`
      )
    ) {
      loader(true);
      ApiClient.put(`edit-profile`, {
        id: itm.id,
        isBlock: itm.isBlock ? false : true,
      }).then((res) => {
        if (res.success) {
          getData();
        }
        loader(false);
      });
    }
  };
  const deleteLoad = (id) => {
    if (window.confirm("Do you want to delete this ?")) {
      loader(true);
      ApiClient.delete(`delete?model=loadmanagement&id=${id}`).then((res) => {
        if (res.success) {
          toast.success(res?.message);
          getData();
        }
        loader(false);
      });
    }
  };
  const view = (id) => {
    history("/carriers/detail/" + id);
  };

  const edit = (id) => {
    let url = `/use1r/edit/${id}`;
    if (role) url = `/users1/${role}/edit/${id}`;
    history(url);
  };

  const add = () => {
    let url = `/user1/add`;
    if (role) url = `/users1/${role}/add`;
    history(url);
  };

  const tabChange = (tab) => {
    setTab(tab);
  };

  const exportfun = async () => {
    const token = await localStorage.getItem("token");
    const req = await axios({
      method: "get",
      url: `${environment.api}api/export/user`,
      responseType: "blob",
      body: { token: token },
    });
    var blob = new Blob([req.data], {
      type: req.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Users.xlsx`;
    link.click();
  };

  const reset = () => {
    let filter = {
      status: "",
      role: "",
      page: 1,
    };
    setFilter({ ...filters, ...filter });
    getData({ ...filter });
    // dispatch(search_success(''))
  };

  const isAllow = (key = "") => {
    return true;
    let permissions = user.role?.permissions;
    let value = permissions?.[key];
    if (user?.role?.id == environment.adminRoleId) value = true;

    return value;
  };
  const filter = (p = {}) => {
    setFilter({ ...filters, ...p });
    getData({ ...p, page: filters?.page });
  };
  const sorting = (key, i) => {
    // getData({sortBy})
    filter({ sortBy: key, sorder: i });
  };
  return (
    <>
      <Html
        user={user}
        colClick={colClick}
        exportfun={exportfun}
        isAllow={isAllow}
        tabChange={tabChange}
        tab={tab}
        reset={reset}
        add={add}
        roles={roles}
        view={view}
        edit={edit}
        role={role}
        ChangeRole={ChangeRole}
        ChangeStatus={ChangeStatus}
        openModal={openModal}
        pageChange={pageChange}
        addCol={addCol}
        deleteItem={deleteItem}
        exportCsv={exportCsv}
        uTableCols={uTableCols}
        removeCol={removeCol}
        filters={filters}
        ChangeDocumentStatus={ChangeDocumentStatus}
        setShowActiveModal={setShowActiveModal}
        ShowActiveModal={ShowActiveModal}
        tableCols={tableCols}
        loaging={loaging}
        data={data}
        ShowDeleteModal={ShowDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        total={total}
        statusChange={statusChange}
        blockunblock={blockunblock}
        setFilter={setFilter}
        sorting={sorting}
        addressResult={addressResult}
        getData={getData}
        ChangeFilter={ChangeFilter}
        deleteLoad={deleteLoad}
      />
    </>
  );
};

export default RejectedCarrier;
