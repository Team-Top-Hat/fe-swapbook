import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useContext } from "react";
import { Card, Button } from "@rneui/themed";
import { UserContext } from "../../context/UserContext";
import { Dropdown } from "react-native-element-dropdown";
import { postSwap } from "../../api";
import { useAuthentication } from "../../utils/hooks/useAuthentication";

const TradeOffer = ({ route }: any) => {
  const { currentUser } = useContext(UserContext);
  const { user }: any = useAuthentication();

  const [dropdownValue, setDropDownValue] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [success, setSuccess] = React.useState(false);

  const currentListing = route.params.listing;

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

  function addSwap() {
    setIsButtonDisabled(true);
    const newSwap = {
      user1_email: email,
      book1_cover: booksFromBookshelf[index].book_cover,
      book1_title: booksFromBookshelf[index].title,
      book1_ISBN: booksFromBookshelf[index].ISBN,
      book2_ISBN: currentListing.ISBN,
      book2_cover: currentListing.cover_url,
      book2_title: currentListing.title,
      status: "pending",
      user_id2: currentListing.user_id,
    };

    postSwap(user.stsTokenManager.accessToken, newSwap).then((res) => {
      setSuccess(true);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Select a swap</Text>
      <View style={styles.row}>
        <Card>
          <Card.Title style={styles.bookTitle}>
            {currentListing.title}
          </Card.Title>
          <Card.Image
            style={styles.cardImage}
            source={{ uri: currentListing.cover_url }}
          />
        </Card>
        <Card>
          <Card.Title style={styles.bookTitle}>
            {booksFromBookshelf[index].title}
          </Card.Title>
          <Card.Image
            style={styles.cardImage}
            source={{ uri: booksFromBookshelf[index].book_cover }}
          />
        </Card>
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
      <View style={styles.control}>
        <TextInput
          autoComplete="off"
          placeholder="Contact Email"
          value={email}
          style={styles.input}
          onChangeText={(text: any) => {
            setEmail(text);
            setIsButtonDisabled(false);
          }}
        ></TextInput>
        <Button
          title="Submit"
          onPress={addSwap}
          disabled={isButtonDisabled}
        ></Button>
        {success ? (
          <View>
            <Text style={{ color: "green" }}>Success!</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default TradeOffer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    height: 20,
    margin: 10,
  },

  control: {
    marginTop: 10,
    marginBottom: 15,
    justifyContent: "space-between",
    height: 50,
  },

  cardImage: {
    width: 120,
    height: 160,
    resizeMode: "contain",
  },

  row: {
    flexDirection: "row",
  },

  bookTitle: {
    width: 120,
  },

  dropdown: {
    margin: 16,
    width: 250,
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
    height: 20,
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
