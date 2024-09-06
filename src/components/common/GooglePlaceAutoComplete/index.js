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
          placeholder="Enter a location"
          value={searchText}
          className="form-control"
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
