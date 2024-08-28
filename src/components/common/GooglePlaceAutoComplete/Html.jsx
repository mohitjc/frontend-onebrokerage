import React from "react"

const Html=({searchText,search,placeholder,id})=>{
    return <>
    <input compoment="GooglePlaceAutoComplete" type="text" id={'pac_input_'+id} value={searchText} placeholder={placeholder||''} onChange={e=>search(e.target.value)} className="relative  bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden border border-[#00000036] px-3" />
    </>
}

export default Html