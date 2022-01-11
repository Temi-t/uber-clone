import React from "react";
// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
// time(1:30)

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.home}>
      <View style={styles.home__view}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />

        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where from?"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          minLength={2}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          onPress={(data, details = null) => {
            // console.log("data====> ", data);
            // console.log("details====> ", details);
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
          returnKeyType={"search"}
          fetchDetails={true}
        />

        <NavOptions />
      </View>
    </SafeAreaView>
  );
};
// change SafeAreaView to View for fullscreen

export default HomeScreen;
const styles = StyleSheet.create({
  home__view: { padding: 5 },
  home: {
    padding: 14,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
});
