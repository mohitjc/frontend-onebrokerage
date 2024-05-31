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
import MultiSelectDropdown from "../../components/common/MultiSelectDropdown";

let options = [];
let productTypeoptions = [
  { id: "Therapeutic Use", name: "Therapeutic Benefits" },
  { id: "Health & Wellness", name: "Health Benefits" },
];
const AddEdit = () => {
  const { id } = useParams();
  const [images, setImages] = useState({ images: "" });
  const [form, setform] = useState({
    id: "",
    name: "",
    description: "",
    category: "",
    sub_category: "",
    product_type: "",
    tags: [],
  });

  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [subcategory, setSubcategory] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const user = useSelector((state) => state.user);
  const formValidation = [
    {
      key: "product_type",
      required: true,
      message: "Type is required",
    },
    { key: "category", required: true },
    { key: "description", required: true },
    { key: "tags", required: true },
  ];

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

  const getSubCategories = (p = {}) => {
    let f = {
      ...p,
      type: "product",
    };
    ApiClient.get("category/listing", f).then((res) => {
      if (res.success) {
        const filtered = res?.data.filter((itm) => itm.status == "active");
        let options = filtered.map(({ id, name }) => {
          return { id: id, name: name };
        });
        setSubcategory(options);
      }
    });
  };

  const getProductTags = () => {
    ApiClient.get("tag/list", { type: form.product_type }).then((res) => {
      if (res.success) {
        const filtered = res?.data.filter((itm) => itm.status == "active");
        let tags = filtered.map(({ id, name }) => {
          return { id: id, name: name };
        });
        setProductTags(tags);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid || !images.images || form.tags?.length == 0) return;
    let method = "post";
    let url = shared.addApi;
    let value = {
      ...form,
      ...images,
      category: form.category || null,
      sub_category: form.sub_category || null,
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

          if (payload.category?._id) payload.category = payload.category._id;
          if (payload.sub_category?._id)
            payload.sub_category = payload.sub_category._id;

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
  }, []);

  useEffect(() => {
    if (form.category) {
      getSubCategories({ parent_category: form.category });
    }
  }, [form.category]);

  useEffect(() => {
    if (form.product_type) {
      getProductTags();
    }
  }, [form.product_type]);

  console.log("FORM", form);

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

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 lg:col-span-8">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-6 mb-3">
                    <FormControl
                      type="text"
                      name="name"
                      label="Name"
                      value={form.name}
                      onChange={(e) => setform({ ...form, name: e })}
                      required
                    />
                  </div>
                  <div className={`col-span-12 md:col-span-6 mb-3`}>
                    <FormControl
                      type="select"
                      name="product_type"
                      label="Product Type"
                      value={form.product_type}
                      onChange={(e) =>
                        setform({
                          ...form,
                          product_type: e.toString(),
                          tags: [],
                          category: "",
                          sub_category: "",
                        })
                      }
                      options={productTypeoptions}
                      theme="search"
                      required
                    />
                    {submitted && !form.product_type && (
                      <div className="text-danger small mt-1">
                        type is required.
                      </div>
                    )}
                  </div>
                  {form.product_type && (
                    <div
                      className={`col-span-12 md:col-span-${
                        form.category ? "6" : "12"
                      } mb-3`}
                    >
                      <FormControl
                        type="select"
                        name="category"
                        label="Parent Category"
                        value={form.category}
                        onChange={(e) => {
                          setform({ ...form, category: e });
                        }}
                        options={options}
                        theme="search"
                        required
                      />
                      {submitted && !form.category && (
                        <div className="text-danger small mt-1">
                          parent category is required.
                        </div>
                      )}
                    </div>
                  )}
                  {form.category ? (
                    <>
                      <div className="col-span-12 md:col-span-6 mb-3">
                        <FormControl
                          type="select"
                          name="Sub category"
                          label="Sub category"
                          value={form.sub_category}
                          onChange={(e) =>
                            setform({ ...form, sub_category: e })
                          }
                          options={subcategory}
                          theme="search"
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {form.product_type ? (
                    <div className="col-span-12 md:col-span-12 mb-3">
                      <MultiSelectDropdown
                        options={productTags}
                        result={({ value }) =>
                          setform({ ...form, tags: value })
                        }
                        intialValue={form.tags}
                      />
                      {submitted && form.tags.length == 0 && (
                        <div className="text-danger small mt-1">
                          tags are required.
                        </div>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="col-span-12 md:col-span-12 mb-3">
                    <FormControl
                      type="editor"
                      name="description"
                      label="Description"
                      value={form.description}
                      onChange={(e) => setform({ ...form, description: e })}
                      required
                    />
                    {submitted && !form.description && (
                      <div className="text-danger small mt-1">
                        description is required.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="grid grid-cols-1">
                  <div className="col-span-12 mb-3">
                    <label className="lablefontcls mb-2 inline-flex">
                      Image
                    </label>

                    <ImageUpload
                      model="users"
                      result={(e) => imageResult(e, "images")}
                      value={images.images || form.images}
                      multiple={true}
                      label="Choose Images"
                    />
                    {submitted && !images.images && (
                      <div className="text-danger small mt-1">
                        image is required.
                      </div>
                    )}
                  </div>
                </div>
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
