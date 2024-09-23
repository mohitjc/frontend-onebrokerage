import React, { useState, useRef, useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import environment from "../../../environment";
import "./style.scss";
const GooglePlacesAutocomplete = ({ placeholder, result, id, value }) => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoader] = useState(true);
  const autocompleteRef = useRef(null);
  const debounceTimeout = useRef(null);
  useEffect(()=>{
    setSearchText(value)
  },[value])
  const handlePlaceSelect = (place) => {
    // onSelect(place);
    placeChange(place);
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (inputText.trim() !== "") {
        // handleAutocompleteRequest(inputText);
      }
    }, 1500); // Adjust debounce delay as needed
  };

  const handleAutocompleteRequest = (inputText) => {
    if (!autocompleteRef.current) return;
    autocompleteRef.current.setOptions({ input: inputText });
  };
  const placeChange = (place) => {
    setSearchText(place.formatted_address);
    result({
      event: "placeChange",
      value: place.formatted_address,
      place,
    });
  };

  useEffect(()=>{
    setTimeout(()=>{
      setLoader(false)
    },100)
  })

  return (
    <>
    
      {loading?<></>:<>
        <LoadScript
      googleMapsApiKey={environment.googleAPIKey}
      libraries={["places"]}
    >
        <Autocomplete
        options={{ types: "establishment", debounce: 1000 }}
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={() =>
          handlePlaceSelect(autocompleteRef.current.getPlace())
        }
      >
        <input
          type="text"
          placeholder="Location"
          value={searchText}
          className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500"
          style={{ zIndex: 1000 }}
          onChange={handleInputChange}
        />
      </Autocomplete>
      </LoadScript>
      </>}
      
   
    </>
   
  );
};

export default GooglePlacesAutocomplete;
