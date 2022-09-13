import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "@rneui/themed";
import { signOut, getAuth } from "firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";

const auth = getAuth();

const Home: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Welcome {user?.email}!</Text>
      <View style={styles.buttons}>
        <Button
          title="Browse Listings"
          containerStyle={{ margin: 10 }}
          onPress={() => navigation.navigate("Listings")}
        />
        <Button
          title="View Swap History"
          containerStyle={{ margin: 10 }}
          onPress={() => navigation.navigate("SwapHistory")}
        />
        <Button
          title="Profile"
          containerStyle={{ margin: 10 }}
          onPress={() => navigation.navigate("Profile")}
        />
        <Button
          title="Sign Out"
          containerStyle={{ margin: 30 }}
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
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

export default Home;
