import React from "react";
import {View, Text, Button, StyleSheet, Image, Dimensions} from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import AppLoading from 'expo-app-loading';
import { useFonts } from "expo-font";

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
    let[fontsLoaded] = useFonts({
        'Comfortaa' : require('../assets/fonts/Comfortaa/Comfortaa-VariableFont_wght.ttf'),
    })

if(!fontsLoaded){
    return <AppLoading/>
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
                title: <Text style= {{color:'#219EBC', fontSize:'43', fontFamily:'Comfortaa'}}>Find my car</Text>,
                subtitle: <Text style= {{color:'#219EBC', fontSize:'16', fontFamily:'Comfortaa', paddingTop:'10%'}}>Park your car wherever, whenever.</Text>,
                },
                {
                    backgroundColor: '#8ECAE6',
                    image: <Image style={{resizeMode: "stretch",width: width * 1.1, height:height/3}}source= {require("../assets/screen3.png")} />,
                    title: <Text style= {{color:'#F4F7F8', fontSize:'35', fontFamily:'Comfortaa'}}>We got you covered</Text>,
                    subtitle:  <Text style= {{color:'#F4F7F8', fontSize:'15', fontFamily:'Comfortaa', paddingTop:'10%'}}>Easily locate and get to your car in seconds</Text>,
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
  