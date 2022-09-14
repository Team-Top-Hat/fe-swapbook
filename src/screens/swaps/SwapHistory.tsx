import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { fetchSwaps } from "../../api";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { UserContext } from "../../context/UserContext";

const SwapHistory: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [swaps, setSwaps] = useState([
    {
      user1_email: "",
      user2_email: "",
      user_id1: "",
      user_id2: "",
      book1_ISBN: "",
      book2_ISBN: "",
      book1_title: "",
      book2_title: "",
      book1_cover: "",
      book2_cover: "",
      creation_date: "",
      status: "",
    },
  ]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { user }: any = useAuthentication();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchSwaps(user.stsTokenManager.accessToken).then((res) => {
        setSwaps(res.swaps);
        setIsLoading(false);
      });
    }
  }, [user]);

  if (isLoading)
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" />
      </View>
    );
  return (
    <View>
      {swaps.map((swap, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              swap.status === "accepted"
                ? navigation.navigate({
                    name: "SwapAccepted",
                    params: { swap: swap },
                  })
                : navigation.navigate({
                    name: "Swap",
                    params: { swap: swap },
                  })
            }>
            {currentUser?.email === swap.user1_email ? (
              <Card>
                <Text>Status: {swap.status}</Text>
                <Text>Trading my {swap.book1_title}</Text>
                <Text>For their {swap.book2_title}</Text>
              </Card>
            ) : (
              <Card>
                <Text>Status: {swap.status}</Text>
                <Text>Trading their {swap.book1_title}</Text>
                <Text>For my {swap.book2_title}</Text>
              </Card>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SwapHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
