# SateliApp
## Descripción de las funcionalidades ⚒️
La aplicación SateliApp es una herramienta interactiva desarrollada en React Native que permite a los usuarios:
- Obtener su ubicación actual: Al iniciar, la aplicación solicita permisos para acceder a la ubicación del dispositivo y obtiene las coordenadas geográficas (expo-location) precisas del usuario.
-	Seleccionar un satélite de interés: Proporciona una lista de satélites conocidos, como la Estación Espacial Internacional (ISS), el telescopio Hubble, satélites Starlink, entre otros, para que el usuario pueda elegir.
-	Calcular y mostrar la distancia en tiempo real: Una vez seleccionado el satélite, la aplicación calcula la distancia en kilómetros entre la posición del usuario y la posición actual del satélite, actualizando esta información cada cinco segundos.
-	Visualizar ubicaciones en un mapa interactivo: Muestra un mapa centrado en la ubicación del usuario, donde se representan con marcadores tanto su posición como la del satélite seleccionado.
-	Mostrar detalles al interactuar con los marcadores: Al tocar los marcadores en el mapa, el usuario puede obtener información adicional, como las coordenadas exactas, altitud y precisión de su ubicación, así como detalles del satélite.
-	Trazar una línea entre el usuario y el satélite: La aplicación dibuja una línea en el mapa que conecta la ubicación del usuario con la del satélite, facilitando la visualización de la distancia y dirección entre ambos puntos.
-	Manejo de Errores y Reintento: Si ocurre un error al intentar obtener la ubicación (por permisos denegados o configuraciones incorrectas), la aplicación muestra un mensaje de error en pantalla y un botón "Reintentar". Este botón permite al usuario intentar nuevamente sin necesidad de reiniciar la aplicación, mejorando la usabilidad en caso de problemas iniciales con los permisos o la configuración.
-	## Librerías y tecnologías 📚
La aplicación fue desarrollada utilizando las siguientes tecnologías:
- React
- React Native
- expo
- expo-camera
- react-native-maps
- @react-native-picker/picker
- API n2yo (n2yo.com/api)
## Como ejecutar la aplicación
1. clonar el repositorio:
    git clone https://github.com/CHGL17/location-app.git
3. cd location-app
4. Generar apiKey en n2yo.com/api
5. Colocar la APIKEY en el archivo .env como EXPO_PUBLIC_API_KEY
6. npm i
7. npm start
