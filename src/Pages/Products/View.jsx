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
import environment from "../../environment";

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
    ApiClient.get("product/detail", { id: id }).then((res) => {
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
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Name</label>
                  <div className="profiledetailscls">{data?.name || "--"}</div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Category</label>
                  <div className="profiledetailscls capitalize">
                    {data?.category?.name || "--"}
                  </div>
                </div>
                {data?.sub_category && (
                  <div className="col-span-12 md:col-span-6">
                    <label className="profileheddingcls">Sub-category</label>
                    <div className="profiledetailscls capitalize">
                      {data?.sub_category?.name || "--"}
                    </div>
                  </div>
                )}
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Product Type</label>
                  <div className="profiledetailscls capitalize">
                    {data?.product_type || "--"}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Description</label>
                  <div
                    className="profiledetailscls capitalize"
                    dangerouslySetInnerHTML={{
                      __html: data?.description || "--",
                    }}
                  ></div>
                </div>
                {data?.images?.length ? (
                  <>
                    <div className="col-span-6">
                      <label className="profileheddingcls">Images</label>
                      <div className="flex gap-2 flex-wrap items-center">
                        {data.images.map((itm) => {
                          return (
                            <>
                              <img src={methodModel.noImg(itm)} width="140" />
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {data?.qr_pdf ? (
                  <>
                    <div className="col-span-6">
                      <label className="profileheddingcls">Download PDF</label>
                      <div className="flex gap-2 flex-wrap items-center">
                        <a
                          href={`${environment.apiUrl}/document/${data?.qr_pdf}`}
                          download={data?.qr_pdf}
                          target="blank"
                        >
                          <img
                            src="/assets/img/PDF_file.png"
                            className="h-20"
                          />
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="col-span-12 md:col-span-4">
              <div className="">
                {data?.qr_image ? (
                  <>
                    <div className="">
                      <div className="flex gap-2 flex-wrap items-center">
                        <img
                          src={methodModel.noImg(data?.qr_image)}
                          width="300"
                        />
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
