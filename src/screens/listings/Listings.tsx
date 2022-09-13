import { StackScreenProps } from "@react-navigation/stack";
import { useAuthentication } from "../../utils/hooks/useAuthentication";

import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { Card } from "@rneui/themed";
import { fetchAllListings, fetchAllListingsnon } from "../../api";

const Listings: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user }: any = useAuthentication();
  const [isLoading, setIsLoading] = React.useState(true);
  const [listings, setListings] = React.useState([
    {
      title: "",
      cover_url: "",
      ISBN: "",
      error: "",
    },
  ]);

  useEffect(() => {
    (user
      ? fetchAllListings(user.stsTokenManager.accessToken)
      : fetchAllListingsnon()
    ).then((res) => {
      const dataFromApi: {
        title: string;
        cover_url: string;
        ISBN: string;
        error: string;
      }[] = [];
      res.listings.forEach(function (listing: any) {
        dataFromApi.push({
          title: listing.title,
          cover_url: listing.cover_url,
          ISBN: listing.ISBN,
          error: "",
        });
      });
      setListings(dataFromApi);
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" />
      </View>
    );
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          {listings?.map(function (listing: any, i: number) {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate({
                    name: "Listing",
                    params: { listing: listing },
                  })
                }
                key={i}>
                <Card>
                  <View style={styles.cardContent}>
                    <View style={styles.text}>
                      <Card.Title>{listing.title}</Card.Title>
                    </View>
                    <Card.Image
                      style={styles.image}
                      source={{ uri: listing.cover_url }}
                    />
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
