import { StyleSheet, Text, View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from './Screens/OnBoarding';
import LoginScreen from './Screens/LoginScreen';
import LoginRegister from './Screens/LoginRegister';
import HomeScreen from './Screens/HomeScreen';
import SignupScreen from './Screens/SignupScreen';
import { EventRegister } from 'react-native-event-listeners';
import { React, useState, useEffect }  from 'react';
import theme from './theme/theme'
import themeContext from './theme/themeContext';

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
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
      const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
        setDarkMode(data)
      })
      return () => {
        EventRegister.removeAllListeners(listener)
      }
    }, [darkMode])
    return(
      <themeContext.Provider value = {darkMode === true ? theme.dark : theme.light}>
        <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
            {/* Removes the top title and expands screen area */}
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {/* <Stack.Screen
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
            /> */}
            <Stack.Screen
            name = "Home"
            component = {HomeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </themeContext.Provider>
      
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
