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

    ApiClient.post("user/admin/forgot/password", form).then((res) => {
      if (res.success) {
        history("/login");
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
      <form className="w-11/12 xl:w-7/12 lg:w-8/12 	mx-auto bg-[#00358508] border border-[#00000024] p-[24px] rounded-[30px]" onSubmit={hendleSubmit}>
          <div className="">
            <h1 className="text-[30px] font-semibold text-[#333] ">
              Forgot Passowrd
            </h1>
            <span className="flex w-10 h-1 bg-[#063688] mt-1"></span>
          </div>
          <p className="text-[16px] font-normal text-[#333] mt-4">
            {" "}
            No worries! Just enter your email and we’ll send you a reset
            password link.
          </p>
          <div className=" mt-5">
            <div className="inputWrapper">
              <input
                type="email"
                className="mb-4 w-full text-sm text-[#333]  h-10 flex items-center gap-2 overflow-hidden bg-transparent border-b border-white/37"
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
              className="h-11 rounded-full w-52 text-center text-[#fff] bg-[#063688]  font-semibold hover:opacity-80 transition-all"
            >
              Send Recovery Email
            </button>
          </div>

          <p className="text-[#333] text-center font-normal text-[14px] mt-4">
            {" "}
            Just Remember?
            <Link
              className="text-[#063688] text-[14px] !font-semibold"
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
