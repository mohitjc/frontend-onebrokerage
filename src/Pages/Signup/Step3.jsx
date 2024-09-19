
import { useEffect, useState } from "react";
import loader from "../../methods/loader";
import ApiClient from "../../methods/api/apiClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.scss";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import axios, { Axios } from "axios";
import AuthLayout from "../../components/AuthLayout";
// import { requestForToken } from "../../firebase/configuration";
export default function Step3() {
  const [percent, setPercent] = useState(100);
  const history = useNavigate();
  const [DeviceToken, setDeviceToken] = useState("");
  const [tick, setTick] = useState(false);
  let Step1 = JSON.parse(localStorage.getItem("Step1"));
  let Step2 = JSON.parse(localStorage.getItem("Step2"));
  let AddressStep = JSON.parse(localStorage.getItem("Address"));
  const [IP, setIP] = useState({});
  const [form, setForm] = useState({
    truck_number: "",
    solo_type: "",
    trailers_number: "",
    team_number: "",
    trailers_type: [],
  });

//   const requestPermission = async () => {
//     await Notification.requestPermission()
//       .then((permission) => {
//         if (permission === "granted") {
//           requestForToken();
//           requestForToken().then((res) => {
//             setDeviceToken(res);
//           });
//         } else if (permission == "denied") {
//           requestForToken();
//           console.log(requestForToken());

//           // alert("You denied Notification permission.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error while requesting notification permission:", error);
//       });
//   };

  const getIP = () => {
    axios.get("https://api.ipify.org/?format=json").then((res) => {
    
      setIP(res?.data);
    });
  };

  useEffect(() => {
    getIP();
    // requestPermission();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tick) {
      return toast.error(
        "Please fill the check box to accept terms and confitions."
      );
    }
    loader(true);
    let value = {
      firstName: Step1?.firstName,
      lastName: Step1?.lastName,
      email: Step1?.email,
      address: AddressStep?.address,
      city: AddressStep?.city,
      password: Step1?.password,
      state: AddressStep?.state,
      role: "carrier",
      team_truck: parseInt(form?.team_truck),
      solo_truck: parseInt(form?.solo_truck),
      company_name: Step2?.company_name,
      pincode: AddressStep?.pincode,
      country: AddressStep?.country,
      tax_number: Step2?.tax_number,
      fax_number: Step2?.fax_number,
      device_token: DeviceToken,
      // position: form?.position,

      // total_trucks:
      //   Number(form.team_truck) +
      //   Number(form?.solo_truck) +
      //   Number(form?.trailers_number),
      trailers_number: form?.trailers_number,
      ip_address: IP?.ip,
      lat: AddressStep?.lat,
      lng: AddressStep?.lng,
      mc_number: Step2?.mc_number,
      dot_number: Step2?.dot_number,
      telephoneExt: Step2?.telephoneExt,
      telephoneNo: Step2?.telephoneNo,
      trailer_type: form?.trailers_type,
      position: Step1?.position,
      identification_number: Step1?.identification_number,
    };
    ApiClient.post("register", value).then((res) => {
      if (res.success) {
        // toast.success(res?.message)
        localStorage.removeItem("Step1");
        localStorage.removeItem("Step2");
        document.getElementById("OpenBidModel").click();
      }
    });
    loader(false);
  };
useEffect(() => {
    // Add the LinkedIn tracking script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      _linkedin_partner_id = "6323372";
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(_linkedin_partner_id);

      (function(l) {
        if (!l){
          window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[];
        }
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";
        b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);
      })(window.lintrk);
    `;
    document.head.appendChild(script);

    // Add the noscript image
    const noscriptImg = document.createElement('img');
    noscriptImg.height = 1;
    noscriptImg.width = 1;
    noscriptImg.style.display = 'none';
    noscriptImg.alt = '';
    noscriptImg.src = 'https://px.ads.linkedin.com/collect/?pid=6323372&fmt=gif';
    document.body.appendChild(noscriptImg);

    // Clean up the script and image when the component unmounts
    return () => {
      document.head.removeChild(script);
      document.body.removeChild(noscriptImg);
    };
  }, []);
  return (
    <AuthLayout>
    <div className="">
    <form className="" onSubmit={handleSubmit}>
                  <div className=" ">
                    <div className="">
                      <div className="progressbar-num">
                        <ProgressBar
                          percent={percent}
                          filledBackground="linear-gradient(to right,rgb(74 81 155), rgb(24 81 155))"
                        >
                          <Step transition="scale">
                            {({ accomplished }) => (
                              // <img

                              //     style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                              //     width="30"
                              //     src="https://cdn-icons-png.flaticon.com/512/4335/4335542.png"
                              // />
                              <div className="non-activebar">1</div>
                            )}
                          </Step>
                          <Step transition="scale">
                            {({ accomplished }) => (
                              // <img

                              //     style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                              //     width="30"
                              //     src="https://cdn-icons-png.flaticon.com/512/2554/2554978.png"
                              // />
                              <div className="non-activebar">2</div>
                            )}
                          </Step>
                          <Step transition="scale">
                            {({ accomplished }) => (
                              // <img
                              //     onClick={() => {
                              //         setTab('documents')
                              //         setPercent(100)
                              //     }}
                              //     style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                              //     width="30"
                              //     src="https://cdn.icon-icons.com/icons2/2387/PNG/512/card_document_documents_driving_license_car_data_sheet_icon_144605.png"
                              // />
                              <div className="non-activebar">3</div>
                            )}
                          </Step>
                          <Step transition="scale">
                            {({ accomplished }) => (
                              <div className="activebar">4</div>
                            )}
                          </Step>
                        </ProgressBar>
                      </div>
                    </div>
                  </div>
                  <div className="tab-content mt-3" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <>
                        <div className="">
                          <div className="">
                            <div className="">
                              <h4 className="mt-4 mb-3 text-white">
                                {" "}
                                Vehicle Information
                              </h4>
                            </div>
                            
                            <div className="">
                              
                              <input
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
                                type="number"
                                required
                                min={0}
                                value={form?.trailers_number}
                                name="issueDate"
                                // pattern="[a-zA-Z0-9\s]+"
                                // onKeyPress={(e) => {
                                //   var regex = new RegExp("[a-zA-Z0-9]+");
                                //   var key = String.fromCharCode(
                                //     !event.charCode
                                //       ? event.which
                                //       : event.charCode
                                //   );
                                //   if (!regex.test(key)) {
                                //     event.preventDefault();
                                //     return false;
                                //   }
                                // }}
                                onChange={(e) => {
                                  setForm({
                                    ...form,
                                    trailers_number: e.target.value,
                                  });
                                }}
                                placeholder="Number of Trailers"
                              />
                            </div>

                            <div className="">
                             
                              <input
                                min={0}
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
                                type="number"
                                required
                                pattern="\d+"
                                value={form?.solo_truck}
                                name="Solo Truck"
                                // minLength="8"
                                onChange={(e) => {
                                  setForm({
                                    ...form,
                                    solo_truck: e.target.value,
                                  });
                                }}
                                placeholder="  Solo Truck"
                                //   onBlur={handleBlur}
                              />
                            </div>
                            <div className="">
                             
                              <input
                                min={0}
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
                                type="number"
                                required
                                value={form?.team_truck}
                                name="Team Number"
                                // minLength="8"
                                onChange={(e) => {
                                  setForm({
                                    ...form,
                                    team_truck: e.target.value,
                                  });
                                }}
                                placeholder="  Team Truck"
                                //   onBlur={handleBlur}
                              />
                            </div>

                            {/* <div className="">
                              <label className="form-label ml-2">
                                Total Truck
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                min={0}
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
                                type="number"
                                required
                                name="documentNumber"
                                value={
                                  Number(form.team_truck) +
                                  Number(form?.solo_truck) +
                                  Number(form?.trailers_number)
                                }
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    total_trucks:
                                      Number(form.team_truck) +
                                      Number(form?.solo_truck) +
                                      Number(form?.trailers_number),
                                  })
                                }
                                eholder="Truck Number"
                                //   onBlur={handleBlur}
                              />
                            </div> */}
                            <div className="">
                            
                              <div className="">
                                <div className=" ">
                                  <div className="input_div input_div1">
                                    {" "}
                                    <input
                                      id="dry_van"
                                      type="checkbox"
                                      name="type"
                                      value="dry_van"
                                      checked={form?.trailers_type?.includes(
                                        "dry_van"
                                      )}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        let updatedTypes = [
                                          ...form?.trailers_type,
                                        ];
                                        if (isChecked) {
                                          updatedTypes.push("dry_van");
                                        } else {
                                          <div className="col-md-12 mb-3">
                                           
                                            <div className="row">
                                              <div className="">
                                                <input
                                                  id="dry_van"
                                                  type="checkbox"
                                                  name="type"
                                                  value="dry_van"
                                                  checked={form?.trailers_type?.includes(
                                                    "dry_van"
                                                  )}
                                                  onChange={(e) => {
                                                    const isChecked =
                                                      e.target.checked;
                                                    let updatedTypes = [
                                                      ...form?.trailers_type,
                                                    ];
                                                    if (isChecked) {
                                                      updatedTypes.push(
                                                        "dry_van"
                                                      );
                                                    } else {
                                                      updatedTypes =
                                                        updatedTypes.filter(
                                                          (type) =>
                                                            type !== "dry_van"
                                                        );
                                                    }
                                                    setForm({
                                                      ...form,
                                                      trailers_type:
                                                        updatedTypes,
                                                    });
                                                  }}
                                                />
                                                <label
                                                  for="dry_van"
                                                  className="ms-2 text-white"
                                                >
                                                  Dry-Van
                                                </label>
                                              </div>
                                              <div className="">
                                                <input
                                                  id="dry_van"
                                                  type="checkbox"
                                                  name="type"
                                                  value="reefer"
                                                  checked={form?.trailers_type?.includes(
                                                    "reefer"
                                                  )}
                                                  onChange={(e) => {
                                                    const isChecked =
                                                      e.target.checked;
                                                    let updatedTypes = [
                                                      ...form?.trailers_type,
                                                    ];
                                                    if (isChecked) {
                                                      updatedTypes.push(
                                                        "reefer"
                                                      );
                                                    } else {
                                                      updatedTypes =
                                                        updatedTypes.filter(
                                                          (type) =>
                                                            type !== "reefer"
                                                        );
                                                    }
                                                    setForm({
                                                      ...form,
                                                      trailers_type:
                                                        updatedTypes,
                                                    });
                                                  }}
                                                />
                                                <label
                                                  for="reefer"
                                                  className="ms-2 text-white cursor-pointer"
                                                >
                                                  Reefer
                                                </label>
                                              </div>
                                            </div>
                                          </div>;
                                          updatedTypes = updatedTypes.filter(
                                            (type) => type !== "dry_van"
                                          );
                                        }
                                        setForm({
                                          ...form,
                                          trailers_type: updatedTypes,
                                        });
                                      }}
                                    />
                                    <label for="dry_van" className="ms-2 text-white cursor-pointer">
                                      Dry Van
                                    </label>
                                  </div>
                                </div>
                                <div className=" ">
                                  <div className="input_div">
                                    {" "}
                                    <input
                                      id="reefer"
                                      type="checkbox"
                                      name="type"
                                      value="reefer"
                                      checked={form?.trailers_type?.includes(
                                        "reefer"
                                      )}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        let updatedTypes = [
                                          ...form?.trailers_type,
                                        ];
                                        if (isChecked) {
                                          updatedTypes.push("reefer");
                                        } else {
                                          updatedTypes = updatedTypes.filter(
                                            (type) => type !== "reefer"
                                          );
                                        }
                                        setForm({
                                          ...form,
                                          trailers_type: updatedTypes,
                                        });
                                      }}
                                    />
                                    <label for="reefer" className="ms-2 text-white cursor-pointer" >
                                      Reefer
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className=" d-flex align-items-baseline">
                              <input
                                type="checkbox"
                                id="checkbox1"
                                className="checkBox"
                                name="check"
                                checked={tick}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setTick(true);
                                  } else {
                                    setTick(false);
                                  }
                                }}
                              />
                              <label
                                for="checkbox1"
                                className="clickBox ms-1 mb-0 text-white cursor-pointer"
                              >
                                By clicking create account, I agree that I have
                                read and accepted the terms of use and privacy
                                policy.
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 mt-4">
                          <button
                            onClick={() => {
                              history("/signup-step-2");
                            }}
                          className="bg-white px-4 py-2 rounded-lg text-black border border-gray text-sm "
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="bg-primary px-4 py-2 rounded-lg text-white text-sm"
                          >
                            Sign Up
                          </button>
                        </div>
                      </>
                    </div>
                  </div>

                  {/* end tab */}
                </form>
           
        

       
          
    </div>
    </AuthLayout>
  );
}
