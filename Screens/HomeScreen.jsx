import { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Switch,
  Alert,
  Image,
  TouchableOpacity
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";
import FlashMessage from "react-native-flash-message";
import ChooseLocation from "./ChooseLocation";
import * as Permissions from 'expo-permissions';
import MapView, { Circle, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import CustomBtn from "../components/CustomBtn";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import themeContext from "../theme/themeContext";
import theme from "../theme/theme";
import * as Location from "expo-location";
import ContactUs from "./ContactUs";
import { auth, firestore } from "../firebase";
import { getDistance } from "geolib";
import * as Speech from 'expo-speech';
import {GOOGLE_MAPS_KEY} from '@env'

const Tab = createBottomTabNavigator();

const Home = () => {
  const theme = useContext(themeContext);
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Home: "home",
              Profile: "account",
              Settings: "cog-outline",
            };

            return (
              <MaterialCommunityIcons
                name={icons[route.name]}
                color={theme.coloricon}
                size="24px"
              />
              // https://materialdesignicons.com/
            );
          },
        })}
      >
        <Tab.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={ProfileStack}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeStack}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Settings"
          component={SettingsStack}
        />
      </Tab.Navigator>
      <FlashMessage position="top" />
    </>
  );
};

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeFunction}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="chooseLocation"
        component={ChooseLocation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const HomeFunction = ({ navigation }) => {
  const theme = useContext(themeContext);
  const screen = Dimensions.get("window");
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.005;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  //Retrieve marker and geo area from firestore:
  const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const [area, setArea] = useState(null);

  //Current loc pin
  const [state, setState] = useState({
    originCords: {
      latitude: 36.04374749123692,
      longitude: 14.237039973972584,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    // destinationCords: {
    //   latitude: 35.898020,
    //   longitude:14.476714,
    //     latitudeDelta: 0.00922,
    //     longitudeDelta: 0.00421,
    // }
    destinationCords: null, //Default no destination coordinate
  });
  const { originCords, destinationCords } = state
  // const { originCords } = state;
  const mapRef = useRef();
  const carImage = require("../assets/car.png");
  const homePin = require("../assets/homePin2.png");
  const onPressLocation = () => {
    navigation.navigate("chooseLocation", { getCoordinates: fetchValues, originCords: originCords });
  };
  //For destination:
  const [isLocationChosen, setIsLocationChosen] = useState(false);

  const fetchValues = (data) => {
    setState({
      originCords: {
        latitude: data.originCords.latitude,
        longitude: data.originCords.longitude,
      },
      // destinationCords:{
      //   latitude: data.destinationCords.latitude,
      //   longitude: data.destinationCords.longitude,
      // }
      destinationCords:{
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      }
    });
    setIsLocationChosen(true);
    console.log("data=>>>>>", data);
  };

  useEffect(() => {
    const getLocationAsync = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setState((prevState) => ({
          ...prevState,
          originCords: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          // destinationCords: {
          //   latitude: 35.89802,
          //   longitude: 14.476714,
          //   latitudeDelta: 0.00922,
          //   longitudeDelta: 0.00421,
          // },
       
        }));
      }
    };
    getLocationAsync();
  },[state.originCords,state.destinationCords]);  //these dependencies ensure that the hook is triggered whenever either of these values change. 

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const user = auth.currentUser;
        const userDoc = await firestore.collection("users").doc(user.uid).get();
        const userData = userDoc.data();
        setMarkerCoordinates(userData.markerCoordinates);
        setArea(userData.area);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };
    fetchMapData();
  }, []);

  //Initialize the Speech engine
  useEffect(() => {
    Speech.speak('', { language: 'en-US' });
  }, []);

  //Geofence:
  const [isInsideGeofence, setIsInsideGeofence] = useState(false);
  const [wasInsideGeofence, setWasInsideGeofence] = useState(false);
  const [alertDisplayed, setAlertDisplayed] = useState(false);
  const [geofenceEnabled, setGeofenceEnabled] = useState(true);

  useEffect(() => {
    const checkIfOutsideGeofence = () => {
      if (originCords && markerCoordinates && geofenceEnabled) {
        const distance = getDistance(
          [originCords.latitude, originCords.longitude],
          [markerCoordinates.latitude, markerCoordinates.longitude]
        );

        // console.log("Distance:", distance);
        // console.log("Area:", area);

        const isInside = distance <= area;

        if (isInside && !wasInsideGeofence) {
          setIsInsideGeofence(true);
          setWasInsideGeofence(true);
          setAlertDisplayed(false);
          //console.log("Inside geofence");
          Alert.alert("Alert", "You are inside the geofence area!");
          Speech.speak("You are inside the geofence area!", { language: 'en-US' });
        } else if (!isInside && wasInsideGeofence) {
          setIsInsideGeofence(false);
          setWasInsideGeofence(false);
          setAlertDisplayed(false);
          //console.log("Outside geofence");
         Speech.speak("You are outside the geofence area! Get directions back home by clicking the Choose Location button.", { language: 'en-US' });
        } else if (!isInside && !wasInsideGeofence && !alertDisplayed) {
          setAlertDisplayed(true);
          //console.log("Outside geofence");
          Alert.alert("Warning", "You are outside the geofence area! Get directions back home by clicking the Choose Location button.");
         Speech.speak("You are outside the geofence area! Get directions back home by clicking the Choose Location button.", { language: 'en-US' });
        } 
        // else {
        //   console.log(
        //     "Still",
        //     wasInsideGeofence ? "Inside" : "Outside",
        //     "geofence"
        //   );
        // }
      }
    };
    checkIfOutsideGeofence();
  }, [
    originCords,
    markerCoordinates,
    area,
    isInsideGeofence,
    wasInsideGeofence,
    alertDisplayed,
  ]);

  const toggleGeofence = (value) => {
    if (!value) {
      // Speak the warning message
     Speech.speak('Are you sure you want to disable the geofence?', { language: 'en-US' });

      Alert.alert(
        'Warning',
        'Are you sure you want to disable the geofence?',
        [
          { text: 'Cancel', onPress: () => setGeofenceEnabled(true) },
          {
            text: 'Disable',
            onPress: () => {
              setGeofenceEnabled(false);
              Speech.speak(
                'Remember you will still be monitored. Turn on the geofence when you return home',
                { language: 'en-US' }
              );
              Alert.alert(
                'Reminder',
                'Remember you will still be monitored. Turn on the geofence when you return home.',
                [{ text: 'OK' }],
                { cancelable: false }
              );
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      setGeofenceEnabled(true);
    }
  };

  const centerMap = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission not granted");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setState({
        originCords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        destinationCords:state.destinationCords,
      });
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
      console.log("Recentred: ",originCords)
    } catch (error) {
      console.log("Error getting location:", error);
    }
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View
        style={[styles.bottomCard, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.header, { color: theme.color }]}>
          Where do you wish to go?
        </Text>
        <View style={styles.info}>
        <Text style={[styles.infoText, { color: theme.color }]}>
          You can stop geofence alerts by turning off the switch.
        </Text>
        <Switch
          style={{marginStart:'3%', marginTop:'5%'}}
          value={geofenceEnabled}
          onValueChange={toggleGeofence}
          trackColor={geofenceEnabled ? "#D3D3D3" : "#5BC236" }
        />
        </View>
        <CustomBtn
          btnText="Choose your location"
          btnStyle={{ width: "66%"}}
          onPress={onPressLocation}
        />
      </View>
      <View style={[{ flex: 0.72 }, { backgroundColor: theme.backgroundColor }]}>
        <MapView
          ref={mapRef}
          userInterfaceStyle={theme.userInterfaceStyle}
          style={StyleSheet.absoluteFill}
          region={originCords}
          showsUserLocation={true}
          onUserLocationChange={(e) => {
            //console.log("onUserLocationChange", e.nativeEvent.coordinate);

            setState({
              originCords: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
            });
          }}
        >
          <TouchableOpacity style={{alignItems:'flex-end'}} onPress={()=> centerMap()}>
          <Image
          style={{width:50, height:50, marginEnd:'3%', marginTop:'3%'}}source= {require("../assets/recentre.png")} 
        />
        </TouchableOpacity>
          {/* <Marker
            coordinate={markerCoordinates}
          /> */}
          {markerCoordinates && (
            <>
              <Marker 
              coordinate={markerCoordinates} 
              image={homePin} 
              style={{width:10, height:10}}
              centerOffset={{ x: 0, y: -20 }}
              />
              <Circle
                center={markerCoordinates}
                radius={area}
                fillColor="#FFB703"
                strokeColor="red"
              />
            </>
          )}
          {/* <Marker
          coordinate={destinationCords} 
          /> */}

          <MapViewDirections
            origin = {originCords}
            destination={markerCoordinates}
            apikey = {GOOGLE_MAPS_KEY}
            strokeWidth={6}
            strokeColor="#FFB703"
            optimizeWaypoints={true}
            onReady={result =>  {
            mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                right: 30,
                bottom: 300,
                left: 30,
                top: 100    
                }
          })
        }} 
            />
            <MapViewDirections
            origin = {originCords}
            destination={destinationCords}
            apikey = {GOOGLE_MAPS_KEY}
            strokeWidth={6}
            strokeColor="#FFB703"
            optimizeWaypoints={true}
            onReady={result =>  {
            mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                right: 30,
                bottom: 300,
                left: 30,
                top: 100    
                }
          })
        }} 
            />
        </MapView>
      </View>
    </View>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ContactUs"
        component={ContactUs}
      />
    </Stack.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  bottomCard: {
    flex: 0.28,
    backgroundColor: "red",
    width: "100%",
    borderRadius: 30,
    paddingTop: "13%",
    alignItems: "center",
  },
  header: {
    marginBottom: "5%",
    marginTop: "3%",
    color: "#FFB703",
    fontSize: "27",
    paddingHorizontal:'3%',
    fontFamily: "Comfortaa",
  },
  info:{
    flexDirection:'row',
    paddingHorizontal:50,
  },
  infoText:{
    color: "#FFB703",
    fontSize: "18",
    fontFamily: "Comfortaa",
    marginBottom: "7%",
    marginTop: "1%",
    marginHorizontal:'3.5%',
    textAlign:'justify'
  }
});
