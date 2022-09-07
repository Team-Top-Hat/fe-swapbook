import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Card } from "@rneui/themed";
import { getAuth } from "firebase/auth";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { UserContext } from "../context/UserContext";

const auth = getAuth();
const BookShelf: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user } = useAuthentication();
  const { currentUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text>{user?.email} BookShelf!</Text>
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
});
