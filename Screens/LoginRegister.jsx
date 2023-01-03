import React from "react";
import {View, Text, Image, StyleSheet,  Pressable, Dimensions, ImageBackground} from "react-native";

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

export default function LoginRegister ({navigation}){
    return(
        <View style={styles.container}>
            <ImageBackground source={require("../assets/loginRegister.png")} style={{width: width, height: height,resizeMode: 'stretch'}}>
            <View style={styles.logo}>
                <Image style={{width:110, height:150}}source= {require("../assets/pin.png")} />
                {/* Either title or "Join our community" */}
                <Text style= {styles.title}>Find my car</Text>  
                <Text style= {styles.subtitle}>Connect your car now and easily find it later</Text>
            </View>
            <View style = {styles.buttonContainer}>
                 <Pressable style={styles.registerButton}  onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.signupText}>Sign Up</Text>
                </Pressable>
                    <Pressable style={styles.loginButton} onPress={() => navigation.navigate("Login") }>
                    <Text style={styles.loginText}>Login</Text>
                    </Pressable>
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
        fontSize:'19', 
        fontFamily:'Comfortaa', 
        padding:'4%',
        textAlign:'center'
    },
    buttonContainer:{
        alignItems:'center',
        justifyContent:'flex-end',
        marginTop:'20%'
    },
    registerButton:{
        width:'40%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: '#FFB703',
        marginBottom:'9%'
    },
    loginButton:{
        width:'40%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: '#ffff',
        // borderColor:'#FFB703',
        // borderWidth:'2'
    },
    signupText:{
        color:'#ffff', 
        fontSize:'18', 
        fontFamily:'Comfortaa', 
        textAlign:'center'
    },
    loginText:{
        color:'#FFB703', 
        fontSize:'18', 
        fontFamily:'Comfortaa', 
        textAlign:'center'
    },
  });