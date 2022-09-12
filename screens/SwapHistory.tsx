import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "@rneui/themed";
import { UserContext } from "../context/UserContext";
import { StackScreenProps } from "@react-navigation/stack";

const SwapHistory: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);
  const [swaps, setSwaps] = useState([
    {
      user_id1: "user1",
      user_id2: "user2",
      book1_ISBN: "9781118951309",
      book2_ISBN: "0241984750",
      book1_title: "Coding for Dummies",
      book2_title: "The Catcher in the Rye",
      book1_cover: "https://pictures.abebooks.com/isbn/9781118951309-uk.jpg",
      book2_cover:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/330px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
      creation_date: "",
      status: "pending",
    },
  ]);

  useEffect(() => {}, []);

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate({
            name: "Swap",
            params: { swap: swaps[0] },
          })
        }>
        <Card>
          <Text>Status: {swaps[0].status}</Text>
          <Text>
            Trading {swaps[0].user_id1}'s {swaps[0].book1_title}
          </Text>
          <Text>
            For {swaps[0].user_id2}'s {swaps[0].book2_title}
          </Text>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default SwapHistory;

const styles = StyleSheet.create({});
