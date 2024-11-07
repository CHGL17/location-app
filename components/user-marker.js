import { Marker } from "react-native-maps";
import { Alert } from "react-native";

const handleMarkerPress = () => {
  Alert.alert(
    "Coordenadas",
    `Latitud: ${location.coords.latitude}, Longitud: ${location.coords.longitude}, Precisión: ${location.coords.accuracy}, Altitud: ${location.coords.altitude}`
  );
};

const UserMarker = ({ location }) => {
  return (
    <Marker
      coordinate={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }}
      title="Mi ubicación"
      onPress={handleMarkerPress}
    />
  );
};

export default UserMarker;
