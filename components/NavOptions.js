import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "154",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

export default function NavOptions() {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            disabled={!origin}
            onPress={() => navigation.navigate(item.screen)}
            style={styles.rendered__item}
          >
            {/* <View style={`${!origin}` && { opacity: 20 }}> time=> 2:12*/}
            <View>
              <Image
                style={{ width: 130, height: 130, resizeMode: "contain" }}
                source={{ uri: item.image }}
              />
              <Text style={styles.rendered__caption}>{item.title}</Text>

              <Icon
                name="arrowright"
                style={styles.arrowR}
                color="#fff"
                type="antdesign"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  rendered__item: {
    padding: 2,
    paddingLeft: 10,
    paddingBottom: 8,
    paddingTop: 4,
    backgroundColor: "#f8f8f8",
    margin: 5,
    width: 150,
  },
  rendered__caption: {
    marginTop: 2,
    fontWeight: "bold",
  },
  arrowR: {
    padding: 2,
    backgroundColor: "black",
    width: 30,
    borderRadius: 100 / 2,
    marginTop: 15,
    // marginLeft: 50,
  },
  optionOpacity: {
    // opacity: `${!origin && 20}`,
    // opacity: `${!origin}` ? 20 : 100,
  },
});
