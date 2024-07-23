import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import statusModel from "../../models/status.model";
import { Tooltip } from "antd";
import FormControl from "../../components/common/FormControl";
import timezoneModel from "../../models/timezone.model";
import shared from "./shared";
import datepipeModel from "../../models/datepipemodel";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import ImageUpload from "../../components/common/ImageUpload";
import MultiSelectDropdown from "../../components/common/MultiSelectDropdown";
import Swal from "sweetalert2";

let options = [
  { name: "login", id: "login" },
  { name: "Add reviews", id: "Add Reviews" },
  { name: "My favorite ", id: "My Favorite" },
];
let productTypeoptions = [
  { id: "Therapeutic Use", name: "Therapeutic Benefits" },
  { id: "Health & Wellness", name: "Health Benefits" },
];
const AddEditReward = () => {
  const { id } = useParams();
  const [form, setform] = useState({
    reward_points: "",
    transaction_for: "",
  });
  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);

  const formValidation = [
    {
      key: "reward_points",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);
    if (invalid || !form.reward_points) return;
    let method = "post";
    let url = "settings/add";
    let value;
    value = {
      ...form,
    };

    if (id) {
      method = "put";
      url = "settings/update";
      value = {
        ...form,
        id: id,
      };
    } else {
      delete value.id;
    }
    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success == true || res?.code == 200) {
        history("/rewardpoints");
        loader(false);
      } else {
        loader(false);
      }
    });
  };

  useEffect(() => {
    if (id) {
      loader(true);
      ApiClient.get(shared.detailApi, { id }).then((res) => {
        if (res.success) {
          setform({
            ...form,
            reward_points: res?.data?.reward_points,
            transaction_for: res?.data?.transaction_for,
          });
        }
        loader(false);
      });
    }
  }, [id]);

  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="pprofile1">
            <div className="flex items-center mb-8">
              <Tooltip placement="top" title="Back">
                <Link
                  to={`/${shared.url}`}
                  className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3"
                >
                  <i className="fa fa-angle-left text-lg"></i>
                </Link>
              </Tooltip>
              <div>
                <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                  {id ? "Edit" : "Add"} {shared.addTitle}
                </h3>
                {/* <p class="text-xs lg:text-sm font-normal text-[#75757A]">
                  Here you can see all about your {shared.addTitle}
                </p> */}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 ">
                <FormControl
                  type="select"
                  name="transaction_for"
                  label="Tranaction for"
                  value={form.transaction_for}
                  onChange={(e) => {
                    setform({ ...form, transaction_for: e });
                  }}
                  options={options}
                  theme="search"
                  required
                  disabled={form.transaction_for}
                />
              </div>

              <div className="col-span-12  md:col-span-6 pl-3 mb-3">
                <label>
                  Reward Points
                  <span className="star">*</span>
                </label>
                <input
                  className="relative  border bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                  value={form?.reward_points || ""}
                  maxLength="10"
                  onChange={(e) => {
                    setform({
                      ...form,
                      reward_points: methodModel.isNumber(e),
                    });
                  }}
                />
                {submitted && !form?.reward_points ? (
                  <div className="text-danger text-[12px] mt-[3px]">
                    Reward points are required
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="text-white bg-[#EB6A59] bg-[#EB6A59] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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

export default AddEditReward;
