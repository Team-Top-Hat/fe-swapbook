import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home";
import Profile from "../screens/Profile";
import BookShelf from "../screens/BookShelf";
import AddBook from "../screens/AddBook";
import Listings from "../screens/Listings";
import Listing from "../screens/Listing";
import TradeOffer from "../screens/TradeOffer";
import TradeHistory from "../screens/TradeHistory";

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="BookShelf" component={BookShelf} />
        <Stack.Screen name="AddBook" component={AddBook} />
        <Stack.Screen name="Listings" component={Listings} />
        <Stack.Screen name="Listing" component={Listing} />
        <Stack.Screen name="TradeOffer" component={TradeOffer} />
        <Stack.Screen name="TradeHistory" component={TradeHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
