import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";
import { View, StyleSheet } from "react-native";

export default function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);
  useEffect(() => {
    async function initialPosition() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const location = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = location.coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }
    initialPosition();
  }, []);
  if (!currentRegion) {
    return null;
  }
  return (
    <View style={styles.mapView}>
      <MapView style={styles.map} initialRegion={currentRegion} />
    </View>
  );
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1
  },
  map: {
    flex: 1
  }
});
