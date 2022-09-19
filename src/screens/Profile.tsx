import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "@rneui/themed";
import { deleteUser } from "firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";

const Profile: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user } = useAuthentication();
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <View style={styles.buttons}>
        <Button
          title="My Bookshelf"
          containerStyle={{ margin: 10 }}
          onPress={() => {
            navigation.navigate("BookShelf");
          }}
        />

        <Button
          title="Delete Account"
          containerStyle={{ margin: 10, marginTop: 50 }}
          onPress={() => {
            if (user) {
              deleteUser(user)
                .then(() => {
                  setSuccess(true);
                })
                .catch(() => {
                  setError(true);
                });
            }
          }}
        />
        {error ? (
          <View>
            <Text style={{ color: "red" }}>Error, try again!</Text>
          </View>
        ) : success ? (
          <View>
            <Text style={{ color: "green" }}>Success!</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default Profile;
