import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { signOut, getAuth } from "firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";

const auth = getAuth();

const Home: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <Button
        title="Profile"
        style={styles.button}
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Sign Out"
        style={styles.button}
        onPress={() => signOut(auth)}
      />
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
  button: {
    marginTop: 10,
  },
});

export default Home;
