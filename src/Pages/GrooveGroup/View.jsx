import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import { useEffect, useState } from "react";
import datepipeModel from "../../models/datepipemodel";
import ApiClient from "../../methods/api/apiClient";
import { useParams } from "react-router-dom";
import shared from "./shared";
import loader from "../../methods/loader";
import { Tooltip } from "antd";
import questionsKeys from "../Profile/questions";
import { useSelector } from "react-redux";
import { LiaUserSolid } from "react-icons/lia";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import methodModel from "../../methods/methods";
import { GrUserSettings } from "react-icons/gr";

const View = () => {
  const user = useSelector((state) => state.user);

  const [data, setData] = useState();
  const [questions, setQuestions] = useState([]);

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

  const sortedQuestions = questions?.sort((a, b) => a.order - b.order);

  useEffect(() => {
    getDetail();
  }, []);


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
              <div className="flex items-center justify-center py-8 shadow-box overflow-hidden rounded-lg bg-white  gap-4 shrink-0 sticky top-2">
                <div className="flex flex-col items-center gap-4">
                  <div className="text-center">
                    <p className="text-md text-gray-700 flex items-center  flex flex-col font-semibold ">
                      {" "}
                      <LiaUserSolid className="text-xl text-[#EB6A59]" />
                      {data && data.fullName}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-md text-gray-700 flex items-center  flex flex-col font-semibold ">
                      <MdOutlineEmail className="text-xl text-[#EB6A59]" />
                      {data && data.email}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-md text-gray-700 flex items-center  flex flex-col font-semibold ">
                      <MdOutlinePhone className="text-xl text-[#EB6A59]" />+
                      {data?.mobileNo || "--"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-md text-gray-700 flex items-center  flex flex-col font-semibold ">
                      <GrUserSettings className="text-xl text-[#EB6A59]" />
                    </p>
                    {data?.role?.name || "--"}
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
