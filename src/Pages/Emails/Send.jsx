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
import { Tooltip } from "antd";

function Send() {
  const user = useSelector((state) => state.user);

  const [submitted, setSubmitted] = useState(false);
  const [emails, setEmails] = useState();

  const [form, setForm] = useState({
    to: [],
    subject: "",
    body: "",
  });
  const formValidation = [
    {
      key: "to",
      required: true,
    },
    { key: "subject", required: true },
    { key: "body", required: true },
  ];
  const history = useNavigate();

  const handleSubmit = (e) => {
    let url = shared.sendNewsletter;
    e.preventDefault();
    setSubmitted(true);

    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid || form.emails?.length == 0) return;
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

  useEffect(() => {
    if (user && user.loggedIn) {
      emailsList();
    }
  }, []);
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
              Newsletter
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="sideclass col-span-12 md:col-span-12">
            <div className="tabs_styles">
              <form onSubmit={handleSubmit}>
                <div className="mt-2">
                  <div className="col-span-12 md:col-span-6 mb-3">
                    <FormControl
                      type="text"
                      name="subject"
                      label="Subject"
                      value={form.subject}
                      onChange={(e) => {
                        setForm({ ...form, subject: e });
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
                  </div>
                  <div className="col-span-12 md:col-span-6 mb-6">
                    <FormControl
                      type="editor"
                      name="body"
                      label="Body"
                      value={form.body}
                      onChange={(e) => setForm({ ...form, body: e })}
                      required
                    />
                    {submitted && !form.body && (
                      <div className="text-danger small mt-1">
                        Text is required.
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 flex-wrap mt-6">
                    <div className="btns flex items-center gap-2 shrink-0">
                      <button
                        type="submit"
                        className="bg-[#263238] py-3 px-2 w-32 text-white text-[14px] font-medium"
                      >
                        Send
                      </button>
                    </div>
                  </div>
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
