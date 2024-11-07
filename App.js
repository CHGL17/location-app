import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Map from "./components/Map";
import UserMarker from "./components/user-marker";
import SatelliteMarker from "./components/satellite-marker";

import { UseUserLocation } from "./hooks/use-user-location";

const getDistanciaMetros = (lat1, lon1, lat2, lon2) => {
  rad = function (x) {
    return (x * Math.PI) / 180;
  };
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

  useEffect(() => {
    if (location && !error) {
      (async () => {
        const response = await fetch(
          `https://api.n2yo.com/rest/v1/satellite/positions/25544/${location.coords.latitude}/${location.coords.longitude}/${location.coords.altitude}/1/&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`
        );
        const data = await response.json();
        setData(data);
      })();
      setLoading(false);
    }
  }, [location, error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SateliApp</Text>
      {error && (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Reintentar" onPress={requestLocationPermission} />
        </View>
      )}
      {loading ? (
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
              {getDistanciaMetros(
                location.coords.latitude,
                location.coords.longitude,
                data.positions[0].satlatitude,
                data.positions[0].satlongitude
              ).toFixed(2)}
              km
            </Text>
            <Map location={location}>
              <UserMarker location={location} />
              {data.positions.map((satellite) => (
                <SatelliteMarker key={data.info.satid} satellite={satellite} />
              ))}
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
