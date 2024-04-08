import { useEffect, useState } from "react";
import crendentialModel from "../../models/credential.model";
import FormControl from "../../components/common/FormControl";
import loader from "../../methods/loader";
import ApiClient from "../../methods/api/apiClient";
import environment from "../../environment";

export default function AddAttendee({ id = '', eventId, guest=false,result = (e) => { },eventDetail }) {
    const user = crendentialModel.getUser()
    const [submitted, setSubmitted] = useState(false)
    const [users, setUsers] = useState([])
    const [members, setMember] = useState([{fullName: '', email: '' }])
  
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let method = 'post'
        let url = 'api/attendees'
        
        
        let value = {
           data:members.map(itm=>{
            return {
                ...itm,
                eventId: eventId,
                attendeeRole: 'member',
                addedBy: user._id,
                groupId: eventDetail?.groupId?._id||'',
                isConnectedMeating: true
            }
           })
        }

       
        let ext=value.data.find(itm=>!itm.memberId)
    
        if(ext && !guest) return

        if (value.id) {
            method = 'put'
            url = 'api/attendees/update'
        } else {
            delete value.id
        }

        if(guest){
            url='api/add/guest/attendee'
            value=value.data[0]
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                // ToastsStore.success(res.message)
                // history(`/${shared.url}`)
                result({ event: 'submit', value: res })
            }
            loader(false)
        })
    }

    const getUsers=(p={})=>{
        let f={
            ...p,
            groupId:eventDetail?.groupId?._id||'',
            isDeleted:false
        }
        ApiClient.get('api/members/list',f).then(res=>{
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
        <form onSubmit={handleSubmit}>
            <div className="">
                {/* <h3 className="text-2xl font-semibold text-[#111827] mb-3">
                    Add Member
                </h3> */}
                {members.map((itm,i) => {
                    return <>
                        <div className="grid grid-cols-2 gap-3">
                           
                            
                            {guest?<>
                                <div className="col-md-6">
                                <FormControl
                                    type="email"
                                    label="Email"
                                    value={itm.email}
                                    onChange={e => updateMember(i,'email',e)}
                                    required
                                />
                            </div>
                            </>:<>
                            <div className="col-md-6">
                                <FormControl
                                    type="select"
                                    className="lowercase"
                                    displayValue="email"
                                    valueType="object"
                                    placeholder="Select Member"
                                    label="Member"
                                    theme="search"
                                    value={itm.memberId}
                                    options={[
                                        // {id:'',email:'Add New Member'},
                                        ...users
                                    ]}
                                    onChange={e => {
                                        if(e?.id){
                                            updateMemberAll(i,{...itm,memberId:e.id,email:e.email,fullName:e.fullName})
                                        }else{
                                            updateMemberAll(i,{...itm,memberId:'',email:'',fullName:''})
                                        }
                                    }}
                                    required={true}
                                    error={submitted&&!itm.memberId?'Member is required':''}
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

                            {/* <div className="col-span-12 md:col-span-6">
                                <label className='lablefontcls'>Image</label><br></br>
                                <ImageUpload model="users" result={e => imageResult(e, 'image')} value={images.image || form.image} />
                            </div> */}
                        </div>
                    </>
                })}

                {guest?<></>:<>
                <div className="text-right mt-3">
                <button type="button" onClick={addMore} className="text-white bg-orange-400 bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add More</button> 
                </div>
                </>}

               

                <div className="text-right mt-3">

                    <button type="submit" className="text-white bg-orange-400 bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                </div>
            </div>


        </form>
    </>
}