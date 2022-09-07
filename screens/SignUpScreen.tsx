import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate("Sign In");
    } catch (error) {
      if (error instanceof Error) {
        setValue({
          ...value,
          error: error.message,
        });
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text>Signup screen!</Text>

      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <View style={styles.control}>
          <Icon size={16} name="envelope"></Icon>
          <TextInput
            autoComplete="off"
            placeholder="Email"
            value={value.email}
            onChangeText={(text: any) => setValue({ ...value, email: text })}
          />
        </View>
        <View style={styles.control}>
          <Icon size={16} name="key"></Icon>
          <TextInput
            autoComplete="off"
            placeholder="Password"
            value={value.password}
            onChangeText={(text: any) => setValue({ ...value, password: text })}
            secureTextEntry={true}
          />
        </View>
        <Button title="Sign up" buttonStyle={styles.control} onPress={signUp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  controls: {
    flex: 1,
  },

  control: {
    // marginTop: 10,
    // flex: 1,
    // flexDirection: "row",
    // height: 10,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});

export default SignUpScreen;
