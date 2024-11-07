import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Map from "./components/Map";
import UserMarker from "./components/user-marker";

import { UseUserLocation } from "./hooks/use-user-location";

export default function App() {
  // const [location, setLocation] = useState(null);
  // const [error, setError] = useState(null);
  // const fadeAnim = useRef(new Animated.Value(1)).current;

  const [location, error, requestLocationPermission] = UseUserLocation();

  // useEffect(() => {
  //   if (location) {
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  // }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SateliApp</Text>
      {/* <Animated.View style={{ ...styles.waitingContainer, opacity: fadeAnim }}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button title="Reintentar" onPress={requestLocationPermission} />
          </View>
        ) : (
          <Text style={styles.waitingText}>Cargando...</Text>
        )}
      </Animated.View> */}
      <View style={styles.waitingContainer}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button title="Reintentar" onPress={requestLocationPermission} />
          </View>
        ) : (
          <Text style={styles.waitingText}>Cargando...</Text>
        )}
      </View>

      {location && (
        <Map location={location}>
          <UserMarker location={location} />
        </Map>
      )}
    </View>
  );
}

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
  waitingText: {
    fontSize: 18,
    color: "gray",
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  waitingContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorContainer: {
    alignItems: "center",
  },
});
