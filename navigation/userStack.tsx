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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ScreenNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Listings" component={Listings} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="AddBook"
        component={AddBook}
        options={{ title: "Add Book" }}
      />
      <Stack.Screen name="Listing" component={Listing} />
      <Stack.Screen name="TradeOffer" component={TradeOffer} />
      <Stack.Screen
        name="SwapHistory"
        component={SwapHistory}
        options={{ title: "Swap History" }}
      />
      <Stack.Screen name="Swap" component={Swap} />
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
          options={{ title: "Listings", drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="BookShelf" component={BookShelf} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
