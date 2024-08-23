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
  const { slug } = useParams();
  const [form, setform] = useState({
    id: "",
    title: "",
    slug:'',
    description: "",
    meta_keyword: '',
    meta_title: "",
    meta_description: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // let invalid = methodModel.getFormError(formValidation, form);

    // if (invalid) return;



    let method = "post";
    let url = shared.addApi;
    let value = {
      ...form,
    };

    const slug=value.title.toLowerCase().replaceAll(' ','-')
    if (value.id) {
      method = "put";
      url = shared.editApi;
    } else {
      value.slug=slug
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
    if (slug) {
      loader(true);
      ApiClient.get(shared.detailApi, { slug }).then((res) => {
        if (res.success) {
          let value = res.data;
          let payload = form;

          Object.keys(payload).map((itm) => {
            payload[itm] = value[itm];
          });

          payload.id = value.id;
          setform({
            ...payload,
          });
        }
        loader(false);
      });
    }
  }, [slug]);

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
                  Edit {shared.addTitle}
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
                />
              </div>


              <div className=" mb-3">
                <FormControl
                  type="text"
                  name="meta_title"
                  label="Meta Title"
                  value={form.meta_title}
                  onChange={(e) => setform({ ...form, meta_title: e })}
                />
              </div>

              <div className="col-span-full mb-3">
                <FormControl
                  type="editor"
                  name="description"
                  label="Description"
                  value={form.description}
                  onChange={(e) => setform({ ...form, description: e })}
                />
              </div>

              <div className="col-span-full mb-3">
                <FormControl
                  type="textarea"
                  name="meta_description"
                  label="Meta Description"
                  value={form.meta_description}
                  onChange={(e) => setform({ ...form, meta_description: e })}
                />
              </div>

              <div className="col-span-full mb-3">
                <FormControl
                  type="text"
                  name="keywords"
                  label="Keywords"
                  value={form.meta_keyword}
                  onChange={(e) =>
                    setform({
                      ...form,
                      meta_keyword:e,
                    })
                  }
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
