import { React, useContext, useState }  from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../theme/themeContext';
import theme from '../theme/theme';

const SECTIONS = [
    {
      header: 'Settings',
      icon: 'settings',
      items: [
        {
          icon: 'moon',
          color: '#007afe',
          label: 'Dark Mode',
          value: false,
          type: 'boolean_dark_mode',
        },
        {
          icon: 'volume-2',
          color: '#fd2d54',
          label: 'Text-to-speech',
          value: false,
          type: 'boolean_text_to_speech',
        },
        { icon: 'mail', 
        color: '#8e8d91', 
        label: 'Contact Us', 
        type: 'link' 
      },
      ],
    }
  ];  

export default function SettingsScreen({ navigation }) {
  const theme = useContext(themeContext)
  const [darkMode, setDarkMode] = useState(false)
    return (
        <SafeAreaView style={[{ flex: 1 }, {backgroundColor:theme.backgroundColor}]}>
          <ScrollView contentContainerStyle={[styles.container, {backgroundColor:theme.backgroundColor}]}>
            
    
            {SECTIONS.map(({ header, items }) => (
              <View style={[styles.section, {backgroundColor:theme.backgroundColor}]} key={header}>
                <Text style={[styles.sectionHeader, {color:theme.color}]}>{header}</Text>
                {items.map(({ label, icon, type, value, color }, index) => {
                  return (
                    <TouchableOpacity
                      key={label}
                      onPress={() => {
                        // handle onPress
                      }}>
                      <View style={[styles.row, theme.coloricon]}>
                        <View style={[styles.rowIcon, { backgroundColor: color }]}>
                          <FeatherIcon color="#fff" name={icon} size={18} />
                        </View>
    
                        <Text style={[styles.rowLabel, {color:theme.color}]}>{label}</Text>
    
                        <View style={[styles.rowSpacer, {backgroundColor:theme.backgroundColor}]} />
    
                        {type === 'boolean_dark_mode' && <Switch
                          value = {darkMode}
                          onValueChange = {(value) => {
                            setDarkMode(value);
                            EventRegister.emit('ChangeTheme', value)
                          }}
                        />}

                        {type === 'boolean_text_to_speech' && <Switch
                          value = {value}
                        />}
                      <TouchableOpacity onPress={() => navigation.navigate("ContactUs")}>
                        {type === 'link' && (
                          <FeatherIcon
                            color="#5d5d5d"
                            name="chevron-right"
                            size={22}
                          />
                        )}
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      );
    }

    const styles = StyleSheet.create({
        container: {
          paddingVertical: 24,
        },
        section: {
          paddingHorizontal: 24,
        },
        sectionHeader: {
          paddingVertical: 12,
          fontSize: 16,
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
          marginTop: 5,
          fontSize: 16,
          color: '#989898',
          textAlign: 'center',
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: 50,
          borderRadius: 8,
          marginBottom: 12,
          paddingLeft: 12,
          paddingRight: 12,
          borderStyle: 'solid'
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
      });