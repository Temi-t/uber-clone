import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

export default function NavigateCard() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.card}>
      <Text style={styles.cardText}>Navvvvvvcarrrd</Text>
      <View style={styles.places}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to ?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            minLength={2}
            returnKeyType={"search"}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );

              navigation.navigate("RideOptionsCard");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    flex: 1,
  },
  cardText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  places: {
    borderTopWidth: 1,
    borderTopColor: "grey",

    flexShrink: 0,
  },
});

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
