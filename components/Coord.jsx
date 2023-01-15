import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// import {GOOGLE_MAPS_KEY} from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function Coord({placeholderText,fetchAddress }) {

    const onPressAddress = (data, details) => {

        const lat = details.geometry.location.lat
        const lng = details.geometry.location.lng
        fetchAddress(lat, lng)
    }

   return (
        <GooglePlacesAutocomplete
            placeholder={placeholderText}
            fetchDetails = {true}
            query={{
            //   key: GOOGLE_MAPS_KEY,
              language: 'en',
            }}
            onPress={onPressAddress}
            styles={{textInputContainer:styles.containerStyle, textInput:styles.textInputStyle}}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}
            />
   );
 
    
}
const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
    },
    textInputStyle: {
        height: 48,
        color: 'black',
        fontSize: 16,
        fontFamily:'Comfortaa'
    }
});
