import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext } from "react";
import { Button } from "@rneui/themed";

import { Card } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import { UserContext } from "../context/UserContext";

const PostListing = () => {
  const [dropdownValue, setDropDownValue] = React.useState(null);
  const { currentUser } = useContext(UserContext);
  const [index, setIndex]: any = React.useState(0);

  const booksFromBookshelf: {
    index: number;
    title: string;
    book_cover: string;
    ISBN: string;
  }[] = [];

  currentUser?.bookshelf.forEach(function (book, index) {
    booksFromBookshelf.push({
      index: index,
      ISBN: book.ISBN,
      book_cover: book.book_cover,
      title: book.title,
    });
  });

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.title}</Text>
        {item.value === dropdownValue}
      </View>
    );
  };

  function submit() {}

  return (
    <View style={styles.container}>
      <Text>PostListing</Text>
      <View>
        {booksFromBookshelf[index].title ? (
          <Card>
            <View>
              {booksFromBookshelf[index].book_cover.startsWith("http") ? (
                <Card.Image
                  style={styles.cardImage}
                  source={{
                    uri: booksFromBookshelf[index].book_cover,
                  }}
                ></Card.Image>
              ) : (
                <Card.Image
                  source={{
                    uri: "http://upload.wikimedia.org/wikipedia/commons/3/39/Books_Silhouette.svg",
                  }}
                ></Card.Image>
              )}
              <Text style={styles.bookTitle}>
                {booksFromBookshelf[index].title}
              </Text>
            </View>
          </Card>
        ) : null}
      </View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={booksFromBookshelf}
        // disable={isDisabled}
        labelField={"title"}
        valueField={"ISBN"}
        placeholder={booksFromBookshelf[index].title}
        onChange={(item) => {
          setDropDownValue(item.ISBN);
          setIndex(item.index);
        }}
        renderItem={renderItem}
      />
      <Button title="Submit" onPress={submit} containerStyle={{ margin: 10 }} />
    </View>
  );
};

export default PostListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: 150,
    height: 200,
    resizeMode: "contain",
  },
  bookTitle: {
    width: 150,
  },
  dropdown: {
    margin: 16,
    width: 200,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
