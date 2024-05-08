import { useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import { useEffect, useState } from "react";
import datepipeModel from "../../models/datepipemodel";
import ApiClient from "../../methods/api/apiClient";
import { useParams } from "react-router-dom";
import shared from "./shared";
import loader from "../../methods/loader";

const View = () => {
  const [host, setHost] = useState();
  const [data, setData] = useState();
  const history = useNavigate();
  const { slug } = useParams();

  const getDetail = () => {
    loader(true);
    ApiClient.get(shared.detailApi, { slug: slug }).then((res) => {
      loader(false);
      if (res.success) {
        setData(res.data);
        getHostDetail(res.data.slug);
      }
    });
  };

  const getHostDetail = (slug) => {
    ApiClient.get("content/detail", { slug: slug }).then((res) => {
      if (res.success) {
        setHost(res.data);
      }
    });
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <>
      <Layout>
        <div className="text-right">
          <div>
            <span className="cursor-pointer" onClick={() => history(-1)}>
              {" "}
              <i
                className="fa fa-arrow-left mr-4 mb-3 "
                title="Back"
                aria-hidden="true"
              ></i>
            </span>
          </div>
        </div>
        <div className="bg-white shadow-box rounded-lg w-full p-4 mt-6">
          <div className="grid grid-cols-12 gap-4">
            <div className="sideclass col-span-12 md:col-span-12">
              <h3 className="mt-3 mb-6 py-2 bg-gray-300 px-3">
                {shared.addTitle} Details
              </h3>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Title</label>
                  <div className="profiledetailscls">{data?.title || "--"}</div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Status</label>
                  <div className="profiledetailscls capitalize">
                    {data?.status || "--"}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Description</label>
                  <div className="profiledetailscls capitalize">
                    {data?.description || "--"}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Keywords</label>
                  <div className="profiledetailscls ">
                    {data?.keywords.join(",") || "--"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default View;
