
import { useEffect, useState } from "react";
import loader from "../../methods/loader";
import ApiClient from "../../methods/api/apiClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.scss";
import { useSelector } from "react-redux";
import GooglePlaceAutoComplete from "../../components/common/GooglePlaceAutoComplete";
import addressModel from "../../models/address.model";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
export default function AddressStep() {
  const user = useSelector((state) => state.user);
  const websiteDetails = useSelector((state) => state.website);
  const [EmailError, setEmailError] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const showrole = params.get("role");
  const [tick, setTick] = useState(false);

  const ReferalEmail = params.get("email");
  const [email, setemail] = useState("");
  const [percent, setPercent] = useState(10);
  const history = useNavigate();
  const [tab, setTab] = useState("user");
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
    business_name: "",
  });
  const [truck_info, setinfo] = useState({
    truck_id: null,
    brand: "",
    model: "",
    year: null,
  });

  useEffect(() => {
    if (Step1) {
      setForm(Step1);
    }
  }, []);
  const [documents, setdocument] = useState({
    documentType: "Registration",
    documentNumber: "",
    issueDate: "",
    expirationDate: "",
    documents: "",
  });
  // useEffect(()=>{
  //   if(user && user?.loggedIn){
  //     history.push('/')
  //   }
  // },[])
  const [images, setimages] = useState([]);
  const [ProtofolioError, setProtofolioError] = useState(false);
  const DestinationAddress = async (e) => {

    let address = {};
    if (e.place) {
      address = await addressModel.getAddress(e.place);
    }

    setForm({
      ...form,
      address: e.value || "",
      city: address.city || "",
      state: address.state || "",
      country: address.country || "",
      pincode: address.zipcode || "",
      lat: `${address.lat}` || "",
      lng: `${address.lng}` || "",
    });
  };
  const HandleCLickhere = (e) => {
    e.preventDefault();
    loader(true);
    ApiClient.post(`resend/verification`, { email: email }).then((response) => {
      if (response.success) {
        toast.success(response.message);
      }
      loader(false);
    });
  };

  const arry = [
    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991,
    1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
    2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
    2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
  ];
  const handleSubmit = (e) => {
    e.preventDefault();

    loader(true);

    if (
      !form?.address ||
      !form?.city ||
      !form?.state ||
      !form?.pincode ||
      !form?.country
    ) {
      return false;
    }
    loader(true);
    let value = {
      address: form?.address,
      city: form?.city,

      state: form?.state,

      lat: form?.lat,
      lng: form?.lng,
      pincode: form?.pincode,
      country: form?.country,
    };
    loader(false);
    localStorage.setItem("Address", JSON.stringify(value));
    history("/signup-step-2");

    // ApiClient.post('register', value).then((res) => {
    //   if (res.success) {
    //       toast.success(res?.message)
    //       localStorage.removeItem('Step1')
    //       localStorage.removeItem('Step2')

    //       history.push('/login')
    //   }
    // })
  };
  useEffect(() => {
    // Add the LinkedIn tracking script
    const script = document.createElement("script");
    script.type = "text/javascript";
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
    const noscriptImg = document.createElement("img");
    noscriptImg.height = 1;
    noscriptImg.width = 1;
    noscriptImg.style.display = "none";
    noscriptImg.alt = "";
    noscriptImg.src =
      "https://px.ads.linkedin.com/collect/?pid=6323372&fmt=gif";
    document.body.appendChild(noscriptImg);

    // Clean up the script and image when the component unmounts
    return () => {
      document.head.removeChild(script);
      document.body.removeChild(noscriptImg);
    };
  }, []);
  return (
    <div className="bg_img main_signup signup-page">
      <div className="center-img  ">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6">
              <div className="right_side ">
                <Link to="/">
                  <div className="logo_image mb-3">
                    <img src="assets/img/logo-m.png" className="logo_name" />
                  </div>
                </Link>

                <form
                  autoComplete="off"
                  className="centerLogin"
                  onSubmit={handleSubmit}
                >
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
                  <div className="row">
                    <div className="col-md-12">
                      <div className="progressbar-num">
                        <ProgressBar
                          percent={percent}
                          filledBackground="linear-gradient(to right,rgb(63 85 158), rgb(150 162 201))"
                        >
                          <Step transition="scale">
                            {({ accomplished }) => (
                              // <img

                              //   style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                              //   width=""
                              //   src="https://cdn-icons-png.flaticon.com/512/4335/4335542.png"
                              // />
                              <div className="non-activebar">1</div>
                            )}
                          </Step>
                          <Step transition="scale">
                            {({ accomplished }) => (
                              // <img

                              //   style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                              //   width=""
                              //   src="https://cdn-icons-png.flaticon.com/512/2554/2554978.png"
                              // />
                              <div className="activebar">2</div>
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
                      </div>
                    </div>
                  </div>
                  <div className="tab-content mt-5" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <>
                        <div className="scrollbar-height">
                          <h4 className="mb-2">Address </h4>
                          <div className="row ">
                            <div className="col-md-12 mb-3">
                              <label className="form-label ml-2 ">
                                Address
                                <span className="text-danger">*</span>
                              </label>
                              <GooglePlaceAutoComplete
                                value={form?.address}
                                result={DestinationAddress}
                                placeholder="Address"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label ml-2">
                                State
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={form?.state}
                                required
                                name="state"
                                placeholder="State"
                                onChange={(e) => {
                                  setForm({ ...form, state: e.target.value });
                                }}
                                // onBlur={handleBlur}
                                className="form-control bginput chnages"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label ml-2">
                                City
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={form?.city}
                                required
                                name="state"
                                placeholder="City"
                                onChange={(e) => {
                                  setForm({ ...form, city: e.target.value });
                                }}
                                // onBlur={handleBlur}
                                className="form-control bginput chnages"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label ml-2">
                                Zipcode
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="number"
                                pattern="^[a-zA-Z0-9]+$"
                                onKeyPress={(e) => {
                                  var regex = new RegExp("^[a-zA-Z0-9]+$");
                                  var key = String.fromCharCode(
                                    !e.charCode ? e.which : e.charCode
                                  );
                                  if (!regex.test(key)) {
                                    e.preventDefault();
                                    return false;
                                  }
                                }}
                                min={0}
                                value={form?.pincode}
                                required
                                name="pincode"
                                placeholder="Zipcode"
                                onChange={(e) => {
                                  setForm({ ...form, pincode: e.target.value });
                                }}
                                // onBlur={handleBlur}
                                className="form-control bginput chnages"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label ml-2">
                                Country
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={form?.country}
                                required
                                name="pincode"
                                placeholder="Country"
                                onChange={(e) => {
                                  setForm({ ...form, country: e.target.value });
                                }}
                                // onBlur={handleBlur}
                                className="form-control bginput chnages"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 d-flex justify-content-end gap-2 mt-3">
                          <a
                            onClick={() => {
                              history("/signup");
                            }}
                            className=" btn-save width-set"
                          >
                            Back
                          </a>
                          <button
                            type="submit"
                            className="btn dark-btn width-set"
                          >
                            Next
                          </button>
                        </div>
                      </>
                    </div>
                  </div>

                  {/* end tab */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
