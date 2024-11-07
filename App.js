import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Map from "./components/Map";
import UserMarker from "./components/user-marker";
import { Distance, SatelliteMarker } from "./components/satellite-marker";

import { UseUserLocation } from "./hooks/use-user-location";
import { Picker } from "@react-native-picker/picker";

const satelliteList = [
  { key: 1, name: "ISS", value: 25544 },
  { key: 2, name: "Hubble", value: 20580 },
  { key: 3, name: "Starlink", value: 44925 },
  { key: 4, name: "SKY MEXICO-1", value: 40664 },
  { key: 5, name: "UNAMSAT", value: 24305 },
];

const getDistancia = (lat1, lon1, lat2, lon2) => {
  rad = (x) => (x * Math.PI) / 180;
  var R = 6378.137;
  var dLat = rad(lat2 - lat1);
  var dLong = rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

const App = () => {
  const [location, error, requestLocationPermission] = UseUserLocation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [satellite, setSatellite] = useState(25544);

  useEffect(() => {
    if (location && !error) {
      const interval = setInterval(async () => {
        const response = await fetch(
          `https://api.n2yo.com/rest/v1/satellite/positions/${satellite}/${location.coords.latitude}/${location.coords.longitude}/${location.coords.altitude}/1/&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`
        );
        const data = await response.json();
        setData(data);
      }, 5000);
      setLoading(false);
      return () => clearInterval(interval);
    }
  }, [location, error, satellite]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SateliApp</Text>
      <Picker selectedValue={satellite} onValueChange={setSatellite}>
        {satelliteList.map((satellite) => (
          <Picker.Item
            key={satellite.key}
            label={satellite.name}
            value={satellite.value}
          />
        ))}
      </Picker>
      {error && (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Reintentar" onPress={requestLocationPermission} />
        </View>
      )}
      {loading && !error ? (
        <View style={{ flex: 1 }}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.text}>Cargando...</Text>
          </View>
        </View>
      ) : (
        data.info && (
          <View style={{ flex: 1 }}>
            <Text style={{ alignSelf: "center" }}>
              {data.info.satname}:
              {getDistancia(
                location.coords.latitude,
                location.coords.longitude,
                data.positions[0].satlatitude,
                data.positions[0].satlongitude
              ).toFixed(2)}
              km
            </Text>
            <Map location={location}>
              <UserMarker location={location} />
              <SatelliteMarker satellite={data.positions[0]} />
              <Distance location={location} satellite={data.positions[0]} />
            </Map>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "gray",
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

export default App;
