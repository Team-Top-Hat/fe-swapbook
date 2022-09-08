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

  const [currentBook, setCurrentBook]: any = React.useState([]);

  const [searchParameters, setSearchParameters] = React.useState([""]);

  function submit() {
    setSearchParameters([""]);
    if (value.title) {
      setSearchParameters([`title:${value.title.replace(" ", "%20")}`]);
    }
    if (value.author) {
      setSearchParameters([
        ...searchParameters,
        `author:${value.author.replace(" ", "%20")}`,
      ]);
    }
    if (value.isbn) {
      setSearchParameters([...searchParameters, `isbn:${value.isbn}`]);
    }
    if (searchParameters) {
      fetchGoogleBook(searchParameters.join("&")).then((res) => {
        const bookArr: { title: string; image: string; isbn: string }[] = [];
        res.items.forEach(function (item: any) {
          bookArr.push({
            title: item.volumeInfo.title,
            image: item.volumeInfo.imageLinks.thumbnail,
            isbn: item.volumeInfo.industryIdentifiers[0],
          });
        });
        setCurrentBook(() => bookArr);
      });
    }
  }

  function confirm() {}
  return (
    <View style={styles.container}>
      <Text>Add a book to the bookshelf</Text>
      <View>
        <Card>
          {currentBook[0].title ? (
            <View>
              <Card.Image
                style={styles.cardImage}
                source={{
                  uri: currentBook[0].image,
                }}></Card.Image>
              <Text>{currentBook[0].title}</Text>
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
            onChangeText={(text: any) =>
              setValue({ ...value, title: text })
            }></TextInput>
        </View>
        <View style={styles.control}>
          <TextInput
            autoComplete="off"
            placeholder="Author"
            value={value.author}
            onChangeText={(text: any) =>
              setValue({ ...value, author: text })
            }></TextInput>
        </View>
        <View style={styles.control}>
          <TextInput
            autoComplete="off"
            placeholder="ISBN"
            value={value.isbn}
            onChangeText={(text: any) =>
              setValue({ ...value, isbn: text })
            }></TextInput>
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
