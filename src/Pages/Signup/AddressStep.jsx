
import { useEffect, useState } from "react";
import loader from "../../methods/loader";
import AuthLayout from "../../components/AuthLayout";
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
import { MdCheck } from "react-icons/md";
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

  return (
    <AuthLayout>
    <div className="">
    <form
                  autoComplete="off"
                  className=""
                  onSubmit={handleSubmit}
                >
                 
                  <div className="row">
                    <div className="col-md-12">
                      <div className="progressbar-num">
                        <ProgressBar
                          percent={percent}
                        filledBackground="linear-gradient(to right,rgb(74 81 155), rgb(24 81 155))"
                        >
                          <Step transition="scale">
                            {({ accomplished }) => (
                              // <img

                              //   style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                              //   width=""
                              //   src="https://cdn-icons-png.flaticon.com/512/4335/4335542.png"
                              // />
                              <div className="non-activebar"><MdCheck /></div>
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
                        <div className="">
                          <h4 className="mb-2 text-white">Address </h4>
                          <div className=" ">
                            <div className="w-full">
                             
                              <GooglePlaceAutoComplete
                                value={form?.address}
                                result={DestinationAddress}
                                placeholder="Address"
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
                              />
                            </div>
                            <div className="">
                             
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
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
                              />
                            </div>
                            <div className="">
                            
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
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
                              />
                            </div>
                            <div className="">
                             
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
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
                              />
                            </div>
                            <div className="">
                              
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
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 mt-4">
                          <a
                            onClick={() => {
                              history("/signup");
                            }}
                            className="bg-white px-4 py-2 rounded-lg text-black border border-gray text-sm "
                          >
                            Back
                          </a>
                          <button
                            type="submit"
                            className="bg-primary px-4 py-2 rounded-lg text-white text-sm"
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
    </AuthLayout>
  );
}
