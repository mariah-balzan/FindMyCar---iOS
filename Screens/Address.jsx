import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CustomBtn from '../components/CustomBtn';
import { showError, showSuccess } from '../helper/helperFunction';

export default function Address(props){
  const navigation = useNavigation();
  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA =  0.00922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  //Current loc pin
  const [state, setState] = useState({
    originCords: {
      latitude: 36.04374749123692,
      longitude: 14.237039973972584,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    }
  })
  const { originCords } = state

  const mapRef = useRef()

//current location:
useEffect(() => {
  const getLocationAsync = async () => {
    // const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      setState({
        originCords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
      });
    }
  };
  getLocationAsync();
}, []);


//Obtain pin coordinates
  const [markerCoordinates, setMarkerCoordinates] = useState('');
  const handleMapPress = (event) => {
    setMarkerCoordinates(event.nativeEvent.coordinate);
  };

 //Check home pin is entered
 const checkValid = () =>{
  if(Object.keys(markerCoordinates).length === 0){
    showError('Please enter location')
    return false
  }
  return true
}

const navigateToSignup = () => {
  props.navigation.navigate('Register', { markerCoordinates });
};

  const handleSavePress = () => {
    // Here you can convert the coordinates to an address using a geocoding API
    // and save it to your database or state
    const isValid = checkValid()
    console.log("is valid?", isValid)
    console.log(markerCoordinates);
    if(isValid){
      // props.route.params.getCoordinates({
      //   markerCoordinates
      navigateToSignup();
      }
      showSuccess("Valid locations inputted")
      //navigation.goBack()
    }
  //};

  return (
    <View style={[styles.container]}>
      <View style = {[styles.bottomCard]}>
            <Text style = {[styles.header]}>Want to find your car?</Text>
            <CustomBtn
            btnText = "Choose your location"
            btnStyle = {{width:'80%', marginBottom:'-3%'}}
            onPress = {handleSavePress}
      />
          </View>
      <View style ={[{flex:1}]}>
      <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          region={originCords}
          showsUserLocation={true}
          onPress={handleMapPress}
          onUserLocationChange={(e) => {
            console.log("onUserLocationChange", e.nativeEvent.coordinate)

            setState({
              originCords:{
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
             },
          })
        }}
          >
          {markerCoordinates && (
          <Marker
            coordinate={markerCoordinates}
            draggable
            onDragEnd={(event) => setMarkerCoordinates(event.nativeEvent.coordinate)}
          />
        )}
          </MapView>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard:{
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderRadius:30,
    paddingTop:'13%',
    alignItems:'center'
  },
  header: {
    marginBottom:'5%', 
    marginTop:'3%', 
    color:'#FFB703', 
    fontSize:'24', 
    fontFamily:'Comfortaa'
  },
  saveButtonContainer: {
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
      },
      saveButton: {
        backgroundColor: 'blue',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
      },
      saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
})
