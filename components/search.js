import { useState } from "react"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import GetList from './GetList'
import {apiKey, googleKey} from "../api/apiKey";
import styles from "../styles";

const Search = (props) => {
  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState('')
  const [resultsVisible, setResultsVisible] = useState(false)
  
  const submit = async (e) => {
    e.preventDefault()

    if (location !== "") {
      setResultsVisible(true)
      setIsLoading(true)
      const locationArray = location.label.split(', ')
      const formattedLocation = `${locationArray[0]}, ${locationArray[locationArray.length-1]}`

      fetch(`https://imdb-api.com/API/AdvancedSearch/${apiKey}?has=locations&locations=${formattedLocation}`)
      .then((res) => res.json())
      .then((data) => {
        setList(data.results);
        setIsLoading(false);
      });
    }
  };

  const hideView= () => {
    props.setHideTrending(!props.hideTrending)
  };
  
  return(
    <>
      <GooglePlacesAutocomplete
        apiKey = {googleKey}
        selectProps={{
          placeholder: 'Enter a location...',
          styles: {
            container: (provided) => ({
              ...provided,
              color: 'black',
              width: '300px',
              marginTop: '30px',
              marginBottom: '10px',
              fontFamily: 'Arial',
            }),
          },
          location,
          onChange: setLocation,
        }}
        autocompletionRequest={{
          types: ['(cities)']
        }}
      />
      <input style={styles.submitBtn} type="submit" data-testid="submitBtn" onClick={ (e) => { submit(e); hideView(); }}/>
      {resultsVisible && <div style={styles.row}>
        <GetList list={list} isLoading={isLoading} location = {location}/>
      </div>}
    </>
  );
};

export default Search

