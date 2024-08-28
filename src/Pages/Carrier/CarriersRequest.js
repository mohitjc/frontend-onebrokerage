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
const CarriersRequest = () => {
  const [loaging, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const history = useNavigate();
  const [filters, setFilter] = useState({
    page: 1,
    count: 10,
    search: "",
    role: "carrier",
    isDeleted: "",
    sorder: "",
    request_status: "pending",
    board_id: "",
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
        ApiClient.put(shared.statusApi, { model:"users", id: itm.id, status }).then((res) => {
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
      key: "company_name",
      name: "Company Name",
      render: (row) => {
        return <span className="capitalize">{row?.company_name}</span>;
      },
    },
    {
      key: "dot",
      name: "DOT#",
      render: (row) => {
        return (
          <span className="capitalize">
            {row?.dot_number}
          </span>
        );
      },
    },
    {
        key: "position",
        name: "Position",
        render: (row) => {
          return (
            <span className="capitalize">
              {row?.position}
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
           
          </>
        );
      },
    },
  ];

  return (
    <Layout>
      <div>
        <div className="flex justify-between	items-center">
        
          <div>
        <h3 className="text-2xl font-semibold text-[#111827]">
            {" "}
           Carriers Request
          </h3>
          <p class="text-sm font-normal text-[#75757A]">
            Here you can see all about your Carriers Request
          </p>
        </div>
          {/* <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                        <PiFileCsv className="text-typo text-xl" />  Export CSV
                    </button> */}

          {/* {isAllow(`add${shared.check}`) ? ( */}
         
          {/* ) : (
            <></>
          )} */}
        </div>
        <div className=" w-full bg-white rounded-lg mt-6 border">
        <div className="flex p-4 items-center flex-wrap	">
          <div className="flex gap-2 ml-auto">
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
        </div>
        {!loaging ? (
          <>
            <Table
              className=""
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
</div>
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

export default CarriersRequest;

