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

  //api call to our backend to get the users books - display;
  //pic title auth catagory
  //button to add-book screen
  //create new screen to have the ability to add new book to our db

  return (
    <View style={styles.container}>
      <Text>{user?.email} BookShelf!</Text>
      {currentUser?.bookshelf.map(function (book) {
        return (
          <Card>
            <Card.Title>{book.title}</Card.Title>
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
