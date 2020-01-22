import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import api from "../../Services/api";
import {
  connect,
  disconnect,
  subscribeToNewDev
} from "../../Services/websocket";

export default function Main({ navigation }) {
  const [text, setText] = useState("");
  const [devs, setDevs] = useState([]);
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
  useEffect(() => {
    subscribeToNewDev(dev => setDevs([...devs, dev]));
  }, [devs]);
  function setupWebSocket() {
    disconnect();
    const { latitude, longitude } = currentRegion;
    connect(latitude, longitude, techs);
  }
  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const res = await api.get("/search", {
      params: {
        latitude,
        longitude,
        techs: text
      }
    });

    if (res.data) {
      setDevs(res.data.devs);
      setupWebSocket();
    }
  }

  function handleRegionChange(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }
  return (
    <View style={styles.mapView}>
      <MapView
        onRegionChangeComplete={handleRegionChange}
        style={styles.map}
        initialRegion={currentRegion}
      >
        {devs
          ? devs.map(dev => (
              <Marker
                key={dev._id}
                coordinate={{
                  longitude: dev.location.coordinates[0],
                  latitude: dev.location.coordinates[1]
                }}
              >
                <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                <Callout
                  onPress={() => {
                    navigation.navigate("Profile", { user: dev.user });
                  }}
                >
                  <View style={styles.callout}>
                    <Text style={styles.devName}>{dev.name}</Text>
                    <Text style={styles.devBio}>{dev.bio}</Text>
                    <Text style={styles.devTech}>{dev.techs.join(", ")}</Text>
                  </View>
                </Callout>
              </Marker>
            ))
          : null}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={{ color: "#000" }}
          value={text}
          onChangeText={setText}
          style={styles.searchInput}
          placeholder="Buscar devs por tecnologias"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.loadButton} onPress={loadDevs}>
          <MaterialIcons name="my-location" size={20} color="#Fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1
  },
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#fff"
  },
  callout: {
    width: 260
  },
  devBio: {
    color: "#666",
    marginTop: 5
  },
  devName: {
    fontWeight: "bold",
    fontSize: 16
  },
  devTech: {
    marginTop: 5
  },
  searchForm: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row"
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: "#333",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: "#8e4dff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  }
});
