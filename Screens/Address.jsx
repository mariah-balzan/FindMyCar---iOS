import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [markerCoordinates, setMarkerCoordinates] = useState(null);

  const handleMapPress = (event) => {
    setMarkerCoordinates(event.nativeEvent.coordinate);
  };

  const handleSavePress = () => {
    // Here you can convert the coordinates to an address using a geocoding API
    // and save it to your database or state
    console.log(markerCoordinates);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markerCoordinates && (
          <Marker
            coordinate={markerCoordinates}
            draggable
            onDragEnd={(event) => setMarkerCoordinates(event.nativeEvent.coordinate)}
          />
        )}
      </MapView>
      {markerCoordinates && (
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity onPress={handleSavePress} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Address</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  saveButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapScreen;
