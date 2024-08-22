import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import Pagination from "react-pagination-js";
import "./style.scss";
import rolesModel from "../../models/roles.model";
import methodModel from "../../methods/methods";
import datepipeModel from "../../models/datepipemodel";
import environment from "../../environment";
import { useHistory, useNavigate } from "react-router-dom";
import Switch from "react-switch";
import CommonDeleteModal from "../CommonDelete&ActiveModal/CommonDeleteModal";
import CommonActiveModal from "../CommonDelete&ActiveModal/CommonActiveModal";
import { toast } from "react-toastify";
import MultiSelectDropdown from "../../components/common/MultiSelectDropdown";
import ApiClient from "../../methods/api/apiClient";
import { Tooltip } from "antd";
import moment from "moment";
const Html2 = ({
  view,
  edit,
  RollBack,
  user,
  ChangeFilter,
  ChangeRequestStatus,
  reset,
  sorting,
  add,
  tab,
  ChangeStatus,
  statusChange,
  pageChange,
  deleteItem,
  filters,
  setFilter,
  loaging,
  getData,
  data,
  role,
  ShowActiveModal,
  setShowActiveModal,
  ShowDeleteModal,
  setShowDeleteModal,
  Boards,
  loaderr,
  total = { total },
}) => {
  const Navigate = useNavigate();
  const Columns = JSON.parse(localStorage.getItem("CarrierColumn")) || [];
  const [DeleteId, setDeleteId] = useState("");
  const Delete = () => {
    deleteItem(DeleteId);
  };
  const [TAB, SETTAB] = useState("list");
  const [StatusData, setStatusData] = useState({});
  const columns = ["email", "createdAt", "updatedAt", 'position'];
  const [BoardFilter, setBoardFilter] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(Columns);
  useEffect(() => {
    localStorage.setItem("CarrierColumn", JSON.stringify(visibleColumns));
  }, [visibleColumns]);
  const [boards, setBoards] = useState([]);

  const handleColumnToggle = (columnName) => {
    // Check if the column is currently visible
    const isColumnVisible = visibleColumns.includes(columnName);

    // Toggle the column visibility
    const updatedColumns = isColumnVisible
      ? visibleColumns.filter((col) => col !== columnName)
      : [...visibleColumns, columnName];

    setVisibleColumns(updatedColumns);
  };

  function replaceUnderscoresWithSpace(inputString) {
    // Use the replace method with a regular expression to replace underscores with spaces
    const resultString = inputString.replace(/_/g, " ");

    return resultString;
  }

  const ColumnReturner = (data, value, itm) => {
    switch (data) {
      case "name":
        return value;
        break;
      case "email":
        return value;
        break;
      case "createdAt":
        return datepipeModel.date(value);
        break;
      case "updatedAt":
        return datepipeModel.date(value);
        break;

      case "createdAt":
        return datepipeModel.date(value);
        break;
      case "MC Number":
        return itm?.mc_description;
        break;
      case "DOT Number":
        return itm?.mc_description;
        break;
      // case "MC/DOT":
      //   return itm?.mc_description;
      //   break;

      case "position":
        return itm?.position ? (itm?.position?.charAt(0)?.toUpperCase() + itm?.position?.slice(1)) : ''
        break;
      default:
        return value;
        break;
    }
  };

  function findUniqueElements(arr1, arr2) {
    const uniqueInArr1 = arr1.filter((item) => !arr2.includes(item));
    const uniqueInArr2 = arr2.filter((item) => !arr1.includes(item));

    const uniqueElements = [...uniqueInArr1, ...uniqueInArr2];

    return uniqueElements;
  }
  const StatusCh = () => {
    statusChange(StatusData);
  };
  const Permission = JSON.parse(localStorage.getItem("permission"));

  useEffect(() => {
    ApiClient.get("boards?status=active").then((res) => {
      // setBoards(res?.data?.data);
      let arr = res?.data?.data?.map((itm) => {
        return {
          name: `${methodModel.capitalizeFirstLetter(itm?.name)} | expires  ${itm?.expiration_type == "hours"
            ? moment()
              .endOf("hours")
              .add(itm?.expiration_value, "hours")
              .fromNow()
            : itm?.expiration_type == "minutes"
              ? moment()
                .endOf("minutes")
                .add(itm?.expiration_value, "minutes")
                .fromNow()
              : moment()
                .endOf("days")
                .add(itm?.expiration_value, "days")
                .fromNow()
            }`,
          id: itm?.id,
        };
      });
      setBoards(arr);
    });
  }, []);

  let ListingData = [];
  if (user?.role == "staff") {
    ListingData = data?.filter((itm) => itm?.id != user?.id);
  } else {
    ListingData = data;
  }
  useEffect(() => {
    let JoindID = BoardFilter.join(",");
    getData({ ...filters, board_id: JoindID });
  }, [BoardFilter]);
  return (
    <Layout title="Carriers" Sidetitle="Carrier" searchShow="true">
      <div className="mainareas new-table-set">
        <CommonDeleteModal
          show={ShowDeleteModal}
          setShow={setShowDeleteModal}
          confirm={Delete}
        />
        <CommonActiveModal
          show={ShowActiveModal}
          setShow={setShowActiveModal}
          confirm={StatusCh}
          status={StatusData.status}
        />
        <div className="">
          {/* <h3 className="hedding mb-3">
          {role ? rolesModel.name(role) : "Carriers"}
        </h3> */}

          {/* <div className="d-flex gap-3 ">
          <article className="d-flex filterFlex phView">
            <div className="dropdown addDropdown chnagesg mr-2 d-flex align-items-center ">
              <div
                className="dropdown-menu shadow bg_hover "
                aria-labelledby="dropdownMenuButton"
              >
                <a
                  className={
                    filters.board_id == ""
                      ? "dropdown-item active"
                      : "dropdown-item"
                  }
                  onClick={() => {
                    setFilter({ ...filters, board_id: "" });
                    getData({ ...filters, board_id: "" });
                  }}
                >
                  All Board
                </a>
                {Boards?.map((itm) => {
                  return (
                    <a
                      className={
                        filters.status == ""
                          ? "dropdown-item active"
                          : "dropdown-item"
                      }
                      onClick={() => {
                        setFilter({
                          ...filters,
                          board_id: itm?.id,
                          board_name: itm?.name,
                        });
                        getData({ ...filters, board_id: itm?.id });
                      }}
                    >
                      {methodModel.capitalizeFirstLetter(itm?.name)}
                    </a>
                  );
                })}
              </div>
            </div>
          </article>
        </div> */}
          <div className=" row">
            <div className="col-12">
              <div className="row filterFlex phView mb-2 justify-content-between">
                <div className="col-xl-4 col-lg-3 ">
                  <div class="bids-top ">
                    <h4>
                      Results<span>{total}</span>
                    </h4>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-9">
                  <article className="d-flex gap-2 fiftyflex justify-content-end flex-col-c">
                    <div>

                    </div>
                    <div>
                      <div className="dropdown addDropdown chnagesg d-flex align-items-center equal-width-50 w-100  mt-0">
                        <button
                          className="btn btn blck-border-btn dropdown-toggle   "
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Add Columns
                        </button>
                        <div
                          className="dropdown-menu "
                          aria-labelledby="dropdownMenuButton1"
                        >
                          {findUniqueElements(visibleColumns, columns).map(
                            (itm) => {
                              return (
                                <a
                                  className={"dropdown-item"}
                                  onClick={() => handleColumnToggle(itm)}
                                >
                                  {replaceUnderscoresWithSpace(itm)}
                                </a>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className={` ${filters.status || filters.role ? "" : ""}`}
                    >
                      {Permission?.carrier_add || user?.role == "admin" ? (
                        <>
                          <button
                            className="btn btn-primary btn-height"
                            onClick={(e) => add()}
                          >
                            <i className="fas fa-plus-circle me-2"></i>
                            Add {role ? rolesModel.name(role) : "Carrier"}
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="me-2"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                      </svg>
                      Filter
                    </button>

                    <div
                      class="modal fade jobs-modal right "
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Filters
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div className="row">
                              <div className="col-12">
                                <label>Select Status</label>
                                <div className="d-flex align-items-center">

                                  <div className="dropdown addDropdown chnagesg d-flex align-items-center equal-width-50 w-100  mt-0">
                                    <button
                                      className="btn blck-border-btn dropdown-toggle removeBg mb-0"
                                      type="button"
                                      id="dropdownMenuButton"
                                      data-bs-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    >
                                      {filters.status
                                        ? filters.status == "deactive"
                                          ? "Inactive"
                                          : "Active"
                                        : "All Status"}
                                    </button>
                                    <div
                                      className="dropdown-menu shadow bg_hover"
                                      aria-labelledby="dropdownMenuButton"
                                    >
                                      <a
                                        className={
                                          filters.status == ""
                                            ? "dropdown-item active"
                                            : "dropdown-item"
                                        }
                                        onClick={() => ChangeStatus("")}
                                      >
                                        All Status
                                      </a>
                                      <a
                                        className={
                                          filters.status == "active"
                                            ? "dropdown-item active"
                                            : "dropdown-item"
                                        }
                                        onClick={() => ChangeStatus("active")}
                                      >
                                        Active
                                      </a>
                                      <a
                                        className={
                                          filters.status == "Inactive"
                                            ? "dropdown-item active"
                                            : "dropdown-item"
                                        }
                                        onClick={() => ChangeStatus("deactive")}
                                      >
                                        Inactive
                                      </a>
                                    </div>
                                  </div>
                                  {filters.status || filters.role ? (
                                    <>
                                      <button
                                        className="btn btn-primary btn-height ms-2"
                                        onClick={(e) => reset()}
                                      >
                                        <i className="fas fa-redo-alt me-2"></i>
                                        Reset
                                      </button>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 mt-3">
                                <div className="w-100 wraperpadding">
                                  <label>Select Board</label>
                                  <div className="multiselect-custom">
                                    <MultiSelectDropdown
                                      id="statusDropdown"
                                      className="role-color"
                                      displayValue="name"
                                      placeholder="Select Load Type"
                                      intialValue={BoardFilter}
                                      result={(e) => {
                                        setBoardFilter(e.value);
                                      }}
                                      options={boards}
                                      required={true}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 mt-3">
                              <label>Select Request Status</label>
                              <div className="dropdown addDropdown chnagesg mr-2 d-flex align-items-center equal-width-50 w-100 ">
                              
                                <button
                                  className="btn blck-border-btn dropdown-toggle removeBg"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  {filters?.request_status
                                    ? filters?.request_status=="accepted"?"Accepted":filters?.request_status=="rejected"?"Rejected":"Pending"
                                    : "All Request Status"}
                                </button>
                                <div
                                  className="dropdown-menu shadow bg_hover"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a
                                    className={
                                      filters.request_status == ""
                                        ? "dropdown-item active"
                                        : "dropdown-item"
                                    }
                                    onClick={() => ChangeRequestStatus("")}
                                  >
                                    All
                                  </a>
                                  <a
                                    className={
                                      filters.request_status == "accepted"
                                        ? "dropdown-item active"
                                        : "dropdown-item"
                                    }
                                    onClick={() => ChangeRequestStatus("accepted")}
                                  >
                                    Accepted
                                  </a>
                                  <a
                                    className={
                                      filters.request_status == "pending"
                                        ? "dropdown-item active"
                                        : "dropdown-item"
                                    }
                                    onClick={() => ChangeRequestStatus("pending")}
                                  >
                                    Pending
                                  </a>
                                  <a
                                    className={
                                      filters.request_status == "rejected"
                                        ? "dropdown-item active"
                                        : "dropdown-item"
                                    }
                                    onClick={() => ChangeRequestStatus("rejected")}
                                  >
                                    Rejected
                                  </a>
                                </div>
                              </div>
                              </div>
                              
                              <div className="col-12  pt-4">
                                <label>Select Loads</label>
                                <div className="custom-dropdown loads-dropdown">
                                  <ul class="nav nav-tabs portal-tabs  ">
                                    <li class="nav-item">
                                      <a
                                        class={`nav-link ${TAB == "list" ? "active" : ""
                                          }`}
                                        aria-current="page"
                                        onClick={() => {
                                          SETTAB("list");
                                          setFilter({
                                            ...filters,
                                            isDeleted: false,
                                          });

                                          getData({ isDeleted: false });
                                        }}
                                      >
                                        <i className="fa fa-list me-2"></i>
                                        List
                                      </a>
                                    </li>
                                    <li class="nav-item">
                                      <a
                                        class={`nav-link ${TAB == "archive" ? "active" : ""
                                          }`}
                                        onClick={() => {
                                          SETTAB("archive");
                                          setFilter({
                                            ...filters,
                                            isDeleted: true,
                                          });
                                          getData({ isDeleted: true });
                                        }}
                                      >
                                        <i
                                          class="fa fa-archive me-2"
                                          aria-hidden="true"
                                        ></i>
                                        Archive
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>

        {tab == "grid" ? (
          <>
            <div className="cardList">
              <div className="row">
                {!loaging &&
                  data &&
                  data.map((itm, i) => {
                    return (
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-4">
                        <div className="new_cards">
                          <div className="user_card">
                            <div
                              className="user_detail"
                              onClick={(e) => view(itm.id)}
                            >
                              <img
                                src={methodModel.userImg(itm.image)}
                                className="user_imgs"
                              />

                              <div className="user_name">
                                <h4 className="user">
                                  {methodModel.capitalizeFirstLetter(
                                    itm.fullName
                                  )}
                                </h4>
                                <p className="user_info">{itm.email}</p>
                              </div>
                            </div>

                            <div
                              className={`user_hours ${itm.status}`}
                              onClick={() => statusChange(itm)}
                            >
                              <span
                                className={`${itm?.status == "accepted"
                                  ? "badge spaceBadge badge-primary"
                                  : itm?.status == "rejected"
                                    ? "badge spaceBadge badge-danger"
                                    : "badge"
                                  }`}
                              >
                                {itm.status}
                              </span>
                            </div>
                          </div>

                          <div className="user_proff user_proff1">
                            <div className="id_name">
                              <ul className="user_list">
                                <li className="list_name">
                                  <a className="id">Role</a>
                                </li>
                                <li className="list_name">
                                  <a className="id">Phone number</a>
                                </li>
                              </ul>
                            </div>
                            <div className="detail_list">
                              <ul className="user_list">
                                <li className="list_names">
                                  <a
                                    className="id_name"
                                    onClick={(e) => edit(itm.id)}
                                  >
                                    {itm.role?.name}
                                  </a>
                                </li>
                                <li className="list_names">
                                  <a
                                    className="id_name"
                                    onClick={(e) => edit(itm.id)}
                                  >
                                    <span className="call_icon"></span>
                                    {itm.mobileNo ? (
                                      <>
                                        <i
                                          class="fa fa-phone"
                                          aria-hidden="true"
                                        ></i>
                                        {itm.dialCode} {itm.mobileNo}
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="table-responsive table_section mt-4 new-table">
              <table class="table ">
                <thead className="table_head">
                  <tr className="heading_row">
                    <th
                      scope="col"
                      className="table_data pointer"
                      onClick={(e) =>
                        filters?.sortBy == "fullName asc"
                          ? sorting("fullName desc", "desc")
                          : sorting("fullName asc", "asc")
                      }
                    >
                      {/* Name {filters?.sortBy === "fullName asc" ? "↑ A-Z" : "↓ Z-A"} */}
                      <span className="d-flex align-items-center">
                        {" "}
                        Name{" "}
                        {filters?.sortBy === "fullName asc" ? (
                          <div class="d-flex  zfonts align-items-center">
                            <div className="d-flex flex-column">
                              <span className="zfont">A </span>{" "}
                              <span className="afont">Z</span>
                            </div>{" "}
                            <span>
                              <span class="material-icons arrfont">north</span>
                            </span>
                          </div>
                        ) : (
                          <div class="d-flex zfonts align-items-center">
                            <div className="d-flex flex-column">
                              <span className="zfont">Z </span>{" "}
                              <span className="afont">A</span>
                            </div>
                            <span>
                              <span class="material-icons arrfont">south</span>
                            </span>
                          </div>
                        )}
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="table_data pointer"
                      onClick={(e) =>
                        filters?.sortBy == "company_name asc"
                          ? sorting("company_name desc", "desc")
                          : sorting("company_name asc", "asc")
                      }
                    >
                      {/* Name {filters?.sortBy === "fullName asc" ? "↑ A-Z" : "↓ Z-A"} */}
                      <span className="d-flex align-items-center">
                        {" "}
                        Company Name{" "}
                        {filters?.sortBy === "company_name asc" ? (
                          <div class="d-flex  zfonts align-items-center">
                            <div className="d-flex flex-column">
                              <span className="zfont">A </span>{" "}
                              <span className="afont">Z</span>
                            </div>{" "}
                            <span>
                              <span class="material-icons arrfont">north</span>
                            </span>
                          </div>
                        ) : (
                          <div class="d-flex zfonts align-items-center">
                            <div className="d-flex flex-column">
                              <span className="zfont">Z </span>{" "}
                              <span className="afont">A</span>
                            </div>
                            <span>
                              <span class="material-icons arrfont">south</span>
                            </span>
                          </div>
                        )}
                      </span>
                    </th>
                    {visibleColumns.map((item) => (
                      <th className="text-capitalize table_data">
                        {replaceUnderscoresWithSpace(item)}{" "}
                        <i
                          className="fa fa-times"
                          onClick={(e) => handleColumnToggle(item)}
                        ></i>{" "}
                      </th>
                    ))}

                    <th scope="col" className="table_data pointer">
                      Board
                    </th>
                    <th scope="col" className="table_data pointer">
                      Application Status
                    </th>
                    <th scope="col" className="table_data pointer">
                      Reapply Count
                    </th>
                    <th scope="col" className="table_data ">
                      Status
                    </th>
                    <th scope="col" className="table_data ">
                      Request Status
                    </th>
                    <th scope="col" className="table_data">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!loaging &&
                    ListingData &&
                    ListingData.map((itm, i) => {
                      return (
                        <tr className="data_row">
                          <td
                            className="table_dats"
                            onClick={(e) => {
                              if (
                                Permission?.carrier_get ||
                                user?.role == "admin"
                              ) {
                                view(itm.id);
                              } else {
                                toast.warn("You do not have valid permission");
                              }
                            }}
                          >
                            <div className="user_detail">
                              <img
                                src={methodModel.userImg(itm.image)}
                                className="user_imgs"
                              />
                              <div className="user_name">
                                <h4 className="user">
                                  {methodModel.capitalizeFirstLetter(
                                    itm.fullName
                                  )}
                                </h4>
                              </div>
                            </div>
                          </td>
                          <td
                            onClick={(e) => {
                              if (
                                Permission?.carrier_get ||
                                user?.role == "admin"
                              ) {
                                view(itm.id);
                              } else {
                                toast.warn("You do not have valid permission");
                              }
                            }}
                          >
                            {methodModel.capitalizeFirstLetter(
                              itm?.company_name
                            ) || "--"}
                          </td>
                          {visibleColumns.map((item, index) => (
                            <td className="">
                              {ColumnReturner(item, itm[[item]], itm) || "--"}
                            </td>
                          ))}

                          <td className="table_dats">
                            <div className="d-flex">
                              {itm?.board_data?.length ? itm?.board_data?.slice(0, 5).map((item, i) => {
                                return (
                                  <p className="me-2">
                                    {item?.board_status == "active"
                                      ? methodModel.capitalizeFirstLetter(
                                        item?.board_name
                                      )
                                      : ""}
                                    {i < itm?.board_data?.length - 1 && item?.board_status == "active"
                                      ? " , "
                                      : ""}
                                  </p>
                                );
                              }) : '--'}

                              {/* <p>{itm?.board_data[0]?.board_name}</p>
                           {
                            itm?.board_data?.length>2&&
                             <p>{itm?.board_data[0]?.board_name}</p>
                           }
                           
                            */}
                              {/* {itm?.board_data?.length > 4 && (
                                <a
                                  href=""
                                  onClick={() =>
                                    Navigate.push(
                                      `/userDetail/:${"Approved Sub-Carriers"}${
                                        itm?.id
                                      }`
                                    )
                                  }
                                >
                                  {" "}
                                  ...see more
                                </a>
                              )} */}
                            </div>
                          </td>
                          <td>{itm?.is_reapplied ? "Reapplied" : "--"}</td>
                          <td>{itm?.reapply_count || 0}</td>
                          <td className="table_dats">
                            {" "}
                            <div className={` ${itm.status}`}>
                              <span className="custom-toggle-btn">
                                {itm.status == "deactive" ? (
                                  <Switch
                                    onChange={(e) => {
                                      if (
                                        Permission?.carrier_edit ||
                                        user?.role == "admin"
                                      ) {
                                        setStatusData(itm);
                                        setShowActiveModal("block");
                                      } else {
                                        toast.warn(
                                          "You do not have valid permission"
                                        );
                                      }
                                    }}
                                    checked={false}
                                  />
                                ) : (
                                  <Switch
                                    onChange={(e) => {
                                      if (
                                        Permission?.carrier_edit ||
                                        user?.role == "admin"
                                      ) {
                                        setStatusData(itm);
                                        setShowActiveModal("block");
                                      } else {
                                        toast.warn(
                                          "You do not have valid permission"
                                        );
                                      }
                                    }}
                                    checked={true}
                                  />
                                )}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span
                              className={`${itm?.request_status == "accepted"
                                ? "badge spaceBadge badge-primary"
                                : itm?.request_status == "rejected"
                                  ? "badge spaceBadge badge-danger"
                                  : "badge"
                                }`}
                            >
                              {methodModel.capitalizeFirstLetter(
                                itm?.request_status
                              ) || "--"}
                            </span>
                          </td>

                          {/* dropdown */}
                          {TAB == "list" && (
                            <td className="table_dats">
                              <div className="action_icons">
                                {Permission?.carrier_edit ||
                                  user?.role == "admin" ? (
                                  <>
                                    <Tooltip placement="top" title="Edit">
                                      <a
                                        className="edit_icon"
                                        onClick={
                                          user?.role == "admin" ||
                                            itm?.role == "carrier" ||
                                            Permission?.carrier_edit
                                            ? (e) => {
                                              if (
                                                Permission?.carrier_edit ||
                                                user?.role == "admin"
                                              ) {
                                                edit(itm.id);
                                              } else {
                                                toast.warn(
                                                  "You do not have valid permission"
                                                );
                                              }
                                            }
                                            : (e) =>
                                              toast.warn(
                                                "You do not have valid permission"
                                              )
                                        }
                                      >
                                        <i
                                          class="material-icons edit"

                                        >
                                          edit
                                        </i>
                                      </a>
                                    </Tooltip>
                                  </>
                                ) : (
                                  <></>
                                )}

                                {Permission?.carrier_delete ||
                                  user?.role == "admin" ? (
                                  <>
                                    <Tooltip placement="top" title="Delete">
                                      <span
                                        className="edit_icon"

                                        onClick={() => {
                                          if (
                                            Permission?.carrier_delete ||
                                            user?.role == "admin"
                                          ) {
                                            setDeleteId(itm.id);
                                            setShowDeleteModal("block");
                                          } else {
                                            toast.warn(
                                              "You do not have valid permission"
                                            );
                                          }
                                        }}
                                      >
                                        <i
                                          class="material-icons delete"

                                        >
                                          {" "}
                                          delete
                                        </i>
                                      </span>
                                    </Tooltip>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {user?.role == "admin" ||
                                  Permission?.carrier_get ? (
                                  <Tooltip placement="top" title="View">
                                    <span
                                      className="edit_icon"

                                      onClick={() => {
                                        if (
                                          Permission?.carrier_get ||
                                          user?.role == "admin"
                                        ) {
                                          Navigate.push(
                                            `userdetail/${"Carriers"}/${itm.id
                                            }`
                                          );
                                        } else {
                                          toast.warn(
                                            "You do not have valid permission"
                                          );
                                        }
                                      }}
                                    >
                                      <i className="fa fa-eye"></i>
                                    </span>
                                  </Tooltip>
                                ) : null}
                              </div>
                            </td>
                          )}
                          {TAB == "archive" && (
                            <td className="table_dats">
                              <div className="action_icons">
                                <>
                                  <a
                                    className="edit_icon"
                                    title="back"
                                    onClick={() => {
                                      RollBack(itm?.id);
                                    }}
                                  >
                                    <i
                                      class="fa fa-undo"
                                      title="Roll Back"
                                      aria-hidden="true"
                                    ></i>
                                  </a>
                                </>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* {( !loaderr && total == 0)  ? (
          <div className=" no-data">
            <img src="assets/img/no-data.png" />
            No Data
          </div>
        ) : (
          <></>
        )} */}
        {total == 0 && !loaderr ? (
          <div className=" no-data">
            <img src="assets/img/no-data.png" />
            No Data
          </div>
        ) : (
          <></>
        )}
        {!loaging && total > 0 ? (
          <div className="paginationWrapper">
            <div className="d-flex align-items-center">
              <div className="me-2 user-name-color">Show</div>
              {total > 0 && (
                <div className="dropdown addDropdown chnagesname ">
                  <button
                    className="btn btn-primary dropdown-toggle removeBg"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {filters?.count}
                  </button>
                  <div
                    className="dropdown-menu shadow bg_hover"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      class="dropdown-item"
                      onClick={() => {
                        ChangeFilter({ ...filters, count: 5, role: "carrier" });
                      }}
                    >
                      5
                    </a>
                    <a
                      class="dropdown-item"
                      onClick={() => {
                        ChangeFilter({
                          ...filters,
                          count: 10,
                          role: "carrier",
                        });
                      }}
                    >
                      10
                    </a>
                    <a
                      class="dropdown-item"
                      onClick={() => {
                        ChangeFilter({
                          ...filters,
                          count: 20,
                          role: "carrier",
                        });
                      }}
                    >
                      20
                    </a>
                    <a
                      class="dropdown-item"
                      onClick={() => {
                        ChangeFilter({ ...filters, count: 30 });
                      }}
                    >
                      30
                    </a>
                    <a
                      class="dropdown-item"
                      onClick={() => {
                        ChangeFilter({ ...filters, count: 40 });
                      }}
                    >
                      40
                    </a>
                  </div>
                </div>
              )}{" "}
              <div className="ms-2 user-name-color">from {total} Carriers</div>
            </div>

            <Pagination
              currentPage={filters.page}
              totalSize={total}
              sizePerPage={filters.count}
              changeCurrentPage={pageChange}
            />
          </div>
        ) : (
          <></>
        )}

        {loaging ? (
          <div className="text-center py-4">
            <img src="/assets/img/loader.gif" className="pageLoader" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export default Html2;
