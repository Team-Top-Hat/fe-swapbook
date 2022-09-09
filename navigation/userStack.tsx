import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home";
import Profile from "../screens/Profile";
import BookShelf from "../screens/BookShelf";
import AddBook from "../screens/AddBook";
import Listings from "../screens/Listings";

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="BookShelf" component={BookShelf} />
        <Stack.Screen name="AddBook" component={AddBook} />
        <Stack.Screen name="Listings" component={Listings}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
