import { useEffect, useState } from "react";
import loader from "../../methods/loader";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import "./style.scss";
import methodModel from "../../methods/methods";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import PhoneInput from "react-phone-input-2";
import ApiClient from "../../methods/api/apiClient";
import { MdCheck } from "react-icons/md";
export default function Step2() {
  const params = new URLSearchParams(window.location.search);
  let Step1 = JSON.parse(localStorage.getItem("Step1"));
  let Step2 = JSON.parse(localStorage.getItem("Step2"));
  const [percent, setPercent] = useState(50);
  const [identity, setIdentity] = useState(null);
  const history = useNavigate();
  const [form, setForm] = useState({
    fax_number: "",
    tax_number: "",
    company_name: "",
    dot_number: "",
    mc_number: "",
  });

  useEffect(() => {
    // ApiClient.get(`carrier/info?identification_number=${Step1?.identification_number}`).then((res) => {
    //   setIdentity(res?.data?.mc_description)
    //   setForm({ mc_description: res?.data?.mc_description, dot_description: res?.data?.dot_description })
    // })
  }, []);

  useEffect(() => {
    setForm({ ...form, telephoneExt: "+1" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form?.company_name) {
      return false;
    }
    loader(true);
    localStorage.setItem("Step2", JSON.stringify(form));

    setTimeout(() => {
      loader(false);
      history("/signup-step-3");
    }, 400);
  };

  useEffect(() => {
    if (!Step1) {
      history("/signup");
    }
  }, []);

  useEffect(() => {
    if (Step2) {
      setForm(Step2);
    }
  }, []);
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
  const setvalue=(e)=>
  {
    var regex = new RegExp("^[a-zA-Z0-9]*$");
       var key = e.target.value
           if (!regex.test(key.replaceAll(" ",""))) {
               e.preventDefault();
                return false;
          }
          else
          {
            setForm({
              ...form,
              company_name: e.target.value,
            })
          }
  }
  return (
    <AuthLayout>
    <div className="">
    <form className="" onSubmit={handleSubmit}>
                  
                  <div className="">
                    <div className="">
                      <div className="progressbar-num">
                        <ProgressBar
                          percent={percent}
                           filledBackground="linear-gradient(to right,rgb(74 81 155), rgb(24 81 155))"
                        >
                          <Step transition="scale">
                            {({ accomplished }) => (
                              // <img

                              //   style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                              //   width="30"
                              //   src="https://cdn-icons-png.flaticon.com/512/4335/4335542.png"
                              // />
                              <div className="non-activebar"><MdCheck /></div>
                            )}
                          </Step>
                          <Step transition="scale">
                            {({ accomplished }) => (
                              // <img

                              //   style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                              //   width="30"
                              //   src="https://cdn-icons-png.flaticon.com/512/2554/2554978.png"
                              // />
                              <div className="non-activebar"><MdCheck /></div>
                            )}
                          </Step>
                          <Step transition="scale">
                            {({ accomplished }) => (
                              // <img

                              //   style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                              //   width="30"
                              //   src="https://cdn.icon-icons.com/icons2/2387/PNG/512/card_document_documents_driving_license_car_data_sheet_icon_144605.png"
                              // />
                              <div className="activebar">3</div>
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
                                Company Information
                              </h4>
                            </div>
                            <div className="col-md-6 mb-3">
                              
                              <input
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
                                type="text"
                                value={form.company_name}
                                // pattern="^[a-zA-Z0-9\\s]*$"
                                // onKeyPress={(e) => {
                                //   var regex = new RegExp("^[a-zA-Z0-9]*$");
                                //   var key = e.target.value
                                //   if (!regex.test(key.replaceAll(" ",""))) {
                                //     e.preventDefault();
                                //     return false;
                                //   }
                                // }}
                                onChange={(e) =>setvalue(e)}
                                placeholder=" Company Name "
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                            
                              <div className="phoneInput_cls d-flex form-control p-0">
                                

                              <PhoneInput
                                      country={'us'}
                                      value={form?.dialCode}
                                      countryCodeEditable={false}
                                      enableSearch={true}
                                      placeholder=""
                                      onChange={(phone, country) => {
                                        setForm({
                                          ...form,
                                          dialCode: country.dialCode,
                                        });
                                      }}
                                    />

                                    <input
                                      type="text"
                                      className="form-control phph"
                                      placeholder="Mobile No."
                                      value={(form && form.mobileNo) || ''}
                                      maxLength={12}
                                      onChange={(e) =>
                                        setForm({
                                          ...form,
                                          mobileNo: methodModel.isNumber(e),
                                        })
                                      }
                                    />
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                             
                              <input
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
                                type="text"
                                value={form?.fax_number}
                                name="fax"
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
                                // minLength="8"
                                onChange={(e) => {
                                  setForm({
                                    ...form,
                                    fax_number: e.target.value,
                                  });
                                }}
                                placeholder="Fax Number"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                            
                              <input
                                type="text"
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
                                placeholder="Tax Number"
                                value={form?.tax_number}
                                required
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
                                onChange={(e) => {
                                  setForm({
                                    ...form,
                                    tax_number: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="col-md-6 mb-3 ">
                           
                              <input
                                cols={50}
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
                                type="number"
                                min={0}
                                required
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
                                disabled={identity ? true : false}
                                value={form?.mc_number}
                                name="fax"
                                // minLength="8"
                                onChange={(e) => {
                                  setForm({
                                    ...form,
                                    mc_number: e.target.value,
                                  });
                                }}
                                placeholder="MC #"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                             
                              <input
                                // cols={10}
                                required
                                min={0}
                                className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
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
                                disabled={identity ? true : false}
                                value={form?.dot_number}
                                name="fax"
                                // minLength="8"
                                onChange={(e) => {
                                  setForm({
                                    ...form,
                                    dot_number: e.target.value,
                                  });
                                }}
                                placeholder="DOT #"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 mt-4">
                          <a
                            onClick={() => {
                              history("/signup-step-1");
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
