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
import environment from "../../environment";

const AddEdit = () => {
  const { id } = useParams();

  // Define form state
  const [form, setForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    position: "",
    mobileNo: "",
    email: "",
    companyName: "",
    faxNumber: "",
    taxNumber: "",
    mcNumber: "",
    dotNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    totalTrailer: "",
    soloTruck: "",
    teamTruck: "",
    trailerType: [], // For multiple checkbox options
    selectBoard: []  // For multiple checkbox options
  });

  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const inValidEmail = methodModel.emailvalidation(form?.email);

  // Form validation rules
  const formValidation = [
    { key: "firstName", required: true },
    { key: "email", required: true, message: "Email is required", email: true },
    { key: "companyName", required: true },
    { key: "taxNumber", required: true },
    { key: "mcNumber", required: true },
    { key: "dotNumber", required: true },
    { key: "address", required: true },
    { key: "city", required: true },
    { key: "state", required: true },
    { key: "country", required: true },
    { key: "zipCode", required: true }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid) return;
    let method = "post";
    let url = shared.addApi;
    let value = {
      ...form,
      role: environment.userRoleId,
    };

    if (value.id) {
      method = "put";
      url = shared.editApi;
    } else {
      delete value.id;
    }

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        // ToastsStore.success(res.message)
        history(`/${shared.url}`);
      }
      loader(false);
    });
  };

  useEffect(() => {
    if (id) {
      loader(true);
      ApiClient.get(shared.detailApi, { id }).then((res) => {
        if (res.success) {
          let value = res.data;
          setForm({
            ...value,
            trailerType: value.trailerType || [],
            selectBoard: value.selectBoard || []
          });
        }
        loader(false);
      });
    }
  }, [id]);

  const handleCheckboxChange = (e, key) => {
    const { value, checked } = e.target;
    setForm((prevForm) => {
      const updatedValues = checked
        ? [...prevForm[key], value]
        : prevForm[key].filter((item) => item !== value);

      return {
        ...prevForm,
        [key]: updatedValues
      };
    });
  };

  return (
    <>
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
                  {form && form.id ? "Edit" : "Add"} {shared.addTitle}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="mb-3">
                <FormControl
                  type="text"
                  label="First Name*"
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
                <FormControl
                  type="text"
                  label="Position"
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e })}
                />
              </div>
              <div className="mb-3">
                <FormControl
                  type="text"
                  label="Mobile No*"
                  value={form.mobileNo}
                  onChange={(e) => setForm({ ...form, mobileNo: e })}
                  required
                />
              </div>
              <div className="mb-3">
                <FormControl
                  type="text"
                  label="Email*"
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
                  label="Company Name*"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e })}
                  required
                />
              </div>
              <div className="mb-3">
                <FormControl
                  type="text"
                  label="Fax Number"
                  value={form.faxNumber}
                  onChange={(e) => setForm({ ...form, faxNumber: e })}
                />
              </div>
              <div className="mb-3">
                <FormControl
                  type="text"
                  label="Tax Number*"
                  value={form.taxNumber}
                  onChange={(e) => setForm({ ...form, taxNumber: e })}
                  required
                />
              </div>
              <div className="mb-3">
                <FormControl
                  type="text"
                  label="MC#*"
                  value={form.mcNumber}
                  onChange={(e) => setForm({ ...form, mcNumber: e })}
                  required
                />
              </div>
              <div className="mb-3">
                <FormControl
                  type="text"
                  label="DOT#*"
                  value={form.dotNumber}
                  onChange={(e) => setForm({ ...form, dotNumber: e })}
                  required
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
                  label="City*"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e })}
                  required
                />
              </div>
              <div className="mb-3">
                <FormControl
                  type="text"
                  label="State*"
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
                  label="Zipcode*"
                  value={form.zipCode}
                  maxlength="6"
                  onChange={(e) => setForm({ ...form, zipCode: e })}
                  required
                />
              </div>
              <div className="mb-3">
                <FormControl
                  type="text"
                  label="Total Trailer*"
                  value={form.totalTrailer}
                  onChange={(e) => setForm({ ...form, totalTrailer: e })}
                  required
                />
              </div>
              <div className="mb-3">
                <FormControl
                  type="text"
                  label="Solo Truck*"
                  value={form.soloTruck}
                  onChange={(e) => setForm({ ...form, soloTruck: e })}
                  required
                />
              </div>
              <div className="mb-3">
                <FormControl
                  type="text"
                  label="Team Truck*"
                  value={form.teamTruck}
                  onChange={(e) => setForm({ ...form, teamTruck: e })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Trailer Type*
                </label>
                <div className="flex flex-col">
                  {["Dry Van", "Reefer"].map((type) => (
                    <label key={type} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={type}
                        checked={form.trailerType.includes(type)}
                        onChange={(e) => handleCheckboxChange(e, "trailerType")}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Select Board*
                </label>
                <div className="flex flex-col">
                  {["Weekly bids", "USPS", "RFPs"].map((board) => (
                    <label key={board} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={board}
                        checked={form.selectBoard.includes(board)}
                        onChange={(e) => handleCheckboxChange(e, "selectBoard")}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{board}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="text-white bg-[#494f9f] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default AddEdit;
