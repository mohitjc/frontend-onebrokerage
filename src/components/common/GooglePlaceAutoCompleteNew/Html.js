import React, { useState } from "react"
import environment from "../../../environment";
import GooglePlacesAutocomplete,{geocodeByAddress} from 'react-google-places-autocomplete';

const Html = ({ searchText, search, placeholder, id, value,result }) => {
  const [options,setOptions]=useState([])
  return <>
  <GooglePlacesAutocomplete
          apiKey={environment?.googleAPIKey}
          d
          selectProps={{
            placeholder: searchText?searchText:placeholder,
            onChange: (e) => {
             geocodeByAddress(e.label)
            .then(results => {
              if(results.length){
                result(results[0])
              }
            },err=>{
            })
            .catch(error => console.error("error",error));
            }
          }}
        />
    {/* <input compoment="GooglePlaceAutoComplete" autoComplete="off" type="text" id={'pac_input_' + id} value={searchText||''} placeholder={placeholder || ''} onChange={e => search(e.target.value)} className=" mt-2 shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 !ring-primary !outline-primary disabled:!bg-gray-200" /> */}
  </>
}

export default Html