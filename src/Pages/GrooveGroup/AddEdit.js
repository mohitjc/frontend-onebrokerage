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
import environment from "../../environment";
import questionsKeys from "../Profile/questions";
import speechModel from "../../models/speech.model";

const AddEdit = () => {
  const { id } = useParams();
  const [images, setImages] = useState({ image: "" });
  const [roleOptions, setRoleOptions] = useState([]);
  const [form, setform] = useState({
    id: "",
    fullName: "",
    email: "",
    mobileNo: "",
  });
  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const inValidEmail = methodModel.emailvalidation(form?.email);
  const [questions, setQuestions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [speachStart, setSpeachStart] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [currentMedication, setCurrentMedication] = useState("");
  const [comment, setComment] = useState("");

  const formValidation = [
    { key: "mobileNo", required: true },
    { key: "email", required: true, message: "Email is required", email: true },
  ];

  const timezones = timezoneModel.list;

  const sortedQuestions = questions?.sort((a, b) => a.order - b.order);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid) return;
    let method = "post";
    let url = shared.addApi;
    let value = {
      ...form,
      role: environment.userRoleId,
      ...selectedValues,
    };

    if (value.id) {
      method = "put";
      url = shared.editApi;
    } else {
      value.addedBy = user._id;
      value.groupId = user?.groupId?._id;
      delete value.id;
    }
    value.primary_interest =
      value.primary_interest == "Health & Wellness"
        ? "Health & Wellness"
        : "Therapeutic Use";

    value.previous_experience =
      value.previous_experience == "Yes" ? true : false;

    if (value.previous_experience == true) {
      value.previous_experience_desc = comment;
    }
    if (value.current_medications == true) {
      value.current_medications_desc = currentMedication;
    }

    value.personalize_recommendation =
      value.personalize_recommendation == "Yes" ? true : false;

    value.current_medications =
      value.current_medications == "Yes" ? true : false;

    value.privacy_consent = value.privacy_consent == "Yes" ? true : false;
    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        // ToastsStore.success(res.message)
        history(`/${shared.url}`);
      }
      loader(false);
    });
  };

  const getRolesList = () => {
    ApiClient.get("role/listing").then((res) => {
      if (res.success) {
        const filtered = res?.data.filter(
          (itm) => itm.status == "active" && itm.name == "Customer"
        );
        setRoleOptions(
          filtered.map(({ _id, name }) => {
            return { id: _id, name: name };
          })
        );
      }
    });
  };

  const getQuestions = () => {
    ApiClient.get("onboarding-questions/list").then((res) => {
      if (res.success) {
        setQuestions(res.data);
      }
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

          if (payload.role?._id) payload.role = payload.role?._id;
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

  const handleCheckboxChange = (type, option, key) => {
    setSelectedValues((prevValues) => {
      let currentValues = prevValues[key] || [];
      if (currentValues.includes(option)) {
        return {
          ...prevValues,
          [key]:
            type == "multiple"
              ? currentValues.filter((opt) => opt != option)
              : option,
        };
      } else {
        return {
          ...prevValues,
          [key]: type == "multiple" ? [...currentValues, option] : option,
        };
      }
    });
  };

  const handleSelectAll = (item, key) => {
    const allOptions = item?.options;
    if (selectAll) {
      // Deselect all
      setSelectedValues((prevValues) => {
        return {
          ...prevValues,
          [key]: [],
        };
      });
      setSelectAll(!selectAll);
    } else {
      // Select all
      setSelectedValues((prevValues) => {
        return {
          ...prevValues,
          [key]: allOptions.map((itm) => itm.name),
        };
      });
      setSelectAll(!selectAll);
    }
  };

  const voice = (p) => {
    console.log("voice called");
    let voiceBtn = document.getElementById("voiceBtn");
    // console.log("voice called contains", voiceBtn?.classList.contains("glowing"))
    // if (voiceBtn?.classList.contains("glowing")) {
    if (speachStart) {
      stop();
      return;
    }

    setSpeachStart(true);
    // voiceBtn?.classList.add("glowing")
    const recognition = speechModel.recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;

    recognition.onresult = async (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("\n");

      console.log("transcript", transcript);

      let el = document.getElementById("voicemessage");

      let message = comment;
      if (p == "medication") message = currentMedication;

      message = `${message}\n${transcript}`;

      if (p == "medication") {
        setCurrentMedication(message);
      } else {
        setComment(message);
      }
      if (el) {
        // el.innerHTML = `\n ${updatedMessage}`
        el.value = `\n${transcript}`;
      }
    };

    recognition.start();
    recognition.onspeechend = () => {
      // recognition.stop();
      setSpeachStart(false);
      voiceBtn?.classList.remove("glowing");
      console.log("Speech recognition has stopped.");
    };
  };
  const stop = () => {
    console.log("stop call");
    const recognition = speechModel.recognition;
    recognition.stop();
    setSpeachStart(false);
  };

  useEffect(() => {
    getQuestions();
  }, []);

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
              {/* <div className="mobile_number mb-3">
                <FormControl
                  type="select"
                  name="role"
                  label="Role"
                  value={roleOptions[0]?.id}
                  options={roleOptions}
                  onChange={(e) => setform({ ...form, role: e })}
                  required
                  theme="search"
                />
                {submitted && !form.role && (
                  <div className="invalid-feedback d-block">
                    Role is required
                  </div>
                )}
              </div> */}

              <div className="mobile_number mb-3">
                <FormControl
                  type="phone"
                  name="mobileNo"
                  label="Mobile No"
                  value={form.mobileNo}
                  onChange={(e) => setform({ ...form, mobileNo: e })}
                  required
                />
                {submitted && !form.mobileNo && (
                  <div className="invalid-feedback d-block">
                    Mobile is required
                  </div>
                )}
              </div>
              <div className=" mb-3">
                <FormControl
                  type="text"
                  name="email"
                  label="Email"
                  value={form.email}
                  onChange={(e) => setform({ ...form, email: e })}
                  required
                  disabled={id ? true : false}
                />
                {form.email && submitted && !inValidEmail && (
                  <div className="invalid-feedback d-block">
                    Please enter valid email
                  </div>
                )}
              </div>
            </div>
            {sortedQuestions?.map((item, index) => {
              let key = questionsKeys[item.title];
              return (
                <div key={index} className={"mt-0 pb-4"}>
                  <div className="text-xl mb-3 font-bold mb-2 ">
                    {item.title}
                  </div>
                  <div className="flex items-start font-semibold gap-2 mb-2 ">
                    {item.question}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.question_type == "multiple" && (
                      <>
                        <label className="relative flex items-center cursor-pointer w-full rounded-[25px] border border-[#000] py-4 px-6">
                          <input
                            className="sr-only peer"
                            name="futuristic-radio"
                            type="checkbox"
                            checked={selectAll}
                            onChange={() => {
                              handleSelectAll(item, key);
                            }}
                          />

                          <div className="w-10 h-10 shrink-0 bg-transparent border border-black rounded-full overflow-hidden flex items-center justify-center transition duration-300 ease-in-out peer-checked:opacity-100 peer-checked:grayscale-0 opacity-50 grayscale">
                            <img
                              src="../assets/img/coin/c1.svg"
                              className="h-full w-full object-cover"
                              alt="Coin Image"
                            />
                          </div>
                          <span className="ml-3 text-black">Select All</span>
                        </label>
                      </>
                    )}

                    {item.options.map((option, index) => {
                      let type = item.question_type;
                      return (
                        <>
                          <label className="relative flex items-center cursor-pointer w-full rounded-[25px] border border-[#000] py-4 px-6">
                            {type == "multiple" ? (
                              <>
                                <input
                                  className="sr-only peer"
                                  name="futuristic-radio"
                                  type="checkbox"
                                  checked={selectedValues[key]?.includes(
                                    option.name
                                  )}
                                  onChange={() => {
                                    handleCheckboxChange(
                                      type,
                                      option.name,
                                      key
                                    );
                                  }}
                                />
                              </>
                            ) : (
                              <>
                                <input
                                  className="sr-only peer"
                                  type="radio"
                                  checked={selectedValues[key]?.includes(
                                    option.name
                                  )}
                                  // value={answer}
                                  onChange={() => {
                                    handleCheckboxChange(
                                      type,
                                      option.name,
                                      key
                                    );
                                  }}
                                />
                              </>
                            )}

                            <div className="w-10 h-10 shrink-0 bg-transparent border border-black rounded-full overflow-hidden flex items-center justify-center transition duration-300 ease-in-out peer-checked:opacity-100 peer-checked:grayscale-0 opacity-50 grayscale">
                              <img
                                src={methodModel.noImg(option.image)}
                                className="h-full w-full object-cover"
                                alt="Coin Image"
                              />
                            </div>
                            <span className="ml-3 text-black">
                              {item.options[index].name}
                            </span>
                          </label>
                        </>
                      );
                    })}
                  </div>
                  {key == "current_medications" &&
                    selectedValues["current_medications"] === "Yes" && (
                      <div className="mt-2">
                        <span className="text-black font-medium text-[15px]">
                          If "Yes", please explain
                        </span>
                        <textarea
                          rows={4}
                          id="voicemessage"
                          value={currentMedication}
                          placeholder="Write your comments"
                          className="block w-full mb-1 h-50 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                          onChange={(e) => {
                            setCurrentMedication(e.target.value);
                          }}
                        />
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => voice("medication")}
                            className={`btn btn-outline-dark px-3 mb-3 btnmi ${
                              speachStart ? "glowing" : ""
                            }`}
                            id="voiceBtn"
                          >
                            <i className="fa fa-microphone mr-1"></i> Type or
                            Speak
                          </button>
                        </div>
                      </div>
                    )}

                  {key == "previous_experience" &&
                    selectedValues["previous_experience"] === "Yes" && (
                      <div className="mt-2">
                        <span className="text-black font-medium text-[15px]">
                          If "Yes", please explain
                        </span>
                        <textarea
                          rows={4}
                          id="voicemessage"
                          value={comment}
                          placeholder="Write your comments"
                          className="block w-full mb-1 h-50 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                        />
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => voice("previous_experience")}
                            className={`btn btn-outline-dark px-3 mb-3 btnmi ${
                              speachStart ? "glowing" : ""
                            }`}
                            id="voiceBtn"
                          >
                            <i className="fa fa-microphone mr-1"></i> Type or
                            Speak
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              );
            })}

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
