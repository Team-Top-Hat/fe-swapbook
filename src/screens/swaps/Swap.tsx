import React, { useContext } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Card, Button } from "@rneui/themed";
import { UserContext } from "../../context/UserContext";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { patchSwap } from "../../api";

const Swap = ({ route }: any) => {
  const { currentUser } = useContext(UserContext);
  const swap = route.params.swap;
  const { user }: any = useAuthentication();
  const [email, setEmail] = React.useState("");

  function setSwap(status: string) {
    const newSwap = {
      status: status,
      user2_email: status === "rejected" ? "none" : email,
      swap_id: swap.swap_id,
    };
    patchSwap(user.stsTokenManager.accessToken, newSwap).then((res) =>
      console.log(res)
    );
  }

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

        {currentUser?.bookshelf.some(
          (book) => book.title === swap.book1_title
        ) ? (
          <View>
            <View style={styles.row}>
              <Text>Trading my {swap.book1_title}</Text>
              <Text>For their {swap.book2_title}</Text>
            </View>
            <View style={styles.control}>
              <TextInput
                autoComplete="off"
                placeholder="Contact Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}></TextInput>
            </View>
            <View style={styles.buttons}>
              <Button
                containerStyle={{ margin: 10 }}
                title="Accept"
                onPress={() => {
                  setSwap("accepted");
                }}></Button>
              <Button
                containerStyle={{ margin: 10 }}
                title="Decline"
                onPress={() => {
                  setSwap("rejected");
                }}></Button>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.row}>
              <Text>Trading their {swap.book1_title}</Text>
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

  control: {
    marginTop: 10,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
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
