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

const AddEdit = () => {
  const { id } = useParams();
  const [images, setImages] = useState({ image: "" });
  const [form, setform] = useState({
    id: "",
    fullName: "",
    email: "",
    mobileNo:'',
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

  const timezones = timezoneModel.list;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid || getDateErrr(form.date)) return;
    let method = "post";
    let url = shared.addApi;
    let value = {
      ...form,
      ...images,
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
  };

  const getError = (key) => {
    return submitted
      ? methodModel.getError(key, form, formValidation)?.message
      : "";
  };

  const getDateErrr = (start, end = new Date()) => {
    let value = false;
    if (start && end) {
      if (new Date(start).getTime() < new Date(end).getTime()) {
        value = true;
      }
    }

    return value;
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
                  name="full_name"
                  label="Full Name"
                  value={form.fullName}
                  onChange={(e) => setform({ ...form, fullName: e })}
                  required
                />
              </div>
              <div className=" mb-3">
                <FormControl
                  type="phone"
                  name="mobileNo"
                  label="Mobile No"
                  value={form.mobileNo}
                  onChange={(e) => setform({ ...form, mobileNo: e })}
                  required
                />
              </div>
              <div className=" mb-3">
                <FormControl
                  type="text"
                  name="email"
                  label="Email"
                  value={form.email}
                  onChange={(e) => setform({ ...form, email: e })}
                  required
                  disabled={id?true:false}
                />
              </div>
              {/* <div className="mb-3">
                <label>
                  Mobile No<span className="star">*</span>
                </label>
                <PhoneInput
                  country={"us"}
                  value={form.phone}
                  enableSearch={true}
                  limitMaxLength
                  required
                  onChange={(e) => setform({ ...form, phone: e })}
                  countryCodeEditable={true}
                  minlegth="10"
                />
                {submitted && getError("phone").invalid ? (
                  <div className="invalid-feedback d-block">
                    Min Length is 10
                  </div>
                ) : (
                  <></>
                )}
              </div> */}

              {/* < div className="mb-3">
                <FormControl
                  type="date"
                  name="date"
                  label="DOB"
                  value={datepipeModel.datetodatepicker(form.date_of_birth)}
                  onChange={(e) => {
                    setform({ ...form, date_of_birth: e });
                  }}
                  // required
                  error={
                    getDateErrr(form.date_of_birth) && submitted
                      ? "Entered date is less than Current Date"
                      : ""
                  }
                />
              </div> */}

              {/* <div className="col-span-12 md:col-span-6">
                                <label className='lablefontcls'>Image</label><br></br>
                                <ImageUpload model="users" result={e => imageResult(e, 'image')} value={images.image || form.image} />
                            </div> */}
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="text-white bg-orange-400 bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
