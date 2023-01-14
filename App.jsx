import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from './Screens/OnBoarding';
import LoginScreen from './Screens/LoginScreen';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginRegister from './Screens/LoginRegister';
import HomeScreen from './Screens/HomeScreen';
import SignupScreen from './Screens/SignupScreen';

//Create instance of StackNavigator
const Stack = createNativeStackNavigator();

export default function App() {
  // const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  // useEffect(() => {
  //   AsyncStorage.getItem('alreadyLaunched').then(value => {
  //     if(value == null){
  //       AsyncStorage.setItem('alreadyLaunched', 'true');
  //       setIsFirstLaunch(true);
  //     }else{
  //       setIsFirstLaunch(false);
  //     }
  //   })
  // }, [])

  //   if(isFirstLaunch == null){
  //       return null;
  // }else if(isFirstLaunch == true){
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
        );
      // }else{
      //   return <LoginRegister/>
      // }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
