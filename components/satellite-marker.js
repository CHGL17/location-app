import { Marker, Polyline } from "react-native-maps";
import { Alert } from "react-native";

const SatelliteMarker = ({ satellite }) => {
  const handleMarkerPress = () => {
    Alert.alert(
      `Altura: ${satellite.satlatitude} km, Velocidad: ${satellite.satlongitude} km/s`
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

const Distance = ({ location, satellite }) => {
  const coordinates = [
    {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    },
    {
      latitude: satellite.satlatitude,
      longitude: satellite.satlongitude,
    },
  ];

  return <Polyline coordinates={coordinates} />;
};

export { SatelliteMarker, Distance };
