import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Card } from "@rneui/themed";
import { UserContext } from "../../context/UserContext";
import { deleteBook } from "../../api";
import { useAuthentication } from "../../utils/hooks/useAuthentication";

const BookShelf: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const { user }: any = useAuthentication();

  function removeBook(isbn: string) {
    if (user) {
      deleteBook(user.stsTokenManager.accessToken, isbn).then((res) => {
        if (currentUser) {
          const newBookShelf: any = currentUser.bookshelf.filter(
            (book) => book.ISBN !== isbn
          );
          setCurrentUser({ ...currentUser, bookshelf: newBookShelf });
        }
      });
    }
  }

  if (!currentUser) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("AddBook")}>
          <View style={styles.card}>
            <Card key={"addbook"}>
              <View style={styles.cardContent}>
                <Card.Title>{"Add Book"}</Card.Title>
                <Text style={{ textAlign: "center", fontSize: 45 }}>
                  &#x2795;
                </Text>
              </View>
              <Text></Text>
            </Card>
          </View>
        </TouchableOpacity>
        {currentUser?.bookshelf.map(function (book) {
          return (
            <View style={styles.card} key={book.title}>
              <Card>
                <TouchableOpacity
                  onPress={() => {
                    removeBook(book.ISBN);
                  }}>
                  <Text style={{ textAlign: "right", color: "red" }}>X</Text>
                </TouchableOpacity>
                <View style={styles.cardContent}>
                  <Card.Title style={styles.text}>{book.title}</Card.Title>
                  <Card.Image
                    style={styles.image}
                    source={{ uri: book.cover_url }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
              </Card>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default BookShelf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  button: {
    marginTop: 10,
  },

  card: {
    width: Dimensions.get("window").width / 2,
  },

  cardContent: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 2,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },

  image: {
    flex: 1,
    width: Dimensions.get("window").width / 4,
    height: Dimensions.get("window").width / 2.4,
    resizeMode: "contain",
    marginBottom: 15,
    marginTop: 30,
  },

  text: {
    marginTop: 15,
  },
});
