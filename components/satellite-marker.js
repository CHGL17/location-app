import { Marker } from "react-native-maps";
import { Alert } from "react-native";

const SatelliteMarker = ({ satellite }) => {
  const handleMarkerPress = () => {
    Alert.alert(
      `Nombre: ${satellite.satname}, Altura: ${satellite.satlatitude} km, Velocidad: ${satellite.satlongitude} km/s`
    );
  };

  return (
    <Marker
      coordinate={{
        latitude: satellite.satlatitude,
        longitude: satellite.satlongitude,
      }}
      image={require("../assets/satellite.png")}
      title={satellite.satname}
      onPress={handleMarkerPress}
    />
  );
};

export default SatelliteMarker;
