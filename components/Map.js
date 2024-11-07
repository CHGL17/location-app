import MapView from "react-native-maps";
import { StyleSheet } from "react-native";

const Map = ({ location, children }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 30,
        longitudeDelta: 60,
      }}
    >
      {children}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
