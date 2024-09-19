import { useEffect, useState } from "react";
import loader from "../../methods/loader";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style.scss";
import methodModel from "../../methods/methods";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import PhoneInput from "react-phone-input-2";
import ApiClient from "../../methods/api/apiClient";

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
    <div className="bg_img main_signup signup-page">
      <div className="center-img ">
        <div className="container">
          <div className="row ">
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
                              //   width="30"
                              //   src="https://cdn-icons-png.flaticon.com/512/4335/4335542.png"
                              // />
                              <div className="non-activebar">1</div>
                            )}
                          </Step>
                          <Step transition="scale">
                            {({ accomplished }) => (
                              // <img

                              //   style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                              //   width="30"
                              //   src="https://cdn-icons-png.flaticon.com/512/2554/2554978.png"
                              // />
                              <div className="non-activebar">2</div>
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
                        <div className="scrollbar-height">
                          <div className="row   justify-content-start">
                            <div className="col-md-12">
                              <h4 className="mt-4 mb-3">
                                {" "}
                                Company Information
                              </h4>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label ml-2">
                                Company Name
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control mb-0 bginput chnages"
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
                                placeholder=" Company Name"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="label_profile">Telephone</label>
                              <div className="phoneInput_cls d-flex form-control p-0">
                                <PhoneInput
                                  value={form?.telephoneExt}
                                  countryCodeEditable={false}
                                  enableSearch={true}
                                  placeholder=""
                                  onChange={(phone, country) => {
                                    setForm({
                                      ...form,
                                      telephoneExt: country.telephoneExt,
                                    });
                                  }}
                                  // required
                                />

                                <input
                                  type="text"
                                  className="form-control phph"
                                  placeholder="Telephone No."
                                  value={(form && form.telephoneNo) || ""}
                                  maxLength={10}
                                  onChange={(e) =>
                                    setForm({
                                      ...form,
                                      telephoneNo: methodModel.isNumber(e),
                                    })
                                  }
                                  // required
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label ml-2">
                                Fax Number
                              </label>
                              <input
                                className="form-control mb-0 bginput chnages"
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
                              <label className="form-label ml-2">
                                Tax Number<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control mb-0 bginput chnages"
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
                              <label className="form-label ml-2">
                                MC#<span className="text-danger">*</span>
                              </label>
                              <input
                                cols={50}
                                className="form-control mb-0 bginput chnages"
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
                                placeholder="MC Number"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label ml-2">
                                DOT#<span className="text-danger">*</span>
                              </label>
                              <input
                                // cols={10}
                                required
                                min={0}
                                className="form-control mb-0 bginput chnages"
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
                                placeholder="DOT Number"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 d-flex justify-content-end gap-2 mt-3">
                          <a
                            onClick={() => {
                              history("/signup-step-1");
                            }}
                            className=" btn-save width-set"
                          >
                            Back
                          </a>
                          <button
                            type="submit"
                            className=" btn dark-btn width-set "
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
