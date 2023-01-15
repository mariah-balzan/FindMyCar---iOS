import React from 'react'
import { auth } from '../firebase'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CustomBtn from '../components/CustomBtn';
import themeContext from '../theme/themeContext';
import theme from '../theme/theme';

export default function ProfileScreen({ navigation }) {

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginRegister")
      })
      .catch(error => alert(error.message))
  }
  return (
    <View style={[styles.container, {backgroundColor:theme.backgroundColor}]}>
        <View style={[styles.profile, {backgroundColor:theme.backgroundColor}]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAvatarWrapper}>
                  <Image
                    alt=""
                    source={{
                      uri: 'https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg',
                    }}
                    style={styles.profileAvatar}
                  />
    
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}>
                    <View style={styles.profileAction}>
                      <FeatherIcon color="#fff" name="edit-3" size={15} />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
    
              <View style={[styles.profileBody, {backgroundColor:theme.backgroundColor}]}>    
                <Text style={[styles.profileEmail]}>
                    {auth.currentUser?.email}
                </Text>
              </View>
            </View>  
        <CustomBtn
            btnText = "Sign Out"
            btnStyle = {{marginTop:'7%'}}
            onPress = {handleSignOut}
      />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 24,
    },
     button: {
      backgroundColor: '#0782F9',
      width: '30%',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
    },
    button1: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 40,
      },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
      section: {
        paddingHorizontal: 24,
      },
      sectionHeader: {
        paddingVertical: 12,
        fontSize: 12,
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
      },
      profile: {
        padding: 24,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      profileAvatar: {
        width: 72,
        height: 72,
        borderRadius: 9999,
      },
      profileAvatarWrapper: {
        position: 'relative',
      },
      profileAction: {
        position: 'absolute',
        right: -4,
        bottom: -10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 9999,
        backgroundColor: '#007bff',
      },
      profileName: {
        marginTop: 20,
        fontSize: 19,
        fontWeight: '600',
        color: '#414d63',
        textAlign: 'center',
      },
      profileEmail: {
        marginTop: 20,
        fontSize: 16,
        color: '#989898',
        textAlign: 'center',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
      },
      rowIcon: {
        width: 32,
        height: 32,
        borderRadius: 9999,
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      rowLabel: {
        fontSize: 17,
        fontWeight: '400',
        color: '#0c0c0c',
      },
      rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
      userInfoSection: {
        marginBottom: 15
      },
  })