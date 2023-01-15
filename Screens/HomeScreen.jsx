import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator()

const Home = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen options = {{headerShown:false}} name="Profile" component={ProfileStack} />
        <Tab.Screen options = {{headerShown:false}} name="Home" component={HomeStack} />
        <Tab.Screen options = {{headerShown:false}} name="Settings" component={SettingsStack} />
      </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeFunction} />
    </Stack.Navigator>
  );
}

const HomeFunction = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
            style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen</Text>
    </View>
  );
}

const ProfileStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
  );
}

const SettingsStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
