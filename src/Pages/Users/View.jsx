import { useNavigate } from "react-router-dom";
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

  const getQuestionsList = () => {
    ApiClient.get(`onboarding-questions/list`, { id: user._id }).then((res) => {
      if (res.success) {
        setQuestions(res.data);
      }
    });
  };
  const sortedQuestions = questions?.sort((a, b) => a.order - b.order);

  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    if (data) getQuestionsList();
  }, [data]);

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
                  <label className="profileheddingcls">Name</label>
                  <div className="profiledetailscls">
                    {data?.fullName || "--"}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Mobile No</label>
                  <div className="profiledetailscls">
                    +{data?.mobileNo || "--"}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="profileheddingcls">Email</label>
                  <div className="profiledetailscls">{data?.email || "--"}</div>
                </div>
              </div>

              <div className="mt-5">
                <label className="profileheddingcls">
                  Onboarding Answers :-
                </label>
                {sortedQuestions?.map((item, index) => {
                  let key = questionsKeys[item.title];
                  let answer = data[key];
                  if (data[key] == true || data[key] == false) {
                    answer = data[key] == true ? "Yes" : "No";
                  }
                  if (Array.isArray(answer)) {
                    answer = answer.join(", ");
                  }
                  return (
                    <div
                      key={index}
                      className={`${
                        index > 0
                          ? "mt-3  last:border-0 border-b border-gray-200 pb-4"
                          : "mt-0 last:border-0 border-b border-gray-200 pb-4"
                      }`}
                    >
                      <div className="text-xl mb-3 font-bold mb-2 ">
                        {item.title}
                      </div>
                      <div className="flex items-start font-semibold gap-2 mb-2 ">
                        <span className="h-8 w-8 justify-center flex items-center bg-gray-200 shrink-0">
                          Q
                        </span>{" "}
                        {item.question}
                      </div>
                      <div className="flex items-start font-regular gap-2">
                        <span className="h-8 w-8 justify-center text-white flex items-center bg-[#EB6A59] shrink-0">
                          A
                        </span>
                        <span> {answer}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default View;
