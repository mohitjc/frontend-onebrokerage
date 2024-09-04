import React, { useState, useEffect } from "react";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import methodModel from "../../../methods/methods";
import Html from "./html";
import environment from "../../../environment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

const AddTruck = () => {
  // const { role, id } = useParams();
  const [images, setImages] = useState({ image: "", logo: "" });
//   const defaultvalue = userType;
  const [form, setform] = useState({
    truck_data: [],
  });

//   const [set, setState] = useState();
//   const [eyes, setEyes] = useState({ password: false, confirmPassword: false });
  const [submitted, setSubmitted] = useState(false);
  const history = useNavigate();

  const [ChangeStatus, setChangeStatus] = useState("");
  const [detail, setDetail] = useState();
//   const user = useSelector((state) => state.user);



  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (form?.truck_data?.length < 1) {
      return false;
    }

    // const LoadID = Math.floor(Math.random() * 1000000000);
    let method = "post";
    let url = "truck";
    let value = {
      ...form,
      truck_data: form?.truck_data,
    };
    // value.fullName=value.firstName+" "+value.lastName
    if (value.id) {
      method = "put";
      url = "truck";
      value = {
        truck_data: form?.truck_data,
      };
    } else {
      delete value.id;
    }

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        toast.success(res.message);

        if (localStorage.getItem("newuser", true) && !value?.id) {
          history("/drivers/add");

        } else {

          history("/trucks");
        }

      }
      loader(false);
    });
  };

  const imageResult = (e, key) => {
    images[key] = e.value;
    setImages(images);
  };


  const back = () => {
    history.goBack();
  };
  // const GetLoadDetails = () => {
  //   ApiClient.get("load", { id }).then((res) => {
  //     if (res.success) {
  //       setform(res?.data);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   setSubmitted(false);
  //   // setState()
  //   if (id) {
  //     GetLoadDetails();
  //   }

  // }, [id]);

  return (
    <>
      <Html
        form={form}
        detail={detail}
        ChangeStatu={ChangeStatus}
        back={back}
        setform={setform}
        submitted={submitted}
        images={images}
        handleSubmit={handleSubmit}
        imageResult={imageResult}

      // DestinationAddress={DestinationAddress}
      />
    </>
  );
};

export default AddTruck;
