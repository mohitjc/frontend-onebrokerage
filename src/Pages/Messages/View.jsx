import { useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import { useEffect, useState } from "react";
import datepipeModel from "../../models/datepipemodel";
import ApiClient from "../../methods/api/apiClient";
import { useParams } from "react-router-dom";
import shared from "./shared";
import loader from "../../methods/loader";
import { Tooltip } from "antd";

const View = () => {
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

  const list = data?.users?.map((_user) => {
    return _user.experience_level;
  });
  const unique = [...new Set(list)];

  useEffect(() => {
    getDetail();
  }, []);

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
                  <label className="profileheddingcls">Message Title</label>
                  <p className="profiledetailscls">{data?.title || "--"}</p>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Message Type</label>
                  <div className="profiledetailscls">{data?.type || "--"}</div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Users group</label>
                  {unique?.map((itm) => {
                    return <p className="profiledetailscls">{itm || "--"}</p>;
                  })}
                </div>
                <div className="col-span-12 md:col-span-12">
                  <label className="profileheddingcls">Emails</label>
                  <div className="grid grid-cols-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {data?.users?.map((user) => {
                      return (
                        <>
                          <div className="bg-gray-100 rounded-lg p-3">
                            <p className="text-md text-neutral-800 font-semibold">
                              {user.fullName}
                            </p>
                            <p className="text-sm text-neutral-600 font-medium">
                              {user.email}
                            </p>
                          </div>
                        </>
                      );
                    }) || "--"}
                  </div>
                </div>
                {/* <div className="col-span-12 md:col-span-12">
                  <label className="profileheddingcls">Content</label>
                  <div
                    className="profiledetailscls"
                    dangerouslySetInnerHTML={{ __html: data?.body || "--" }}
                  ></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default View;
