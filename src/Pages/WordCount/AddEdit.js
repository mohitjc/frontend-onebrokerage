import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import { Tooltip } from "antd";
import FormControl from "../../components/common/FormControl";
import shared from "./shared";

const AddEdit = () => {
  const { id } = useParams();

  const [images, setImages] = useState({ image: "" });
  const [form, setform] = useState({ 
    word_count_price: "",
    word_count: "",
  });
  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const formValidation = [ 
    // { key: "title", required: true, message: "Title is required", },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid) return;
    let method = "put";
    let value = {
      ...form, 
    };


    loader(true);
    ApiClient.allApi('word-count/update', value, method).then((res) => {
      if (res.success) {
        // ToastsStore.success(res.message)
        history(`/${shared.url}`);
      }
      loader(false);
    });
  };



  useEffect(() => {
    loader(true);
      ApiClient.get("word-count/detail").then((res) => {
        if (res.success) {
          let value = res;
          setform({
            word_count_price:value.estimatedPrice,
            word_count: value.wordCount,
          });
      
        }
        loader(false);
      });
  }, []);


  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-8">
              {/* <Tooltip placement="top" title="Back">
                <Link
                  to={`/${shared.url}`}
                  className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3"
                >
                  <i className="fa fa-angle-left text-lg"></i>
                </Link>
              </Tooltip> */}
              <div>
                <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                  {/* {form && form.id ? "Edit" : "Add"} */}
                   {shared.addTitle}
                </h3> 
              </div>
            </div>

          <div className="pprofile1">
          
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className=" mb-3">
                <FormControl
                  type="number"
                  label="Word Count"
                  value={form.word_count}
                  onChange={(e) => setform({ ...form, word_count: e })}
                  maxlength="10"
                  required
                />
              </div> 
              <div className="mb-3">
                <FormControl
                  type="number"
                  label="Price"
                  value={form.word_count_price}
                  maxlength="10"
                  onChange={(e) => setform({ ...form, word_count_price: e })}
                  required
                />
              </div> 
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="text-white bg-[#494f9f] bg-[#494f9f] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default AddEdit;
