import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import statusModel from "../../models/status.model";
import { Tooltip } from "antd";
import FormControl from "../../components/common/FormControl";
import timezoneModel from "../../models/timezone.model";
import shared from "./shared";
import datepipeModel from "../../models/datepipemodel";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import ImageUpload from "../../components/common/ImageUpload";

const AddEdit = () => {
  const { id } = useParams();
  const [images, setImages] = useState({ images: "" });
  const [form, setform] = useState({
    id: "",
    title: "",
    question: "",
    question_type: "",
    options: [],
    order: "",
  });
  const [options, setOptions] = useState([]);
  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const formValidation = [
    { key: "title", required: true, message: "Type is required" },
    {
      key: "question_type",
      required: true,
      message: "Question Type is required",
    },
    { key: "question", required: true, message: "Question is required" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Option" },
    { id: "single", name: "Single Option" },
    { id: "yes_no", name: "Yes/No" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid) return;
    let method = "post";
    let url = shared.addApi;
    let value = {
      ...form,
      options: options,
    };
    if (value.id) {
      method = "put";
      url = shared.editApi;
    } else {
      value.addedBy = user._id;
      value.groupId = user?.groupId?._id;
      delete value.id;
    }

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        // ToastsStore.success(res.message)
        history(`/${shared.url}`);
      }
      loader(false);
    });
  };

  useEffect(() => {
    if (id) {
      loader(true);
      ApiClient.get(shared.detailApi, { id }).then((res) => {
        if (res.success) {
          let value = res.data;
          let payload = form;

          Object.keys(payload).map((itm) => {
            payload[itm] = value[itm];
          });

          if (value.category) {
            payload.category = value.category._id;
          }

          payload.id = id;
          setform({
            ...payload,
          });

          let options = value?.options || [];
          options = options.map((itm) => {
            let item = itm;
            if (!itm?.name) item = { name: itm, image: "" };
            return item;
          });
          setOptions(options);
        }
        loader(false);
      });
    }
  }, [id]);

  const updateOption = (i, v, key = "") => {
    let arr = options || [];
    arr[i][key] = v;
    setOptions([...arr]);
  };

  const deleteOption = (i) => {
    let arr = options || [];
    arr = arr.filter((itm, ind) => ind != i);
    setOptions([...arr]);
  };

  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="pprofile1">
            <div className="flex items-center mb-8">
              <Tooltip placement="top" title="Back">
                <Link
                  to={`/${shared.url}`}
                  className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3"
                >
                  <i className="fa fa-angle-left text-lg"></i>
                </Link>
              </Tooltip>
              <div>
                <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                  {form && form.id ? "Edit" : "Add"} {shared.addTitle}
                </h3>
                <p class="text-xs lg:text-sm font-normal text-[#75757A]">
                  Here you can see all about your {shared.addTitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className=" mb-3">
                <FormControl
                  type="text"
                  name="title"
                  label="Title"
                  value={form.title}
                  onChange={(e) => setform({ ...form, title: e })}
                  disabled
                  required
                />
              </div>

              <div className=" mb-3">
                <FormControl
                  type="select"
                  name="question_type"
                  label="Question Type"
                  value={form.question_type}
                  onChange={(e) => setform({ ...form, question_type: e })}
                  options={typeOptions}
                  theme="search"
                  disabled
                  required
                />
                {submitted && !form.question_type && (
                  <div className="text-danger">type is required.</div>
                )}
              </div>

              <div className="col-span-2 mb-3">
                <FormControl
                  type="text"
                  name="description"
                  label="Question"
                  disabled
                  value={form.question}
                  onChange={(e) => {
                    setform({ ...form, question: e });
                  }}
                  required
                />
                {submitted && !form.question && (
                  <div className="text-danger">question is required.</div>
                )}
              </div>
              <div className="col-span-2 mb-3">
                <FormControl
                  type="text"
                  name="order"
                  label="Order"
                  value={form.order}
                  onChange={(e) => {
                    setform({ ...form, order: e });
                  }}
                  required
                />
                {submitted && !form.order && (
                  <div className="text-danger">Order is required.</div>
                )}
              </div>
              <div className="col-span-2 mb-3">
                <label>Options</label>

                {options.map((itm, i) => {
                  return (
                    <>
                      <div className="grid grid-cols-2 gap-2 shadow p-2 mb-4">
                        <div>
                          <FormControl
                            type="text"
                            label="Name"
                            value={itm.name}
                            onChange={(e) => {
                              updateOption(i, e, "name");
                            }}
                            disabled
                            required
                          />
                        </div>
                        <div>
                          <label>Image</label>
                          <div>
                            <ImageUpload
                              model="users"
                              result={(e) => updateOption(i, e.value, "image")}
                              value={itm.image}
                              label="Choose file"
                            />
                          </div>
                        </div>
                        {/* <div className="col-span-full text-right">
                  <i className="fa fa-times cusrsor-pointer" onClick={()=>deleteOption(i)}></i>
                  </div> */}
                      </div>
                    </>
                  );
                })}
                {/* {submitted && !form.options && (
                  <div className="text-danger">options are required.</div>
                )} */}
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="text-white bg-[#063688] bg-[#063688] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
