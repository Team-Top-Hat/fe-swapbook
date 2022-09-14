import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Card, Button } from "@rneui/themed";

import { UserContext } from "../../context/UserContext";
import { postBook } from "../../api";
import { useAuthentication } from "../../utils/hooks/useAuthentication";

const SwapAccepted = ({ route }: any) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [buttonTitle, setButtonTitle] = React.useState("Show Swapper Info");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const { user }: any = useAuthentication();
  const swap = route.params.swap;

  function changeTitle() {
    buttonTitle.includes("Show")
      ? setButtonTitle(swap.user1_email)
      : setButtonTitle("Show Swapper Info");
  }

  function accept() {
    setIsButtonDisabled(true);
    const book = {
      title: swap.book2_title,
      ISBN: swap.book2_isbn,
      cover_url: swap.book2_cover,
    };

    postBook(user.stsTokenManager.accessToken, book)
      .then(() => {
        setSuccess(true);
        if (currentUser) {
          const newBookShelf = currentUser.bookshelf;
          newBookShelf?.push(book);
          setCurrentUser({ ...currentUser, bookshelf: newBookShelf });
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Swap Accepted! </Text>
      <View>
        <Card>
          {currentUser?.bookshelf.some(
            (book) => book.title === swap.book1_title
          ) ? (
            <View style={styles.card}>
              <Text style={styles.text}>Trading your {swap.book1_title}</Text>
              <Text style={styles.text}>For their {swap.book2_title}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.text}>Trading their {swap.book2_title}</Text>
              <Text style={styles.text}>For your {swap.book1_title}</Text>
            </View>
          )}
          <Text style={styles.text}>Contact Details:</Text>
          <Button
            title={buttonTitle}
            containerStyle={{ margin: 10 }}
            onPress={changeTitle}></Button>
          <View style={styles.row}>
            <Card.Image
              source={{ uri: swap.book1_cover }}
              style={styles.coverImage}></Card.Image>
            <Text style={{ fontSize: 50 }}>&#8644;</Text>
            <Card.Image
              source={{ uri: swap.book2_cover }}
              style={styles.coverImage}></Card.Image>
          </View>
          <View style={styles.card}>
            <Text style={styles.text}> Have you swapped?</Text>
            <Button
              containerStyle={{ margin: 50, marginTop: 20 }}
              title="Send to Bookshelf"
              onPress={accept}
              disabled={isButtonDisabled}></Button>
            {success ? (
              <View>
                <Text style={{ color: "green" }}> Success!</Text>
              </View>
            ) : null}
          </View>
        </Card>
      </View>
    </View>
  );
};

export default SwapAccepted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    justifyContent: "center",
    padding: 20,
  },
  row: {
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  text: {
    textAlign: "center",
    fontSize: 17,
  },
  coverImage: {
    height: 120,
    width: 80,
  },
});
