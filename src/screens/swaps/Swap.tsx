import React, { useContext } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Card, Button } from "@rneui/themed";
import { UserContext } from "../../context/UserContext";

const Swap = ({ route }: any) => {
  const { currentUser } = useContext(UserContext);
  const swap = route.params.swap;

  {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Card>
            <Card.Image
              style={styles.coverImage}
              source={{ uri: swap.book1_cover }}></Card.Image>
          </Card>
          <Text style={{ fontSize: 50 }}>&#8644;</Text>
          <Card>
            <Card.Image
              style={styles.coverImage}
              source={{ uri: swap.book2_cover }}></Card.Image>
          </Card>
        </View>
        {currentUser ? (
          <View>
            <View style={styles.row}>
              <Text>Trading my {swap.book1_title}</Text>
              <Text>
                For {swap.user_id2}'s {swap.book2_title}
              </Text>
            </View>
            <View>
              <TextInput
                autoComplete="off"
                placeholder="Contact Email"
                value=""
                onChangeText={() => {}}></TextInput>
            </View>
            <View style={styles.buttons}>
              <Button containerStyle={{ margin: 10 }} title="Accept"></Button>
              <Button containerStyle={{ margin: 10 }} title="Decline"></Button>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.row}>
              <Text>
                Trading {swap.user_id2}'s {swap.book1_title}
              </Text>
              <Text>For my {swap.book2_title}</Text>
            </View>
            <View style={styles.buttons}>
              <Button containerStyle={{ margin: 10 }} title="Cancel"></Button>
            </View>
          </View>
        )}
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
  buttons: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  row: {
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  coverImage: {
    height: 160,
    width: 100,
  },
});

export default Swap;
