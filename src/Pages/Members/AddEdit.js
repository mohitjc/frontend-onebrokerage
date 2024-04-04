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
import crendentialModel from "../../models/credential.model";
import shared from "./shared";
import datepipeModel from "../../models/datepipemodel";
import environment from "../../environment";

const AddEdit = () => {
    const {id}=useParams()
    const history=useNavigate()
    const user = crendentialModel.getUser()
    const [submitted, setSubmitted] = useState(false)
    const [users, setUsers] = useState([])
    const [members, setMember] = useState([{fullName: '', email: '' }])
  
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let method = 'post'
        let url = shared.addApi
        let value = {
           data:members.map(itm=>{
            return {
                ...itm,
                role: 'member',
                addedBy: user._id,
                groupId: user.groupId._id,
            }
           })
        }
        if (value.id) {
            method = 'put'
            url = 'api/attendees/update'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                // ToastsStore.success(res.message)
                history(`/${shared.url}`)
            }
            loader(false)
        })
    }

    const getUsers=(p={})=>{
        let f={
            ...p,
            role:environment.userRoleId,
            isDeleted:false
        }
        ApiClient.get('api/users/listing',f).then(res=>{
            if(res.success){
                setUsers(res.data)
            }
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/attendees/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    // let payload = form

                    // Object.keys(payload).map(itm => {
                    //     payload[itm] = value[itm]
                    // })

                    // payload.id = id
                    // setform({
                    //     ...payload
                    // })

                }
                loader(false)
            })
        }
        getUsers()
    }, [id])

    const addMore = () => {
        let arr = members
        let payload = { fullName: '', email: '' }
        arr.push(payload)
        setMember([...arr])
    }

    const updateMember = (i,key='',value='') => {
        let arr = members
        arr[i][key]=value
        setMember([...arr])
    }

    const updateMemberAll = (i,values) => {
        let arr = members
        arr[i]=values
        setMember([...arr])
    }

    const removeMember=(i)=>{
        let arr=members
        arr=arr.filter((itm,ind)=>ind!=i)
        setMember([...arr])
    }

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">


                    <div className='flex items-center mb-8'>
                        <Tooltip placement="top" title="Back">

                            <Link to={`/${shared.url}`} className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3"><i className='fa fa-angle-left text-lg'></i></Link>
                        </Tooltip>
                        <div>
                            <h3 className="text-2xl font-semibold text-[#111827]">
                                {/* {id ? 'Edit' : 'Add'}  */}
                                 {shared.title}
                            </h3>
                            {/* <p class="text-sm font-normal text-[#75757A]">Here you can see all about your {shared.title}</p> */}
                        </div>
                    </div>


                    <div className="">
                {members.map((itm,i) => {
                    return <>
                        <div className="grid grid-cols-2 gap-3">
                        <div className="col-md-6">
                                <FormControl
                                    type="select"
                                    displayValue="email"
                                    valueType="object"
                                    label="Select Member"
                                    theme="search"
                                    value={itm.memberId}
                                    placeholder="Select Member"
                                    onInputChange={e=>{
                                        console.log("onInputChange",e)
                                        // updateMember(i,'email',e)
                                    }}
                                    options={[
                                        {id:'',email:'Add New Member'},
                                        ...users
                                    ]}
                                    onChange={e => {
                                        console.log("onChange",e)
                                        if(e.id){
                                            updateMemberAll(i,{...itm,memberId:e.id,email:e.email,fullName:e.fullName})
                                        }else{
                                            updateMemberAll(i,{...itm,memberId:'',email:'',fullName:''})
                                        }
                                    }}
                                    required
                                />
                            </div>

                            {itm.memberId?<></>:<>
                            <div className="col-md-6">
                                <FormControl
                                    type="email"
                                    label="Email"
                                    value={itm.email}
                                    onChange={e => updateMember(i,'email',e)}
                                    required
                                />
                            </div>
                            </>}

                            <div className="col-md-6">
                                <FormControl
                                    type="text"
                                    name="fullName"
                                    label="Name"
                                    value={itm.fullName}
                                    onChange={e => updateMember(i,'fullName',e)}
                                    required
                                />
                            </div>
                        
                            
                            <div className="col-span-full text-right">
                                {members.length>1?<>
                                    <button type="button" onClick={()=>removeMember(i)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            <span className="material-symbols-outlined">delete</span>
                                </button> 
                                </>:<></>}
                           
                            </div>

                        </div>
                    </>
                })}

                <div className="text-right mt-3">
                <button type="button" onClick={addMore} className="text-white bg-orange-400 bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add More</button> 
                </div>

                <div className="text-right mt-3">

                    <button type="submit" className="text-white bg-orange-400 bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                </div>
            </div>


                </div>


            </form>
        </Layout>
    </>
}

export default AddEdit