import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import Table from "../../components/Table";
import datepipeModel from "../../models/datepipemodel";
import { Tooltip } from "antd";
import { FiEdit3, FiPlus } from "react-icons/fi";
import ApiClient from "../../methods/api/apiClient";
import { useNavigate } from "react-router-dom";
import shared from "./shared";
import Swal from "sweetalert2";
import { PiEyeLight } from "react-icons/pi";
import loader from "../../methods/loader";
import { toast } from "react-toastify";
import { LiaEdit, LiaTrashAlt } from "react-icons/lia";
import { Link } from "react-router-dom";
import SelectDropdown from "../../components/common/SelectDropdown";
import statusModel from "../../models/status.model";
const CarrierStaff= () => {
  const [loaging, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const history = useNavigate();
  const [filters, setFilter] = useState({
    page: 1,
    count: 10,
    search: "",
    role: "user",
   
    sorder: "",
    isInvited: false,
    isDeleted: false,
    // request_status: "accepted",
   
  });
  const getData = (p = {}) => {
    setLoader(true);
    let filter = { ...filters, ...p };

    ApiClient.get(shared?.acceptedList, filter).then((res) => {
      if (res.success) {
        setData(res?.data?.data);
        setTotal(res?.data?.total);
      }
      setLoader(false);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data, "datadatavv");
  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    getData({ page: e });
  };
  const count = (e) => {
    setFilter({ ...filters, count: e });
    getData({ ...filters, count: e });
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
  const changestatus = (e) => {
    setFilter({ ...filters, status: e, page: 1 });
    getData({ status: e, page: 1 });
  };
  const deleteItem = (id) => {
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
        ApiClient.delete(shared.deleteApi, { id: id }).then((res) => {
          if (res.success) {
            // ToastsStore.success(res.message)
            toast.success(res?.message);
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
  const statusChange = (itm) => {
    // if (!isAllow(`edit${shared.check}`)) return;
    let status = "active";
    if (itm.status == "active") status = "deactive";
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        status == "active" ? "Activate" : "Deactivate"
      } this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#494f9f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        loader(true);
        ApiClient.put(shared.statusApi, { model:"users" , id: itm.id, status }).then((res) => {
          if (res.success) {
            toast.success(res?.message);
            getData();
          }
          loader(false);
        });
        //   Swal.fire({

        //     // text: `Sucessfully ${status == 'active' ? 'Activate' : 'Deactivate'} this`,
        //     icon: "success"
        //   });
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

  const columns = [
    {
      key: "Name",
      name: "Name",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.fullName}</span>;
      },
    },
    {
      key: "addedBy_name",
      name: "Carrier Name",
      render: (row) => {
        return <span className="capitalize">{row?.addedBy_name}</span>;
      },
    },
    {
      key: "email",
      name: "email",
      render: (row) => {
        return (
          <span className="capitalize">
            {row?.email}
          </span>
        );
      },
    },

    {
      key: "status",
      name: "Status",
      render: (row) => {
        return (
          <>
            <div className="w-32" onClick={() => statusChange(row)}>
              <span
                className={`bg-[#494f9f] cursor-pointer text-sm !px-3 h-[30px] w-[100px] flex items-center justify-center border border-[#EBEBEB] text-[#3C3E49A3] !rounded capitalize 
                            ${
                              row.status == "deactive"
                                ? " bg-gray-200 text-black"
                                : "bg-[#494f9f] text-white"
                            }`}
              >
                {row.status == "deactive" ? "inactive" : "active"}
              </span>
            </div>
          </>
        );
      },
    },
    {
      key: "action",
      name: "Action",
      render: (itm) => {
        return (
          <>
            <div className="flex items-center justify-start gap-1.5">
              {/* {isAllow(`read${shared.check}`) ? ( */}
              <Tooltip placement="top" title="View">
                <a
                  className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#494f9f14] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                  onClick={(e) => view(itm.id)}
                >
                  <PiEyeLight />
                </a>
              </Tooltip>
              {/* ) : (
                  <></>
                )} */}
              {/* {isAllow(`edit${shared.check}`) ? ( */}
              <Tooltip placement="top" title="Edit">
                <a
                  className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#494f9f14] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                  onClick={(e) => edit(itm.id)}
                >
                  <LiaEdit />
                </a>
              </Tooltip>
              {/* ) : (
                  <></>
                )} */}
              {/* {isAllow(`delete${shared.check}`) ? ( */}
              <Tooltip placement="top" title="Delete">
                <span
                  className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#494f9f14] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                  onClick={() => deleteItem(itm.id)}
                >
                  <LiaTrashAlt />
                </span>
              </Tooltip>
              {/* ) : (
                  <></>
                )} */}
            </div>
          </>
        );
      },
    },
  ];

  return (
    <Layout>
      <div>
        <div className="flex justify-between	">
          <h1 className="text-2xl font-semibold text-[#111827] mb-4">
          Carrier's Staff
          </h1>
          {/* <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                        <PiFileCsv className="text-typo text-xl" />  Export CSV
                    </button> */}

         
        </div>
        <div className="flex gap-2 ml-auto justify-end	">
          <SelectDropdown
            id="statusDropdown"
            displayValue="name"
            placeholder="All Status"
            intialValue={filters.status}
            result={(e) => {
              changestatus(e.value);
            }}
            options={statusModel.list}
          />
          {/* <SelectDropdown
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Groups'
                            intialValue={filters.groupId}
                            theme="search"
                            result={e => filter({ groupId: e.value })}
                            options={groups}
                        /> */}
          {filters.status || filters.groupId ? (
            <>
              <button
                className="bg-primary leading-10 h-10 inline-block shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg"
                onClick={() => clear()}
              >
                Reset
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
        {!loaging ? (
          <>
            <Table
              className="mb-3"
              data={data}
              columns={columns}
              page={filters.page}
              count={filters.count}
              total={total}
              result={(e) => {
                if (e.event == "page") pageChange(e.value);
                if (e.event == "sort") sorting(e.value);
                if (e.event == "count") count(e.value);
              }}
            />
          </>
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

export default CarrierStaff;
