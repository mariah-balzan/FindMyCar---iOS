import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const CustomBtn = ({
    onPress = () => {},
    btnStyle = {},
    btnText
}) => {
    return (
     <TouchableOpacity
     onPress={onPress}
     style={{...styles.btnStyle, ...btnStyle}}
     >
         <Text style={styles.btnTextStyle}>{btnText}</Text>
     </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
        btnStyle: {
            width:'48%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            borderRadius: 30,
            elevation: 3,
            backgroundColor: '#FFB703',
        },
        btnTextStyle:{
            color:'#ffff', 
            fontSize:'18', 
            fontFamily:'Comfortaa', 
            textAlign:'center'
        }
});


export default CustomBtn;