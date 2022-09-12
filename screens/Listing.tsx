import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Button } from "@rneui/base";

const Listing = ({ route }: any) => {
  const currentListing = route.params.listing;
  return (
    <View style={styles.container}>
      <Text>{currentListing.title}</Text>
      <Image
        style={styles.coverImage}
        source={{
          uri: currentListing.cover_url,
        }}
      />
      <Button title="Trade" style={{ margin: 20 }}></Button>
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  coverImage: {
    height: 300,
    width: 150,
  },
});
