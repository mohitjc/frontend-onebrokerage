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
          <div className="text-center">
            <h1 className="text-xl font-semibold text-[#fff] ">
              Forgot Password
            </h1>
            <p className="text-[16px] font-normal text-[#fff] mt-4">
            {" "}
            No worries! Just enter your email and we’ll send you a reset
            password link.
          </p>
           
          </div>
         
          <div className=" mt-5">
            <div className="relative">
              
              <input
                type="email"
                className="mb-5 relative  bg-white w-full  rounded-lg h-12 flex items-center gap-2 overflow-hidden  bginput px-4  "
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
              className="h-11 rounded-xl w-full font-semibold text-center text-white   hover:opacity-80 transition-all "
            >
              Send Recovery Email
            </button>
          </div>

          <p className="text-sm mt-3 text-center text-gray-200">
            {" "}
            Just Remember?
            <Link
              className="text-white font-semibold text-sm"
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
