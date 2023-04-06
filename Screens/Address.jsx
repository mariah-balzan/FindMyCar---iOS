import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
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
  const [area, setArea] = useState('')
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
  props.navigation.navigate('Register', { markerCoordinates , area});
};

  const handleSavePress = () => {
    const isValid = checkValid()
    console.log("is valid?", isValid)
    console.log(markerCoordinates);
    if(isValid){
      navigateToSignup();
      }
      showSuccess("Valid locations inputted")
    }

  return (
    <View style={[styles.container]}>
      <View style = {[styles.bottomCard]}>
            <Text style = {[styles.header]}>Locate your home</Text>
            <Text style = {[styles.subtitle]}>Pin your home and add a safety geofence</Text>
            <Text style={styles.inputTitle}>Geofence area :</Text>
              <TextInput
                placeholder='Area'
                value={area}
                onChangeText={text => setArea(text)}
                style={styles.input}
                keyboardType='number-pad'
              />
            <CustomBtn
            btnText = "Save Address"
            btnStyle = {{width:'45%', marginBottom:'-3%'}}
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
            <>
              <Marker
                coordinate={markerCoordinates}
                draggable
                onDragEnd={(event) => setMarkerCoordinates(event.nativeEvent.coordinate)}
              />
              <Circle
                center={markerCoordinates} 
                radius={area} 
                fillColor='rgba(255, 0, 0, 0.1)'
                strokeColor='rgba(255, 0, 0, 0.5)'
              />
            </>
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
    paddingVertical: '10%',
    borderRadius:30,
    paddingTop:'13%',
    alignItems:'center'
  },
  header: {
    marginBottom:'5%', 
    marginTop:'3%', 
    color:'#023047', 
    fontSize:'24', 
    fontFamily:'Comfortaa'
  },
  subtitle:{
    marginBottom:'5%', 
    marginTop:'3%', 
    color:'#023047', 
    fontSize:'20', 
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
      input: {
        fontFamily:'Comfortaa', 
        backgroundColor: 'white',
        width:'80%',
        borderColor:'#023047',
        borderWidth:'1%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: '2%',
        margin:'7%',
      },
})
