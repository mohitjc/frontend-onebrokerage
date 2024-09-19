import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import "./style.scss";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import { toast } from "react-toastify";

const Forgotpassword = () => {
  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history("/dashboard");
    }
  }, []);

  const [form, setForm] = useState({ email: "" });

  useEffect(() => {}, []);

  const hendleSubmit = (e: any) => {
    e.preventDefault();
    loader(true);

    ApiClient.post("user/forgot-password", form).then((res) => {
      if (res.success) {
        history("/otp-verify");
        setTimeout(() => {
          toast.success(res.message);
        }, 100);
      }
      loader(false);
    });
  };

  return (
    <>
      <AuthLayout>
        <form
          className="w-full"
          onSubmit={hendleSubmit}
        >
          <div className="">
            <h1 className="text-[30px] font-semibold text-[#fff] ">
              Forgot Password
            </h1>
            <span className="flex w-10 h-1 bg-[#494f9f] mt-1"></span>
          </div>
          <p className="text-[16px] font-normal text-[#fff] mt-4">
            {" "}
            No worries! Just enter your email and we’ll send you a reset
            password link.
          </p>
          <div className=" mt-5">
            <div className="relative">
              <div className="absolute  z-[99] p-3 px-4 bg-[#00358512] text-[#0035859c] rounded-tl-[7px] rounded-bl-[7px]">
                <i className="fa fa-envelope " aria-hidden="true"></i>
              </div>
              <input
                type="email"
                className="mb-5 relative  bg-white w-full  rounded-lg h-12 flex items-center gap-2 overflow-hidden  mb-0 bginput w-full pl-[55px]"
                placeholder="Email*"
                value={form.email}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-6">
            <button
              type="submit"
              className="h-11 rounded-full w-52 text-center text-[#fff] bg-[#494f9f]  font-semibold hover:opacity-80 transition-all"
            >
              Send Recovery Email
            </button>
          </div>

          <p className="text-[#fff] text-center font-normal text-[14px] mt-4">
            {" "}
            Just Remember?
            <Link
              className="text-[#494f9f] text-[14px] !font-semibold"
              to="/login"
            >
              {" "}
              Sign In
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default Forgotpassword;
