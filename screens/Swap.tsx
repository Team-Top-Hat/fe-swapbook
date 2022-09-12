import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "@rneui/themed";

const Swap = ({ route }: any) => {
  const swap = route.params.swap;
  {
    return (
      <View style={styles.container}>
        <Card>
          <Card.Image
            style={styles.coverImage}
            source={{ uri: swap.book1_cover }}></Card.Image>
        </Card>
      </View>
    );
  }
};

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

export default Swap;
