import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { selectOrigin, selectDestination } from "../slices/navSlice";
import { useSelector } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

export default function Map() {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapViewRef = useRef(null);

  const mapMarkersZoom = () => {
    if (!origin || !destination) return;
    //zoom and fit to markers at Marker.identifiers(origin&destination)
    mapViewRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 100, right: 50, bottom: 50, left: 50 },
    });
  };

  useEffect(mapMarkersZoom, [origin, destination]);

  return (
    <MapView
      ref={mapViewRef}
      style={styles.map}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
      }}
    >
      {/*lineDashPattern={[2,0,2,1,2]}*/}

      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
          lineDashPattern={[2, 0, 2]}
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
}
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
