import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { deleteUser, getAuth } from "firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";
import { UserContext } from "../context/UserContext";

const auth = getAuth();

const Profile: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  {
    const { user } = useAuthentication();
    const { currentUser } = useContext(UserContext);

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
            title="DELETE ACCOUNT"
            containerStyle={{ margin: 10, marginTop: 50 }}
            onPress={() => {
              if (user) {
                deleteUser(user)
                  .then(() => {
                    console.log("User Deleted.");
                  })
                  .catch((err) => {
                    console.log("error deleting user", err);
                  });
              }
            }}
          />
        </View>
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
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default Profile;
