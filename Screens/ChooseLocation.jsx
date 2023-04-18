//import liraries
import { useNavigation,useRoute } from '@react-navigation/native';
import React, {useContext,useState} from 'react';
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import Coord from '../components/Coord';
import CustomBtn from '../components/CustomBtn';
import { showError, showSuccess } from '../helper/helperFunction';
import themeContext from '../theme/themeContext';
import theme from '../theme/theme';

const { height, width } = Dimensions.get("screen");
export default function ChooseLocation(props) {
  const navigation = useNavigation();

// const route = useRoute();
// const [state, setState] = useState({
//   originCords: route.params.originCords || {},
//   destinationCords: {}
// });
    

  const route = useRoute();
  const [state, setState] = useState({
    originCords: route.params.originCords || {},
    destinationCords: {},
  });
  const { originCords, destinationCords } = state
const checkValid = () =>{
  if(Object.keys(originCords).length === 0){
    showError('Please enter origin location')
    return false
  }
  if(Object.keys(destinationCords).length === 0){
    showError('Please enter destination location')
    return false;
  }
  return true;
}
  // const { originCords, destinationCords } = state;

  // const checkValid = () => {
  //   if (Object.keys(originCords).length === 0) {
  //     showError("Please enter origin location");
  //     return false;
  //   }
  //   if (Object.keys(destinationCords).length === 0) {
  //     showError("Please enter destination location");
  //     return false;
  //   }

// =======
//   const checkValid = () => {
//     if (Object.keys(originCords).length === 0) {
//       showError("Please enter origin location");
//       return false;
//     }
//     if (Object.keys(destinationCords).length === 0) {
//       showError("Please enter destination location");
//       return false;
//     }
  //   return true;
  // };

// // <<<<<<< Updated upstream
//     return true;
//   };

  // const onDone = () => {
  //   const isValid = checkValid();
  //   console.log("is valid?", isValid);
  //   if (isValid) {
  //     props.route.params.getCoordinates({
  //       originCords,
  //       destinationCords,
  //     });
  //     showSuccess("Valid locations inputted");
  //     navigation.goBack();
  //   }
  // };
// =======
// <<<<<<< Updated upstream
// >>>>>>> Stashed changes
// const onDone = () => {
//   const isValid = checkValid()
//   console.log("is valid?", isValid)
//   if(isValid){
//     props.route.params.getCoordinates({
//       originCords,
//       destinationCords
//     })
//     showSuccess("Valid locations inputted")
//     navigation.goBack()
//   }
// }

        // const fetchAddressCords = (lat, lng) =>{
        // setState({...state, originCords:{
        //     latitude:lat,
        //     longitude:lng
        //     } 
        // })
        // }
    //     const fetchDestinationCord = (lat, lng) => {
    //         setState({...state, destinationCords:{
    //             latitude:lat,
    //             longitude:lng
    //             } 
    //         })
    //     }
    // console.log("props =>" ,props)
  
// return(
//   <View style = {[styles.container, {backgroundColor:theme.backgroundColor}]}>
//      <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : null}
//         style={{ flex: 1}}>
//            <TouchableOpacity onPress={() => navigation.navigate("Home") }>
//             <FeatherIcon
//               color="#FFB703"
//               name="chevron-left"
//               size={40}
//             />
//           </TouchableOpacity>
            {/* <Coord 
  const onDone = () => {
    const isValid = checkValid();
    console.log("is valid?", isValid);
    if (isValid) {
      props.route.params.getCoordinates({
        originCords,
        destinationCords,
      });
      showSuccess("Valid locations inputted");
      navigation.goBack();
    }
  };

  // const fetchAddressCords = (lat, lng) =>{
  // setState({...state, originCords:{
  //     latitude:lat,
  //     longitude:lng
  //     }
  // })
  // }
  const fetchDestinationCord = (lat, lng) => {
    setState({
      ...state,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };
  console.log("props =>", props);
  const theme = useContext(themeContext);
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <FeatherIcon color="#FFB703" name="chevron-left" size={40} />
        </TouchableOpacity>
        {/* <Coord 
              placeholderText={"Enter origin"}
              fetchAddress={fetchAddressCords}
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
            /> */}
        {/* <View style={{ marginTop: 10 }}>
          <Text style={[styles.header, { color: theme.color }]}>
            Enter your destination below
          </Text>
          <Text style={[styles.infoText, { color: theme.color }]}>
          Choose from your favourites list or enter a place. 
          The origin is your current location and the direction will be generated. 
          </Text>
          </View>
          <Text style={[styles.inputs, { color: theme.color }]}> */}
{/* =======
>>>>>>> Stashed changes
            /> */}
            {/* <Coord 
              placeholderText={"Enter destination"}
              fetchAddress={fetchDestinationCord}
            />
            <View style = {{alignItems:'center'}}>
            <CustomBtn
            btnText = "Done"
            btnStyle = {{marginBottom:'7%'}}
            onPress = {onDone}
      />
      </View> */}

  // const checkValid = () => {
  //   if (!useMarkerCoordinates && Object.keys(destinationCords).length === 0) {
  //     showError("Please enter destination location");
  //     return false;
  //   }

  //   return true;
  // };


  const onDone = () => {
    const isValid = checkValid();
    console.log("is valid?", isValid);
    if (isValid) {
      props.route.params.getCoordinates({
        originCords,
        destinationCords,
      });
      showSuccess("Valid locations inputted");
      navigation.goBack();
    }
  };

  // const onDone = () => {
  //   const isValid = checkValid();
  //   console.log("is valid?", isValid);
  //   if (isValid) {
  //     props.route.params.getCoordinates({
  //       originCords,
  //       destinationCords,
  //     });
  //     showSuccess("Valid locations inputted");
  //     navigation.goBack();
  //   }
  // };

  // const useMarkerCoords = () => {
  //   setState({
  //     ...state,
  //     useMarkerCoordinates: true,
  //     destinationCords: {
  //       latitude: route.params.markerCoordinates.latitude,
  //       longitude: route.params.markerCoordinates.longitude,
  //     },
  //   });
  // };


  // const fetchAddressCords = (lat, lng) =>{
  // setState({...state, originCords:{
  //     latitude:lat,
  //     longitude:lng
  //     }
  // })
  // }
  const fetchDestinationCord = (lat, lng) => {
    setState({
      ...state,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };
  console.log("props =>", props);
 
  const theme = useContext(themeContext);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <View style={{flexDirection:'row', paddingTop:'13%',
    padding: "4%",}}>
        <TouchableOpacity onPress={() => navigation.navigate("Home") }>
        <Image source={require("../assets/backYellow.png")} style={styles.backIcon}/>
      </TouchableOpacity>
        {/* <Coord 
              placeholderText={"Enter origin"}
              fetchAddress={fetchAddressCords}
            /> */}
        {/* <View style={{ marginTop: 10 }}> */}
          <Text style={[styles.header, { color: theme.color }]}>
            Enter your destination below
          </Text>
          </View>
          {/* <Text style={[styles.infoText, { color: theme.color }]}>
          The origin is your current location and the direction will be generated. 
          </Text> */}
          {/* </View> */}
          {/* <Text style={[styles.inputs, { color: theme.color }]}>

          Origin: Current location
        </Text>
        <Text style={[styles.inputs, { color: theme.color }]}>
          Destination:

        </Text>

          </Text> */}

        <Coord
          placeholderText={"Enter destination"}
          fetchAddress={fetchDestinationCord}
        />
        <View style={{ alignItems: "center" }}>
          <CustomBtn
            btnText="Done"
            btnStyle={{ marginBottom: "7%" }}
            onPress={onDone}
          />
        </View>
{/*       
        <View style={{ marginTop: 10 }}>
          <Text style={[styles.header, { color: theme.color }]}>
            Enter your destination below
          </Text>
          <Text style={[styles.infoText, { color: theme.color }]}>
          Choose from your favourites list or enter a place. 
          The origin is your current location and the direction will be generated. 
          </Text>
          </View>
          <Text style={[styles.inputs, { color: theme.color }]}>
          Origin: Current location
        </Text>
        <Text style={[styles.inputs, { color: theme.color }]}>
          Destination:
        </Text>
        <Coord
          placeholderText={"Enter destination"}
          fetchAddress={fetchDestinationCord}
        />
        <View style={{ alignItems: "center" }}>
          <CustomBtn
            btnText="Done"
            btnStyle={{ marginBottom: "7%" }}
            onPress={onDone}
          />
        </View> */}
      </KeyboardAvoidingView>
    </View>
  );
      }

const styles = StyleSheet.create({
  // container:{
  //  flex:1,
  //  flexDirection:'column',
  //  justifyContent:'center',
  //   paddingTop:'14%',
  //   padding:'5%',
  //   backgroundColor:'#F3F3F3'
  // container: {
  //   flex: 1,
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   paddingTop: "14%",
  //   padding: "5%",
  //   backgroundColor: "#F3F3F3",
  //  // paddingTop: "14%",
  //   padding: "5%",
  //   backgroundColor: "#F3F3F3",
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    //paddingTop: "14%",
    padding: "2%",
    backgroundColor: "#F3F3F3",
  },
  backIcon: {
    width: 32, 
    height: 32,
    margin: '4%',
    //marginTop: '13%'
  },
  // backIcon: {
  //   width: 32,
  //   height: 32,
  //   // margin:'4%',
  //   marginBottom: "9%",
  // },
  //    backIcon:{
  //       width:32, 
  //       height:32,
  //      // margin:'4%',
  //        marginBottom:'9%'
  //     },
  header: {
    marginBottom: "5%",
    color: "#FFB703",
    fontSize: "28",
    fontFamily: "Comfortaa",
    textAlign: "left",
    paddingEnd:'5%'
  },
  infoText: {
    color: "#FFB703",
    fontSize: "19",
    fontFamily: "Comfortaa",
    marginBottom: "7%",
    textAlign: "justify",
  },
  inputs: {
    color: "#FFB703",
    fontSize: "18",
    fontFamily: "Comfortaa",
    marginBottom: "7%",
    textAlign: "justify",
  },
});
