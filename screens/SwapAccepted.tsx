import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";

const SwapAccepted = ({ route }: any) => {
  const { currentUser } = useContext(UserContext);
  const swap = route.params.swap;

  return (
    <View>
      <Text>SwapAccepted</Text>
    </View>
  );
};

export default SwapAccepted;

const styles = StyleSheet.create({});
