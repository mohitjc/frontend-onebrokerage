import React, { Fragment, useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
import loader from "../../methods/loader";
import Html from "./html";
import { useNavigate } from "react-router-dom";
import environment from "../../environment";
import axios from "axios";
import shared from "./shared";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Dialog, Transition } from "@headlessui/react";
import FormControl from "../../components/common/FormControl";
import MultiSelectDropdown from "../../components/common/MultiSelectDropdown";
import methodModel from "../../methods/methods";

const Subscribers = () => {
  const user = useSelector((state) => state.user);
  const searchState = { data: "" };
  const [filters, setFilter] = useState({ page: 1, count: 10, search: "" });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loaging, setLoader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emails, setEmails] = useState();
  const [form, setForm] = useState({
    to: [],
    subject: "",
    body: "",
  });

  const formValidation = [
    {
      key: "to",
      required: true,
    },
    { key: "subject", required: true },
    { key: "body", required: true },
  ];
  const history = useNavigate();

  const closeModal = () => {
    setIsOpen(!isOpen);
    setForm({
      to: [],
      subject: "",
      body: "",
    });
  };

  const sortClass = (key) => {
    let cls = "fa-sort";
    if (filters.key == key && filters.sorder == "asc") cls = "fa-sort-up";
    else if (filters.key == key && filters.sorder == "desc")
      cls = "fa-sort-down";
    return "fa " + cls;
  };

  const sorting = (key) => {
    let sorder = "asc";
    if (filters.key == key) {
      if (filters.sorder == "asc") {
        sorder = "desc";
      } else {
        sorder = "asc";
      }
    }

    let sortBy = `${key} ${sorder}`;
    setFilter({ ...filters, sortBy, key, sorder });
    getData({ sortBy, key, sorder });
  };

  const getData = (p = {}) => {
    setLoader(true);
    let filter = { ...filters, ...p, email: user.email };
    ApiClient.get(shared.listApi, filter).then((res) => {
      if (res.success) {
        setData(
          res.data.map((itm) => {
            itm.id = itm._id;
            return itm;
          })
        );
        setTotal(res.total);
      }
      setLoader(false);
    });
  };

  const emailsList = () => {
    ApiClient.get("subscribe/listing").then((res) => {
      if (res.success) {
        let _emails = res?.data.map(({ id, email }) => {
          return { id: email, name: email };
        });
        setEmails(_emails);
      }
    });
  };

  const clear = () => {
    let f = {
      groupId: "",
      search: "",
      status: "",
      page: 1,
    };
    setFilter({ ...filters, ...f });
    getData({ ...f });
  };

  const filter = (p = {}) => {
    let f = {
      page: 1,
      ...p,
    };
    setFilter({ ...filters, ...f });
    getData({ ...f });
  };

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete this email?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        loader(true);
        ApiClient.delete(shared.deleteApi, { id: id }).then((res) => {
          if (res.success) {
            // ToastsStore.success(res.message)
            clear();
          }
          loader(false);
        });
        //   Swal.fire({
        //     icon: "success"
        //   });
      }
    });
  };

  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    getData({ page: e });
  };
  const count = (e) => {
    setFilter({ ...filters, count: e });
    getData({ ...filters, count: e });
  };
  const changestatus = (e) => {
    setFilter({ ...filters, status: e, page: 1 });
    getData({ status: e, page: 1 });
  };

  const statusChange = (itm) => {
    if (!(isAllow(`edit${shared.check}`) && itm.addedBy == user._id)) return;
    let status = "active";
    if (itm.status == "active") status = "deactive";
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        status == "active" ? "Activate" : "Deactivate"
      } this`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        loader(true);
        ApiClient.put(shared.statusApi, { id: itm.id, status }).then((res) => {
          if (res.success) {
            getData();
          }
          loader(false);
        });
        //   Swal.fire({

        //     // text: `Sucessfully ${status == 'active' ? 'Activate' : 'Deactivate'} this`,
        //     icon: "success"
        //   });
      }
    });
  };

  const edit = (id) => {
    history(`/${shared.url}/edit/${id}`);
  };

  const view = (id) => {
    let url = `/${shared.url}/detail/${id}`;
    history(url);
  };

  const exportfun = async () => {
    const token = await localStorage.getItem("token");
    const req = await axios({
      method: "get",
      url: `${environment.api}api/export/excel`,
      responseType: "blob",
      body: { token: token },
    });
    var blob = new Blob([req.data], {
      type: req.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${shared.title}.xlsx`;
    link.click();
  };

  const isAllow = (key = "") => {
    let permissions = user.role?.permissions?.[0];
    let value = permissions?.[key];
    // return true;
    return value;
  };

  const handleSubmit = (e) => {
    let url = shared.sendNewsletter;
    e.preventDefault();
    setSubmitted(true);

    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid || form.emails?.length == 0) return;
    let method = "post";

    let value = {
      ...form,
    };

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        // ToastsStore.success(res.message)
        history(`/${shared.url}`);
        closeModal();
        setSubmitted(false);
      }
      loader(false);
    });
  };

  useEffect(() => {
    if (user && user.loggedIn) {
      setFilter({ ...filters, search: searchState.data });
      getData({ search: searchState.data, page: 1 });
      emailsList();
    }
  }, []);

  return (
    <>
      <Html
        edit={edit}
        view={view}
        clear={clear}
        sortClass={sortClass}
        sorting={sorting}
        isAllow={isAllow}
        count={count}
        pageChange={pageChange}
        deleteItem={deleteItem}
        filters={filters}
        setFilter={setFilter}
        filter={filter}
        loaging={loaging}
        data={data}
        total={total}
        statusChange={statusChange}
        changestatus={changestatus}
        exportfun={exportfun}
        onClickSendNewsletter={() => setIsOpen(true)}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-[40px] bg-white px-4 py-6 lg:px-10 lg:py-14 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className=" font-semibold text-[25px] leading-6 text-black mb-6 lg:mb-10"
                  >
                    NewsLetter
                  </Dialog.Title>

                  <div className="tabs_styles">
                    <form onSubmit={handleSubmit}>
                      <div className="mt-2">
                        <div className="col-span-12 md:col-span-6 mb-3">
                          <FormControl
                            type="text"
                            name="subject"
                            label="Subject"
                            value={form.subject}
                            onChange={(e) => {
                              setForm({ ...form, subject: e });
                            }}
                            required
                          />
                          {submitted && !form.subject && (
                            <div className="text-danger small mt-1 capitalize ">
                              Subject is required.
                            </div>
                          )}
                        </div>
                        <div className="col-span-12 md:col-span-6 mb-3">
                          <label className="mb-1">
                            To<span class="star">*</span>
                          </label>
                          <MultiSelectDropdown
                            options={emails}
                            result={({ value }) => {
                              setForm({ ...form, to: value });
                            }}
                            intialValue={form.to}
                          />
                          {submitted && form.to?.length == 0 && (
                            <div className="text-danger small mt-1 capitalize ">
                              Email is required.
                            </div>
                          )}
                        </div>
                        <div className="col-span-12 md:col-span-6 mb-6">
                          <FormControl
                            type="editor"
                            name="body"
                            label="Body"
                            value={form.body}
                            onChange={(e) => setForm({ ...form, body: e })}
                            required
                          />
                          {submitted && !form.body && (
                            <div className="text-danger small mt-1">
                              Text is required.
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end gap-2 flex-wrap mt-6">
                          <div className="btns flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={closeModal}
                              className="bg-gray-400 py-3 px-2 w-32 text-white text-[14px] font-medium"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="bg-[#263238] py-3 px-2 w-32 text-white text-[14px] font-medium"
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Subscribers;
