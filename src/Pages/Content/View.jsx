import { useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import { useParams } from "react-router-dom";
import shared from "./shared";
import loader from "../../methods/loader";
import { Tooltip } from "antd";

const View = () => {
  const [data, setData] = useState();
  const history = useNavigate();
  const { slug } = useParams();

  const getDetail = () => {
    loader(true);
    ApiClient.get(shared.detailApi, { slug: slug }).then((res) => {
      loader(false);
      if (res.success) {
        setData(res.data);
      }
    });
  };

  console.log("DATA", data);
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <>
      <Layout>
        <div className=" w-full p-4 ">
          <div className="flex items-center mb-8">
            <Tooltip placement="top" title="Back">
              <span
                onClick={() => history(-1)}
                className="!px-4  py-2 cursor-pointer flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3 bg-[#05388fed] text-white"
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
                <div>
                  <h4 className="p-4 bg-[#494f9f1a] font-medium">Content Information</h4>
                </div>
               <div className="grid grid-cols-12 p-4">
               <div className="col-span-6 flex items-center mb-4">
                  <label className="text-[14px] text-[#0000009c] tracking-wider w-[160px]">Title:</label>
                  <p className="text-[14px] text-black font-medium ms-3">
                    {" "}
                    {/* <LiaUserSolid className="text-xl text-[#494f9f]" /> */}
                    {data?.title || "--"}
                  </p>
                </div>
                  <div className="col-span-6 flex items-center mb-4">
                   <label className="text-[14px] text-[#0000009c] tracking-wider  w-[160px]">Meta Title:</label>
                   <p className="text-[14px] text-black font-medium ms-3">
                    {/* <MdOutlineEmail className="text-xl text-[#494f9f]" /> */}
                    {data?.meta_title || "--"}
                  </p>
                </div>

                
                
                <div className="col-span-6 flex items-center mb-4">
                  <label className="text-[14px] text-[#0000009c] tracking-wider  w-[160px]">Meta Description:</label>
                   <p className="text-[14px] text-black font-medium ms-3"  dangerouslySetInnerHTML={{
                      __html: data?.meta_description || "--",
                    }}>
                    {/* <GrUserSettings className="text-xl text-[#494f9f]" /> */}
                  </p>
                 
                </div>
                <div className="col-span-6 flex items-center mb-4">
                  <label className="text-[14px] text-[#0000009c] tracking-wider  w-[160px]">Keywords:</label>
                   <p className="text-[14px] text-black font-medium ms-3"  >
                       {data?.meta_keyword|| "--"}
                    {/* <GrUserSettings className="text-xl text-[#494f9f]" /> */}
                  </p>
                
                </div>
                <div className="col-span-6 flex items-center mb-4">
                  <label className="text-[14px] text-[#0000009c] tracking-wider  w-[160px]">Description:</label>
                   <p className="text-[14px] text-black font-medium ms-3"  dangerouslySetInnerHTML={{
                      __html: data?.description || "--",
                    }}>
                    {/* <MdOutlinePhone className="text-xl text-[#494f9f]" />+ */}
                
                  </p>
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
