import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext } from "react";
import { Button } from "@rneui/themed";

import { Card } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import { UserContext } from "../../context/UserContext";
import { postListing } from "../../api";
import { useAuthentication } from "../../utils/hooks/useAuthentication";

const PostListing = () => {
  const [dropdownValue, setDropDownValue] = React.useState(null);
  const { currentUser } = useContext(UserContext);
  const [index, setIndex]: any = React.useState(0);
  const [dropdownCondition, setDropdownCondition] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const [conditions] = React.useState([
    { label: "As New", value: 1 },
    { label: "Very Good", value: 2 },
    { label: "Good", value: 3 },
    { label: "Fair", value: 4 },
    { label: "Poor", value: 5 },
  ]);

  const { user }: any = useAuthentication();

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
      book_cover: book.cover_url,
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

  const renderCondition = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === dropdownCondition}
      </View>
    );
  };

  function submit() {
    setIsButtonDisabled(true);
    const newListing = {
      title: booksFromBookshelf[index].title,
      ISBN: booksFromBookshelf[index].ISBN,
      cover_url: booksFromBookshelf[index].book_cover,
      author: "The author",
      product_pic: "",
      tags: ["", ""],
      condition: dropdownCondition,
      location: {
        _latitude: 2,
        _longitude: 2,
      },
    };
    postListing(user.stsTokenManager.accessToken, newListing).then((res) =>
      setSuccess(true)
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Post a listing</Text>
      <View>
        {booksFromBookshelf[index].title ? (
          <Card>
            <View>
              {booksFromBookshelf[index].book_cover.startsWith("http") ? (
                <Card.Image
                  style={styles.cardImage}
                  source={{
                    uri: booksFromBookshelf[index].book_cover,
                  }}></Card.Image>
              ) : (
                <Card.Image
                  source={{
                    uri: "http://upload.wikimedia.org/wikipedia/commons/3/39/Books_Silhouette.svg",
                  }}></Card.Image>
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
        labelField={"title"}
        valueField={"ISBN"}
        placeholder={booksFromBookshelf[index].title}
        onChange={(item) => {
          setDropDownValue(item.ISBN);
          setIndex(item.index);
          setIsButtonDisabled(false);
        }}
        renderItem={renderItem}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        placeholder={"Select Condition"}
        data={conditions}
        labelField={"label"}
        valueField={"value"}
        onChange={(item) => {
          setDropdownCondition(item.value);
          setIsButtonDisabled(false);
        }}
        renderItem={renderCondition}
      />
      <Button
        title="Submit"
        onPress={submit}
        containerStyle={{ margin: 10 }}
        disabled={isButtonDisabled}
      />
      {success ? (
        <View style={styles.success}>
          <Text style={{ color: "green" }}>Success!</Text>
        </View>
      ) : null}
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

  success: {
    marginTop: 10,
    padding: 10,
  },

  placeholderStyle: {
    fontSize: 16,
    height: 40,
  },

  selectedTextStyle: {
    fontSize: 16,
  },
});
