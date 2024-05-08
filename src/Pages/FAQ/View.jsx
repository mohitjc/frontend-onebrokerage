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
    ApiClient.get("faq/detail", { id: id }).then((res) => {
      if (res.success) {
        setHost(res.data);
      }
    });
  };

  useEffect(() => {
    getDetail();
  }, []);
  console.log("DATA", data);

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
                  <label className="profileheddingcls">Question</label>
                  <div className="profiledetailscls">
                    {data?.question || "--"}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Category</label>
                  <div className="profiledetailscls capitalize">
                    {data?.category.name || "--"}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Answer</label>
                  <div className="profiledetailscls capitalize">
                    {data?.answer || "--"}
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
