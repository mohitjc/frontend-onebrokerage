import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from "react-redux";
import methodModel from "../../methods/methods";
import { roleType } from "../../models/type.model";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PageLayout from "../../components/global/PageLayout";
import { toast } from "react-toastify";
import environment from "../../environment";
import PhoneInput from "react-phone-input-2";
import ImageUpload from "../../components/common/ImageUpload";
import addressModel from "../../models/address.model";
import FormControl from "../../components/common/FormControl";
import { Tooltip } from "antd";
import shared from "./shared";
import { FaSuperpowers, FaUserAlt } from "react-icons/fa";
import { FaFileZipper, FaLocationDot } from "react-icons/fa6";
import { IoIosCamera } from "react-icons/io";
import GooglePlaceAutoComplete from "../../components/common/GooglePlaceAutoComplete";
const AddEdit = () => {
  const { id, CarrierID } = useParams();
  const [PermissionId, setPermissionId] = useState("");
  const [form, setForm] = useState(roleType);
  const history = useNavigate();
  const [permission, setPermission] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const [images, setImages] = useState({ image: "" });
  const [role, setRole] = useState("staff");
  const [emailErr, setEmailErr] = useState("");
  const [AllRead, setisAllRead] = useState(false);
  const [AllEdit, setAllEdit] = useState(false);
  const [AllDelete, setAllDelete] = useState(false);
  const [AllAdd, setAllaDD] = useState(false);
  const [editCheck, setEditTrue] = useState(true);
  const [emailLoader, setEmailLoader] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const param1 = searchParams.get("role");

  const defaultvalue = () => {
    let keys = { ...roleType };
    Object.keys(roleType).map((itm) => {
      if (itm != "permissions") keys[itm] = "";
    });
    Object.keys(roleType.permissions).map((itm) => {
      keys.permissions[itm] = false;
    });
    keys.status = "active";
    return keys;
  };

  const emailvalidation = () => {
    if (form?.email) {
      let splitEmail = form?.email?.split("@")[1]
      if (splitEmail && (splitEmail.includes("yahoo.com") || splitEmail.includes("gmail.com") || splitEmail.includes("outlook.com") || splitEmail.includes("hotmail.com"))) {
        return false
      }
      else {
        return true
      }
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!id) {
      if (
        !emailvalidation() ||
        !form?.address ||
        !role ||
        !form?.firstName ||
        // !form?.dialCode ||
        // !form.mobileNo ||
        !form?.pincode ||
        !form?.city ||
        !form?.state ||
        !form?.country
      ) {
        return;
      }
    } else {
      if (
        (role != "staff" && !form?.address) ||
        !role ||
        // !form?.dialCode ||
        // !form.mobileNo ||
        !form?.pincode ||
        !form?.city ||
        !form?.state ||
        !form?.country
      ) {
        return;
      }
    }

    let method = "post";
    let url = shared?.addApi;
    let value = {
      firstName: form?.firstName,
      lastName: form?.lastName,
      address: form?.address,
      mobileNo: form?.mobileNo,
      dialCode: form?.dialCode,
      image: form?.image,
      email: form?.email,
      role: role,
      country: form?.country,
      city: form?.city,
      state: form?.state,
      pincode: form?.pincode,
    };

    setForm({
      ...form,
      permissions: {
        ...form?.permissions,
        // carrier_complete_access: handlecompleteAccess(),
      },
    });

    value = {
      firstName: form?.firstName,
      lastName: form?.lastName,
      address: form?.address,
      mobileNo: form?.mobileNo,
      dialCode: form?.dialCode,
      image: form?.image,
      email: form?.email,
      country: form?.country,
      city: form?.city,
      state: form?.state,
      role: role,
      pincode: form?.pincode,

      permissions: form?.permissions,
    };
    //   value = {
    //     ...value,
    //     permissions: {
    //       ...value?.permissions,
    //       carrier_complete_access: handlecompleteAccess(),
    //     },
    //   };

    if (id) {
      method = "put";
      url = shared?.editApi;
      if (form?.role == "staff") {
        value = {
          firstName: form?.firstName,
          lastName: form?.lastName,
          address: form?.address,
          mobileNo: form?.mobileNo,
          dialCode: form?.dialCode,
          image: form?.image,
          permissions: { ...form?.permissions, id: permission?.id },
          id: form?.id,
          country: form?.country,
          city: form?.city,
          state: form?.state,
          pincode: form?.pincode,
        };
      } else {
        value = {
          firstName: form?.firstName,
          lastName: form?.lastName,
          address: form?.address,
          mobileNo: form?.mobileNo,
          dialCode: form?.dialCode,
          image: form?.image,
          id: form?.id,
          country: form?.country,
          city: form?.city,
          state: form?.state,
          pincode: form?.pincode,
        };
      }
      //   value = {
      //     ...value,
      //     permissions: {
      //       ...value?.permissions,
      //       carrier_complete_access: handlecompleteAccess(),
      //     },
      //   };
    } else {
      delete value.id;
    }
    delete value?.confirmPassword;
    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        toast.success(res.message);
        history("/carrierstaff");
      }
      loader(false);
    });
  };

  const setpermission = (key, value) => {
    const start = key.lastIndexOf('_');
    var newKey = key.substring(0, start);
    let newValue = true
    let Readcheckbox = ""
    if (key == newKey + "_add" || key == newKey + "_edit" || key == newKey + "_delete") {
      Readcheckbox = newKey + "_get"
    }

    if (id) {
      if (Readcheckbox) {
        setForm({
          ...form,
          permissions: {
            ...form.permissions,
            id: PermissionId,
            [Readcheckbox]: newValue,
            [key]: value,
          },
        });
      }
      else {
        setForm({
          ...form,
          permissions: {
            ...form?.permissions,
            id: PermissionId,
            [key]: value,
          },
        });
      }

    } else {
      if (Readcheckbox) {
        setForm({
          ...form,
          permissions: {
            ...form.permissions,
            [Readcheckbox]: newValue,
            [key]: value,
          },
        });
        setPermission({
          ...permission,
          [Readcheckbox]: newValue,
          [key]: value,
        });
      }
      else {
        setForm({
          ...form,
          permissions: {
            ...form.permissions,
            [key]: value,
          },
        });
        setPermission({
          ...permission,
          [key]: value,
        });
      }

    }
  };



  const getPermission = () => {
    ApiClient.get(`permission/user-base?user_id=${id}`).then((res) => {
      if (res.success) {
        setPermission({
          id: res?.data?.id,
          carrier_add: res?.data?.carrier_add,
          // carrier_complete_access: res?.data?.carrier_complete_access,
          carrier_delete: res?.data?.carrier_delete,
          carrier_edit: res?.data?.carrier_edit,
          carrier_get: res?.data?.carrier_get,
          carrier_staff_add: res?.data?.carrier_staff_add,
          carrier_staff_edit: res?.data?.carrier_staff_edit,
          carrier_staff_delete: res?.data?.carrier_staff_delete,
          carrier_staff_get: res?.data?.carrier_staff_get,
          faq_add: res?.data?.faq_add,
          faq_delete: res?.data?.faq_delete,
          faq_edit: res?.data?.faq_edit,
          faq_get: res?.data?.faq_get,

          plan_add: res?.data?.plan_add,
          plan_delete: res?.data?.plan_delete,
          plan_edit: res?.data?.plan_edit,
          plan_get: res?.data?.plan_get,

          active_plan_get: res?.data?.active_plan_get,

          driver_add: res?.data?.driver_add,
          driver_delete: res?.data?.driver_delete,
          driver_edit: res?.data?.driver_edit,
          driver_get: res?.data?.driver_get,

          truck_add: res?.data?.truck_add,
          truck_get: res?.data?.truck_get,

          group_add: res?.data?.group_add,
          group_edit: res?.data?.group_edit,
          group_get: res?.data?.group_get,
          group_delete: res?.data?.group_delete,

          transaction_get: res?.data?.transaction_get,

          load_add: res?.data?.load_add,
          load_delete: res?.data?.load_delete,
          load_edit: res?.data?.load_edit,
          load_get: res?.data?.load_get,

          bid_add: res?.data?.bid_add,
          bid_delete: res?.data?.bid_delete,
          bid_edit: res?.data?.bid_edit,
          bid_get: res?.data?.bid_get,

          board_add: res?.data?.board_add,
          board_delete: res?.data?.board_delete,
          board_edit: res?.data?.board_edit,
          board_get: res?.data?.board_get,

          settings_get: res?.data?.settings_get,
          settings_edit: res?.data?.settings_edit,

          // content_management_add:res?.data?.content_management_add,
          content_management_edit: res?.data?.content_management_edit,
          content_management_get: res?.data?.content_management_get,
          // content_management_delete:res?.data?.content_management_delete,

          invite_user_get: res?.data?.invite_user_get,
          dashboard_get: res?.data?.dashboard_get,
          statistics_get: res?.data?.statistics_get,
          performance_matrix_get: res?.data?.performance_matrix_get,
          notes_get: res?.data?.notes_get,
          query_get: res?.data?.query_get,
          carrier_request_get: res?.data?.carrier_request_get,
          news_letter_get: res?.data?.news_letter_get,
          notifications_get: res?.data?.notifications_get,
          shipment_notes_get: res?.data?.shipment_notes_get,
        });
        setPermissionId(res?.data?.id);
        // setForm({...form,permissions:res?.data})
      }
    });
  };

  useEffect(() => {
    if (id) {
      setForm({ ...form, permissions: permission });
    }
  }, [permission]);

  useEffect(() => {
    if (id) {
      setForm({});
      loader(true);
      ApiClient.get("user/detail", { id }).then((res) => {
        if (res.success) {
          let value = res?.data;

          setForm({
            ...form,
            id: res?.data?.id,
            firstName: res?.data.firstName,
            lastName: res?.data?.lastName,
            mobileNo: res?.data?.mobileNo,
            dialCode: res?.data?.dialCode,
            address: res?.data?.address,
            email: res?.data?.email,
            image: res?.data?.image,
            role: res?.data?.role,
            gender: res?.data?.gender,
            state: res?.data?.state,
            pincode: res?.data?.pincode,
            country: res?.data?.country,
            city: res?.data?.city,
          });
          if (res?.data?.addedBy != null) {
            setEditTrue(true);
          }
          if (res?.data?.role == "staff") {
            getPermission();
          }
          let payload = {
            id: "",
            name: "",
            status: "active",
            permissions: {
              //  Done
              carrier_delete: false,
              carrier_get: false,
              carrier_complete_access: false,
              carrier_edit: false,
              carrier_add: false,

              carrier_staff_add: false,
              carrier_staff_edit: false,
              carrier_staff_delete: false,
              carrier_staff_get: false,
              carrier_staff_complete_access: false,

              faq_add: false,
              faq_delete: false,
              faq_edit: false,
              faq_get: false,

              plan_add: false,
              plan_delete: false,
              plan_edit: false,
              plan_get: false,

              active_plan_get: false,

              driver_add: false,
              driver_delete: false,
              driver_edit: false,
              driver_get: false,

              group_add: false,
              group_delete: false,
              group_edit: false,
              group_get: false,

              truck_add: false,
              truck_get: false,


              transaction_get: false,

              load_add: false,
              load_delete: false,
              load_edit: false,
              load_get: false,

              bid_add: false,
              bid_delete: false,
              bid_edit: false,
              bid_get: false,

              board_add: false,
              board_delete: false,
              board_edit: false,
              board_get: false,

              settings_get: false,
              settings_edit: false,

              // content_management_add:false,
              content_management_edit: false,
              content_management_get: false,
              // content_management_delete:false,

              invite_user_get: false,
              dashboard_get: false,
              statistics_get: false,
              performance_matrix_get: false,
              notes_get: false,
              query_get: false,
              carrier_request_get: false,
              news_letter_get: false,
              notifications_get: false,
              shipment_notes_get: false,
            },
          };

          Object.keys(payload).map((itm) => {
            payload[itm] = value[itm];
          });
          payload.loginPortal = value.loginPortal;
          if (value.permissions) {
            payload.permissions = value.permissions;
            // payload.permissions={ ...payload.permissions,...value.permissions}
          }


          // setForm({
          //   ...payload,
          // });
        }
        loader(false);
      });
    } else {
      setForm(defaultvalue());
    }
  }, [id]);

  const handleAdminUser = (check) => {
    let value = check ? true : false;
    setForm({
      ...form,
      permissions: {
        ...form.permissions,
        carrier_add: value,
        carrier_edit: value,
        carrier_get: value,
        carrier_delete: value,
        carrier_complete_access: value,
      },
    });
    // setpermission('carrier_complete_access',value)
  };

  const handleAdminPlan = (check) => {
    let value = check ? true : false;
    setForm({
      ...form,
      permissions: {
        ...form.permissions,
        plan_add: value,
        plan_edit: value,
        plan_get: value,
        plan_delete: value,
        plan_complete_access: value,
      },
    });
    // setpermission('carrier_complete_access',value)
  };

  const handleAdminDriver = (check) => {
    let value = check ? true : false;
    setForm({
      ...form,
      permissions: {
        ...form.permissions,
        driver_add: value,
        driver_edit: value,
        driver_get: value,
        driver_delete: value,
        driver_complete_access: value,
      },
    });

    // setpermission('carrier_complete_access',value)
  };

  const handleLoad = (check) => {
    let value = check ? true : false;
    setForm({
      ...form,
      permissions: {
        ...form.permissions,
        load_add: value,
        load_edit: value,
        load_get: value,
        load_delete: value,
        load_complete_access: value,
      },
    });
    // setpermission('carrier_complete_access',value)
  };
  const handleContentManagement = (check) => {
    let value = check ? true : false;
    setForm({
      ...form,
      permissions: {
        ...form.permissions,
        // content_management_add: value,
        content_management_edit: value,
        content_management_get: value,
        // content_management_delete: value,
        content_management_complete_access: value,
      },
    });
    // setpermission('carrier_complete_access',value)
  };

  const handleAdminFAQ = (check) => {
    let value = check ? true : false;
    setForm({
      ...form,
      permissions: {
        ...form.permissions,
        faq_add: value,
        faq_edit: value,
        faq_get: value,
        faq_delete: value,
        faq_complete_access: value,
      },
    });
    // setpermission('carrier_complete_access',value)
  };

  useEffect(() => { }, []);
  const HandleAll = (check) => {
    let value = check ? true : false;
    let permissions = roleType.permissions;
    Object.keys(permissions).map((itm) => {
      permissions[itm] = value;
    });
    setForm({ ...form, permissions: permissions });
  };

  const isAllChecked = () => {
    let value = true;
    let permissions = {
      carrier_add: form.permissions?.carrier_add,
      carrier_delete: form?.permissions?.carrier_delete,
      carrier_edit: form?.permissions?.carrier_edit,
      carrier_get: form?.permissions?.carrier_get,

      carrier_staff_add: form.permissions?.carrier_staff_add,
      carrier_staff_edit: form.permissions?.carrier_staff_edit,
      carrier_staff_delete: form.permissions?.carrier_staff_delete,
      carrier_staff_get: form.permissions?.carrier_staff_get,


      active_plan_get: form?.permissions?.active_plan_get,

      driver_add: form.permissions?.driver_add,
      driver_delete: form?.permissions?.driver_delete,
      driver_edit: form?.permissions?.driver_edit,
      driver_get: form?.permissions?.driver_get,

      load_add: form.permissions?.load_add,
      load_delete: form?.permissions?.load_delete,
      load_edit: form?.permissions?.load_edit,
      load_get: form?.permissions?.load_get,


      truck_add: form.permissions?.truck_add,
      truck_get: form?.permissions?.truck_get,

      transaction_get: form?.permissions?.transaction_get,

      dashboard_get: form?.permissions?.dashboard_get,

    };
    Object.keys(permissions).map((itm) => {
      if (!permissions[itm]) value = false
    });
    return value;
  };

  const handlecompleteAccess = () => {
    let result = false;
    if (
      form?.permissions?.carrier_add &&
      form?.permissions?.carrier_delete &&
      form?.permissions?.carrier_edit &&
      form?.permissions?.carrier_get
    ) {
      result = true;
    }
    // setForm({...form,permissions:{...form?.permissions,carrier_complete_access:result}})
    return result;
  };

  const handlecompleteAccessPlan = () => {
    let result = false;
    if (
      form?.permissions?.plan_add &&
      form?.permissions?.plan_delete &&
      form?.permissions?.plan_edit &&
      form?.permissions?.plan_get
    ) {
      result = true;
    }
    // setForm({...form,permissions:{...form?.permissions,carrier_complete_access:result}})
    return result;
  };

  const handlecompleteAccessDriver = () => {
    let result = false;
    if (
      form?.permissions?.driver_add &&
      form?.permissions?.driver_delete &&
      form?.permissions?.driver_edit &&
      form?.permissions?.driver_get
    ) {
      result = true;
    }
    // setForm({...form,permissions:{...form?.permissions,carrier_complete_access:result}})
    return result;
  };

  const handlecompleteAccessLoad = () => {
    let result = false;
    if (
      form?.permissions?.load_add &&
      form?.permissions?.load_delete &&
      form?.permissions?.load_edit &&
      form?.permissions?.load_get
    ) {
      result = true;
    }
    // setForm({...form,permissions:{...form?.permissions,carrier_complete_access:result}})
    return result;
  };
  const handlecompleteAccessContentManagement = () => {
    let result = false;
    if (
      // form?.permissions?.content_management_add &&
      // form?.permissions?.content_management_delete &&
      form?.permissions?.content_management_edit &&
      form?.permissions?.content_management_get
    ) {
      result = true;
    }
    // setForm({...form,permissions:{...form?.permissions,carrier_complete_access:result}})
    return result;
  };

  const handlecompleteAccessFAQ = () => {
    let result = false;
    if (
      form?.permissions?.faq_add &&
      form?.permissions?.faq_delete &&
      form?.permissions?.faq_edit &&
      form?.permissions?.faq_get
    ) {
      result = true;
    }
    // setForm({...form,permissions:{...form?.permissions,carrier_complete_access:result}})
    return result;
  };

  const arry = [
    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991,
    1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
    2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
    2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
  ];
  const HandleAllRead = (check) => {
    let value = check ? true : false;
    setForm({
      ...form,
      permissions: {
        ...form.permissions,
        carrier_get: value,
        carrier_staff_get: value,
        plan_get: value,
        active_plan_get: value,
        driver_get: value,
        load_get:value,
        group_get: value,
        truck_get: value,
        transaction_get: value,
        invite_user_get: value,
        dashboard_get: value,
        statistics_get: value,
        performance_matrix_get: value,
        notes_get: value,
        query_get: value,
        board_get: value,
        content_management_get: value,
        bid_get: value,
        faq_get: value,
        news_letter_get: value,
        notifications_get: value,
        settings_get: value,
        shipment_notes_get: value,
        carrier_request_get: value,
      },
    });
    setisAllRead(value);
    isAllChecked();
  };
  const HandleAllAdd = (check) => {
    let value = check ? true : false;
    setForm({
      ...form,
      permissions: {
        ...form.permissions,
        carrier_add: value,
        carrier_staff_add: value,
        plan_add: value,
        driver_add: value,
        truck_add: value,
        group_add: value,
        faq_add: value,
        load_add: value,
        bid_add: value,
        board_add: value,
        carrier_get: value,
        carrier_staff_get: value,
        faq_get: value,
        load_get: value,
        bid_get: value,
        board_get: value,
        plan_get: value,

        driver_get: value,
        truck_get: value,
        group_get: value,

        // content_management_add:value,
      },
    });
    setAllaDD(value);
    isAllChecked();
  };
  const HandleallEdit = (check) => {
    let value = check ? true : false;
    setForm({
      ...form,
      permissions: {
        ...form.permissions,
        carrier_edit: value,
        carrier_staff_get: value,
        carrier_staff_edit: value,
        plan_edit: value,
        driver_edit: value,
        group_edit: value,
        faq_edit: value,
        load_edit: value,
        bid_edit: value,
        board_edit: value,
        settings_edit: value,
        content_management_edit: value,
        carrier_get: value,
        plan_get: value,
        driver_get: value,
        group_get: value,
        faq_get: value,
        load_get: value,
        bid_get: value,
        board_get: value,
        settings_get: value,
        content_management_get: value,
      },
    });
    setAllEdit(value);
    isAllChecked();
  };
  const HandleAllDelete = (check) => {
    let value = check ? true : false;
    setForm({
      ...form,
      permissions: {
        ...form.permissions,
        carrier_delete: value,
        plan_delete: value,
        driver_delete: value,
        group_delete: value,
        board_delete: value,
        bid_delete: value,
        load_delete: value,
        faq_delete: value,
        carrier_get: value,
        plan_get: value,
        driver_get: value,
        group_get: value,
        board_get: value,
        bid_get: value,
        load_get: value,
        faq_get: value,
        carrier_staff_delete: value,
        carrier_staff_get: value
      },
    });
    setAllDelete(value);
    isAllChecked();
  };

  useEffect(() => {
    setForm({ ...form, permissions: roleType.permissions });
  }, [id]);

  const isAllow = (key = "") => {
    let permissions = user.role?.permissions;
    let value = permissions?.[key];
    if (user.role.id == environment.adminRoleId) value = true;
    return value;
  };

  const addressResult = async (e) => {
    let address = {};
    if (e.place) {
      address = await addressModel.getAddress(e.place);
    }

    setForm({
      ...form,
      address: e.value,
      country: address.country || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.zipcode || "",
      // lat: `${address.lat}` || '',
      // lng: `${address.lng}` || ''
    });

  };



  const uploadImage = (e) => {
    setForm({ ...form, baseImg: e.target.value });
    console.log(e, "=============")
    let files = e.target.files;
    let file = files.item(0);
    loader(true);
    ApiClient.postFormData("upload/image?modelName=users", { file: file }).then(
      (res) => {
        if (res?.success) {
          let image = res?.data?.fullpath;
          setForm({ ...form, image: image, baseImg: "" });
        } else {
          setForm({ ...form, baseImg: "" });
        }
        loader(false);
      }
    );
  };

  const imageResult = (e, key) => {

    images[key] = e.value;
    setImages(images);
    setForm({ ...form, image: images?.image });

  };

  useEffect(() => {

  }, [form]);

  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-8">
          <Tooltip placement="top" title="Back">
            <div
              onClick={() => history(-1)}
              className="!px-4  py-2 cursor-pointer flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3 bg-[#494f9f] text-white hover:text-black"
            >
              <i className="fa fa-angle-left text-lg"></i>
            </div>
          </Tooltip>
          <div>
            <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
              {id ? "Edit" : "Add"} {shared.addTitle}
            </h3>
            <p className="text-sm font-normal text-[#75757A]">
              Here you can see all about your Staffs
            </p>
          </div>
        </div>

        <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 mb-10 ">
          <div className=" p-3 border-b flex items-center border-[#474e9c3b] border-dashed">
            <div className="bg-[#eeeff6] p-3 me-3 rounded-md">
              <FaUserAlt className="text-[#494f9f]" />
            </div>
            <h3 className="text-[16px] font-[500] text-[#494f9f]">
              Basic Information
            </h3>
          </div>

          <div className="grid grid-cols-12 gap-4 p-4">
            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="First Name"
                pattern="^[a-zA-Z]+$"
                onKeyPress={(e) => {
                  var regex = new RegExp("^[a-zA-Z]+$");
                  var key = String.fromCharCode(
                    !e.charCode ? e.which : e.charCode
                  );
                  if (!regex.test(key)) {
                    e.preventDefault();
                    return false;
                  }
                }}
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e })}
                required
              />
              {submitted && !form.firstName && (
                <div className="invalid-feedback d-block star text-[12px]">
                  Name is Required
                </div>
              )}
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="Last Name"
                pattern="^[a-zA-Z']+$"
                onKeyPress={(e) => {
                  var regex = new RegExp("^[a-zA-Z']+$");
                  var key = String.fromCharCode(
                    !e.charCode ? e.which : e.charCode
                  );
                  if (!regex.test(key)) {
                    e.preventDefault();
                    return false;
                  }
                }}
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e })}
              />

            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e })}
                required
                disabled={id ? true : false}
              />
              {!form.email && submitted && (
                <div className="invalid-feedback d-block star text-[12px]">
                  Please enter a valid email
                </div>
              )}
            </div>

            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="mb-2 block">Mobile No</label>
              <div className="">
                <PhoneInput
                  value={form.dialCode + "" + form.mobileNo}
                  countryCodeEditable={true}
                  enableSearch={true}
                  placeholder=""
                  country="us"
                  onChange={(phone, country) => {
                    let phonenumber = phone.replace(
                      country.dialCode,
                      ""
                    );
                    // if(phonenumber!=form.mobileNo){
                    // setform({ ...form, mobileNo: phonenumber })
                    // }
                    setForm({
                      ...form,
                      dialCode: country.dialCode,
                      mobileNo: phonenumber,
                    });
                  }}
                  required
                />


              </div>
            </div>


          </div>
        </div>

        <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 mb-10 ">
          <div className=" p-3 border-b flex items-center border-[#474e9c3b] border-dashed">
            <div className="bg-[#eeeff6] p-3 me-3 rounded-md">
              <FaLocationDot className="text-[#494f9f]" />
            </div>
            <h3 className="text-[16px] font-[500] text-[#494f9f]">Address</h3>
          </div>

          <div className="grid grid-cols-12 gap-4 p-4">

            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="label_profile">
                Address<span className="star">*</span>
              </label>
              <div>
                <GooglePlaceAutoComplete
                  className='bg-white w-full rounded-lg h-10 flex items-center gap-2 border border-[#00000036] px-3 pac-target-input'
                  value={form.address}
                  result={addressResult}
                  id="address"
                  placeholder=""
                />
                {!form.address && submitted ? (
                  <div className="invalid-feedback d-block star text-[12px]">
                    Please Select Location Suggestion
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e })}
                required
              />
              {!form.city && submitted ? (
                <div className="invalid-feedback d-block star text-[12px]">
                  City is required
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e })}
                required
              />
              {!form.state && submitted ? (
                <div className="invalid-feedback d-block star text-[12px]">
                  State is required
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="Country"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e })}
                required
              />
              {!form.country && submitted ? (
                <div className="invalid-feedback d-block star text-[12px]">
                  Country is required
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="ZipCode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e })}
                required
              />
              {!form.pincode && submitted ? (
                <div className="invalid-feedback d-block star text-[12px]">
                  Zipcode is required
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 mb-10 ">
          <div className=" p-3 border-b flex items-center border-[#474e9c3b] border-dashed">
            <div className="bg-[#eeeff6] p-3 me-3 rounded-md">
              <FaFileZipper className="text-[#494f9f]" />
            </div>
            <h3 className="text-[16px] font-[500] text-[#494f9f]">Permissions</h3>
          </div>

          <div className="overflow-x-auto ">
            <table className="w-full border border-gray ">
              <thead className="bg-[#474e9c12] ">
                <tr>
                  <th className="py-2 px-4 text-sm font-medium text-left"></th>
                  <th className="py-2 px-4 text-sm font-medium text-left" >
                    <input
                      className="me-1"
                      type="checkbox"
                      onChange={(e) =>
                        HandleAll(e.target.checked)
                      }
                      checked={isAllChecked()}
                    />{" "}
                    All</th>
                  <th className="py-2 px-4 text-sm font-medium text-left ">
                    <input
                      className="me-1"
                      type="checkbox"
                      onChange={(e) =>
                        HandleAllRead(e.target.checked)
                      }
                      checked={AllRead || isAllChecked()}
                    />{" "}
                    Read</th>
                  <th className="py-2 px-4 text-sm font-medium text-left ">
                    <input
                      type="checkbox"
                      className="me-1"
                      onChange={(e) =>
                        HandleAllAdd(e.target.checked)
                      }
                      checked={AllAdd || isAllChecked()}
                    />{" "}
                    Add</th>
                  <th className="py-2 px-4 text-sm font-medium text-left ">
                    <input
                      className="me-1"
                      type="checkbox"
                      onChange={(e) =>
                        HandleallEdit(e.target.checked)
                      }
                      checked={AllEdit || isAllChecked()}
                    />{" "}
                    Edit </th>
                  <th className="py-2 px-4 text-sm font-medium text-left">
                    <input
                      type="checkbox"
                      className="me-1"
                      onChange={(e) =>
                        HandleAllDelete(e.target.checked)
                      }
                      checked={AllDelete || isAllChecked()}
                    />{" "}
                    Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray px-2 py-2 ">
                    <span className="font-semibold text-sm">Dashboard</span>
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">

                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.dashboard_get}
                      onChange={(e) =>
                        setpermission(
                          "dashboard_get",
                          e.target.checked
                        )
                      }
                    />
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">

                  </td>

                  <td className="border border-gray px-4 py-2 text-left">

                  </td>

                  <td className="border border-gray px-4 py-2 text-left">

                  </td>
                </tr>
                <tr>
                  <td className="border border-gray px-2 py-2 ">
                    <span className="font-semibold text-sm">Carrier</span>
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        handleAdminUser(e.target.checked);
                        // if(e.target?.checked){
                        // setform({...form,permissions:{...form?.permissions,carrier_complete_access:true}})
                        // }else
                      }}
                      checked={handlecompleteAccess()}
                    />
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.carrier_get}
                      onChange={(e) =>
                        setpermission(
                          "carrier_get",
                          e.target.checked
                        )
                      }
                      disabled={form?.permissions?.carrier_add || form?.permissions?.carrier_edit || form?.permissions?.carrier_delete}
                    />
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.carrier_add}
                      onChange={(e) =>
                        setpermission(
                          "carrier_add",
                          e.target.checked
                        )
                      }
                    />{" "}
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.carrier_edit}
                      onChange={(e) =>
                        setpermission(
                          "carrier_edit",
                          e.target.checked
                        )
                      }
                    />{" "}
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.carrier_delete}
                      onChange={(e) =>
                        setpermission(
                          "carrier_delete",
                          e.target.checked
                        )
                      }
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray px-2 py-2 ">
                    <span className="font-semibold text-sm">Active Plan</span>
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    {/* <input
                      type="checkbox"
                      onChange={(e) => {
                        handleAdminPlan(e.target.checked);
                        // if(e.target?.checked){
                        // setform({...form,permissions:{...form?.permissions,carrier_complete_access:true}})
                        // }else
                      }}
                      checked={handlecompleteAccessPlan()}
                    /> */}
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.active_plan_get}
                      onChange={(e) =>
                        setpermission(
                          "active_plan_get",
                          e.target.checked
                        )
                      }

                    />
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    {/* <input
                      type="checkbox"
                      checked={form?.permissions?.plan_add}
                      onChange={(e) =>
                        setpermission(
                          "plan_add",
                          e.target.checked
                        )
                      }
                    />{" "} */}
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    {/* <input
                      type="checkbox"
                      checked={form?.permissions?.plan_edit}
                      onChange={(e) =>
                        setpermission(
                          "plan_edit",
                          e.target.checked
                        )
                      }
                    />{" "} */}
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    {/* <input
                      type="checkbox"
                      checked={form?.permissions?.plan_delete}
                      onChange={(e) =>
                        setpermission(
                          "plan_delete",
                          e.target.checked
                        )
                      }
                    />{" "} */}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray px-2 py-2 ">
                    <span className="font-semibold text-sm">Loads</span>
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        handleLoad(e.target.checked);
                        // if(e.target?.checked){
                        // setform({...form,permissions:{...form?.permissions,carrier_complete_access:true}})
                        // }else
                      }}
                      checked={handlecompleteAccessLoad()}
                    />
                  </td>

                  {/* <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.carrier_staff_get}
                      onChange={(e) =>
                        setpermission(
                          "carrier_staff_get",
                          e.target.checked
                        )
                      }
                      disabled={form?.permissions?.carrier_staff_add || form?.permissions?.carrier_staff_edit || form?.permissions?.carrier_staff_delete}
                    />
                  </td> */}

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.load_get}
                      onChange={(e) =>
                        setpermission(
                          "load_get",
                          e.target.checked
                        )
                      }
                      disabled={form?.permissions?.load_add || form?.permissions?.load_edit || form?.permissions?.load_delete}
                    />
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.load_add}
                      onChange={(e) =>
                        setpermission(
                          "load_add",
                          e.target.checked
                        )
                      }
                    />{" "}
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.load_edit}
                      onChange={(e) =>
                        setpermission(
                          "load_edit",
                          e.target.checked
                        )
                      }
                    />{" "}
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.load_delete}
                      onChange={(e) =>
                        setpermission(
                          "load_delete",
                          e.target.checked
                        )
                      }
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray px-2 py-2 ">
                    <span className="font-semibold text-sm">Driver</span>
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        handleAdminDriver(e.target.checked);
                        // if(e.target?.checked){
                        // setform({...form,permissions:{...form?.permissions,carrier_complete_access:true}})
                        // }else
                      }}
                      checked={handlecompleteAccessDriver()}
                    />
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.driver_get}
                      onChange={(e) =>
                        setpermission(
                          "driver_get",
                          e.target.checked
                        )
                      }
                      disabled={form?.permissions?.driver_add || form?.permissions?.driver_edit || form?.permissions?.driver_delete}
                    />
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.driver_add}
                      onChange={(e) =>
                        setpermission(
                          "driver_add",
                          e.target.checked
                        )
                      }
                    />{" "}
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.driver_edit}
                      onChange={(e) =>
                        setpermission(
                          "driver_edit",
                          e.target.checked
                        )
                      }
                    />{" "}
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.driver_delete}
                      onChange={(e) =>
                        setpermission(
                          "driver_delete",
                          e.target.checked
                        )
                      }
                    />{" "}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray px-2 py-2 ">
                    <span className="font-semibold text-sm">Truck</span>
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    {/* <input
                      type="checkbox"
                      onChange={(e) => {
                        handleAdminDriver(e.target.checked);
                        // if(e.target?.checked){
                        // setform({...form,permissions:{...form?.permissions,carrier_complete_access:true}})
                        // }else
                      }}
                      checked={handlecompleteAccessDriver()}
                    /> */}
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.truck_get}
                      onChange={(e) =>
                        setpermission(
                          "truck_get",
                          e.target.checked
                        )
                      }
                      disabled={form?.permissions?.truck_add}
                    />
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.truck_add}
                      onChange={(e) =>
                        setpermission(
                          "truck_add",
                          e.target.checked
                        )
                      }
                    />{" "}
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">

                  </td>

                  <td className="border border-gray px-4 py-2 text-left">

                  </td>
                </tr>

                <tr>
                  <td className="border border-gray px-2 py-2 ">
                    <span className="font-semibold text-sm">Transaction</span>
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">

                  </td>

                  <td className="border border-gray px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={form?.permissions?.transaction_get}
                      onChange={(e) =>
                        setpermission(
                          "transaction_get",
                          e.target.checked
                        )
                      }

                    />
                  </td>

                  <td className="border border-gray px-4 py-2 text-left">


                  </td>

                  <td className="border border-gray px-4 py-2 text-left">

                  </td>

                  <td className="border border-gray px-4 py-2 text-left">

                  </td>
                </tr>

              </tbody>
            </table>

          </div>
        </div>


        <div className="flex justify-end mt-4">
          <button type="submit" className="btn btn-primary">
            {/* {id ? "Update" : "Add"} {shared.addTitle} */}
            Save
          </button>
        </div>
      </form>
    </PageLayout>
  );
};

export default AddEdit;
