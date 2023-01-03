import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from './Screens/OnBoarding';
import LoginScreen from './Screens/LoginScreen';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginRegister from './Screens/LoginRegister';
import HomeScreen from './Screens/HomeScreen';
import SignupScreen from './Screens/SignupScreen';

//web: 959635901076-hc3911ksrgsjranm867udh81k199epda.apps.googleusercontent.com
//iOS: 959635901076-5qngqm5n7knqi8ksivm2g119v2b2quna.apps.googleusercontent.com
//android: 959635901076-ni7467l1pmqka44to5has88eod6k4qgo.apps.googleusercontent.com

//Create instance of StackNavigator
const Stack = createNativeStackNavigator();
//const [isFirstLaunch, setIsFirstLaunch] = useState(null);

export default function App() {

  return(
    <NavigationContainer>
        {/* Removes the top title and expands screen area */}
         <Stack.Navigator screenOptions={{headerShown: false}}>
         <Stack.Screen
            name = "Onboarding"
            component = {Onboarding}
            />
            <Stack.Screen
            name = "LoginRegister"
            component = {LoginRegister}
            />
            <Stack.Screen
            name = "Register"
            component = {SignupScreen}
            />
            <Stack.Screen
            name = "Login"
            component = {LoginScreen}
            />
            <Stack.Screen
            name = "Home"
            component = {HomeScreen}
            />
      </Stack.Navigator>
      </NavigationContainer>
  )
//   const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

//   useEffect(() => {
//     AsyncStorage.getItem('alreadyLaunched').then(value => {
//       if(value == null){
//         AsyncStorage.setItem('alreadyLaunched', 'true');
//         setIsFirstLaunch(true);
//       }else{
//         setIsFirstLaunch(false);
//       }
//     })
//   }, [])

// if(isFirstLaunch == null){
//   return null;
// }else if(isFirstLaunch == true){
//   return(
//     <NavigationContainer>
//     {/* Removes the top title and expands screen area */}
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//     <Stack.Screen
//         name = "Onboarding"
//         component = {Onboarding}
        
//         />
//         <Stack.Screen
//         name = "Login"
//         component = {LoginScreen}
//         />

//   </Stack.Navigator>
//   </NavigationContainer>
//   );
// }else{
//   return <LoginScreen/>
// }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
