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
import { getAuth } from "firebase/auth";

const Listings: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(0);
  const [listings, setListings] = React.useState([
    {
      title: "",
      cover_url: "",
      ISBN: "",
      error: "",
    },
  ]);

  const { user }: any = useAuthentication();

  useEffect(() => {
    getAuth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(1);
      } else {
        setIsLoggedIn(2);
      }
    });
    if (isLoggedIn !== 0) {
      (isLoggedIn === 1
        ? fetchAllListings(user.stsTokenManager.accessToken)
        : fetchAllListingsnon()
      ).then((res) => {
        const dataFromApi: {
          title: string;
          cover_url: string;
          ISBN: string;
          user_id: string;
          error: string;
        }[] = [];
        res.listings.forEach(function (listing: any) {
          dataFromApi.push({
            title: listing.title,
            cover_url: listing.cover_url,
            ISBN: listing.ISBN,
            user_id: listing.user_id,
            error: "",
          });
        });
        setListings(dataFromApi);
        setIsLoading(false);
      });
    }
  }, [isLoggedIn]);

  if (isLoading || isLoggedIn === 0)
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
