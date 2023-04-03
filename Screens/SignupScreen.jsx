import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, ImageBackground, Dimensions, Image, ScrollView} from "react-native";
import { auth } from "../firebase";

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
export default function SignupScreen ({navigation}){
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [emergencyName, setEmergencyName] = useState('')
  const [emergencyNum, setEmergencyNum] = useState('')
  const [address, setAddress] = useState('')
      
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
          navigation.replace("Home")
        }
      })
      return unsubscribe
    }, [])

    const handleSignUp = () => {
      auth.createUserWithEmailAndPassword(email, password, {firstName,lastName}).then(userCredentials => {
        const user = userCredentials.user
        console.log('Registered with: ', user.email)
      })
      .catch(error => alert(error.message))
    }

return (
  <View style={{flex:1}}>
  <View style={{flex:0.4}}>
    <ImageBackground 
      source={require("../assets/loginRegister.png")} 
      style={styles.imageBackground}>
      <TouchableOpacity onPress={() => navigation.navigate("LoginRegister") }>
        <Image source={require("../assets/back-white.png")} style={styles.backIcon}/>
      </TouchableOpacity>
      <View style={styles.logo}>
        <Image style={styles.logoImage} source={require("../assets/pin.png")} />
        <Text style={styles.title}>Let's get to know you!</Text>  
      </View>
    </ImageBackground>
    </View>
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : null}  
    style={styles.container}>
       <ScrollView>
    <View style={styles.registerContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.subtitle}>Account details</Text>

      <Text style={styles.inputTitle}>Email address:</Text>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          keyboardType='email-address'
        />
        <Text style={styles.inputTitle}>Password:</Text>
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Text style={styles.subtitle}>Personal details</Text>
        <Text style={styles.inputTitle}>First Name:</Text>
        <TextInput
          placeholder='First Name'
          value={firstName}
          onChangeText={text => setFirstName(text)}
          style={styles.input}
        />
        <Text style={styles.inputTitle}>Last Name:</Text>
        <TextInput
          placeholder='Last Name'
          value={lastName}
          onChangeText={text => setLastName(text)}
          style={styles.input}
        />
        <Text style={styles.inputTitle}>Age:</Text>
        <TextInput
          placeholder='Age'
          value={age}
          onChangeText={text => setAge(text)}
          style={styles.input}
          keyboardType='number-pad'
        />
      <Text style={styles.inputTitle}>Emergency Contact:</Text>
      <View style={{flexDirection:'row', marginEnd:'6%'}}>
        <TextInput
          placeholder='Name'
          value={emergencyName}
          onChangeText={text => setEmergencyName(text)}
          style={{
          fontFamily:'Comfortaa', 
          backgroundColor: 'white',
          width:'50%',
          borderColor:'#023047',
          borderWidth:'1%',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: '2%',
          margin:'7%'}}
        />
        <TextInput
          placeholder='Number'
          value={emergencyNum}
          onChangeText={text => setEmergencyNum(text)}
          style={{
          fontFamily:'Comfortaa', 
          backgroundColor: 'white',
          width:'30%',
          borderColor:'#023047',
          marginStart:'-1%',
          borderWidth:'1%',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: '2%',
          margin:'7%'
        }}
          keyboardType='number-pad'
        />
        </View>
        <Text style={styles.inputTitle}>Address:</Text>
        <View style={{flexDirection:'row', marginEnd:'10%'}}>
        <TextInput
          placeholder='Address'
          value={address}
          onChangeText={text => setAddress(text)}
          style={{
          fontFamily:'Comfortaa', 
          backgroundColor: 'white',
          width:'73%',
          borderColor:'#023047',
          borderWidth:'1%',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: '2%',
          margin:'7%'}}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Address") }>
          <Image source={require("../assets/maps.png")} style={styles.mapIcon}/>
        </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity   
        onPress={handleSignUp}
        style={styles.button}
      >
        <Text style={styles.buttonOutlineText}>Register</Text>
      </TouchableOpacity>
      
    </View>
    </ScrollView>
  </KeyboardAvoidingView>
  
  </View>
  
);
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    flexDirection: 'column',
  },
  imageBackground: {
    width: '100%', 
    height: height*0.4,
    resizeMode: 'stretch'
  },
  backIcon: {
    width: 32, 
    height: 32,
    margin: '4%',
    marginTop: '13%'
  },
  logo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: '0%',
    padding: '6%',
  },
  logoImage: {
    width: 80, 
    height: 90
  },
  title: {
    color: '#ffff', 
    fontSize: 43, 
    fontFamily: 'Comfortaa', 
    paddingTop: '5%',
    textAlign: 'left'
  },
  subtitle: {
    marginStart:'6%', 
    color: 'black', 
    fontSize: 19, 
    fontFamily: 'Comfortaa',
    marginTop:'5%'
  },
  registerContainer: {
    flex:1,
    //height: '50%',
    backgroundColor: '#ffff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
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
      mapIcon: {
        width: 38, 
        height: 38,
        marginTop:'10%'
      },
  });