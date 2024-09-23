import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { Link } from "react-router-dom";
import "./style.scss";
import AuthLayout from "../../components/AuthLayout";
import methodModel from "../../methods/methods";
import { useDispatch, useSelector } from "react-redux";
import { login_success } from "../actions/user";
import { FiEye, FiEyeOff } from "react-icons/fi";
import socketModel from "../../models/socketModel";
import axios from "axios";
import { useParams } from "react-router-dom";
import environment from "../../environment";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const Login = () => {
  const { id } = useParams();
  const history = useNavigate();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user?.loggedIn) {
      history("/plan");
    }
  }, []);

  const [IP, setIp] = useState("");
  const [username, setUsername] = useState("");
  const [attandanceEmail, setAttendanceEmail] = useState("");
  const [DeviceToken, setDeviceToken] = useState("");
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState("");
  const [eyes, setEyes] = useState({
    password: false,
    confirmPassword: false,
    currentPassword: false,
  });
  const [step, setStep] = useState(1);
  const [otp, setOTP] = useState("");
  const [resp, setRes]: any = useState();

  
  const getIP = () => {
    fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      let ip = data.ip;
      localStorage.setItem("IP", ip);
      setIp(ip);
    })
    .catch((error) => console.error("Error fetching IP address:", error));

  let email = methodModel.getPrams("email");
  if (email) setUsername(email);
  };

  // const requestPermission = async () => {
  //   await Notification.requestPermission()
  //     .then((permission) => {
  //       if (permission === "granted") {
  //         requestForToken().then((token) => {
  //           setDeviceToken(token);
  //         });
  //       } else if (permission == "denied") {
  //         requestForToken().then((token) => {
  //           setDeviceToken(token);
  //         });

  //         // alert("You denied Notification permission.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error while requesting notification permission:", error);
  //     });
  // };

  useEffect(() => {
    getIP();
  }, []);

  useEffect(() => {
    // requestPermission();
    let r = localStorage.getItem("remember");
    if (r) {
      let data = JSON.parse(r);
      setUsername(data.email);
      setPassword(data.password);
      setRemember(true);
    }

    let message = methodModel.getPrams("message");
  }, []);

  const hendleSubmit = (e:any) => {
    e.preventDefault();
    const data= {
      email: username,
      ip_address: IP,
      password,
    };

    loader(true);
    axios
      .post(`${environment.api}user/signin`, {
        email: username,
        ip_address:IP,
        password: password,
        // device_token: DeviceToken,
      })
      .then((res1) => {

        if (res1?.data?.success) {
     
          if (remember) {
            localStorage.setItem("remember", JSON.stringify(data));
          } else {
            localStorage.removeItem("remember");
          }
          localStorage.setItem("token", res1?.data?.data?.access_token);
          dispatch(login_success(res1?.data?.data));
          const newdata = res1.data?.data;
          toast.success(res1?.data?.message)
          if(res1?.data?.data?.plan_id)
          {
            history("/dashboard");
          }else
          {
            history("/plan");
          }
        
          // if(newdata?.request_status=="rejected")
          // {
          //   history("/profile");
          // }
          // else
          // {
          //   ApiClient.get("trucks").then((res) => {      
          //     if (res?.data?.data?.length == 0) {
          //       localStorage.setItem("newuser", true)
          //       history("/trucks/add");
          //     } else {
          //       history("/dashboard");
          //     }
          //   });
           
          // }
   
      
        
        }
        loader(false);
      })
      .catch((err) => {
          toast.error(err?.response?.data?.error?.message);
        
        loader(false);
      });

   
      
  };

  useEffect(() => {
    if (id) {
      loader(true);
      localStorage.clear();
      ApiClient.post("user/auto-login", { id: id }).then((response) => {
        if (response.success) {
          dispatch(login_success(response.data));
          localStorage.setItem("token", response.data.access_token);
          toast.success(response.message);
          // const newdata = response.data;
          // ApiClient.get("trucks").then((res) => {
          //   if (res?.data?.data?.length == 0) {
          //     // history("/trucks/add");
          //   } else {
          //     history("/profile");
          //   }
          // });
        }
        loader(true);
      });
    }
    localStorage.removeItem("Step1");
    localStorage.removeItem("Step2");
  }, []);

  return (
    <>
      <AuthLayout>
 
          <form
            className="w-full"
            onSubmit={hendleSubmit}
          >
           
            
            {/* <p className="text-[16px] font-normal text-[#333] mt-4">
              Please enter your valid details
            </p> */}
            {/* {step == 1 ? ( */}
              <div className="mt-5">
                <div className="relative">
                  {/* <label className="mb-2 block text-white">Enter Email </label> */}
                  {/* <div className="absolute  z-[99] p-3 px-4 bg-[#00358512] text-[#0035859c] rounded-tl-[7px] rounded-bl-[7px]">
                    <i className="fa fa-envelope " aria-hidden="true"></i>
                  </div> */}

                  <input
                    type="text"
                    className="mb-5 relative  bg-white w-full  rounded-lg h-12 flex items-center gap-2 overflow-hidden  mb-0 bginput w-full px-4"
                    placeholder="Enter Email "
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    // disabled={methodModel.getPrams('attended')?true:false}
                    required
                  />
                </div>
                {/* <label className="mb-2 block text-white">Enter Password</label> */}
                <div className="relative mb-6">
               
                  {/* <div className="absolute  z-[99] p-3 px-4 bg-[#00358512] text-[#0035859c] rounded-tl-[7px] rounded-bl-[7px]">
                    <i className="fa fa-lock " aria-hidden="true"></i>
                  </div> */}
                  <input
                    type={eyes.password ? "text" : "password"}
                    className="mb-5 relative  bg-white w-full  rounded-lg h-12 flex items-center gap-2 overflow-hidden  mb-0 bginput w-full px-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password "
                    required
                  />
                  {eyes.password ? (
                    <FiEye
                      className="top-4 right-3 absolute text-[#333] cursor-pointer"
                      onClick={() =>
                        setEyes({ ...eyes, password: !eyes.password })
                      }
                    />
                  ) : (
                    <FiEyeOff
                      className="top-4 right-3 absolute text-[#333] cursor-pointer"
                      onClick={() =>
                        setEyes({ ...eyes, password: !eyes.password })
                      }
                    />
                  )}
                </div>
              </div>
            {/* // ) : (
            //   <>
            //     <p className="mb-2">OTP sent on email</p>
            //     <input
            //       type="text"
            //       maxLength={6}
            //       minLength={6}
            //       className="mb-4 w-full text-sm text-[#333]  h-10 flex items-center gap-2 overflow-hidden bg-transparent border-b border-white/37"
            //       placeholder="Enter OTP"
            //       value={otp}
            //       onChange={(e) => setOTP(e.target.value)}
            //       required
            //     />
            //   </>
            // )} */}

            <div className="flex">
              <label className="flex items-center pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="mr-2 h-4 w-4 cursor-pointer"
                  style={{ accentColor: "#494f9f" }}
                />{" "}
                <span className="text-[14px] font-normal text-[#fff]">
                  Remember Me
                </span>
              </label>
              <Link
                className="font-semibold  text-[14px] ml-auto text-[#fff]"
                to="/forgotpassword"
              >
                {" "}
                Forgot Password?
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center">
              <button
                type="submit"
                className="h-11 rounded-xl w-full font-semibold text-center text-white   hover:opacity-80 transition-all "
              >
                Sign in
              </button>
            </div>
           


            <p className='text-sm mt-3 text-center text-gray-200'>Don't have an account? <Link to="/signup" className='text-white font-semibold text-sm'>Sign Up</Link></p>
          </form>
       
      </AuthLayout>
    </>
  );
};

export default Login;
