import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { deleteUser, getAuth } from "firebase/auth";

const auth = getAuth();

const Profile: React.FC<StackScreenProps<any>> = ({ navigation }) => {{
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <Button
        title="My Bookshelf"
        style={styles.button}
        onPress={() => {navigation.navigate("BookShelf")}}
      />

      <Button
        title="DELETE ACCOUNT"
        style={styles.button}
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
  );
}}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 10,
  },
});

export default Profile