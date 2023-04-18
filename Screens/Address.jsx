import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView , Image} from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import CustomBtn from '../components/CustomBtn';
import { showError, showSuccess } from '../helper/helperFunction';
import FeatherIcon from "react-native-vector-icons/Feather";

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
  const [markerCoordinates, setMarkerCoordinates] = useState({});
  const [area, setArea] = useState('')
  const handleMapPress = (event) => {
    setMarkerCoordinates(event.nativeEvent.coordinate);
  };

 //Check home pin is entered
const checkValid = () => {
  if (Object.keys(markerCoordinates).length === 0) {
    showError('Please enter Home Address');
    return false;
  }
  return true;
}

 //Check geofence area is entered
 const checkValidGeo = () => {
  if (Object.keys(area).length === 0) {
    showError('Please enter geofence area');
    return false;
  }
  return true;
}


const navigateToSignup = () => {
  props.navigation.navigate('Register', { markerCoordinates , area});
};

  const handleSavePress = () => {
    const isValid = checkValid()
    const geoValid = checkValidGeo()
    console.log("is valid?", isValid)
    console.log("is geo valid?", geoValid)
    console.log(markerCoordinates);
    console.log(Object.keys(markerCoordinates))
    if(isValid && geoValid){
      showSuccess("Valid locations inputted")
      navigateToSignup();
      }else{
        showError("Please enter details")
      }
      
    }

  return (
    <View style={[styles.container]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : null}  
        style={styles.bottomCard}>
      {/* <View style = {[styles.bottomCard]}> */}
    <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate("Register") }>
        <Image source={require("../assets/backYellow.png")} style={styles.backIcon}/>
      </TouchableOpacity>
            <Text style = {[styles.header]}>Locate your home</Text>
            </View>
            <Text style = {[styles.subtitle]}>Press anywhere on the map to pin your home and add a safety geofence below.</Text>
          <View style={{justifyContent:'center', alignItems: 'center'}}>
            <Text style={styles.inputTitle}>Geofence Area:</Text>
              <TextInput
                placeholder='Area'
                value={area}
                onChangeText={text => setArea(text)}
                style={styles.input}
                keyboardType='number-pad'
              />
            <CustomBtn
            btnText = "Save Address"
            btnStyle = {{width:'45%'}}
            onPress = {handleSavePress}
      />
          </View>
          </KeyboardAvoidingView>
      <View style ={{flex:0.7}}>
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
    flexDirection:'column',
   justifyContent:'center'
  },
  bottomCard:{
    flex:0.4,
    backgroundColor: 'white',
    width: '100%',
    borderRadius:30,
    paddingTop:'13%',
    padding: "4%",
    //alignItems:'flex-start',
  },
  backIcon: {
    width: 32, 
    height: 32,
    margin: '4%',
    marginTop: '13%'
  },
  header: {
    // marginBottom:'5%', 
    // marginTop:'3%', 
    // color:'#023047', 
    // fontSize:'24', 
    // fontFamily:'Comfortaa',
    // justifyContent:'center'
    marginBottom: "5%",
    color: "#023047",
    marginTop:'3%', 
    fontSize: "28",
    fontFamily: "Comfortaa",
  },
  subtitle:{
    marginBottom:'5%', 
    paddingHorizontal:'1%',
    color:'#023047', 
    fontSize:'20', 
    fontFamily:'Comfortaa',
    textAlign:'justify'
  },
  inputTitle:{
    //marginBottom:'5%', 
    paddingHorizontal:'1%',
    color:'#023047', 
    fontSize:'18', 
    fontFamily:'Comfortaa',
    textAlign:'justify'
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
