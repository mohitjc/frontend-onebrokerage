import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { Link } from "react-router-dom";
import "./style.scss";
import { toast } from "react-toastify";
import methodModel from "../../methods/methods"
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Description, Field, Label, Select } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

const Signup = () => {
  const [EmailError, setEmailError] = useState(false);
  const [percent, setPercent] = useState(10);
  const [submitted, setSubmitted] = useState(false);
  const history = useNavigate();
  const Step1 = JSON.parse(localStorage.getItem("Step1"));
  const [eyes, setEyes] = useState({
    password: false,
    confirmPassword: false,
    currentPassword: false,
  });

  const [form, setForm] = useState({
    address: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    business_name: "",
  });

  useEffect(() => {
    if (Step1) {
      setForm(Step1);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
 
    if (
      !emailvalidation() ||
      !form?.firstName ||
      !form?.password ||
      !form?.email ||
      form?.password != form?.confirmPassword||
      !form?.position
    ) {
      return false;
    }
    loader(true);
    let value = {
      firstName: form?.firstName,
      lastName: form?.lastName,
      email: form?.email,
      confirmPassword: form?.confirmPassword,
      password: form?.password,
      position: form?.position,
      role: "carrier",
      // identification_number: form?.identification_number,
      // business_name: form?.business_name,
    };
    localStorage.setItem("Step1", JSON.stringify(value));
    loader(false);
    history("/signup-step-1");
  };



  const emailvalidation = () => {
    if (form?.email) {
      let splitEmail = form?.email?.split("@")[1]
      if (splitEmail && (splitEmail.includes("yahoo.com") || splitEmail.includes("gmail.com") || splitEmail.includes("outlook.com") || splitEmail.includes("hotmail.com"))) {
        return false
      }
      else {
        return true
      }
    }

  }

  return (
    <>
      <AuthLayout>
        <form
           className="w-full px-6"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h4 className="text-white mb-6 text-2xl font-bold">Sign Up</h4>
          <ProgressBar
            percent={percent}
            filledBackground="linear-gradient(to right,rgb(73 79 159), rgb(73 79 159))"
          >
            <Step transition="scale">
              {({ accomplished }) => (
                // <img

                //   style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                //   width=""
                //   src="https://cdn-icons-png.flaticon.com/512/4335/4335542.png"
                // />
                <div className="activebar">1</div>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                // <img

                //   style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                //   width=""
                //   src="https://cdn-icons-png.flaticon.com/512/2554/2554978.png"
                // />
                <div className="non-activebar">2</div>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                // <img

                //   style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                //   width=""
                //   src="https://cdn.icon-icons.com/icons2/2387/PNG/512/card_document_documents_driving_license_car_data_sheet_icon_144605.png"
                // />
                <div className="non-activebar">3</div>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <div className="non-activebar">4</div>
              )}
            </Step>
          </ProgressBar>


          <input
            type="text"
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            value={form.firstName}
            pattern="^[a-zA-Z]+$"
            onKeyPress={(e) => {
              var regex = new RegExp("^[a-zA-Z]+$");
              var key = String.fromCharCode(
                !e.charCode ? e.which : e.charCode
              );
              if (!regex.test(key)) {
                e.preventDefault();
                return false;
              }
            }}
            className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
            placeholder="First Name"
            autoComplete="off"
            required
          />
          <input
            type="text"
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            pattern="^[a-zA-Z']+$"
            onKeyPress={(e) => {
              var regex = new RegExp("^[a-zA-Z']+$");
              var key = String.fromCharCode(
                !e.charCode ? e.which : e.charCode
              );
              if (!regex.test(key)) {
                e.preventDefault();
                return false;
              }
            }}
            value={form?.lastName}
            className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
            placeholder="Last Name"
            autoComplete="off"
          // required
          />
          <input
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
            className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
            placeholder="Email address"
            autoComplete="off"
            disabled={methodModel.getPrams("attended") ? true : false}
            required
          />


<Field className="mb-3">
        
        <div className="relative">
          <Select
            className={clsx(
              'mt-3 block w-full h-11 appearance-none rounded-lg border-none bg-gray-50 py-1.5 px-3 text-sm/6 text-gray-500 ',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
              '*:text-black'
            )}


            onChange={(e) => {
              setForm({
                ...form,
                position: e.target.value,
              });
            }}
            required
          >
            <option value="">Select Option</option>
                <option value="owner">Owner</option>
                <option value="manager">Manager</option>
                <option value="accounting_manager">
                  Account Manager
                </option>
                <option value="dispatcher">Dispatcher</option>
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-1/2 -translate-y-1/2 right-1 size-6 fill-[#6b7280]"
            aria-hidden="true"
          />
        </div>
      </Field>


          {/* <select
            className="shadow-box mb-3 border-1 focus:outline-none border-gray-300 relative bg-gray-100 w-full text-sm  rounded-lg h-12 flex items-center gap-2 overflow-hidden px- "

            onChange={(e) => {
              setForm({
                ...form,
                position: e.target.value,
              });
            }}
            required
          >
            <option value="">Select Option</option>
            <option value="owner">Owner</option>
            <option value="manager">Manager</option>
            <option value="accounting_manager">
              Account Manager
            </option>
            <option value="dispatcher">Dispatcher</option>
          </select> */}

          <div className="relative mb-3">
            <input
              type={eyes.password ? "text" : "password"}
              className="shadow-box border-1 border-gray-300 relative bg-gray-100 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
              minLength={8}
              autoComplete="off"
              required
            />

            <div className="absolute right-2 inset-y-0 flex items-center text-gray-500 text-sm">
              <i
                className={eyes.password ? "fa fa-eye" : "fa fa-eye-slash"}
                onClick={() => setEyes({ ...eyes, password: !eyes.password })}
              ></i>
            </div>
          </div>

          <div className="relative ">
            <input
              type={eyes.confirmPassword ? "text" : "password"}
              className="shadow-box border-1 border-gray-300 relative bg-gray-100 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
              placeholder="Confirm Password"
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              value={form.confirmPassword}
              minLength={8}
              autoComplete="off"
              required
            />

            <div className="absolute right-2 inset-y-0 flex items-center text-gray-500 text-sm">
              <i
                className={eyes.confirmPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                onClick={() => setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })}
              ></i>
            </div>
          </div>
          {submitted && form?.confirmPassword != form?.password ? (
                                <div className="invalid-feedback block star text-[12px]">
                                    Password and  ConfirmPassword did not matched
                                </div>
                            ) : (
                                <></>
                            )}

          <div className="flex">
            {/* <label className="flex items-center pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2 h-4 w-4"
              />{" "}
              <span className="text-xs text-gray-200">
                By clicking Create account, I agree that I have read and
                accepted the Terms of Use and Privacy Policy.
              </span>
            </label> */}
            {/* <Link className="sign_up ml-auto text-primary" to="/forgotpassword"> Forgot Password</Link> */}
          </div>

          {/* {submitted && !remember ? (
            <>
              <div className="text-[#494f9f] text-sm capitalize mt-3">
                Please agree our Terms Of Use And Privacy Policy
              </div>
            </>
          ) : (
            <></>
          )} */}

          <div className="mt-4">
            <button
              type="submit"
              className="px-4 w-full text-sm font-normal text-white h-12 flex items-center justify-center gap-2 !bg-[#494f9f] rounded-xl shadow-btn hover:opacity-80 transition-all focus:ring-2 ring-[#EDEBFC] disabled:bg-[#D0CAF6] disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>

          <p className="text-sm mt-3 text-center text-gray-200">
            Already have an account?{" "}
            <Link to="/login" className="text-[#fff] font-bold text-sm">
              Sign In
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default Signup;
