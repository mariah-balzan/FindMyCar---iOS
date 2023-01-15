import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import themeContext from '../theme/themeContext';
import theme from '../theme/theme';
import CustomBtn from '../components/CustomBtn';

const ContactUs = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    Alert.alert('Message Sent', 'Thank you for reaching out to us. We will get back to you soon.');
  }

  return (
    <View style={[styles.container, {backgroundColor:theme.backgroundColor}]}>
            <Text style={[styles.title]}>Contact Us</Text>
            <Text style={[styles.heading]}>Type your message below:</Text>
      <TextInput
        value={message}
        onChangeText={(text) => setMessage(text)}
        style={styles.input}
        textAlignVertical="top" 
      />
      <CustomBtn
        btnText = "Submit"
        btnStyle = {{width:'40%', marginTop:'5%'}}
        onPress = {handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    margin: 10,
    color: '#989898',
  },
  heading: {
    fontSize: 15,
    margin: 10,
    color: '#989898',
  },
  input: {
    width: '80%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  button: {
    margin: 10,
  },
});

export default ContactUs;