import { useContext, useEffect, useRef, useState }  from 'react'
import { StyleSheet, Text, View, Dimensions, Switch } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import FlashMessage from 'react-native-flash-message';
import ChooseLocation from './ChooseLocation';
import MapView, { Circle, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import CustomBtn from '../components/CustomBtn';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import themeContext from '../theme/themeContext';
import theme from '../theme/theme';
import * as Location from "expo-location";
import ContactUs from './ContactUs';
import { auth, firestore } from '../firebase';
// import {GOOGLE_MAPS_KEY} from '@env'

const Tab = createBottomTabNavigator();

const Home = () => {
  const theme = useContext(themeContext)
  return (
    <>
      <Tab.Navigator 
       screenOptions={({ route}) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'home',
            Profile: 'account',
            Settings: 'cog-outline'
          };
    
          return (
            <MaterialCommunityIcons
              name ={icons[route.name]}
              color = {theme.coloricon}
              size = '24px'
            />
            // https://materialdesignicons.com/
          );
        },
      })}
      >
        <Tab.Screen options = {{headerShown:false}} name="Profile" component={ProfileStack} />
        <Tab.Screen options = {{headerShown:false}} name="Home" component={HomeStack} />
        <Tab.Screen options = {{headerShown:false}} name="Settings" component={SettingsStack} />
      </Tab.Navigator>
      <FlashMessage
    position='top'
  />
      </>
  );
}

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeFunction} options = {{headerShown:false}}/>
      <Stack.Screen name="chooseLocation" component={ChooseLocation} options = {{headerShown:false}}/>
    </Stack.Navigator>
  );
}

const HomeFunction = ({navigation}) => {
  const theme = useContext(themeContext)
  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA =  0.005;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  //Current loc pin
  const [state, setState] = useState({
    originCords: {
      latitude: 36.04374749123692,
      longitude: 14.237039973972584,
      latitudeDelta: 0.005,
      longitudeDelta: 0.003,
    },
    // destinationCords: {
    //   latitude: 35.898020,
    //   longitude:14.476714,
    //     latitudeDelta: 0.00922,
    //     longitudeDelta: 0.00421,
    // }
  })
  // const { originCords, destinationCords } = state
  const { originCords } = state
  const mapRef = useRef()
  const carImage = require('../assets/car.png')

  const onPressLocation = () => {
    navigation.navigate("chooseLocation", {getCoordinates:fetchValues})
  }

  const fetchValues = (data) => {
    setState({
      originCords:{
        latitude: data.originCords.latitude,
        longitude: data.originCords.longitude,
      },
      // destinationCords:{
      //   latitude: data.destinationCords.latitude,
      //   longitude: data.destinationCords.longitude,
      // }
    })
    console. log("data=>>>>>", data)
}

useEffect(() => {
  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      setState({
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
      });
    }
  };
  getLocationAsync();
}, []);
const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const [area, setArea] = useState(null);

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

  return (
    <View style={[styles.container, {backgroundColor:theme.backgroundColor}]}>
      <View style = {[styles.bottomCard, {backgroundColor:theme.backgroundColor}]}>
            <Text style = {[styles.header, {color:theme.color}]}>Want to find your car?</Text>
            <CustomBtn
            btnText = "Choose your location"
            btnStyle = {{width:'80%', marginBottom:'-3%'}}
            onPress = {onPressLocation}
      />
          </View>
      <View style ={[{flex:1}, {backgroundColor:theme.backgroundColor}]}>
      <MapView
          ref={mapRef}
          userInterfaceStyle = {theme.userInterfaceStyle}
          style={StyleSheet.absoluteFill}
          region={originCords}
          showsUserLocation={true}
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
          {/* <Marker
            coordinate={markerCoordinates}
          /> */}
           {markerCoordinates && (
            <>
              <Marker
                coordinate={markerCoordinates}
              />
              <Circle
                center={markerCoordinates} 
                radius={area} 
                fillColor='rgba(255, 0, 0, 0.1)'
                strokeColor='rgba(255, 0, 0, 0.5)'
              />
            </>
          )}
          {/* <Marker
          coordinate={destinationCords} 
          image={carImage}/> */}

          {/* <MapViewDirections
            origin = {originCords}
            destination={markerCoordinates}
            apikey = {GOOGLE_MAPS_KEY}
            strokeWidth={3}
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
               // animated:true
          })
        }} 
            /> */}
          </MapView>
          </View>
    </View>
  );
}

const ProfileStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen options = {{headerShown:false}} name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
  );
}

const SettingsStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen options = {{headerShown:false}} name="Settings" component={SettingsScreen} />
        <Stack.Screen options = {{headerShown:false}} name="ContactUs" component={ContactUs} />
      </Stack.Navigator>
  );
}

export default Home

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
})
