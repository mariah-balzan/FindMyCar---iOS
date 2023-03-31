import React, { useEffect, useState } from "react";
import {View, Text, Image, StyleSheet,  Pressable, Dimensions, ImageBackground} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

WebBrowser.maybeCompleteAuthSession();

export default function LoginRegister ({navigation}){

    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: "1084132337669-ridmqvmefpui7p0ahm4q1ff43apntqo3.apps.googleusercontent.com",
      iosClientId: "1084132337669-somk2cjpc0v74vd3n07ths7gacoc85j0.apps.googleusercontent.com",
      androidClientId: "1084132337669-uq6ndhrflsc7aprcahrvn986aful84rm.apps.googleusercontent.com"
    });

    useEffect(() => {
        if(response?.type === "success") {
          setAccessToken(response.authentication.accessToken);
          accessToken && fetchUserInfo();
          navigation.replace("Home")
        }
      }, [response, accessToken])
  
      async function fetchUserInfo() {
        let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const useInfo = await response.json();
        setUser(useInfo);
      }

      const ShowUserInfo = () => {
        if(user) {
          return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom: 20}}>Welcome</Text>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
            </View>
          )
        }
      } 

    return(
        <View style={styles.container}>
            <ImageBackground source={require("../assets/loginRegister.png")} style={{width: width, height: height,resizeMode: 'stretch'}}>
            <View style={styles.logo}>
                <Image style={{width:110, height:150}}source= {require("../assets/pin.png")} />
                <Text style= {styles.title}>TrackPal</Text>  
                <Text style= {styles.subtitle}>Your virtual companion assisting you everyday, everywhere!</Text>
            </View>
            <View style = {styles.buttonContainer}>
                 <Pressable style={styles.registerButton}  onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.registerText}>Sign Up</Text>
                </Pressable>
                    <Pressable style={styles.loginButton} onPress={() => navigation.navigate("Login") }>
                    <Text style={styles.loginText}>Login</Text>
                    </Pressable>
                    {user && <ShowUserInfo />}
                     {user === null &&
                    <Pressable   
                        disabled={!request}
                        onPress={() => {
                        promptAsync();
                        }} 
                        style={styles.googleButton}
                    >
                     <Text style={styles.registerText}>Sign in with       </Text>
                     <Image source={require("../assets/google.png")} style={styles.google}></Image>
                     </Pressable>
        }
            </View>
            </ImageBackground>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      justifyContent: 'center',
      alignItems:'center'
      
    },
    logo:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:'0%',
        padding:'10%',
        marginTop:'35%'
    },
    title:{
        color:'#ffff', 
        fontSize:'43', 
        fontFamily:'Comfortaa', 
        paddingTop:'10%',
        textAlign:'center'
    },
    subtitle:{
        color:'#ffff', 
        fontSize:'20', 
        fontFamily:'Comfortaa', 
        paddingTop:'4%',
        textAlign:'center'
    },
    buttonContainer:{
        alignItems:'center',
        justifyContent:'flex-end',
        marginTop:'15%'
    },
    registerButton:{
        width:'48%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: '#ffff',
        marginBottom:'9%',
        marginTop:'-9%'
    },
    loginButton:{
        width:'48%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: '#FFB703',
        marginBottom:'9%'
        // borderColor:'#FFB703',
        // borderWidth:'2'
    },
    registerText:{
        color:'#FFB703', 
        fontSize:'18', 
        fontFamily:'Comfortaa', 
        textAlign:'center'
    },
    loginText:{
        color:'#ffff', 
        fontSize:'18', 
        fontFamily:'Comfortaa', 
        textAlign:'center'
    },
    googleButton:{
        flexDirection:'row',
        width:'48%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: '#ffff',
    },
    google:{
        width:25, 
        height:25    
    }
  });