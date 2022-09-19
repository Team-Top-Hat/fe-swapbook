import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Image } from "@rneui/themed";

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Welcome!</Text>
      <View style={styles.buttons}>
        <Button
          title="Browse Listings"
          containerStyle={{ margin: 10 }}
          onPress={() => navigation.navigate("Listings")}
        />
        <Button
          title="Sign in"
          containerStyle={{ margin: 30, marginBottom: 10 }}
          onPress={() => navigation.navigate("Sign In")}
        />
        <Button
          title="Sign up"
          type="outline"
          containerStyle={{ margin: 30, marginTop: 10 }}
          onPress={() => navigation.navigate("Sign Up")}
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

export default WelcomeScreen;
