import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Card } from "@rneui/themed";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import { fetchGoogleBook } from "../api";

export default function AddBook() {
  const [value, setValue] = React.useState({
    title: "",
    author: "",
    isbn: "",
    error: "",
  });

  const [currentBook, setCurrentBook]: any = React.useState([
    { title: "", image: "", isbn: "", error: "" },
  ]);

  const [searchParameters, setSearchParameters] = React.useState([""]);

  async function submit() {
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
  }

  useEffect(() => {
    if (searchParameters[0] !== "") {
      try {
        fetchGoogleBook(searchParameters.join("&")).then((res) => {
          const bookArr: {
            title: string;
            image: string;
            isbn: string;
            error: string;
          }[] = [];
          res.items.forEach(function (item: any) {
            bookArr.push({
              title: item.volumeInfo.title,
              image: item.volumeInfo.imageLinks.thumbnail,
              isbn: item.volumeInfo.industryIdentifiers[0],
              error: "",
            });
          });
          setCurrentBook(() => bookArr);
        });
      } catch (error) {
        if (error instanceof Error) {
          setValue({
            ...value,
            error: error.message,
          });
        }
      }
    }
  }, [searchParameters]);

  function confirm() {}
  return (
    <View style={styles.container}>
      <Text>Add a book to the bookshelf</Text>
      <View>
        {currentBook[0].title ? (
          <Card>
            <View>
              <Card.Image
                style={styles.cardImage}
                source={{
                  uri: currentBook[0].image,
                }}></Card.Image>
              <Text>{currentBook[0].title}</Text>
            </View>
          </Card>
        ) : null}
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
    marginBottom: 10,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});