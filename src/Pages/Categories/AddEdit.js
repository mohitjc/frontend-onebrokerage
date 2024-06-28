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
  const [images, setImages] = useState({ image: "" });
  const [categoryOptions, setCategories] = useState([]);
  const [form, setform] = useState({
    id: "",
    name: "",
    image: "",
    type: "",
    parent_category: "null",
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
    /*  { key: "status", required: true },
    { key: "type", required: true, message: "Type is required" },
    { key: "timezone", required: true },
    { key: "description", required: true, message: "Description is required" }, */
    // { key:'groupMemberLimit' , required:true ,message:'Group Member Limit is required'}
  ];

  const options = shared.types;

  const getCategoriesList = (p = {}) => {
    let f = {
      ...p,
      category_type: "master",
    };
    ApiClient.get(shared.listApi, f).then((res) => {
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
      ...images,
      parent_category: !form.parent_category ? null : form.parent_category,
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

          payload.id = id;
          if (payload.parent_category?._id)
            payload.parent_category = payload.parent_category?._id;
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
    getCategoriesList({ type: form.type });
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
                  name="name"
                  label="Name"
                  value={form.name}
                  onChange={(e) => setform({ ...form, name: e })}
                  required
                />
              </div>
              <div className=" mb-3">
                <FormControl
                  type="select"
                  name="type"
                  label="Type"
                  value={form.type}
                  onChange={(e) => {
                    setform({ ...form, type: e, parent_category: "" });
                  }}
                  options={options}
                  theme="search"
                  required
                />
              </div>
              {form.type && form.type !== "video" && form.type !== "audio" && (
                <div className=" mb-3">
                  <FormControl
                    type="select"
                    name="type"
                    label="Parent Category"
                    value={form.parent_category}
                    onChange={(e) => setform({ ...form, parent_category: e })}
                    options={[
                      { name: "Set as Parent", id: "" },
                      ...categoryOptions,
                    ]}
                    theme="search"
                  />
                </div>
              )}
              <div className="mb-3">
                <label className="lablefontcls">Image</label>
                <br></br>
                <ImageUpload
                  model="users"
                  result={(e) => imageResult(e, "image")}
                  value={images.image || form.image}
                  multiple={false}
                  label="Choose file"
                />
                {/* {submitted && !images.image && (
                  <div className="text-danger small mt-1">
                    image is required.
                  </div>
                )} */}
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
