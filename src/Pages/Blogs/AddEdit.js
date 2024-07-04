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
import { FiPlus } from "react-icons/fi";

let options = [];

const AddEdit = () => {
  const { id } = useParams();
  const [audioList, setAudioList] = useState([]);
  const [images, setImages] = useState({
    image: "",
    cover_image: "",
  });

  const [form, setform] = useState({
    id: "",
    title: "",
    description1: "",
    image: "",
    isHide: false,
    audio: "",
    title1: "",
    description2: "",
    description3: "",
  });

  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [subcategory, setSubcategory] = useState([]);
  const user = useSelector((state) => state.user);
  const formValidation = [
    {
      key: "title",
      required: true,
    },
    {
      key: "title1",
      required: true,
    },
    { key: "description1", required: true },
    { key: "description2", required: true },
    { key: "description3", required: true },
  ];

  const getMediaList = () => {
    ApiClient.get("audio/list").then((res) => {
      if (res.success) {
        const data = res.data.map(({ _id, title }) => {
          return { id: _id, name: title };
        });
        setAudioList(data);
      }
    });
  };

  const getCategories = (p = {}) => {
    let f = {
      ...p,
      type: "product",
      category_type: "master",
    };
    ApiClient.get("category/listing", f).then((res) => {
      if (res.success) {
        const filtered = res?.data.filter((itm) => itm.status == "active");
        options = filtered.map(({ id, name }) => {
          return { id: id, name: name };
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid || !images.image || !images.cover_image) return;
    let method = "post";
    let url = shared.addApi;
    let value = {
      ...form,
      ...images,
      category: form.category || null,
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

          if (payload.category) payload.category = payload.category.id;

          payload.id = id;
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

  useEffect(() => {
    getCategories();
    getMediaList();
  }, []);

  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="shadow-box w-full bg-white rounded-lg mb-4 p-6">
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

            <div className="grid grid-cols-12 gap-4 lg:gap-8">
              <div className="col-span-12 md:col-span-4 mb-3">
                <div>
                  <label className="lablefontcls mb-2 inline-flex">
                    Cover Image
                  </label>
                </div>

                <ImageUpload
                  model="users"
                  result={(e) => imageResult(e, "cover_image")}
                  value={images.cover_image || form.images}
                  label="Choose Image"
                />
                {submitted && !images.cover_image && (
                  <div className="text-danger small mt-1">
                    image is required.
                  </div>
                )}
              </div>

              <div className="col-span-12 md:col-span-8">
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
                    title is required.
                  </div>
                )}

                <FormControl
                  type="editor"
                  name="description"
                  label="Description"
                  value={form.description1}
                  onChange={(e) => setform({ ...form, description1: e })}
                  required
                />
                {submitted && !form.description1 && (
                  <div className="text-danger small mt-1">
                    description is required.
                  </div>
                )}
              </div>

              {/* <div className="col-span-12 md:col-span-6 mb-3">
                    <FormControl
                      type="select"
                      name="category"
                      label="Category"
                      value={form.category}
                      onChange={(e) => {
                        setform({ ...form, category: e });
                      }}
                      options={options}
                      theme="search"
                    />
                  </div> */}
            </div>
          </div>

          <div className="shadow-box w-full bg-white rounded-lg mt-4 p-6">
            <div className="flex items-center justify-between gap-2 mb-4 border-b pb-3 border-gray-200">
              <p className="text-xl font-semibold">Add Audio</p>

              <div className="flex items-center gap-2">
                <span className="text-sm">Show/hide</span>
                <label className="inline-flex items-center cursor-pointer ">
                  <input
                    type="checkbox"
                    value={form?.isHide}
                    checked={form?.isHide}
                    className="sr-only peer"
                    onChange={(e) =>
                      setform({ ...form, isHide: e.target.checked })
                    }
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#EB6A59]"></div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              {/* <div className="col-span-12 md:col-span-6">
                <FormControl
                  type="text"
                  name="title"
                  label="Title"
                  value={form.audioTitle}
                  onChange={(e) => setform({ ...form, audioTitle: e })}
                  required
                />
              </div> */}
              <div className="col-span-12 md:col-span-6">
                <FormControl
                  type="select"
                  name="audio"
                  label="Select Audio"
                  value={form.audio}
                  onChange={(e) => {
                    setform({ ...form, audio: e });
                  }}
                  options={audioList}
                  theme="search"
                  required
                />
                {submitted && !form.isHide && (
                  <div className="text-danger small mt-1">
                    audio is required.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="shadow-box w-full bg-white rounded-lg mt-4 p-6">
            <div className="">
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-12 md:col-span-6">
                  <div className="mb-3">
                    <FormControl
                      type="text"
                      name="title"
                      label="Title"
                      value={form.title1}
                      onChange={(e) => setform({ ...form, title1: e })}
                      required
                    />
                    {submitted && !form.title1 && (
                      <div className="text-danger small mt-1">
                        title is required.
                      </div>
                    )}
                  </div>

                  <div className="description_blogs">
                    <FormControl
                      type="editor"
                      name="description"
                      label="Description"
                      value={form.description2}
                      onChange={(e) => setform({ ...form, description2: e })}
                      required
                    />
                    {submitted && !form.description2 && (
                      <div className="text-danger small mt-1">
                        description is required.
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <div className=" mb-3">
                    <div>
                      <label className="lablefontcls mb-2 inline-flex">
                        Image
                      </label>
                    </div>

                    <ImageUpload
                      model="users"
                      result={(e) => imageResult(e, "image")}
                      value={images.image || form.images}
                      label="Choose Images"
                    />
                    {submitted && !images.image && (
                      <div className="text-danger small mt-1">
                        image is required.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="shadow-box w-full bg-white rounded-lg mt-4 p-6">
            <div className="description_lats">
              <FormControl
                type="editor"
                name="description"
                label="Description"
                value={form.description3}
                onChange={(e) => setform({ ...form, description3: e })}
                required
              />{" "}
              {submitted && !form.description3 && (
                <div className="text-danger small mt-1">
                  description is required.
                </div>
              )}
            </div>

            <div className="text-right mt-4">
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
