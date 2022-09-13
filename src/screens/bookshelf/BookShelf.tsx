import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Card } from "@rneui/themed";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { UserContext } from "../../context/UserContext";

const BookShelf: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user } = useAuthentication();
  const { currentUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text>{user?.email} BookShelf!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddBook")}
        style={styles.card}>
        <Card key={"addbook"}>
          <Card.Title>{"Add Book"}</Card.Title>
          <Text style={{ textAlign: "center", fontSize: 45 }}>&#x2795;</Text>
        </Card>
      </TouchableOpacity>
      {currentUser?.bookshelf.map(function (book) {
        return (
          <Card key={book.title}>
            <Card.Title>{book.title}</Card.Title>
            <Card.Image source={{ uri: book.book_cover }} />
          </Card>
        );
      })}
    </View>
  );
};

export default BookShelf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    marginTop: 10,
  },

  card: {
    width: 140,
  },
});
