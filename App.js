import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated, Alert, Button } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permite el acceso a la ubicación para continuar.");
        return;
      }
      setError(null);
      // await Location.watchPositionAsync(
      //   {
      //     accuracy: Location.Accuracy.High,
      //     timeInterval: 5000,
      //     distanceInterval: 10,
      //   },
      //   (location) => {
      //     setLocation(location);
      //   }
      // );
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(location);
    } catch (error) {
      setError(
        "Error al acceder a la ubicación. Revisa la configuración de ubicación del dispositivo."
      );
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (location) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [location]);

  const handleMarkerPress = () => {
    Alert.alert(
      "Coordenadas",
      `Latitud: ${location.coords.latitude}, Longitud: ${location.coords.longitude}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SateliApp</Text>
      <Animated.View style={{ ...styles.waitingContainer, opacity: fadeAnim }}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button title="Reintentar" onPress={requestLocationPermission} />
          </View>
        ) : (
          <Text style={styles.waitingText}>Cargando...</Text>
        )}
      </Animated.View>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Mi ubicación"
            onPress={handleMarkerPress}
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  waitingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  waitingText: {
    fontSize: 18,
    color: "gray",
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
});
