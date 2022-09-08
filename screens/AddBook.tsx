import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import { fetchGoogleBook } from "../api";

export default function AddBook() {
  const [value, setValue] = React.useState({
    title: "",
    author: "",
    isbn: "",
  });
  const [currentBook, setCurrentBook]: any = React.useState({
    imageLinks: { thumbnail: "" },
  });

  function submit() {
    const searchParameters: any[] = [];

    if (value.title) {
      searchParameters.push(`title:${value.title.replace(" ", "%20")}`);
    }
    if (value.author) {
      searchParameters.push(`author:${value.author.replace(" ", "%20")}`);
    }
    if (value.isbn) {
      searchParameters.push(`isbn:${value.isbn}`);
    }
    fetchGoogleBook(searchParameters.join("&")).then((res) => {
      setCurrentBook(() => res.items[0].volumeInfo);
    });
  }

  function confirm() {}

  return (
    <View style={styles.container}>
      <Text>test</Text>
      <View>
        <Card>
          {currentBook.imageLinks.thumbnail ? (
            <View>
              <Card.Image
                style={styles.cardImage}
                source={{ uri: currentBook.imageLinks.thumbnail }}
              ></Card.Image>
              <Text>{currentBook.title}</Text>
            </View>
          ) : null}
        </Card>
      </View>
      <View style={styles.controls}>
        <View style={styles.control}>
          <TextInput
            autoComplete="off"
            placeholder="Title"
            value={value.title}
            onChangeText={(text: any) => setValue({ ...value, title: text })}
          ></TextInput>
        </View>
        <View style={styles.control}>
          <TextInput
            autoComplete="off"
            placeholder="Author"
            value={value.author}
            onChangeText={(text: any) => setValue({ ...value, author: text })}
          ></TextInput>
        </View>
        <View style={styles.control}>
          <TextInput
            autoComplete="off"
            placeholder="ISBN"
            value={value.isbn}
            onChangeText={(text: any) => setValue({ ...value, isbn: text })}
          ></TextInput>
        </View>
        <View>
          <Button title="Submit" onPress={submit} />
          <Button title="Confirm" onPress={confirm} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
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
