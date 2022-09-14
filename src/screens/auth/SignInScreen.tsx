import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "@rneui/themed";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const SignInScreen = () => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
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
      <Text>Signin screen!</Text>

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

        <Button title="Sign in" buttonStyle={styles.control} onPress={signIn} />
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
    marginTop: 10,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});

export default SignInScreen;
