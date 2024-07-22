import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import "./style.scss";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import Table from "../../components/Table";
import SelectDropdown from "../../components/common/SelectDropdown";
import statusModel from "../../models/status.model";
import datepipeModel from "../../models/datepipemodel";
import shared from "./shared";
import ApiClient from "../../methods/api/apiClient";
import { useSelector } from "react-redux";
import methodModel from "../../methods/methods";
import { PiEyeLight } from "react-icons/pi";
import { LiaEdit, LiaTrashAlt } from "react-icons/lia";
import environment from "../../environment";
import { MdOutlinePublish } from "react-icons/md";
import { IoMdCopy } from "react-icons/io";
import { MdOutlineDownload } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

import moment from "moment";
import Modal from "../../components/common/Modal";
import loader from "../../methods/loader";
import { toast } from "react-toastify";
const Html = ({
  sorting,
  filter,
  edit,
  view,
  statusChange,
  pageChange,
  count,
  deleteItem,
  clear,
  filters,
  setFilter,
  loaging,
  data,
  changestatus,
  isAllow,
  handlePublish,
  handleCopy,
  copySuccess,
  handleCalendarToggle,
  isOpen,
  selectedDate,
  handleDateChange,
  selectId,
  total = { total },
}) => {
  const user = useSelector((state) => state.user);
  const [categoryOptions, setCategories] = useState([]);

  const getCategoriesList = (p = {}) => {
    let f = {
      ...p,
      category_type: "master",
      type: "video",
    };
    ApiClient.get("category/listing", f).then((res) => {
      if (res.success) {
        let categoryOptions = res.data.map(({ id, name }) => {
          return { id: id, name: name };
        });
        setCategories(categoryOptions);
      }
    });
  };
  useEffect(() => {
    getCategoriesList();
  }, []);

  const [ids, setIds] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    publishNow: "",
    date: "",
    publish: false,
    isPublish: "",
  });

  const allIds = (e) => {
    if (e.target.checked) {
      let ids = data.map((itm) => itm.id);
      setIds([...ids]);
    } else {
      setIds([]);
    }
  };

  const addId = (e) => {
    if (e.target.checked) {
      ids.push(e.target.value);
      setIds([...ids]);
    } else {
      let arr = ids.filter((itm) => itm != e.target.value);
      setIds([...arr]);
    }
  };

  const onPublish = () => {
    let date = datepipeModel.datetoIsotime(new Date());
    if (form?.publish === "yet_to_publish")
      date = datepipeModel.datetoIsotime(form?.date);
    let payload = {
      ids: ids,
      date: date,
      isPublish: form?.publish,
    };
    if (form?.publish === "pulished") {
      delete payload?.date;
    }
    loader(true);
    ApiClient.put("video/publish", payload).then((res) => {
      if (res.success) {
        setFilter({ ...filters, isPublish: form?.publish });
        filter({ isPublish: form?.publish });
        setIds([]);
        setShow(false);
      }
      loader(false);
    });
  };

  const addPublish = () => {
    if (!ids.length) {
      toast.error("Please Select videos");
      return;
    } else if (filters?.isPublish == "pulished") {
      let payload = {
        ids: ids,
        isPublish: "un_published",
      };
      loader(true);
      ApiClient.put("video/publish", payload).then((res) => {
        if (res.success) {
          setFilter({ ...filters, isPublish: "un_published" });
          filter({ isPublish: "un_published" });
          setIds([]);
          setShow(false);
        }
        loader(false);
      });
    } else {
      setForm({ publishNow: "yes", date: "", publish: "pulished" });
      setShow(true);
    }
  };

  const renderTags = (tags) => {
    if (!tags || tags.length === 0) {
      return <span className="capitalize">No Tags</span>;
    }
    const MAX_TAGS_TO_DISPLAY = 2;
    const displayedTags = tags.slice(0, MAX_TAGS_TO_DISPLAY);
    const remainingCount = tags.length - MAX_TAGS_TO_DISPLAY;
    const showMoreText = remainingCount > 0 ? ` +${remainingCount} more` : "";

    return (
      <span className="capitalize flex flex-wrap items-center gap-1">
        {displayedTags &&
          displayedTags.map((tag, index) => (
            <React.Fragment key={index}>
              <span className=" bg-primary px-2 py-1 text-xs text-white rounded-md">
                {tag}
              </span>
              {index !== displayedTags.length - 1 && <></>}
            </React.Fragment>
          ))}
        <span className="lowecase text-xs"> {showMoreText}</span>
      </span>
    );
  };

  const columns = [
    {
      key: "title",
      name: (
        <>
          <div className="flex  items-center">
            <input
              id="default-checkbox"
              onClick={allIds}
              style={{ accentColor: "#EB6A59" }}
              type="checkbox"
              value=""
              className="w-4 h-4 cursor-pointer rounded "
            />
            <label
              for="default-checkbox"
              className=" text-xs cursor-pointer font-medium "
            >
              Select All
            </label>
          </div>
        </>
      ),
      // sort: true,
      render: (row) => {
        return (
          <>
            <div className="flex items-center ">
              <input
                checked={ids.includes(row.id)}
                style={{ accentColor: "#EB6A59" }}
                onChange={addId}
                type="checkbox"
                value={row.id}
                className="w-4 h-4 cursor-pointer  rounded "
              />
            </div>
          </>
        );
      },
    },
    {
      key: "title",
      name: "Title",
      sort: true,
      render: (row) => {
        return (
          <>
            <div className="w-32 cursor-pointer" onClick={() => view(row?.id)}>
              <Tooltip placement="top" title="View">
                <span className="capitalize">{row?.title || "N/A"} </span>
              </Tooltip>
            </div>
          </>
        );
      },
    },
    // {
    //   key: "tags",
    //   name: "Tags",
    //   sort: true,
    //   render: (row) => {
    //     return <span className="capitalize w-52">{renderTags(row?.tags)}</span>;
    //   },
    // },
    {
      key: "category",
      name: "Category",
      render: (row) => {
        return <span className="capitalize">{row?.category_detail?.name}</span>;
      },
    },
    {
      key: "video",
      name: "Video",
      render: (row) => {
        return (
          <>
            <video
              src={row?.video}
              width="130px"
              className="h-20 object-cover"
              controls
            />
          </>
        );
      },
    },
    {
      key: "publish date",
      name: "Publish Date",
      render: (row) => {
        return (
          <span className="capitalize">
            {moment(row.date).format("DD MMM YYYY")}
          </span>
        );
      },
    },
    {
      key: "isPublish",
      name: "Status",
      render: (row) => {
        return (
          <span className="capitalize block text-center">
            {row?.isPublish == "pulished" ? (
              <>
                <p className="bg-primary flex items-center justify-center px-2 py-1 rounded text-center text-white">
                  Published
                </p>
              </>
            ) : row?.isPublish === "un_published" ? (
              <>
                <p className="bg-gray-400 flex items-center justify-center px-2 py-1 rounded text-center text-white">
                  un-published
                </p>
              </>
            ) : (
              <>
                <p className="bg-orange-400 flex items-center justify-center px-2 py-1 rounded text-center text-white">
                  Yet To published
                </p>
              </>
            )}
          </span>
        );
      },
    },
    // {
    //   key: "status",
    //   name: "Status",
    //   render: (row) => {
    //     return (
    //       <>
    //         <div className="w-32" onClick={() => statusChange(row)}>
    //           <span
    //             className={`bg-[#EEE] cursor-pointer text-sm !px-3 h-[30px] w-[100px] flex items-center justify-center border border-[#EBEBEB] text-[#3C3E49A3] !rounded capitalize
    //                       ${
    //                         row.status == "deactive"
    //                           ? " bg-gray-200 text-black"
    //                           : "bg-[#ee695e] text-white"
    //                       }`}
    //           >
    //             {row.status == "deactive" ? "inactive" : "active"}
    //           </span>
    //         </div>
    //       </>
    //     );
    //   },
    // },
    {
      key: "action",
      name: "Action",
      render: (itm) => {
        return (
          <>
            <div className="flex items-center justify-start gap-1.5">
              {isAllow(`edit${shared.check}`) ? (
                <Tooltip placement="top" title="Edit">
                  <a
                    className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#EB6A5914] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                    onClick={(e) => edit(itm.id)}
                  >
                    <LiaEdit />
                  </a>
                </Tooltip>
              ) : (
                <></>
              )}
              {isAllow(`delete${shared.check}`) ? (
                <Tooltip placement="top" title="Delete">
                  {" "}
                  <span
                    className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#EB6A5914] w-10 h-10 !text-primary flex items-center justify-center text-lg "
                    onClick={() => deleteItem(itm.id)}
                  >
                    <LiaTrashAlt />
                  </span>{" "}
                </Tooltip>
              ) : (
                <></>
              )}
              {/* {itm?.isPublish ? (
                <Tooltip placement="top" title="un-publish">
                  <a
                    className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#EB6A5914] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                    onClick={(e) => handlePublish(itm.id, itm?.isPublish)}
                  >
                    <MdOutlineDownload />
                  </a>
                </Tooltip>
              ) : (
                <Tooltip placement="top" title="publish">
                  <a
                    className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#EB6A5914] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                    onClick={(e) => handlePublish(itm.id, itm?.isPublish)}
                  >
                    <MdOutlinePublish />
                  </a>
                </Tooltip>
              )} */}
              {selectId === itm?.id && copySuccess ? (
                "Copied!"
              ) : (
                <Tooltip placement="top" title="copy link">
                  <a
                    className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#EB6A5914] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                    onClick={(e) =>
                      handleCopy(`${environment.sasurl}${itm.video}`, itm?.id)
                    }
                  >
                    <IoMdCopy />
                  </a>
                </Tooltip>
              )}
            </div>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Layout>
        <div className="flex flex-wrap justify-between items-center gap-y-4">
          <div>
            <h3 className="text-2xl font-semibold text-[#111827]">
              {" "}
              {shared.title}
            </h3>
            <p className="text-sm font-normal text-[#75757A]">
              Here you can see all about your {shared.title}
            </p>
          </div>

          <a id="downloadFile"></a>

          <div className="flex">
            {/* <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                        <PiFileCsv className="text-typo text-xl" />  Export CSV
                    </button> */}

            {isAllow(`add${shared.check}`) ? (
              <Link
                className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2"
                to={`/${shared.url}/add`}
              >
                <FiPlus className="text-xl text-white" /> Add {shared.addTitle}
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="shadow-box w-full bg-white rounded-lg mt-6">
          <div className="flex p-4 items-center flex-wrap gap-2">
          {data?.length >0 ? 
            <button
              type="button"
              onClick={addPublish}
              className="bg-primary leading-10 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2"
            >
              {filters?.isPublish == "pulished" ? "Unpublish" : "Publish"}{" "}
              Videos
            </button>
            : ""}

            <form
              className="flex items-center max-w-sm"
              onSubmit={(e) => {
                e.preventDefault();
                filter();
              }}
            >
              <label for="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                                </svg>
                            </div> */}
                <input
                  type="text"
                  id="simple-search"
                  value={filters.search}
                  onChange={(e) => {
                    setFilter({ ...filters, search: e.target.value });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-[#EB6A59]block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 pr-10"
                  placeholder="Search"
                  required
                />
                {filters?.search && (
                  <i
                    className="fa fa-times absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                    aria-hidden="true"
                    onClick={(e) => clear()}
                  ></i>
                )}
              </div>
              <button
                type="submit"
                className="p-2.5 m-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-[#EB6A59] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>

            <div className="flex gap-2 ml-auto">
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="All Category"
                intialValue={filters.category}
                result={(e) => {
                  filter({ category: e.value });
                }}
                options={categoryOptions}
              />
              {/* <SelectDropdown
              id="statusDropdown"
              displayValue="name"
              placeholder="All Status"
              intialValue={filters.status}
              result={(e) => {
                changestatus(e.value);
              }}
              options={statusModel.list}
            /> */}

              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                hideDefaultPosition={true}
                intialValue={filters.isPublish}
                result={(e) => {
                  filter({ isPublish: e.value, page: 1 });
                }}
                options={[
                  { id: "pulished", name: "Published" },
                  { id: "un_published", name: "Unpublished" },
                  { id: "yet_to_publish", name: "Yet To publish" },
                ]}
              />

              {filters.type || filters.category ? (
                <>
                  <button
                    className="bg-primary leading-10 h-10 inline-block shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg"
                    onClick={() => clear()}
                  >
                    Reset
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          {!loaging ? (
            <>
              <Table
                className="mb-3"
                data={data}
                columns={columns}
                page={filters.page}
                count={filters.count}
                total={total}
                result={(e) => {
                  if (e.event == "page") pageChange(e.value);
                  if (e.event == "sort") sorting(e.value);
                  if (e.event == "count") count(e.value);
                }}
              />
            </>
          ) : (
            <></>
          )}

          {loaging ? (
            <div className="text-center py-4">
              <img src="/assets/img/loader.gif" className="pageLoader" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </Layout>

      {show ? (
        <>
          <Modal
            title="Publish Videos"
            className="max-w-xl"
            result={() => {
              setShow(false);
            }}
            body={
              <>
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onPublish();
                    }}
                  >
                    <div className="grid col-span-2 gap-3">
                      <div>
                        <p className="text-2xl font-semibold text-center">
                          What would you like to do
                        </p>
                        <div className="flex items-center justify-center mt-4 gap-4 mb-4">
                          <>
                            {filters?.isPublish == "pulished" ||
                            filters?.isPublish == "un_published" ? null : (
                              <button
                                type="button"
                                onClick={(e) =>
                                  setForm({ ...form, publish: "pulished" })
                                }
                                className={`${
                                  form?.publish == "pulished" ||
                                  form?.publish == "yet_to_publish"
                                    ? "bg-primary"
                                    : "bg-gray-200 !text-black"
                                } leading-10 h-10 inline-flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2`}
                              >
                                Publish
                              </button>
                            )}
                            {filters?.isPublish != "un_published" ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  setForm({ ...form, publish: "un_published" })
                                }
                                className={`${
                                  form?.publish == "un_published"
                                    ? "bg-primary"
                                    : "bg-gray-200 !text-black"
                                } leading-10 h-10 inline-flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2`}
                              >
                                Unpublish
                              </button>
                            ) : null}
                          </>
                        </div>
                        {form?.publish == "un_published" ||
                        filters?.isPublish == "yet_to_publish" ? null : (
                          <div className="flex items-center justify-center gap-4">
                            <div className="flex items-center justify-center gap-4">
                              <label
                                htmlFor="Now"
                                className={`mr-4 bg-gray-200 px-4 flex items-center cursor-pointer gap-2 py-2 rounded ${
                                  form?.publish === "pulished"
                                    ? "bg-primary text-white"
                                    : ""
                                }`}
                                onClick={(e) =>
                                  setForm({ ...form, publish: "pulished" })
                                }
                              >
                                <input
                                  type="radio"
                                  style={{ accentColor: "#EB6A59" }}
                                  id="now"
                                  checked={form?.publish === "pulished"}
                                  name="fav_language"
                                  value="Now"
                                />
                                Now
                              </label>
                              <label
                                htmlFor="Later"
                                className={`ml-2 bg-gray-200 px-4 py-2 flex items-center gap-2 cursor-pointer rounded ${
                                  form?.publish === "yet_to_publish"
                                    ? "bg-primary text-white"
                                    : ""
                                }`}
                                onClick={(e) =>
                                  setForm({
                                    ...form,
                                    publish: "yet_to_publish",
                                  })
                                }
                              >
                                <input
                                  type="radio"
                                  style={{ accentColor: "#EB6A59" }}
                                  id="later"
                                  checked={form?.publish === "yet_to_publish"}
                                  name="fav_language"
                                  value="Later"
                                />
                                Later
                              </label>
                            </div>
                          </div>
                        )}
                        {form?.publish == "yet_to_publish" && (
                          <div>
                            <div>
                              <label className="block mb-2">Publish Date</label>
                              <input
                                type="date"
                                required
                                value={form.date}
                                min={`${new Date().toLocaleDateString(
                                  "en-CA"
                                )}T00:00`}
                                onChange={(e) =>
                                  setForm({ ...form, date: e.target.value })
                                }
                                className="relative shadow-box cursor-pointer bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right mt-5">
                      <button
                        type="submit"
                        className="bg-primary leading-10 h-10 inline-flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2"
                      >
                        {form?.publish == "pulished"
                          ? filters?.isPublish == "yet_to_publish"
                            ? "Publish Now"
                            : "Publish"
                          : form?.publish == "un_published"
                          ? "Unpublish"
                          : "Yet to Publish"}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            }
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Html;
