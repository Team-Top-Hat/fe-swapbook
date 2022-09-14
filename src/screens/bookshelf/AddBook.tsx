import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useContext } from "react";
import { Card } from "@rneui/themed";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import { fetchGoogleBook, postBook } from "../../api";
import { useAuthentication } from "../../utils/hooks/useAuthentication";

import { UserContext } from "../../context/UserContext";

export default function AddBook() {
  const { user }: any = useAuthentication();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [searchParameters, setSearchParameters] = React.useState([""]);
  const [index, setIndex]: any = React.useState([0]);
  const [dropdownValue, setDropDownValue] = React.useState(null);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const [value, setValue] = React.useState({
    title: "",
    author: "",
    isbn: "",
    error: "",
    success: "",
  });

  const [currentBook, setCurrentBook]: any = React.useState([
    { title: "", image: "", isbn: "" },
  ]);

  async function submit() {
    const parameters: string[] = [];
    setIsDisabled(true);
    if (value.title) {
      parameters.push(`intitle:${value.title.replace(" ", "%20")}`);
    }
    if (value.author) {
      parameters.push(`author:${value.author.replace(" ", "%20")}`);
    }
    if (value.isbn) {
      parameters.push(`isbn:${value.isbn.replace("-", "").replace(" ", "")}`);
    }
    setSearchParameters(() => parameters);
  }

  useEffect(() => {
    if (searchParameters[0] !== "") {
      try {
        fetchGoogleBook(searchParameters.join("+")).then((res) => {
          const bookArr: {
            index: number;
            title: string;
            image: string;
            isbn: string;
            error: string;
          }[] = [];
          res.items.forEach(function (item: any, i: number) {
            if (item.volumeInfo.printType === "BOOK") {
              bookArr.push({
                index: i,
                title: item.volumeInfo.title,
                image: item.volumeInfo.imageLinks
                  ? item.volumeInfo.imageLinks.thumbnail
                  : "no image available",
                isbn: item.volumeInfo.industryIdentifiers
                  ? item.volumeInfo.industryIdentifiers[0]
                  : "unknown",
                error: "",
              });
            }
          });
          setCurrentBook(() => bookArr);
          setDropDownValue(null);
          setIndex(0);
          setIsDisabled(false);
          setIsButtonDisabled(false);
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

  function confirm() {
    const book = {
      title: currentBook[index].title,
      ISBN: currentBook[index].isbn.identifier,
      cover_url: currentBook[index].image,
    };
    setSearchParameters([""]);
    setIsButtonDisabled(true);
    postBook(user.stsTokenManager.accessToken, book)
      .then((res) => {
        setValue({ ...value, success: "Success" });
        if (currentUser) {
          const newBookShelf = currentUser.bookshelf;
          newBookShelf?.push(book);
          setCurrentUser({ ...currentUser, bookshelf: newBookShelf });
        }
      })
      .catch((error) => {
        if (error instanceof Error) {
          setValue({
            ...value,
            error: error.message,
          });
        }
      });
  }

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.title}</Text>
        {item.value === dropdownValue}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Add a book to the bookshelf</Text>
      <View>
        {currentBook[index].title ? (
          <Card>
            <View>
              {currentBook[index].image.startsWith("http") ? (
                <Card.Image
                  style={styles.cardImage}
                  source={{
                    uri: currentBook[index].image,
                  }}></Card.Image>
              ) : (
                <Card.Image
                  source={{
                    uri: "http://upload.wikimedia.org/wikipedia/commons/3/39/Books_Silhouette.svg",
                  }}></Card.Image>
              )}
              <Text style={styles.bookTitle}>{currentBook[index].title}</Text>
            </View>
          </Card>
        ) : null}
      </View>
      <View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={currentBook}
          disable={isDisabled}
          labelField={"title"}
          valueField={"isbn"}
          placeholder={currentBook[0].title}
          onChange={(item) => {
            setDropDownValue(item.isbn);
            setIndex(item.index);
          }}
          renderItem={renderItem}
        />
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
        <View style={styles.buttons}>
          <Button
            title="Submit"
            onPress={submit}
            containerStyle={{ margin: 10 }}
          />
          <Button
            title="Confirm"
            onPress={confirm}
            disabled={isButtonDisabled}
            containerStyle={{ margin: 10 }}
          />
        </View>
        {!!value.error && (
          <View style={styles.error}>
            <Text style={{ color: "red" }}>{value.error}</Text>
          </View>
        )}
        {!!value.success && (
          <View style={styles.success}>
            <Text style={{ color: "green" }}>{value.success}</Text>
          </View>
        )}
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
    width: 150,
    height: 200,
    resizeMode: "contain",
  },

  bookTitle: {
    width: 150,
  },

  controls: {
    flex: 1,
  },

  buttons: {
    flexDirection: "row",
  },

  control: {
    marginTop: 10,
    marginBottom: 10,
  },

  success: {
    marginTop: 10,
    padding: 10,
  },

  error: {
    marginTop: 10,
    padding: 10,
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
    height: 40,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
