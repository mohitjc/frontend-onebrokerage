import { useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import { useEffect, useState } from "react";
import datepipeModel from "../../models/datepipemodel";
import ApiClient from "../../methods/api/apiClient";
import { useParams } from "react-router-dom";
import shared from "./shared";
import loader from "../../methods/loader";
import { Tooltip } from "antd";
import methodModel from "../../methods/methods";

const View = () => {
  const [host, setHost] = useState();
  const [data, setData] = useState();
  const history = useNavigate();
  const { id } = useParams();

  const getDetail = () => {
    loader(true);
    ApiClient.get(shared.detailApi, { id: id }).then((res) => {
      loader(false);
      if (res.success) {
        setData(res.data);
        getHostDetail(res.data.addedBy);
      }
    });
  };

  const getHostDetail = (id) => {
    ApiClient.get("blog/detail", { id: id }).then((res) => {
      if (res.success) {
        setHost(res.data);
      }
    });
  };

  useEffect(() => {
    getDetail();
  }, []);

  console.log("data", data);

  return (
    <>
      <Layout>
        <div className="bg-white shadow-box rounded-lg w-full p-4 mt-6">
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

          <div className="grid grid-cols-12 gap-4">
            <div className="sideclass col-span-12 md:col-span-12">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Title</label>
                  <div className="profiledetailscls">{data?.title || "--"}</div>
                </div>
                {/* <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Category</label>
                  <div className="profiledetailscls capitalize">
                    {data?.category.name || "--"}
                  </div>
                </div>  */}

                <div className="col-span-12 md:col-span-12">
                  <label className="profileheddingcls">Description</label>
                  <div
                    className="profiledetailscls capitalize"
                    dangerouslySetInnerHTML={{
                      __html: data?.description || "--",
                    }}
                  ></div>
                </div>
                {data?.image ? (
                  <>
                    <div className="col-span-full">
                      <label className="profileheddingcls">Images</label>
                      <div className="flex gap-2 flex-wrap items-center">
                        <img src={methodModel.noImg(data?.image)} width="140" />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default View;
