import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Dimensions, Image, ImageBackground} from "react-native";
import { auth } from "../firebase";

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

export default function LoginScreen ({navigation}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
        
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if(user){
            navigation.replace("Home")
          }
        })
        return unsubscribe
      }, [])
  
      const handleLogin = () => {
        auth.signInWithEmailAndPassword(email,password).then(userCredentials => {
          const user = userCredentials.user;
          console.log('Logged in with: ', user.email)
        })
        .catch(error => alert(error.message))
      }
  
      return(
        <View style={{flex:1}}>
        <View style={{flex:0.6}}>
    <ImageBackground source={require("../assets/loginRegister.png")} style={styles.imageBackground}>
      <TouchableOpacity onPress={() => navigation.navigate("LoginRegister") }>
      <Image source={require("../assets/back-white.png")} style={styles.backIcon} />
        </TouchableOpacity>
      <View style={styles.logo}>
          <Image style={{width:80, height:90}}source= {require("../assets/pin.png")} />
          <Text style= {styles.title}>Welcome back!</Text>  
          <Text style= {styles.subtitle}>Sign into your account to continue</Text>
      </View>
    </ImageBackground>
    </View>
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : null}  
    style={styles.container}>      
    <View style={styles.registerContainer}> 
            <View style = {styles.inputContainer}>
            <Text style= {styles.inputTitle}>Email address</Text>
              <TextInput
                  placeholder='Email'
                  value= {email}
                  onChangeText={text => setEmail(text)}
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType={"email-address"}
              />
              <Text style= {styles.inputTitle}>Password</Text>
              <TextInput
                  placeholder='Password'
                  value= {password}
                  onChangeText={text => setPassword(text)}
                  style={styles.input}
                  secureTextEntry = {true}
                  autoCapitalize="none"
                  autoCorrect={false}
              />
           </View>
           
              <TouchableOpacity   
                  onPress={handleLogin}
                  style={styles.button}>
                  <Text style = {styles.buttonOutlineText}>Login</Text>
              </TouchableOpacity>
    </View>
</KeyboardAvoidingView>
</View>
      )
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 0.6,
        flexDirection:'column',
      },
      backIcon:{
        width:32, 
        height:32,
        margin:'4%',
        marginTop:'13%'
      },
      logo:{
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginBottom:'0%',
        padding:'6%',
        //marginTop:'25%'
      },
        imageBackground: {
          width: '100%', 
          height: height*0.6,
          resizeMode: 'stretch'
        },
      title:{
        color:'#ffff', 
        fontSize:'43', 
        fontFamily:'Comfortaa', 
        paddingTop:'10%',
        textAlign:'left'
    },
    subtitle:{
        color:'#ffff', 
        fontSize:'19', 
        fontFamily:'Comfortaa', 
        paddingTop:'6%',
        textAlign:'left'
    },
    registerContainer:{
      flex:1,
    backgroundColor: '#ffff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
    },
      inputContainer: {
        backgroundColor: 'white',
        width:width,
        },
        inputTitle:{
            color:'#023047', 
            fontSize:'16', 
            fontFamily:'Comfortaa', 
            paddingTop:'6%',
            textAlign:'left',
            marginStart:'7%'
            //marginTop: '3%',
        },
        input: {
          fontFamily:'Comfortaa', 
          backgroundColor: 'white',
          width:'80%',
          borderColor:'#023047',
          borderWidth:'1%',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: '2%',
          margin:'7%',
        },
        button: {
          width:'40%',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 30,
          elevation: 3,
          backgroundColor: '#FFB703',
          marginBottom:'9%'
        },
        buttonOutlineText: {
          color:'#ffff', 
          fontSize:'18', 
          fontFamily:'Comfortaa', 
          textAlign:'center'
        },
    });