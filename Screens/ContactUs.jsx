import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import themeContext from '../theme/themeContext';
import theme from '../theme/theme';
import CustomBtn from '../components/CustomBtn';
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation} from "@react-navigation/native";

const ContactUs = () => {
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  
  const handleSubmit = () => {
    Alert.alert('Message Sent', 'Thank you for reaching out to us. We will get back to you soon.');
  }
  const theme = useContext(themeContext);
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1}}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <FeatherIcon color="#FFB703" name="chevron-left" size={40} />
        </TouchableOpacity>
    {/* <View style={[styles.container, {backgroundColor:theme.backgroundColor}]}> */}
            <Text style={[styles.header, { color: theme.color }]}>Contact Us</Text>
            <Text style={[styles.infoText, { color: theme.color }]}>Type your message below:</Text>
      <TextInput
        value={message}
        onChangeText={(text) => setMessage(text)}
        style={styles.input}
        textAlignVertical="top" 
        placeholder={"Enter your message here."}
      />
      <View style={{ alignItems: "center" }}>
      <CustomBtn
        btnText = "Submit"
        btnStyle = {{width:'40%', marginTop:'5%'}}
        onPress = {handleSubmit}
      />
    </View>
    </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: "14%",
    padding: "5%",
    backgroundColor: "#F3F3F3",
  },
  header: {
    marginBottom: "3%",
    color: "#FFB703",
    fontSize: "29",
    marginTop:'3%',
    margin:'2%',
    fontFamily: "Comfortaa",
    textAlign: "left",
  },
  infoText: {
    color: "#FFB703",
    fontSize: "19",
    margin:'2%',
    fontFamily: "Comfortaa",
    marginBottom: "5%",
    textAlign: "justify",
  },
  input: {
    width: '90%',
    height: 100,
    borderColor: '#FFB703',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    fontFamily:'Comfortaa',
    fontSize:'16',
  },
  button: {
    margin: 10,
  },
});

export default ContactUs;