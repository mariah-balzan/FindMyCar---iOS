import { useRef, useState }  from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import FlashMessage from 'react-native-flash-message';
import ChooseLocation from './ChooseLocation';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import CustomBtn from '../components/CustomBtn';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import {GOOGLE_MAPS_KEY} from '@env'

const Tab = createBottomTabNavigator();


const Home = () => {
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
              name={icons[route.name]}
              color= '#023047'
              size= '24px'
            />
            // https://materialdesignicons.com/
          );
        },
      })}>
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

  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [state, setState] = useState({
    originCords: {
      latitude: 35.902705,
      longitude:14.483579,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    },
    destinationCords: {
      latitude: 35.898020,
      longitude:14.476714,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
    }
  })
  const { originCords, destinationCords } = state

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
      destinationCords:{
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      }
    })
    console. log("data=>>>>>", data)
}

  return (
    <View style={styles.container}>
      <View style = {styles.bottomCard}>
            <Text style = {{marginBottom:'5%', marginTop:'3%', color:'#FFB703', fontSize:'24', fontFamily:'Comfortaa'}}>Want to find your car?</Text>
            <CustomBtn
            btnText = "Choose your location"
            btnStyle = {{width:'80%', marginBottom:'-3%'}}
            onPress = {onPressLocation}
      />
          </View>
      <View style ={{flex:1}}>
      <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...originCords, 
            latitudeDelta:LATITUDE_DELTA,
            longitudeDelta:LONGITUDE_DELTA
          }}
          >
          <Marker
            coordinate={originCords}
          />
          <Marker
          coordinate={destinationCords} 
          image={carImage}/>

          {/* <MapViewDirections
            origin = {originCords}
            destination={destinationCords}
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
})
