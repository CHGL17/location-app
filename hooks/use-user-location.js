import { useState, useEffect } from "react";
import * as Location from "expo-location";

export const UseUserLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permite el acceso a la ubicación para continuar.");
        return;
      }
      setError(null);
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

  return [location, error, requestLocationPermission];
};
