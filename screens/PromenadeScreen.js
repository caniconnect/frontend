// Auteur : KB
// Date : Mercredi 14 Février
// Ecran pour créer une promenade
import { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient"; 
import { useDispatch, useSelector } from 'react-redux';
import { addPlace, importPlaces } from '../reducers/user';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

//feuille de style global
const globalCSS = require("../styles/global.js");

import { updateNickname } from '../reducers/user';

export default function PromenadeScreen() {
  

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition(location.coords);
          });
      }
    })();

  /*   fetch(`${BACKEND_ADDRESS}/places/${user.nickname}`)
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(importPlaces(data.places));
      }); */
  }, []);

  /* const markers = user.places.map((data, i) => {
    return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.name} />;
  }); */

  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <Text>Welcome to caniconnect PromenadeScreen !</Text>
      <MapView onLongPress={(e) => handleLongPress(e)} mapType="hybrid" style={styles.map}>
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#fecb2d" />}
       
      </MapView>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2B872',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      flex: 0.5,
    },
  });
  