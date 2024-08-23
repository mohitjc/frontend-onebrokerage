import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import environment from "../../environment";

const AddEditRole = () => {
  const { id } = useParams();
  const [form, setform] = useState({
    name: "",
    status: "active",
  });
  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const formValidation = [{ key: "status", required: true }];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);
    if (invalid) return;
    let method = "post";
    let url = "role/add";
    let value = {
      ...form,
      loginPannel: id == environment.userRoleId ? "front" : "admin",
      id: id,
    };
    if (id) {
      method = "put";
      url = "role/update";
    } else {
      value.addedBy = user._id;
      delete value.id;
    }
    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        history("/roles");
      }
      loader(false);
    });
  };

  useEffect(() => {
    if (id) {
      loader(true);
      ApiClient.get("role/detail", { id }).then((res) => {
        if (res.success) {
          setform({
            name: res?.data?.name,
            status: res?.data?.status,
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
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <Tooltip placement="top" title="Back">
                  <Link
                    to="/roles"
                    className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border  transition-all    mr-3"
                  >
                    <i className="fa fa-angle-left text-lg"></i>
                  </Link>
                </Tooltip>
                <div>
                  <h3 className="text-2xl font-semibold text-[#111827]">
                    {" "}
                    {id ? "Edit" : "Add"} Role
                  </h3>
                  <p class="text-sm font-normal text-[#75757A]">
                    Here you can see all about your Roles
                  </p>
                </div>
              </div>

              <div className="w-80">
                <label>
                  Name<span className="star">*</span>
                </label>
                <input
                  type="text"
                  className="relative shadow-box bg-white min-w-[320px] rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                  value={form.name}
                  onChange={(e) => setform({ ...form, name: e.target.value })}
                  required
                  disabled={form?.name}
                />
              </div>
            </div>

            {/* <div className="shadow-box w-full bg-white rounded-lg mb-6">
              <div className="scrollbar w-full overflow-auto">
                <div class="table_section tablepadding">
                  <p className="text-xl font-semibold text-[#111827] px-4 pb-2">
                    Permissions
                  </p>
                  <table class="w-full">
                    <thead class="table_head roleTable">
                      <tr class="border-b border-[#EAECF0]">
                        <th
                          scope="col"
                          class="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-4 text-left bg-[#F7FAFF] !py-3 ' onClick={e => sorting('name')}"
                        ></th>
                        <th
                          scope="col"
                          class="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-4 text-left bg-[#F7FAFF] !py-3 ' onClick={e => sorting('name')}"
                        >
                          <input
                            type="checkbox"
                            onChange={(e) => HandleAll(e.target.checked)}
                            checked={isAllChecked()}
                            className="h-4 w-4"
                          />
                          All
                        </th>
                        {permission.map((itm) => {
                          return (
                            <>
                              <th
                                scope="col"
                                class="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-4 text-left bg-[#F7FAFF] !py-3 ' onClick={e => sorting('name')}"
                              >
                                <input
                                  type="checkbox"
                                  className="h-4 w-4"
                                  onChange={(e) =>
                                    HandleAllRead(e.target.checked, itm.key)
                                  }
                                  checked={isAllPCheck(itm.key)}
                                />
                                {itm.name}
                              </th>
                            </>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="roleTable">
                      {permissions.map((itm) => {
                        return (
                          <>
                            <tr>
                              <td className="!text-typo !border-l-0 cursor-pointer !px-4 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                                {itm.name}
                              </td>
                              <td className="!text-typo !border-l-0 cursor-pointer !px-4 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 green_check cursor-pointer shrink-0 rounded-[4px] !border !border-[#3C3E49A3] !text-white"
                                  name={itm.key}
                                  onChange={(e) =>
                                    handleAllPermission(e.target)
                                  }
                                  checked={isCheckAll(itm.key)}
                                />
                              </td>
                              {permission.map((pitm) => {
                                return (
                                  <td className="!text-typo !border-l-0 cursor-pointer !px-4 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                                    <div Name="checkList">
                                      <label className="mb-0">
                                        <input
                                          type="checkbox"
                                          className="h-4 w-4 green_check cursor-pointer shrink-0 rounded-[4px] !border !border-[#3C3E49A3] !text-white"
                                          checked={
                                            form.permissions[
                                              `${pitm.key}${itm.key}`
                                            ]
                                          }
                                          onChange={(e) =>
                                            setpermission(
                                              `${pitm.key}${itm.key}`,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </label>
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div> */}

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="text-white bg-[#494f9f] bg-[#494f9f] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
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

export default AddEditRole;
