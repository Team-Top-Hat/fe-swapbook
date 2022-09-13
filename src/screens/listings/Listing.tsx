import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "@rneui/base";

const Listing: React.FC<StackScreenProps<any>> = ({
  navigation,
  route,
}: any) => {
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
      <Button
        onPress={() =>
          navigation.navigate({
            name: "TradeOffer",
            params: { listing: currentListing },
          })
        }
        title="Trade"
        style={{ margin: 20 }}></Button>
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
    height: 250,
    width: 150,
  },
});
