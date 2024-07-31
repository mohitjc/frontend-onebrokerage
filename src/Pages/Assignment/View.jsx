import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import { useParams } from "react-router-dom";
import shared from "./shared";
import loader from "../../methods/loader";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import Table from "../../components/Table";

const View = () => {
  const user = useSelector((state) => state.user);
  const [filters, setFilter] = useState({ page: 1, count: 10, search: "" });
  const [total, setTotal] = useState(0);
  const [data, setData] = useState();

  const history = useNavigate();
  const { id } = useParams();

  const getDetail = () => {
    loader(true);
    ApiClient.get(shared.detailApi, { id: id }).then((res) => {
      loader(false);
      if (res.success) {
        setData(res.data);
      }
    });
  };

  useEffect(() => {
    getDetail();
  }, []);

  const statusChange=()=>{

  }

  const getData=()=>{

  }

  const columns = [
    {
      key: "fullName",
      name: "Title",
      render: (row) => {
        return <span className="capitalize">{row?.title}</span>;
      },
    },
    {
      key: "email",
      name: "Due date ",
      render: (row) => {
        return (
          <span className="">{moment(row?.dueDate).format("DD-MM-YYYY")}</span>
        );
      },
    },
    {
      key: "status",
      name: "Status",
      render: (row) => {
        return (
          <> 
<span className="capitalize">{row?.status}</span>
            {/* <SelectDropdown
              id="statusDropdown"
              displayValue="name"
              placeholder="All Status"
              intialValue={row?.status}
              result={(e) => {
                statusChange(e.value,row);
              }}
              options={statusModel.status}
            /> */}
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

              {itm.status=='pending'?<>
                <Tooltip placement="top" title="Accept">
                <a
                    className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#06368814] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                    onClick={(e) => statusChange('accepted',itm)}
                  >
                  <span class="material-symbols-outlined">check</span>
                  </a>
                  </Tooltip>
                  <Tooltip placement="top" title="Reject">
                  <a
                    className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#06368814] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                    onClick={(e) => statusChange('rejected',itm)}
                  >
                  <span class="material-symbols-outlined">close</span>
                  </a>
                  </Tooltip>
              </>:<></>}
            </div>
          </>
        );
      },
    },
  ];

  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    getData({ page: e });
  };


  return (
    <>
      <Layout>
        <div className="wrapper_section">
          <div className="flex items-center mb-8">
            <Tooltip placement="top" title="Back">
              <span
                onClick={() => history(-1)}
                className="!px-4  py-2 cursor-pointer flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3"
              >
                <i className="fa fa-angle-left text-lg"></i>
              </span>
            </Tooltip>
            <div>
              <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                {shared.addTitle} Details
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="  shadow-box overflow-hidden rounded-lg bg-white  gap-4 shrink-0 ">
               
               <div className="grid grid-cols-12 p-4">
               <div className="col-span-6 flex items-center mb-3">
                  <label className="text-[14px] text-[#0000009c] tracking-wider w-[130px]">Title:</label>
                  <p className="text-[14px] text-black font-medium ms-3">
                    {" "}
                    {/* <LiaUserSolid className="text-xl text-[#063688]" /> */}
                    {data && data.title}
                  </p>
                </div>
                  <div className="col-span-6 flex items-center mb-3">
                   <label className="text-[14px] text-[#0000009c] tracking-wider  w-[130px]">Description:</label>
                   <p  dangerouslySetInnerHTML={{__html: data?.description}} className="text-[14px] text-black font-medium ms-3"></p>
                </div>

                  <div className="col-span-6 flex items-center mb-3">
                  <label className="text-[14px] text-[#0000009c] tracking-wider  w-[130px]">Due Date :</label>
                   <p className="text-[14px] text-black font-medium ms-3">
                    {/* <MdOutlinePhone className="text-xl text-[#063688]" />+ */}
                    {moment(data?.dueDate).format("DD-MM-YYYY") || "--"}
                  </p>
                </div>
                <div className="col-span-6 flex items-center mb-3">
                  <label className="text-[14px] text-[#0000009c] tracking-wider  w-[130px]">Status :</label>
                   <p className="text-[14px] text-black font-medium ms-3">
                    {/* <MdOutlinePhone className="text-xl text-[#063688]" />+ */}
                    {data?.status|| "--"}
                  </p>
                </div>
               
               </div>
              </div>
             
            </div>
           
          </div>
          <div>
              <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
               Staff Details
              </h3>
            </div>
            <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="  shadow-box overflow-hidden rounded-lg bg-white  gap-4 shrink-0 ">
               
               <div className="grid grid-cols-12 p-4">
               <div className="col-span-6 flex items-center mb-3">
                  <label className="text-[14px] text-[#0000009c] tracking-wider w-[130px]">Name:</label>
                  <p className="text-[14px] text-black font-medium ms-3"> 
                    {data && data.staff?.fullName || "--"}
                  </p>
                </div>         
                <div className="col-span-6 flex items-center mb-3">
                  <label className="text-[14px] text-[#0000009c] tracking-wider w-[130px]">Email:</label>
                  <p className="text-[14px] text-black font-medium ms-3"> 
                    {data && data.staff?.email ||"--"}
                  </p>
                </div>
                
               
               </div>
              </div>
             
            </div>
           
          </div>

          <h3 className="text-lg lg:text-2xl font-semibold text-[#111827] mt-6">
                Counter Offers
              </h3>

              <Table
              className="mb-3"
              data={data}
              columns={columns}
              page={filters.page}
              count={filters.count}
              filters={filters}
              total={total}
              result={(e) => {
                if (e.event == "page") pageChange(e.value);
                // if (e.event == "sort") {
                //   sorting(e.value);
                //   sortClass(e.value);
                // }
              }}
            />
        </div>
      </Layout>
    </>
  );
};

export default View;
