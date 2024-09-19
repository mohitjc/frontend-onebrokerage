
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
    <div className="bg_img main_signup signup-page">
      <div className="center-img ">
        <div className="container">
          <div className="row justifiit">
            <div className="col-lg-6">
              <div className="right_side ">
                <Link to="/">
                  <div className="logo_image mb-3">
                    <img src="assets/img/logo-m.png" className="logo_name" />
                  </div>
                </Link>

                <form className="centerLogin" onSubmit={handleSubmit}>
                  <div className="text-center mb-4">
                    <h3 className="text-center lgtext">Create your account.</h3>
                    <p className="accopunt text-center p-0 mb-3">
                      Already have an account?{" "}
                      <Link className="sign_up" to="/login">
                        {" "}
                        Sign In
                      </Link>
                    </p>
                  </div>
                  <div className="row ">
                    <div className="col-md-12">
                      <div className="progressbar-num">
                        <ProgressBar
                          percent={percent}
                          filledBackground="linear-gradient(to right,rgb(63 85 158), rgb(150 162 201))"
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
                        <div className="scrollbar-height">
                          <div className="row  justleft">
                            <div className="col-md-12">
                              <h4 className="mt-4 mb-3">
                                {" "}
                                Vehicle Information
                              </h4>
                            </div>
                            {/* <div className="col-md-6 mb-3">
                              <label className="form-label ml-2">
                                Truck Number
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control mb-0 bginput chnages"
                                type="text"
                                required
                                pattern="[a-zA-Z0-9\s]+"
                                onKeyPress={(e) => {
                                  var regex = new RegExp("[a-zA-Z0-9]+");
                                  var key = String.fromCharCode(
                                    !event.charCode
                                      ? event.which
                                      : event.charCode
                                  );
                                  if (!regex.test(key)) {
                                    event.preventDefault();
                                    return false;
                                  }
                                }}
                                value={form?.truck_number}
                                name="documentNumber"
                                onChange={(e) => {
                                  setForm({
                                    ...form,
                                    truck_number: e.target.value,
                                  });
                                }}
                                placeholder="Truck Number"
                              />
                            </div> */}
                            <div className="col-md-6 mb-3">
                              <label className="form-label ml-2">
                                Total Trailers
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control mb-0 bginput chnages"
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

                            <div className="col-md-6 mb-3">
                              <label className="form-label ml-2">
                                Solo Truck
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                min={0}
                                className="form-control mb-0 bginput chnages"
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
                            <div className="col-md-6 mb-3">
                              <label className="form-label ml-2">
                                Team Truck
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                min={0}
                                className="form-control mb-0 bginput chnages"
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

                            {/* <div className="col-md-6 mb-3">
                              <label className="form-label ml-2">
                                Total Truck
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                min={0}
                                className="form-control mb-0 bginput chnages"
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
                            <div className="col-md-12 mb-3">
                              <label className="form-label ml-2">
                                Trailer Type
                                <span className="text-danger">*</span>
                              </label>
                              <div className="row">
                                <div className="col-md-6 ">
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
                                            <label className="form-label ml-2">
                                              Trailer Type
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="row">
                                              <div className="col-md-6">
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
                                                  className="ms-2"
                                                >
                                                  Dry-Van
                                                </label>
                                              </div>
                                              <div className="col-md-6">
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
                                                  className="ms-2"
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
                                    <label for="dry_van" className="ms-2">
                                      Dry Van
                                    </label>
                                  </div>
                                </div>
                                <div className="col-md-6 ">
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
                                    <label for="reefer" className="ms-2">
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
                                className="clickBox ms-1 mb-0"
                              >
                                By clicking create account, I agree that I have
                                read and accepted the terms of use and privacy
                                policy.
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end gap-3 mt-4">
                          <button
                            onClick={() => {
                              history("/signup-step-2");
                            }}
                            className="btn-save width-set"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="btn dark-btn width-set"
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
            </div>
            <button
              style={{ display: "none" }}
              type="button"
              id="OpenBidModel"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Launch demo modal
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  {/* <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Registration Complete</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div> */}
                  <div class="modal-body">
                    <div className="verification-modal-inner p-3">
                      <img src="assets/img/tick-grey.png" />
                      <h5>Thank you for Your Registration .</h5>
                      <h5>
                        Please wait until your profile verification is completed
                        .
                      </h5>

                      <div className="mx-auto mt-4 d-block text-center">
                        <button
                          type="button"
                          class="btn btn-secondary d-none"
                          id="CloseBidModel"
                          data-bs-dismiss="modal"
                        ></button>
                        <button
                          onClick={() => {
                            history("/");
                            document.getElementById("CloseBidModel").click();
                          }}
                          type="submit"
                          class="btn dark-btn width-set mx-auto"
                        >
                          Ok
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AuthLayout>
  );
}
