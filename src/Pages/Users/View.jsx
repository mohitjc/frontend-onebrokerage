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
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
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
                      <MdOutlinePhone className="text-xl text-[#EB6A59]" />
                      +{data?.mobileNo || "--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
      

        <div className="col-span-12 md:col-span-8 lg:col-span-9    ">
          
          <div className="p-6 shadow-box overflow-hidden rounded-lg bg-white ">
          <div className="mt-5">
                <label className="text-2xl font-semibold mb-8 inline-flex">
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
                        <span className="h-6 w-6 justify-center flex items-center bg-gray-200 shrink-0">
                          Q
                        </span>{" "}
                        {item.question}
                      </div>
                      <div className="flex items-start font-regular gap-2">
                        <span className="h-6 w-6 justify-center text-white flex items-center bg-[#EB6A59] shrink-0">
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
      </div>


        
      </Layout>
    </>
  );
};

export default View;
