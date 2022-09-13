import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/Home";
import Profile from "../screens/Profile";
import BookShelf from "../screens/BookShelf";
import AddBook from "../screens/AddBook";
import Listings from "../screens/Listings";
import Listing from "../screens/Listing";
import TradeOffer from "../screens/TradeOffer";
import SwapHistory from "../screens/SwapHistory";
import Swap from "../screens/Swap";
import SwapAccepted from "../screens/SwapAccepted";
import PostListing from "../screens/PostListing";

import { getHeaderTitle } from "../utils/getHeaderTitle";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ScreenNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Listings" component={Listings} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AddBook" component={AddBook} />
      <Stack.Screen name="Listing" component={Listing} />
      <Stack.Screen name="TradeOffer" component={TradeOffer} />
      <Stack.Screen name="Swap" component={Swap} />
      <Stack.Screen name="SwapAccepted" component={SwapAccepted} />
    </Stack.Navigator>
  );
}

export default function UserStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="ScreenNav"
          component={ScreenNav}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            drawerItemStyle: { height: 0 },
          })}
        />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="BookShelf" component={BookShelf} />
        <Drawer.Screen
          name="PostListing"
          component={PostListing}
          options={{ title: "Add Listing" }}
        />
        <Drawer.Screen
          name="SwapHistory"
          component={SwapHistory}
          options={{ title: "Swap History" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
