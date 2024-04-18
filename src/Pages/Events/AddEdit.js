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

const AddEdit = () => {
    const { id } = useParams()
    const [images, setImages] = useState({ image: ''});
    const [form, setform] = useState({ id: '', title: '',type:'', date: "",timezone:'',capacity:'',groupMemberLimit:'',description:'',deadline:'',externalLink:'',address:'',status: 'active' })
    const history = useNavigate()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'status', required: true },
        { key: 'type', required: true ,message:'Type is required'},
        { key: 'timezone', required: true },
        { key:'description' , required:true ,message:'Description is required'},
        { key:'groupMemberLimit' , required:true ,message:'Group Member Limit is required'}
    ]
console.log(form?.date,"vvvvvvvvvvvvvvvvvvvvvvvvvvvv")
console.log(form?.deadline,"vvvvvnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnvvvvvvv")
    const timezones=timezoneModel.list

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        
        if (invalid||getDateErrr(form.date)||getDateErrr(form.date,form.deadline)) return
        let method = 'post'
        let url = shared.addApi
        let value = {
            ...form,
            ...images,
        }
        if (value.id) {
            method = 'put'
            url = shared.editApi
        } else {
            value.addedBy=user._id
            value.groupId=user?.groupId?._id
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

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get(shared.detailApi, { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = form

                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })

                    payload.id=id
                    setform({
                        ...payload
                    })

                    let img=images
                    Object.keys(img).map(itm => {
                        img[itm] = value[itm]
                    })
                    setImages({...img})


                }
                loader(false)
            })
        }

    }, [id])

    const imageResult = (e, key) => {
        images[key] = e.value
        setImages(images)
    }

    const getError = (key) => {
        return submitted?methodModel.getError(key, form, formValidation)?.message:''
    }

    const getDateErrr=(start,end=new Date())=>{
        let value=false
        if(start&&end){
            if(new Date(start).getTime() < new Date(end).getTime()){
                value=true
            }
        }

        return value
    }

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">


                    <div className='flex items-center mb-8'>
                        <Tooltip placement="top" title="Back">

                            <Link to="/event" className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3"><i className='fa fa-angle-left text-lg'></i></Link>
                        </Tooltip>
                        <div>
                            <h3 className="text-2xl font-semibold text-[#111827]">
                                {form && form.id ? 'Edit' : 'Add'} {shared.title}
                            </h3>
                            <p class="text-sm font-normal text-[#75757A]">Here you can see all about your {shared.title}</p>
                        </div>
                    </div>



                    <h3 className="ViewUser mb-3"></h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className=" mb-3">
                            <FormControl
                                type="text"
                                name="title"
                                label="Title"
                                value={form.title}
                                onChange={e => setform({ ...form, title: e })}
                                required
                            />
                        </div>

                        <div className=" mb-3">
                        <FormControl
                                type="select"
                                name="type"
                                label="Type"
                                displayValue="name"
                                placeholder="Select Type"
                                value={form.type}
                                onChange={e => setform({ ...form, type: e })}
                                options={[
                                    {id:'inPerson',name:'In-Person'},
                                    {id:'virtual',name:'Virtual'},
                                ]}
                                required
                                error={getError('type')}
                            />
                        </div>

                        <div className=" mb-3">
                        <FormControl
                                type="select"
                                name="status"
                                label="Status"
                                displayValue="name"
                                placeholder="Select Status"
                                value={form.status}
                                onChange={e => setform({ ...form, status: e })}
                                options={statusModel.list}
                                required
                                error={getError('status')}
                            />
                        </div>

                        {/* <div className=" mb-3">
                            <FormControl
                                type="datetime-local"
                                name="date"
                                label="Event Date"
                                value={datepipeModel.datetodatepicker(form.date)}
                                onChange={e => {
                                    setform({ ...form, date: e })
                                }}
                                required
                                error={getDateErrr(form.date)&&submitted?'Entered date is less then Current Date':''}
                            />
                        </div> */}
                          <div className="mb-3">
            <FormControl
                type="datetime-local"
                name="date"
                label="Event Date"
                value={datepipeModel.datetodatepicker(form.date)}
                onChange={e => {
                    setform({ ...form, date: e });
                }}
                required
                error={getDateErrr(form.date) && submitted ? 'Entered date is less than Current Date' : ''}
            />
        </div>
                        <div className=" mb-3 relative">
                            <div className="absolute z-[9] w-full">
                            <FormControl
                                type="select"
                                name="timezone"
                                label="Timezone"
                                displayValue="name"
                                placeholder="Select Timezone"
                                value={form.timezone}
                                onChange={e => setform({ ...form, timezone: e })}
                                options={timezones}
                                theme="search"
                                required
                                error={getError('timezone')}
                            />
                            </div>

                        </div>
                        <div className=" mb-3">
                            <FormControl
                                type="number"
                                name="capacity"
                                label="Max Capacity"
                                value={form.capacity}
                                maxlength="8"
                                onChange={e => setform({ ...form, capacity: e })}
                                required
                            />
                        </div>
                        <div className=" mb-3">
                            <FormControl
                               type="datetime-local"
                                name="deadline"
                                label="RSVP Deadline"
                                value={datepipeModel.datetodatepicker(form.deadline||'')}
                                maxlength="8"
                                // maxDate={form.date}
                                onChange={e => setform({ ...form, deadline: e })}
                                error={getDateErrr(form.date,form.deadline) && submitted ? 'Entered date is greater than Event Date':''}
                                required
                            />
                        </div>

                        <div className=" mb-3">
                            <FormControl
                                type="text"
                                name="address"
                                label="Location"
                                value={form.address}
                                onChange={e => setform({ ...form, address: e })}
                                required
                            />
                        </div>

                       

                        <div className=" mb-3">
                            <FormControl
                                type="text"
                                name="externalLink"
                                label="External Link"
                                value={form.externalLink}
                                onChange={e => setform({ ...form, externalLink: e })}
                            />
                        </div>
                        <div className=" mb-3">
                           
                            <FormControl
                                type="text"
                                name="groupMemberLimit"
                                label="Group Member Limit"
                                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                value={form?.groupMemberLimit}
                                onChange={e => setform({ ...form, groupMemberLimit: e })}
                                required
                                error={getError('groupMemberLimit')}
                            />
                        </div>
                      

                        

                        {/* <div className="col-span-12 md:col-span-6">
                                <label className='lablefontcls'>Image</label><br></br>
                                <ImageUpload model="users" result={e => imageResult(e, 'image')} value={images.image || form.image} />
                            </div> */}
                    </div>

                    <div className="col-span-full mb-3">
                            <FormControl
                                type="editor"
                                name="description"
                                label="Description"
                                value={form.description}
                                onChange={e => setform({ ...form, description: e })}
                                required
                                error={getError('description')}
                            />
                        </div>


                    <div className="text-right">

                        <button type="submit" className="text-white bg-orange-400 bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
                    </div>
                </div>


            </form>
        </Layout>
    </>
}

export default AddEdit