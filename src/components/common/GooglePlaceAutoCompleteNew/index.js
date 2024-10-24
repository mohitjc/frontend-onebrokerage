import React, { useEffect, useState } from "react";
import Html from "./Html";
// import "./style.scss";

const GooglePlaceAutoComplete = ({ placeholder, result, id, value }) => {

    const [searchText, setSeatchText] = useState('')

    const search = async (text) => {
        setSeatchText(text)
        result({
            event: 'value',
            value: text
        })
    }

    const placeChange = (place) => {
        setSeatchText(place.formatted_address)
        result({
            event: 'placeChange',
            value: place.formatted_address,
            place
        })
    }

    // useEffect(() => {
    //     const input = document.getElementById("pac_input_" + id);
    //     const options = {
    //         // componentRestrictions: { country: "us" },
    //         fields: ["address_components", "geometry", "formatted_address"],
    //         strictBounds: false,
    //         // types: [],
    //     };
    //     // const autocomplete = new (google).maps.places.Autocomplete(input, options);

    //     // autocomplete.addListener("place_changed", () => {
    //     //     const place = autocomplete.getPlace();
    //     //     placeChange(place)
    //     // });
    // })

    useEffect(() => {
        setSeatchText(value)
    }, [value])



    return <Html
        id={id}
        result={result}
        placeholder={placeholder}
        searchText={searchText}
        search={search}
    />
}
export default GooglePlaceAutoComplete