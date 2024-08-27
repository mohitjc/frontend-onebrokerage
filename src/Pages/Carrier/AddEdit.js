import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import { Tooltip } from "antd";
import FormControl from "../../components/common/FormControl";
import shared from "./shared";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";

const AddEdit = () => {
  const { id } = useParams();

  // Define form state with updated keys
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    position: "",
    telephoneExt: "",
    telephoneNo: "",
    email: "",
    company_name: "",
    fax_number: "",
    tax_number: "",
    mc_number: "",
    dot_number: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    team_truck: "",
    solo_truck: "",
    trailers_number: "",
    trailer_type: [], // For multiple checkbox options
    board_id: [], // For multiple checkbox options
  });

  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const inValidEmail = methodModel.emailvalidation(form?.email);
  const [Boards, setBoards] = useState([]);

  // Form validation rules
  const formValidation = [
    { key: "firstName", required: true },
    { key: "email", required: true, message: "Email is required", email: true },
    { key: "company_name", required: true },
    { key: "tax_number", required: true },

    { key: "address", required: true },
    { key: "city", required: true },
    { key: "state", required: true },
    { key: "country", required: true },
    { key: "pincode", required: true },
  ];

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  //   let invalid = methodModel.getFormError(formValidation, form);

  //   if (invalid) return;

  //   let method = id ? "put" : "post";
  //   let url = id ? shared.editApi : shared.addApi;
  //   let value = {
  //     ...form,
  //     role: "carrier",
  //   };

  //   // Only include trailer_type if it has any values
  //   if (value.trailer_type.length === 0) {
  //     delete value.trailer_type;
  //   }

  //   // Include id in payload if it's an edit
  //   if (id) {
  //     value.id = id;
  //   }

  //   loader(true);
  //   ApiClient.allApi(url, value, method).then((res) => {
  //     if (res.success) {
  //       history(`/${shared.url}`);
  //     }
  //     loader(false);
  //   });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid) return;

    let method = id ? "put" : "post";
    let url = id ? shared.editApi : shared.addApi;
    let value = { ...form };

    // Only include role if it’s the add case
    if (!id) {
      value.role = "carrier";
    }

    // // Only include trailer_type if it has any values
    // if (value.trailer_type && value.trailer_type.length === 0) {
    //   delete value.trailer_type;
    // }

    // Include id in payload if it's an edit
    if (id) {
      value.id = id;
    }

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        history(`/${shared.url}`);
        toast.success(res?.message);
      }
      loader(false);
    });
  };

  // i want this role is goes only in  add case not in edit case
  useEffect(() => {
    if (id) {
      loader(true);
      ApiClient.get(shared.detailApi, { id }).then((res) => {
        if (res.success) {
          let value = res.data;
          let payload = form;

          Object.keys(payload).map((itm) => {
            payload[itm] = value[itm];
          });

          setForm({
            ...payload,
          });
        }
        loader(false);
      });
    }
  }, [id]);

  const handleCheckboxChange = (e, key) => {
    const { value, checked } = e.target;
    const mappedValue = value === "dry_van" ? "dry_van" : "reefer";

    setForm((prevForm) => {
      const updatedValues = checked
        ? [...prevForm[key], mappedValue]
        : prevForm[key].filter((item) => item !== mappedValue);

      return {
        ...prevForm,
        [key]: updatedValues,
      };
    });
  };

  const handleCheckboxChangee = (e, id) => {
    const checked = e.target.checked;
    setForm((prevState) => ({
      ...prevState,
      board_id: checked
        ? [...prevState.board_id, id]
        : prevState.board_id.filter((boardId) => boardId !== id),
    }));
  };

  const GetBoards = () => {
    ApiClient.get("boards", { status: "active" }).then((res) => {
      if (res.success) {
        setBoards(res?.data?.data);
      }
    });
  };

  useEffect(() => {
    GetBoards();
  }, []);

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="pprofile1">
          <div className="flex items-center mb-8">
            <Tooltip placement="top" title="Back">
              <Link
                to={`/${shared.url}`}
                className="!px-4 py-2 flex items-center justify-center rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all mr-3"
              >
                <i className="fa fa-angle-left text-lg"></i>
              </Link>
            </Tooltip>
            <div>
              <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                {id ? "Edit" : "Add"} {shared.addTitle}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="mb-3">
              <FormControl
                type="text"
                label="First Name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e })}
                required
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e })}
              />
            </div>
            <div className="mb-3">
              <label>
                Position <span className="text-danger">*</span>
              </label>
              <select
                className="form-control"
                value={form.position}
                onChange={(e) => {
                  setForm({ ...form, position: e.target.value });
                }}
              >
                <option value="">Select Position</option>
                <option value="owner">Owner</option>
                <option value="manager">Manager</option>
                <option value="accounting_manager">Account Manager</option>
                <option value="dispatcher">Dispatcher</option>
              </select>
              {submitted && !form.position && (
                <div className="invalid-feedback d-block">
                  Position is Required
                </div>
              )}
            </div>
            <div className="mb-3">
              <div className="w-100 d-inline-flex">
                <label className="d-block">
                  Mobile No<span className="star">*</span>
                </label>
                <PhoneInput
                  value={form.telephoneExt + form.telephoneNo}
                  countryCodeEditable={true}
                  enableSearch={true}
                  placeholder=""
                  country="us"
                  onChange={(phone, country) => {
                    let phonenumber = phone.replace(country.dialCode, "");
                    setForm({
                      ...form,
                      telephoneExt: country.dialCode,
                      telephoneNo: phonenumber,
                    });
                  }}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e })}
                required
                disabled={id ? true : false}
              />
              {form.email && submitted && !inValidEmail && (
                <div className="invalid-feedback d-block">
                  Please enter a valid email
                </div>
              )}
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="Company Name"
                value={form.company_name}
                onChange={(e) => setForm({ ...form, company_name: e })}
                required
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="Fax Number"
                value={form.fax_number}
                onChange={(e) => setForm({ ...form, fax_number: e })}
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="Tax Number"
                value={form.tax_number}
                onChange={(e) => setForm({ ...form, tax_number: e })}
                required
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="MC Number"
                value={form.mc_number}
                onChange={(e) => setForm({ ...form, mc_number: e })}
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="DOT Number"
                value={form.dot_number}
                onChange={(e) => setForm({ ...form, dot_number: e })}
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="Address*"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e })}
                required
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e })}
                required
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e })}
                required
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="Country*"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e })}
                required
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="Pincode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e })}
                required
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="Team Truck"
                value={form.team_truck}
                onChange={(e) => setForm({ ...form, team_truck: e })}
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="Solo Truck"
                value={form.solo_truck}
                onChange={(e) => setForm({ ...form, solo_truck: e })}
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="text"
                label="Trailers Number"
                value={form.trailers_number}
                onChange={(e) => setForm({ ...form, trailers_number: e })}
              />
            </div>
            <div className="mb-3">
              <label>Trailer Types</label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="dry_van"
                    checked={form.trailer_type.includes("dry_van")}
                    onChange={(e) => handleCheckboxChange(e, "trailer_type")}
                  />
                  Dry Van
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="reefer"
                    checked={form.trailer_type.includes("reefer")}
                    onChange={(e) => handleCheckboxChange(e, "trailer_type")}
                  />
                  Reefer
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label>Boards</label>
              <div>
                {Boards.map((board) => (
                  <label key={board.id}>
                    <input
                      type="checkbox"
                      checked={form.board_id.includes(board.id)}
                      onChange={(e) => handleCheckboxChangee(e, board.id)}
                    />
                    {board.name}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="btn btn-primary">
              {id ? "Update" : "Add"} {shared.addTitle}
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default AddEdit;
