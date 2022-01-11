import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
// import MapView from 'react-native-maps';

export default function MapScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <View>
      <View style={styles.halfMap}>
        <Map />
      </View>
      <View style={styles.halfScreen}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  halfMap: { height: "50%" },
  halfScreen: { height: "50%" },
});
