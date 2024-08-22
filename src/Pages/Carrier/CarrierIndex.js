import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
// import { ToastsStore } from "react-toasts";
import loader from "../../methods/loader";
import userTableModel from "../../models/table.model";
import Html2 from "./Carrier";
import { userType } from "../../models/type.model";
import { useHistory, useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
import environment from "../../environment";
import { toast } from "react-toastify";

const Carrier2 = (p) => {
  const user = useSelector((state) => state.user);
  const [DataLength, setDataLength] = useState(0);
  const [ShowDeleteModal, setShowDeleteModal] = useState("none");
  const [ShowActiveModal, setShowActiveModal] = useState("none");
  const [loaderr ,setLoaderr] = useState(false)
  const { role } = useParams();
  const searchState = useSelector((state) => state.search);
  const [filters, setFilter] = useState({
    page: 1,
    count: 10,
    search: "",
    role: "carrier",
    isDeleted: false,
    sorder: "",
  });
  const [data, setData] = useState([]);
  const [tab, setTab] = useState("list");
  const [Boards, setBoards] = useState([]);

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

  const removeCol = (index) => {
    let exp = tableCols;
    exp.splice(index, 1);
    setTableCols([...exp]);
  };

  const getData = (p = {}) => {
    setLoader(true);
    setLoaderr(true);
    let filter = { ...filters, ...p, role: "carrier" };
    let url = "users/list";
    if (filter.role) url = "users/list";
    ApiClient.get(url, filter).then((res) => {
      if (res.success) {
        const data = res?.data?.data;
        const newarray = [];
        if (user.role && user.role.id == "64e5d268c27faa1d3ef35503") {
          data.filter((item) => {
            if (item.role && item.role._id != "64e5d268c27faa1d3ef35503") {
              newarray.push(item);
            }
          });
          setData(newarray);
          setDataLength(newarray.length);
   
          if (newarray.length == 0) {
            // setFilter({...filters,page:1})
            // getData({page:1})
          }
        } else {
          setData(data);
        
          setDataLength(data.length);
          if (data.length == 0) {
            // setFilter({...filters,page:1})
            // getData({page:1})
          }
        }
        setTotal(res?.data?.total);
        setLoaderr(false)
      }
      setLoader(false);
    
    });
  };
  const ChangeFilter = (e) => {
    setFilter(e);
    getData(e);
  };

  const clear = () => {
    setFilter({ ...filters, search: "", role: "carrier" });
    getData({ search: "", role: "carrier" });
  };

  const getRoles = () => {
    ApiClient.get("roles/listing", { status: "active" }).then((res) => {
      if (res.success) {
        if (user.role && user.role.id == "64e5d268c27faa1d3ef35503") {
          const data = res.data;
          const newarray = [];
          data.map((item, index) => {
            if (item.id != "64e5d268c27faa1d3ef35503") {
              newarray.push(item);
            }
          });
          setRoles(newarray);
        } else {
          setRoles(res.data);
        }
      }
    });
  };

  const deleteItem = (id) => {
    // if (window.confirm("Do you want to delete this")) {
    loader(true);
    setLoaderr(true)
    ApiClient.delete(`admin/delete-user?id=${id}`).then((res) => {
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
      setLoaderr(false)
    });
    // }
  };

  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    getData({ page: e });
  };

  const modalClosed = () => {
    setFilter({ ...filters, page: 1 });
    getData({ page: 1 });
  };

  const modalResult = (e) => {
  
    modalClosed();
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
    setLoaderr(true)
    ApiClient.get("user/csv").then((res) => {
      if (res.success) {
        let url = res.path;
        let downloadAnchor = document.getElementById("downloadJS");
        downloadAnchor.href = url;
        downloadAnchor.click();
      }
      loader(false);
      setLoaderr(false)
    });
  };

  const colClick = (col, itm) => {
    if (col.key == "healthClinicId") {
    }
  };

  const GetBoards = () => {
    ApiClient.get("boards", { status: "active" }).then((res) => {
      if (res.success) {
        setBoards(res?.data?.data);
      }
    });
  };

  const statusChange = (itm) => {
    let modal = "commonsubcategories";
    let status = "active";
    if (itm.status == "active") status = "deactive";

    // if(window.confirm(`Do you want to ${status=='active'?'Activate':'Deactivate'} this user`)){
    loader(true);
    setLoaderr(true)
    ApiClient.put(`carrier/change-status?id=${itm?.id}&status=${status}`).then(
      (res) => {
        if (res.success) {
          getData();
          toast.success(
            ` Carrier ${
              status == "active" ? "Enabled" : "Disabled"
            } Successfully`
          );
          setShowActiveModal("none");
        }
        loader(false);
        setLoaderr(false)
      }
    );
    // }
  };

  const blockunblock = (itm) => {
    if (
      window.confirm(
        `Do you want to ${!itm.isBlock ? "Block" : "Un-block"} this user`
      )
    ) {
      loader(true);
      setLoaderr(true)
      ApiClient.put(`edit-profile`, {
        id: itm.id,
        isBlock: itm.isBlock ? false : true,
      }).then((res) => {
        if (res.success) {
          getData();
        }
        loader(false);
        setLoaderr(false)
      });
    }
  };

  const view = (id) => {
    history.push("/userDetail/Carriers/" + id);
  };

  const edit = (id) => {
    let url = `/carriers/edit/${id}/${"Carriers"}?role=carrier`;
    if (role) url = `/users/${role}/edit/${id}`;
    history.push(url);
  };

  const add = () => {
    let url = `/carriers/add/${"Carriers"}?role=carrier`;
    if (role) url = `/users/${role}/add`;
    history.push(url);
  };

  const tabChange = (tab) => {
    setTab(tab);
  };

  const ChangeRequestStatus = (e) => {
    setFilter({
      ...filters,
      request_status: e,
      page: 1,
      isDeleted: filters?.isDeleted,
    });
    getData({ request_status: e, page: 1, role: "carrier" });
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
      search: "",
      request_status: "",
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
    filter({ sortBy: key, sorder: i });
  };

  const RollBack = (id) => {
    ApiClient.put(`rollback?model=users&id=${id}`).then((res) => {
      if (res.success) {
        toast.success("Successfully removed from the archive.");
        getData({ isDeleted: true });
      }
    });
  };

  useEffect(() => {
    GetBoards();
  }, []);
  return (
    <>
      <Html2
        user={user}
        loaderr = {loaderr}
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
        getData={getData}
        ChangeFilter={ChangeFilter}
        RollBack={RollBack}
        ChangeRequestStatus={ChangeRequestStatus}
        Boards={Boards}
      />
    </>
  );
};

export default Carrier2;
