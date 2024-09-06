import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Layout from "../../components/global/layout";
import { Tooltip } from "antd";
import { toast } from "react-toastify";
import shared from "./shared";

const AddEditPlan = () => {
  const [features, setFeatures] = useState([]);
  const [form, setForm] = useState({
    name: "",
    monthlyPrice: "",
    threeMonthPrice: "",
    sixMonthPrice: "",
    yearlyPrice: "",
  });
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Track if in edit mode
  const [isChecked, setIsChecked] = useState({
    monthly: false,
    threeMonth: false,
    sixMonth: false,
    yearly: false,
  }); // State for checkboxes
  const history = useNavigate();
  const { planid, copy } = useParams();
  const id = planid;
  const user = useSelector((state) => state.user);

  // Fetch all features
  const getFeatures = () => {
    ApiClient.get("features", {
      page: 1,
      count: 100,
      status: "active",
    }).then((res) => {
      if (res.success) {
        setFeatures(res?.data?.data);
      }
    });
  };

  useEffect(() => {
    getFeatures(); // Fetch all features regardless of add or edit

    if (id) {
      setIsEditMode(true); // Set edit mode if id exists
      loader(true);
      ApiClient.get(shared?.detailApi, { id }).then((res) => {
        if (res.success) {
          const value = res.data;

          // Set form values
          setForm({
            name: value.name || "",
            monthlyPrice:
              value?.pricing?.find((p) => p.interval_count === 1)
                ?.unit_amount || "",
            threeMonthPrice:
              value?.pricing?.find((p) => p.interval_count === 3)
                ?.unit_amount || "",
            sixMonthPrice:
              value?.pricing?.find((p) => p.interval_count === 6)
                ?.unit_amount || "",
            yearlyPrice:
              value?.pricing?.find((p) => p.interval_count === 12)
                ?.unit_amount || "",
          });

          // Set selected features
          const selectedFeatureIds = value?.features
            ?.filter((feature) => feature?.isChecked)
            ?.map((feature) => feature?.id);

          setSelectedFeatures(selectedFeatureIds);

          // Set checkbox states based on pricing
          setIsChecked({
            monthly: !!value?.pricing?.find((p) => p.interval_count === 1),
            threeMonth: !!value?.pricing?.find((p) => p.interval_count === 3),
            sixMonth: !!value?.pricing?.find((p) => p.interval_count === 6),
            yearly: !!value?.pricing?.find((p) => p.interval_count === 12),
          });
        }
        loader(false);
      });
    }
  }, [id]);

  const handleFeatureChange = (id) => {
    setSelectedFeatures((prev) =>
      prev?.includes(id) ? prev?.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCheckboxChange = (term) => {
    setIsChecked((prev) => {
      const updated = { ...prev, [term]: !prev[term] };

      // Clear price field if checkbox is unchecked
      if (!updated[term]) {
        setForm((prevForm) => ({
          ...prevForm,
          [`${term}Price`]: "",
        }));
      }

      return updated;
    });
  };

  const handlePriceChange = (e, key) => {
    const value = e.target.value;
    // Prevent negative values
    if (value < 0) return;
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);

  // Validate form data
  if (!form.name ) {
    return;
  }

  const method = id && copy === "false" ? "put" : "post";
  const url = "plan";

  // Prepare the pricing array if in add mode
  const pricing = !isEditMode
    ? [
        isChecked.monthly && {
          interval: "month",
          interval_count: 1,
          currency: "usd",
          unit_amount: form.monthlyPrice,
        },
        isChecked.threeMonth && {
          interval: "month",
          interval_count: 3,
          currency: "usd",
          unit_amount: form.threeMonthPrice,
        },
        isChecked.sixMonth && {
          interval: "month",
          interval_count: 6,
          currency: "usd",
          unit_amount: form.sixMonthPrice,
        },
        isChecked.yearly && {
          interval: "month",
          interval_count: 12,
          currency: "usd",
          unit_amount: form.yearlyPrice,
        },
      ].filter(Boolean)
    : undefined;

  // Prepare the features array
  const featuresPayload = features.map((feature) => ({
    id: feature.id,
    isChecked: selectedFeatures.includes(feature.id),
  }));

  // Prepare the payload
  const value = {
    name: form.name,
    pricing: !isEditMode ? pricing : undefined, // Include pricing only in add mode
    features: featuresPayload,
    addedBy: user._id,
    id: isEditMode ? id : undefined, // Include id only in edit mode
  };

  // Remove undefined fields from the payload
  const cleanValue = Object.fromEntries(Object.entries(value).filter(([_, v]) => v !== undefined));

  loader(true);
  ApiClient.allApi(url, cleanValue, method).then((res) => {
    if (res.success) {
      history("/plans");
      toast.success(res.message);
    }
    loader(false);
  });
};


  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-8">
          <Tooltip placement="top" title="Back">
            <Link
              to="/plans"
              className="!px-4 py-2 cursor-pointer flex items-center justify-center rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all mr-3 bg-[#494f9f] text-white hover:text-black"
            >
              <i className="fa fa-angle-left text-lg"></i>
            </Link>
          </Tooltip>
          <div>
            <h3 className="text-2xl font-semibold text-[#111827]">
              {id && copy === "false" ? "Edit" : "Add"} Plan
            </h3>
            <p className="text-sm font-normal text-[#75757A]">
              Here you can see all about your Plan
            </p>
          </div>
        </div>
        <div className="border overflow-hidden rounded-lg bg-white gap-4 shrink-0 mb-10 ">
          <div className="bg-[#1245940a] p-4 border-b">
            <h3 className="text-[20px] font-[500]">Plan Details</h3>
          </div>

          <div className="grid grid-cols-12 gap-4 p-4">
            <div className="col-span-6">
              <label className="text-[14px] text-[#0000009c] tracking-wider mb-1 block">
                Name<span className="star">*</span>
              </label>
              <input
                type="text"
                className="relative bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden border border-[#00000036] px-3"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 p-4">
            <div className="col-span-12 md:col-span-12">
              <label className="text-[14px] text-[#0000009c] tracking-wider mb-1 block">
                Plans<span className="star">*</span>
              </label>
              <div className="grid grid-cols-12 gap-4 mb-4">
                {[
                  { key: "monthly", label: "1 Month" },
                  { key: "threeMonth", label: "3 Months" },
                  { key: "sixMonth", label: "6 Months" },
                  { key: "yearly", label: "12 Months" },
                ].map((term) => (
                  <div
                    className="col-span-12 lg:col-span-3 md:col-span-6 border bg-[#f5f5f5] rounded-[6px]"
                    key={term.key}
                  >
                    <div className="p-3">
                      <label className="text-sm mb-2 block flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={isChecked[term.key]}
                          onChange={() => handleCheckboxChange(term.key)}
                          disabled={isEditMode}
                        />
                        {term.label}
                      </label>
                      <div>
                        <label className="text-sm mb-2 block">
                          Price<span className="star">*</span>
                        </label>
                        <input
                          type="number"
                          className="relative bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden border border-[#00000036] px-3"
                          value={form[`${term.key}Price`]}
                          onChange={(e) => handlePriceChange(e, `${term.key}Price`)}
                          required
                          disabled={!isChecked[term.key]|| isEditMode} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 p-4">
            <div className="col-span-6">
              <label className="text-[14px] text-[#0000009c] tracking-wider mb-1 block ">
                Features<span className="star">*</span>
              </label>
              <div className="grid grid-cols-12 gap-4 ">
                {features?.map((category) => (
                  <div
                    className="col-span-12 md:col-span-6 mb-3"
                    key={category.id}
                  >
                    <div className="">
                      <label className="form-check-label pointer bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden border border-[#00000036] px-3">
                        <input
                          className="form-check-input "
                          type="checkbox"
                          checked={selectedFeatures?.includes(category?.id)}
                          onChange={() => handleFeatureChange(category?.id)}
                        />
                        {category.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-8 justify-end">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-lg"
            disabled={submitted}
          >
            {id ? "Update Plan" : "Add Plan"}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default AddEditPlan;
// in edit case its send wrong payload send the  same payload are going in the update case