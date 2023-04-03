import React, { useEffect } from "react";
import {View, Text, Button, StyleSheet, Image, Dimensions} from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import AppLoading from 'expo-app-loading';
import { useFonts } from "expo-font";
import * as Font from 'expo-font';
import * as SplashScreen from "expo-splash-screen"

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

const Skip = ({...props}) => (
    <Button
        title='Skip'
        color='#000000' 
        {...props}
        />
);
const Next = ({...props}) => (
    <Button
        title='Next'
        color='#000000' 
        {...props}
        />
);

export default function OnBoarding ({navigation}){
    const [fontsLoaded] = useFonts({
        "Comfortaa" : require('../assets/fonts/Comfortaa-VariableFont_wght.ttf'),
    })

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync()
        }
        prepare()
    },[])

if(!fontsLoaded){
    return undefined; 
}else{
    SplashScreen.hideAsync();
}

    return(
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        //skip can have .replace to remove from stack if skip is clicked
        onSkip={() => navigation.navigate("LoginRegister")}
        onDone={() => navigation.navigate("LoginRegister")}
            pages= {[
                {
                // backgroundColor: '#F4F7F8',
                backgroundColor: "#F4F7F8",
                image: <Image style={{width:320, height:320}}source= {require("../assets/screen1.png")}/>,
                title: <Text style= {{color:'#219EBC', fontSize:'43', fontFamily:'Comfortaa'}}>TrackPal</Text>,
                subtitle: <Text style= {{color:'#219EBC', fontSize:'23', fontFamily:'Comfortaa', paddingTop: '10%', textAlign:'center', padding:'5%'}}>Your virtual assistant in your pocket.</Text>,
                },
                {
                    backgroundColor: '#8ECAE6',
                    image: <Image style={{resizeMode: "stretch",width: width * 1, height:height/2.8, marginRight:'5%', marginTop:'10%'}}source= {require("../assets/screen2.png")} />,
                    title: <Text style= {{color:'#F4F7F8', fontSize:'43', fontFamily:'Comfortaa', textAlign: 'center'}}>Mobility and Assitance</Text>,
                    subtitle:  <Text style= {{color:'#F4F7F8', fontSize:'23', fontFamily:'Comfortaa', paddingTop:'10%',textAlign:'center', paddingHorizontal: '2.6%'}}>Feel comfortable accomplishing your daily tasks</Text>,
                },
                {
                    backgroundColor: '#FFDD89',
                    image: <Image style={{resizeMode: "stretch",width: width * 1, height:height/2.4}}source= {require("../assets/screen3.png")} />,
                    title: <Text style= {{color:'#023047', fontSize:'43', fontFamily:'Comfortaa',textAlign:'center'}}>Create an account now</Text>,
                    subtitle:  <Text style= {{color:'#023047', fontSize:'23', fontFamily:'Comfortaa', paddingTop:'10%',textAlign:'center', paddingHorizontal: '3.9%'}}>Your own personal profile that keeps track of your life and safety</Text>,
                },
            ]}
            />
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  