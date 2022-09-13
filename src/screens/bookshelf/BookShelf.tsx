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

const BookShelf: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);
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
          <Card key={"addbook"}>
            <View style={styles.cardContent}>
              <Card.Title>{"Add Book"}</Card.Title>
              <Text style={{ textAlign: "center", fontSize: 45 }}>
                &#x2795;
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
        {currentUser?.bookshelf.map(function (book) {
          return (
            <Card key={book.title}>
              <View style={styles.cardContent}>
                <Card.Title style={styles.text}>{book.title}</Card.Title>
                <Card.Image
                  style={styles.image}
                  source={{ uri: book.cover_url }}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
            </Card>
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

  cardContent: {
    width: Dimensions.get("window").width / 3,
    justifyContent: "space-around",
    alignItems: "center",
    height: Dimensions.get("window").width / 2,
  },

  image: {
    width: Dimensions.get("window").width / 4,
    resizeMode: "contain",
    marginBottom: 15,
    marginTop: 30,
  },
  text: {
    marginTop: 15,
  },
});
