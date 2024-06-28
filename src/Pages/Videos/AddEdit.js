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
import { FiPlus, FiTrash } from "react-icons/fi";
import environment from "../../environment";

const AddEdit = () => {
  const { id } = useParams();
  const [images, setImages] = useState({ image: "" });
  const [video, setVideo] = useState("");
  const [categoryOptions, setCategories] = useState([]);
  const [form, setform] = useState({
    id: "",
    title: "",
    category: "",
    video: "",
  });

  const [filters, setFilters] = useState({
    page: 1,
    count: 10,
    search: "",
    type: "",
  });
  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const formValidation = [
    { key: "title", required: true },
    { key: "category", required: true },
    { key: "video", required: true },
    ,
  ];

  const options = shared.types;

  const getCategoriesList = (p = {}) => {
    let f = {
      ...p,
      category_type: "master",
      type: "video",
    };
    ApiClient.get("category/listing", f).then((res) => {
      if (res.success) {
        let categoryOptions = res.data.map(({ id, name }) => {
          return { id: id, name: name };
        });
        setCategories(categoryOptions);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid) return;
    let method = "post";
    let url = shared.addApi;
    let value = {
      ...form,
      ...video,
    };
    if (value.id) {
      method = "put";
      url = shared.editApi;
    } else {
      delete value.id;
    }

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
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

          payload.id = id;
          if (payload?.category?.id) payload.category = payload.category?.id;
          setform({
            ...payload,
          });

          let img = images;
          Object.keys(img).map((itm) => {
            img[itm] = value[itm];
          });
          setImages({ ...img });
        }
        loader(false);
      });
    }
  }, [id]);

  const imageResult = (e, key) => {
    images[key] = e.value;
    setImages(images);
    if (submitted == true) {
      setSubmitted(false);
    }
  };

  const uploadVideo = (e) => {
    let files = e.target.files;
    if (!files) return;
    loader(true);
    ApiClient.multiImageUpload("upload/video", files, {}, "file").then(
      (res) => {
        if (res.success) {
          setform({ ...form, video: res?.filePath });
        }
        loader(false);
      }
    );
  };

  useEffect(() => {
    getCategoriesList();
  }, [form.type]);

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
                {/* <p class="text-xs lg:text-sm font-normal text-[#75757A]">
                  Here you can see all about your {shared.addTitle}
                </p> */}
              </div>
            </div>

            <h3 className="ViewUser mb-3"></h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className=" mb-3">
                <FormControl
                  type="text"
                  name="title"
                  label="Title"
                  value={form.title}
                  onChange={(e) => setform({ ...form, title: e })}
                  required
                />
                {submitted && !form.title && (
                  <div className="text-danger small mt-1">
                    Title is required.
                  </div>
                )}
              </div>
              <div className=" mb-3">
                <FormControl
                  type="select"
                  name="category"
                  label="Category"
                  value={form.category}
                  onChange={(e) => {
                    setform({ ...form, category: e });
                  }}
                  options={categoryOptions}
                  theme="search"
                  required
                />
                {submitted && !form.category && (
                  <div className="text-danger small mt-1">
                    Category is required.
                  </div>
                )}
              </div>

              <div className="mb-3">
                <div>
                  <label className="lablefontcls ">Video</label>
                </div>
                {/* <br></br>
                <ImageUpload
                  model="users"
                  result={(e) => imageResult(e, "image")}
                  value={images.image || form.image}
                  multiple={false}
                  label="Choose file"
                /> */}
                {/* {submitted && !images.image && (
                  <div className="text-danger small mt-1">
                    image is required.
                  </div>
                )} */}
                {!form.video && (
                  <label
                    className={`block cursor-pointer text-gray-500 bg-white border-2 border-dashed border-[#EB6A59] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-4 text-center `}
                  >
                    <input
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={(e) => {
                        uploadVideo(e);
                      }}
                    />
                    <div className="flex flex-row gap-2 items-center justify-center">
                      <FiPlus className="text-2xl text-[#EB6A59]" />
                      <span>Choose Video File</span>
                    </div>
                    <span className="text-[10px] text-gray-400">
                      MP4, WEBM, WMV,FLV,MKV
                    </span>
                  </label>
                )}
                {form.video && (
                  <div className="relative inline-flex">
                    <video
                      src={`${environment.sasurl}/${form?.video}`}
                      width={300}
                      className="h-44"
                      controls
                    />
                    <a
                      className="bg-white rounded-full bg-primary inline-flex p-2 absolute top-2 right-2 text-white"
                      onClick={() => {
                        setform({ ...form, video: "" });
                      }}
                    >
                      <FiTrash />
                    </a>
                  </div>
                )}
                {submitted && !form.video && (
                  <div className="text-danger small mt-1">
                    Video is required.
                  </div>
                )}
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="text-white bg-[#EB6A59] bg-[#EB6A59] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
