import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
//import { Button } from "react-native-elements";
import { Button } from "@rneui/themed";
import { signOut, getAuth } from "firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";

const auth = getAuth();

const Home: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <View style={styles.buttons}>
        <Button
          title="Listings"
          containerStyle={{ margin: 10 }}
          onPress={() => navigation.navigate("Listings")}
        />
        <Button
          title="Profile"
          containerStyle={{ margin: 10 }}
          onPress={() => navigation.navigate("Profile")}
        />
        <Button
          title="Sign Out"
          containerStyle={{ margin: 10 }}
          onPress={() => signOut(auth)}
        />
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
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Home;
