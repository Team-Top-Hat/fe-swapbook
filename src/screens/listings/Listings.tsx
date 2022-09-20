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
import { fetchAllListings } from "../../api";
import { getAuth } from "firebase/auth";

const Listings: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
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
        setIsLoggedIn(true);
      }
    });

    if (isLoggedIn !== false) {
      fetchAllListings(user.stsTokenManager.accessToken).then((res) => {
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

  if (isLoading || isLoggedIn === false)
    return (
      <View style={styles.loading}>
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
                <View style={styles.card}>
                  <Card>
                    <View style={styles.cardContent}>
                      <View style={styles.text}>
                        <Card.Title>{listing.title}</Card.Title>
                      </View>
                      <Card.Image
                        style={styles.image}
                        source={{ uri: listing.cover_url }}
                        PlaceholderContent={<ActivityIndicator />}
                      />
                    </View>
                  </Card>
                </View>
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

  loading: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
