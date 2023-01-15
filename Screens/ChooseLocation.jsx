//import liraries
import { useNavigation } from '@react-navigation/native';
import React, {useState } from 'react';
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import Coord from '../components/Coord';
import CustomBtn from '../components/CustomBtn';
import { showError, showSuccess } from '../helper/helperFunction';


const {height, width} = Dimensions.get('screen');
export default function ChooseLocation(props) {
const navigation = useNavigation();

const [state, setState] = useState({
        originCords:{},
        destinationCords:{},
})
    
const { originCords, destinationCords } = state

const checkValid = () =>{
  if(Object.keys(originCords).length === 0){
    showError('Please enter origin location')
    return false
  }
  if(Object.keys(destinationCords).length === 0){
    showError('Please enter destination location')
    return false
  }

  return true
}

const onDone = () => {
  const isValid = checkValid()
  console.log("is valid?", isValid)
  if(isValid){
    props.route.params.getCoordinates({
      originCords,
      destinationCords
    })
    showSuccess("Valid locations inputted")
    navigation.goBack()
  }
}

        const fetchAddressCords = (lat, lng) =>{
        setState({...state, originCords:{
            latitude:lat,
            longitude:lng
            } 
        })
        }
        const fetchDestinationCord = (lat, lng) => {
            setState({...state, destinationCords:{
                latitude:lat,
                longitude:lng
                } 
            })
        }
    console.log("props =>" ,props)
  
return(
  <View style = {styles.container}>
     <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1}}>
           <TouchableOpacity onPress={() => navigation.navigate("Home") }>
              <Image source={require("../assets/back-black.png")} style={styles.backIcon} />
          </TouchableOpacity>
            <Coord
              placeholderText={"Enter origin"}
              fetchAddress={fetchAddressCords}
            />
            <Coord
              placeholderText={"Enter destination"}
              fetchAddress={fetchDestinationCord}
            />
            <View style = {{alignItems:'center'}}>
            <CustomBtn
            btnText = "Done"
            btnStyle = {{marginBottom:'7%'}}
            onPress = {onDone}
      />
      </View>
      </KeyboardAvoidingView>
  </View>
)
}

const styles = StyleSheet.create({
  container:{
   flex:1,
   flexDirection:'column',
   justifyContent:'center',
    paddingTop:'14%',
    padding:'5%',
    backgroundColor:'#F3F3F3'
  },
     backIcon:{
        width:32, 
        height:32,
       // margin:'4%',
         marginBottom:'9%'
      },
  })