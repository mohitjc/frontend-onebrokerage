import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import methodModel from "../../../methods/methods";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Pages/actions/user";
import { toast } from "react-toastify";

const ChangePassword = (p) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [form, setForm] = useState({
    confirmPassword: "",
    currentPassword: "",
    newPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const formValidation = [
    {
      key: "confirmPassword",
      minLength: 8,
      confirmMatch: ["confirmPassword", "newPassword"],
    },
    { key: "currentPassword", minLength: 8 },
    { key: "newPassword", minLength: 8 },
  ];
  const [eyes, setEyes] = useState({
    password: false,
    confirmPassword: false,
    currentPassword: false,
  });
  const getError = (key) => {
    return methodModel.getError(key, form, formValidation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);
    if (invalid) return;

    loader(true);
    let payload = {
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
      userId: user._id,
    };
    ApiClient.put("change/password", payload).then((res) => {
      if (res.success) {
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("persist:admin-app");
        toast.success(res.message);
        history("/login");
      }
      loader(false);
    });
  };

  return (
    <>
      <div className="wrapper_section ">
        <div className="input_form  grid grid-cols-1 mt-10 ">
          <div className="md:max-w-3xl max-w-full w-full mx-auto border  rounded-lg bg-white">
            <div className="bg-[#1245940a] p-4 border-b ">
              <h3 className="text-[20px] font-[500]">Change Password</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="m-6">
                  <div className="flex flex-col md:flex-row md:items-center items-start gap-4 mb-6">
                    <label className="text-typo text-base font-medium md:w-96 w-full">
                      Current Password<span className="start">*</span>
                    </label>
                    <div className="w-full">
                      <div className="relative ">
                        <input
                          type={eyes.currentPassword ? "text" : "password"}
                          className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 !ring-primary !outline-primary"
                          value={form.currentPassword}
                          maxLength="20"
                          placeholder="Enter current password"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              currentPassword: e.target.value,
                            })
                          }
                          required
                        />
                        <div className="absolute right-2 top-3 cursor-pointer text-grey-500 text-sm">
                          <i
                            className={
                              eyes.currentPassword
                                ? "fa fa-eye text-gray-400"
                                : "fa fa-eye-slash text-gray-400"
                            }
                            onClick={() =>
                              setEyes({
                                ...eyes,
                                currentPassword: !eyes.currentPassword,
                              })
                            }
                          ></i>
                        </div>
                      </div>
                      {submitted && getError("currentPassword").invalid ? (
                        <div className="invalid-feedback d-block">
                          Min Length must be 8 characters long
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center items-start gap-4 mb-6 ">
                    <label className="text-typo text-base font-medium md:w-96 w-full">
                      New Password<span className="start">*</span>
                    </label>

                    <div className=" w-full">
                      <div className="relative ">
                        <input
                          type={eyes.password ? "text" : "password"}
                          className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 !ring-primary !outline-primary"
                          value={form.newPassword}
                          placeholder="Enter new password"
                          minLength={9}
                          maxLength={16}
                          onChange={(e) =>
                            setForm({ ...form, newPassword: e.target.value })
                          }
                          required
                        />
                        <div className="absolute right-2 top-3 cursor-pointer text-grey-500 text-sm">
                          <i
                            className={
                              eyes.password
                                ? "fa fa-eye text-gray-400"
                                : "fa fa-eye-slash text-gray-400"
                            }
                            onClick={() =>
                              setEyes({ ...eyes, password: !eyes.password })
                            }
                          ></i>
                        </div>
                      </div>
                      {submitted && getError("newPassword").invalid ? (
                        <div className="invalid-feedback d-block">
                          Min Length must be 8 characters long
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center items-start gap-4 mb-6">
                    <label className="text-typo text-base font-medium md:w-96 w-full">
                      Confirm Password<span className="start">*</span>
                    </label>

                    <div className="relative w-full ">
                      <input
                        type={eyes.confirmPassword ? "text" : "password"}
                        className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 !ring-primary !outline-primary"
                        placeholder="Enter Confirm Password"
                        value={form.confirmPassword}
                        minLength={9}
                        maxLength={16}
                        onChange={(e) =>
                          setForm({ ...form, confirmPassword: e.target.value })
                        }
                        required
                      />
                      <div className="absolute right-2 top-3 cursor-pointer text-grey-500 text-sm">
                        <i
                          className={
                            eyes.confirmPassword
                              ? "fa fa-eye text-gray-400"
                              : "fa fa-eye-slash text-gray-400"
                          }
                          onClick={() =>
                            setEyes({
                              ...eyes,
                              confirmPassword: !eyes.confirmPassword,
                            })
                          }
                        ></i>
                      </div>
                      {submitted && getError("confirmPassword").invalid ? (
                        <>
                          {getError("confirmPassword").err.confirmMatch ? (
                            <div className="invalid-feedback d-block">
                              Confirm Password is not matched with New Password
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <div className="flex items-end justify-end">
                    <button
                      type="submit"
                      className="text-white bg-[#494f9f]  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center   cursor-pointer"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
