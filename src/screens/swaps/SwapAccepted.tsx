import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Card, Button } from "@rneui/themed";

import { UserContext } from "../../context/UserContext";

const SwapAccepted = ({ route }: any) => {
  const { currentUser } = useContext(UserContext);
  const [buttonTitle, setButtonTitle] = React.useState("Show Swapper Info");

  const swap = route.params.swap;

  function changeTitle() {
    buttonTitle.includes("Show")
      ? setButtonTitle(swap.user1_email)
      : setButtonTitle("Show Swapper Info");
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Swap Accepted! </Text>
      <View>
        <Card>
          {currentUser ? (
            <View style={styles.card}>
              <Text style={styles.text}>Trading your {swap.book1_title}</Text>
              <Text style={styles.text}>
                For {swap.user_id2}'s {swap.book2_title}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.text}>
                Trading {swap.user_id2}'s {swap.book2_title}
              </Text>
              <Text style={styles.text}>For your {swap.book1_title}</Text>
            </View>
          )}
          <Text style={styles.text}>Contact Details:</Text>
          <Button
            title={buttonTitle}
            containerStyle={{ margin: 10 }}
            onPress={changeTitle}></Button>
          <View style={styles.row}>
            <Card.Image
              source={{ uri: swap.book1_cover }}
              style={styles.coverImage}></Card.Image>
            <Text style={{ fontSize: 50 }}>&#8644;</Text>
            <Card.Image
              source={{ uri: swap.book2_cover }}
              style={styles.coverImage}></Card.Image>
          </View>
          <View style={styles.card}>
            <Text style={styles.text}> Have you swapped?</Text>
            <Button
              containerStyle={{ margin: 50, marginTop: 20 }}
              title="Send to Bookshelf"></Button>
          </View>
        </Card>
      </View>
    </View>
  );
};

export default SwapAccepted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    justifyContent: "center",
    padding: 20,
  },
  row: {
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  text: {
    textAlign: "center",
    fontSize: 17,
  },
  coverImage: {
    height: 120,
    width: 80,
  },
});
