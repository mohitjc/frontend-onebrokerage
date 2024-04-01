import React from "react";
import HtmlT from "./html";

const SelectDropdown = ({intialValue,options,isSingle,result,displayValue='name',id,placeholder="Select Status",disabled=false,name,required=false,theme='normal'}:any) => {
    const handleChange=(e:any)=>{
        result({event:"value",value:e})
    }

    return <>
        <HtmlT
        id={id}
        name={name}
        required={required}
        theme={theme}
        disabled={disabled}
        placeholder={placeholder}
        isSingle={isSingle}
        displayValue={displayValue}
        options={options}
        selectedValues={intialValue}
        handleChange={handleChange}
        />
    </>
}

export default SelectDropdown