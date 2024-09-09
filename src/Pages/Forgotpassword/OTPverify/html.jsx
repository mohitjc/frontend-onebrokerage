import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
// import "./style.scss";
import { Link } from "react-router-dom";
import AuthLayout from "../../../components/AuthLayout";
import { toast } from "react-toastify";
import methodModel from "../../../methods/methods";

const OTPverify = () => {
    const history = useNavigate();

    useEffect(() => {
      if (localStorage.getItem("token")) {
        history("/dashboard");
      }
    }, []);
  

    const [submitted, setSubmitted] = useState(false);
    const [username, setUsername] = useState("");
    const [remember, setRemember] = useState(false);
    const [otp, setotp] = useState("");
    const [password, setPassword] = useState("");
    const [Confirmpassword, setConfirmPassword] = useState("");
    const [eyes, setEyes] = useState({
      password: false,
      confirmPassword: false,
      currentPassword: false,
    });
  
    useEffect(() => {
      loader(true);
      setTimeout(() => {
        loader(false);
      }, 500);
  
      let r = localStorage.getItem("remember");
      if (r) {
        let data = JSON.parse(r);
        setUsername(data.email);
        setPassword(data.password);
        setRemember(true);
      }
  
      let message = methodModel.getPrams("message");
    }, []);
  
    const hendleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
      if (Confirmpassword !== password || !otp || password.length < 8) {
        return;
      }
      const data = {
        code: otp,
        newPassword: password,
      };
  
      loader(true);
  
      ApiClient.put("reset/password", data).then((res) => {
        loader(false);
        if (res.success) {
          if (remember) {
            localStorage.setItem("remember", JSON.stringify(data));
          } else {
            localStorage.removeItem("remember");
          }
          toast.success(res.message);
          // localStorage.setItem("token", res.data.access_token);
          // dispatch(login_success(res.data));
          const newdata = res.data;
          history("/login");
        }
      });
    };
  
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    useEffect(() => {
      if (id) {
        loader(true);
        localStorage.clear();
        ApiClient.post("auto/login", { id: id }).then((response) => {
          if (response.success) {
            // dispatch(login_success(response.data))
            // localStorage.setItem('token', response.data.access_token)
            toast.success(response.message);
            const newdata = response.data;
            history.push("/login");
          }
          loader(false);
        });
      }
    }, []);
    return (
        <>
            <AuthLayout>
                <form
                    className="xl:w-4/12 lg:w-5/12 md:w-6/12 w-11/12  bg-white border border-[#00000017] p-[24px] rounded-[30px] shadow-c"
                    onSubmit={hendleSubmit}
                >
                    <div className="">
                        <h1 className="text-[30px] font-semibold text-[#333] ">
                            New Password
                        </h1>
                        <span className="flex w-10 h-1 bg-[#494f9f] mt-1"></span>
                    </div>

                    <div className="mt-5">
                        <div className="relative">
                            {/* <label className="mb-2 block">Enter Email Address</label> */}
                            {/* <div className="absolute  z-[99] p-3 px-4 bg-[#00358512] text-[#0035859c] rounded-tl-[7px] rounded-bl-[7px]">
                                <i className="fa fa-envelope " aria-hidden="true"></i>
                            </div> */}

                            {/* <label className="">
                                {" "}
                                Verification Code <span className="text-danger">*</span>
                            </label> */}
                            <input
                                type="text"
                                className="form-control mb-0 bginput changes"
                                placeholder="Verification Code  "
                                value={otp}
                                onChange={(e) => setotp(e.target.value)}
                            // required
                            />
                            {submitted && !otp ? (
                                <div className="invalid-feedback d-block">
                                    Verification is required
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="relative">
                            {/* <label className="ml-1 mb-2">
                                {" "}
                                Password <span className="text-danger">*</span>
                            </label> */}
                            <input
                                type={eyes.password ? "text" : "password"}
                                className="form-control mb-0 bginput changes"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            // required
                            />
                            <i
                                className={
                                    eyes.password ? "fa fa-eye" : "fa fa-eye-slash"
                                }
                                onClick={() =>
                                    setEyes({ ...eyes, password: !eyes.password })
                                }
                            ></i>
                            {submitted && password?.length < 8 ? (
                                <div className="invalid-feedback d-block">
                                    Password should be atleast of 8 character
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>

                        {/* <label className="ml-1 mb-2">
                            {" "}
                            Confirm Password <span className="text-danger">*</span>
                        </label> */}

                        <input
                            type={eyes.confirmPassword ? "text" : "password"}
                            className="form-control mb-0 bginput changes"
                            value={Confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Password"
                        // required
                        />
                        <i
                            className={
                                eyes.confirmPassword
                                    ? "fa fa-eye"
                                    : "fa fa-eye-slash"
                            }
                            onClick={() =>
                                setEyes({
                                    ...eyes,
                                    confirmPassword: !eyes.confirmPassword,
                                })
                            }
                        ></i>
                        {submitted && Confirmpassword != password ? (
                            <div className="invalid-feedback d-block">
                                Password should be matched
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <button
                        onClick={() => setSubmitted(true)}
                        type="submit"
                        className="btn dark-btn my-4 mb-1"
                    >
                        Save Password
                    </button>
                    <div className="forget text-center  ">
                        <Link to="/login" className="">
                            Remember Password? Login
                        </Link>
                    </div>


                </form>
            </AuthLayout>
        </>
    );
};

export default OTPverify;
