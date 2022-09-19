import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "@rneui/base";
import { fetchGoogleBook } from "../../api";
import { Card } from "@rneui/themed";

const Listing: React.FC<StackScreenProps<any>> = ({
  navigation,
  route,
}: any) => {
  const [googleBook, setGoogleBook] = React.useState({
    authors: [""],
    description: "",
  });

  const currentListing = route.params.listing;

  useEffect(() => {
    fetchGoogleBook(
      `isbn:${currentListing.ISBN.replace("-", "").replace(" ", "")}`
    ).then((res) => {
      setGoogleBook({
        authors: res.items[0].volumeInfo.authors,
        description: res.items[0].volumeInfo.description,
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.card}>
          <View style={styles.bookInfo}>
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              {currentListing.title}
            </Text>
            <Text>By {googleBook.authors[0]}</Text>
            <Image
              style={styles.coverImage}
              source={{
                uri: currentListing.cover_url,
              }}
            />
            <View>
              <Text style={{ textAlign: "center" }}>
                {googleBook.description}
              </Text>
            </View>
          </View>
        </View>
      </Card>
      <Button
        onPress={() =>
          navigation.navigate({
            name: "TradeOffer",
            params: { listing: currentListing },
          })
        }
        title="Trade"
        containerStyle={{ margin: 30 }}></Button>
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: Dimensions.get("window").width / 1.3,
    justifyContent: "center",
    alignItems: "center",
  },

  bookInfo: {
    width: Dimensions.get("window").width / 1.4,
    justifyContent: "center",
    alignItems: "center",
  },

  coverImage: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").width / 1.3,
    marginTop: 15,
    marginBottom: 15,
  },
});
