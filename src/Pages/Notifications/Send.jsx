import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import shared from "./shared";
import { useNavigate } from "react-router-dom";
import methodModel from "../../methods/methods";
import loader from "../../methods/loader";
import { useSelector } from "react-redux";
import FormControl from "../../components/common/FormControl";
import MultiSelectDropdown from "../../components/common/MultiSelectDropdown";
import Layout from "../../components/global/layout";
import UsersMultiSelectDropdown from "../../components/common/UsersMultiSelectDropdown ";
import { Tooltip } from "antd";

function Send() {
  const user = useSelector((state) => state.user);

  const [submitted, setSubmitted] = useState(false);
  const [emails, setEmails] = useState();
  const [media, setMediaList] = useState([]);
  const usersTypeOptions = [
    { id: "Beginner", name: "Beginner" },
    { id: "Intermediate", name: "Intermediate" },
    { id: "Experienced", name: "Experienced" },
  ];
  const options = [
    { id: "product", name: "Product" },
    { id: "blog", name: "Blog" },
    { id: "normal", name: "Normal" },
    { id: "video", name: "Video" },
    { id: "audio", name: "Audio" },
  ];

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    type: "",
    title: "",
    users: [],
    user_type: [],
    productUrl: "",
    videoUrl: "",
    audioUrl: "",
    audioId: "",
    videoId: "",
  });
  const formValidation = [
    {
      key: "title",
      required: true,
    },
  ];
  const history = useNavigate();

  const validUrl = methodModel.urlValidation(
    form?.productUrl || form?.videoUrl || form?.audioUrl
  );

  const handleSubmit = (e) => {
    let url = "notification/add";
    e.preventDefault();
    setSubmitted(true);

    let invalid = methodModel.getFormError(formValidation, form);
    if ((form?.productUrl || form?.videoUrl || form?.audioUrl) && !validUrl)
      return;

    if (invalid || form?.users.length == 0) return;
    let method = "post";

    let value = {
      ...form,
    };

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        // ToastsStore.success(res.message)
        history(`/${shared.url}`);
        setSubmitted(false);
      }
      loader(false);
    });
  };

  const emailsList = () => {
    ApiClient.get("subscribe/listing").then((res) => {
      if (res.success) {
        let _emails = res?.data.map(({ id, email }) => {
          return { id: email, name: email };
        });
        setEmails(_emails);
      }
    });
  };

  const getMediaList = () => {
    let url = "";
    if (form.type == "video") {
      url = "video/list";
    }
    if (form.type == "audio") {
      url = "audio/list";
    }
    ApiClient.get(url).then((res) => {
      if (res.success) {
        const data = res.data.map(({ _id, title }) => {
          return { id: _id, name: title };
        });
        setMediaList(data);
      }
    });
  };

  const getUsersList = () => {
    ApiClient.get("user/frontend/lisitng", {
      experience_level: form.user_type.toString(),
    }).then((res) => {
      if (res.success) {
        let user = res?.data.map(
          ({ id, fullName, email, experience_level }) => {
            return {
              id: id,
              name: fullName,
              experience_level: experience_level,
              email: email,
            };
          }
        );
        setUsers(user);
      }
    });
  };

  useEffect(() => {
    if (user && user.loggedIn) {
      emailsList();
    }
  }, []);
  useEffect(() => {
    getUsersList();
  }, [form.user_type]);

  useEffect(() => {
    if (form.type == "video" || form.type == "audio") getMediaList();
  }, [form.type]);
  return (
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
              Notification
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="sideclass col-span-12 md:col-span-12">
            <div className="tabs_styles">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="mb-3">
                    <FormControl
                      type="select"
                      name="type"
                      label="Notification Type"
                      value={form.type}
                      onChange={(e) => {
                        setForm({ ...form, type: e });
                      }}
                      options={options}
                      theme="search"
                      required
                    />
                    {submitted && !form.type && (
                      <div className="text-danger small mt-1 capitalize ">
                        Please select notification type.
                      </div>
                    )}
                  </div>
                  <div className=" mb-3">
                    <label className="mb-1">
                      User Type<span class="star">*</span>
                    </label>
                    <MultiSelectDropdown
                      options={usersTypeOptions}
                      result={({ value }) => {
                        setForm({ ...form, user_type: value, users: [] });
                      }}
                      intialValue={form.user_type}
                    />
                    {submitted && form.users.length == 0 && (
                      <div className="text-danger small mt-1 capitalize ">
                        Please Select users.
                      </div>
                    )}
                  </div>
                  <div className=" mb-3">
                    <label className="mb-1">
                      Select Users<span class="star">*</span>
                    </label>
                    <UsersMultiSelectDropdown
                      options={users}
                      result={({ value }) => {
                        setForm({ ...form, users: value });
                      }}
                      intialValue={form.users}
                    />
                    {submitted && form.users.length == 0 && (
                      <div className="text-danger small mt-1 capitalize ">
                        Please Select users.
                      </div>
                    )}
                  </div>
                  {form.type == "product" && (
                    <div className=" mb-3">
                      <FormControl
                        name="url"
                        label="Product URL"
                        value={form.productUrl}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            productUrl: e,
                            videoUrl: "",
                            audioUrl: "",
                          });
                        }}
                      />
                      {submitted && !validUrl && (
                        <div className="text-danger small mt-1 capitalize ">
                          URL is not valid.
                        </div>
                      )}
                    </div>
                  )}
                  {form.type == "video" && (
                    <>
                      <div className=" mb-3">
                        <FormControl
                          name="url"
                          label="Video URL"
                          value={form.videoUrl}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              videoUrl: e,
                              productUrl: "",
                              audioUrl: "",
                            });
                          }}
                        />
                        {submitted && !validUrl && (
                          <div className="text-danger small mt-1 capitalize ">
                            URL is not valid.
                          </div>
                        )}
                      </div>
                      <div className=" mb-3">
                        <FormControl
                          type="select"
                          name="video"
                          label="Select Video"
                          value={form.videoId}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              videoId: e,
                              audioId: "",
                            });
                          }}
                          options={media}
                          theme="search"
                          required
                        />
                      </div>
                    </>
                  )}
                  {form.type == "audio" && (
                    <>
                      <div className=" mb-3">
                        <FormControl
                          name="url"
                          label="Audio URL"
                          value={form.audioUrl}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              audioUrl: e,
                              productUrl: "",
                              videoUrl: "",
                            });
                          }}
                        />
                        {submitted && !validUrl && (
                          <div className="text-danger small mt-1 capitalize ">
                            URL is not valid.
                          </div>
                        )}
                      </div>
                      <div className=" mb-3">
                        <FormControl
                          type="select"
                          name="audio"
                          label="Select Audio"
                          value={form.audioId}
                          onChange={(e) => {
                            setForm({ ...form, audioId: e, videoId: "" });
                          }}
                          options={media}
                          theme="search"
                          required
                        />
                      </div>
                    </>
                  )}
                </div>
                {/*<div className="col-span-6 md:col-span-6 mb-3">
                    <FormControl
                      type="text"
                      name="title"
                      label="Title"
                      value={form.title}
                      onChange={(e) => {
                        setForm({ ...form, title: e });
                      }}
                      required
                    />
                    {submitted && !form.subject && (
                      <div className="text-danger small mt-1 capitalize ">
                        Subject is required.
                      </div>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-6 mb-3">
                    <label className="mb-1">
                      To<span class="star">*</span>
                    </label>
                    <MultiSelectDropdown
                      options={emails}
                      result={({ value }) => {
                        setForm({ ...form, to: value });
                      }}
                      intialValue={form.to}
                    />
                    {submitted && form.to?.length == 0 && (
                      <div className="text-danger small mt-1 capitalize ">
                        Email is required.
                      </div>
                    )}
                  </div>*/}
                <div className="col-span-12 md:col-span-6 mb-6">
                  {/* <FormControl
                      type="editor"
                      name="title"
                      label="Title"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e })}
                      required
                    /> */}
                  <label className="mb-1">
                    Notification Title<span class="star">*</span>
                  </label>
                  <div>
                    <textarea
                      name="title"
                      label="Title"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      rows={3}
                      className="w-[100%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-[#EB6A59]block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 pr-10"
                    ></textarea>
                  </div>
                  {submitted && !form.title && (
                    <div className="text-danger small mt-1">
                      Please enter text to send notification.
                    </div>
                  )}
                </div>

                <div className="flex justify-end col-span-12 md:col-span-6">
                  <button
                    type="submit"
                    className="bg-[#263238] py-3 px-2 w-32 text-white text-[14px] font-medium"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Send;
