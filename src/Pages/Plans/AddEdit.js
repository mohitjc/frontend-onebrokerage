import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Layout from "../../components/global/layout";
import { Tooltip } from "antd";
import { toast } from "react-toastify";

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
      ApiClient.get("plan", { id }).then((res) => {
        if (res.success) {
          const value = res.data;

          // Set form values
          setForm({
            name: value.name || "",
            monthlyPrice: value.pricing.find(p => p.interval_count === 1)?.unit_amount || "",
            threeMonthPrice: value.pricing.find(p => p.interval_count === 3)?.unit_amount || "",
            sixMonthPrice: value.pricing.find(p => p.interval_count === 6)?.unit_amount || "",
            yearlyPrice: value.pricing.find(p => p.interval_count === 12)?.unit_amount || "",
          });

          // Set selected features
          const selectedFeatureIds = value.features
            .filter(feature => feature.isChecked)
            .map(feature => feature.id);

          setSelectedFeatures(selectedFeatureIds);
        }
        loader(false);
      });
    }
  }, [id]);

  const handleFeatureChange = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!form.name || (!isEditMode && (!form.monthlyPrice || !form.threeMonthPrice || !form.sixMonthPrice || !form.yearlyPrice))) {
      return;
    }

    const method = id && copy === "false" ? "put" : "post";
    const url = "plan";

    // Prepare the pricing array if not in edit mode
    const pricing = !isEditMode ? [
      {
        interval: "month",
        interval_count: 1,
        currency: "usd",
        unit_amount: form.monthlyPrice
      },
      {
        interval: "month",
        interval_count: 3,
        currency: "usd",
        unit_amount: form.threeMonthPrice
      },
      {
        interval: "month",
        interval_count: 6,
        currency: "usd",
        unit_amount: form.sixMonthPrice
      },
      {
        interval: "month",
        interval_count: 12,
        currency: "usd",
        unit_amount: form.yearlyPrice
      },
    ] : [];

    // Prepare the features array
    const featuresPayload = features.map((feature) => ({
      id: feature.id,
      isChecked: selectedFeatures.includes(feature.id),
    }));

    const value = {
      name: form.name,
      pricing: !isEditMode ? pricing : undefined, // Include pricing only in add mode
      features: featuresPayload,
      addedBy: user._id,
      id: id,
    };

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
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
        <div className="pprofile1">
          <div className="flex items-center mb-8">
            <Tooltip placement="top" title="Back">
              <Link
                to="/plans"
                className="!px-4 py-2 flex items-center justify-center rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all mr-3"
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

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <label>
                Name<span className="star">*</span>
              </label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* Pricing Inputs */}
            {["monthlyPrice", "threeMonthPrice", "sixMonthPrice", "yearlyPrice"].map((key, index) => (
              <div className="col-span-12 md:col-span-12" key={index}>
                <hr className="borderHr" />
                <h5 className="monthTerm">
                  Term: {key === "monthlyPrice" ? "1 Month" : key === "threeMonthPrice" ? "3 Months" : key === "sixMonthPrice" ? "6 Months" : "12 Months"}<span className="star">*</span>
                </h5>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-4 pl-3 mb-3">
                    <label>
                      Price<span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      required
                      disabled={isEditMode} // Disable inputs in edit mode
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Features Section */}
            <div className="col-span-12 md:col-span-12">
              <hr className="borderHr" />
              <div className="mt-3 mb-6">
                <h5 className="text-2xl font-semibold text-[#111827]">Features</h5>
              </div>
              <div className="grid grid-cols-12 gap-4">
                {features?.map((category) => (
                  <div className="col-span-12 md:col-span-4 mb-3" key={category.id}>
                    <div className="col-span-12 md:col-span-11 mt-2 ml-2">
                      <label className="form-check-label pointer">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedFeatures.includes(category.id)}
                          onChange={() => handleFeatureChange(category.id)}
                        
                        />
                        {category.name}
                      </label>
                    </div>
                  </div>
                ))}
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
        </div>
      </form>
    </Layout>
  );
};

export default AddEditPlan;
