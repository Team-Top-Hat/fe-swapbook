import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/Home";
import Profile from "../screens/Profile";
import BookShelf from "../screens/bookshelf/BookShelf";
import AddBook from "../screens/bookshelf/AddBook";
import Listings from "../screens/listings/Listings";
import Listing from "../screens/listings/Listing";
import TradeOffer from "../screens/swaps/SwapOffer";
import SwapHistory from "../screens/swaps/SwapHistory";
import Swap from "../screens/swaps/Swap";
import SwapAccepted from "../screens/swaps/SwapAccepted";
import PostListing from "../screens/listings/PostListing";

import { UserContext } from "../../src/context/UserContext";
import { getHeaderTitle } from "../utils/getHeaderTitle";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ScreenNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Listings" component={Listings} />
      <Stack.Screen name="AddBook" component={AddBook} />
      <Stack.Screen name="Listing" component={Listing} />
      <Stack.Screen name="TradeOffer" component={TradeOffer} />
      <Stack.Screen name="Swap" component={Swap} />
      <Stack.Screen name="SwapAccepted" component={SwapAccepted} />
    </Stack.Navigator>
  );
}

export default function UserStack() {
  interface AppBookShelf {
    ISBN: string;
    book_cover: string;
    title: string;
  }
  interface AppUserContext {
    avatar_url: string;
    bookshelf: AppBookShelf[];
    email: string;
    name: string;
  }

  const [currentUser, setCurrentUser] = React.useState({
    avatar_url: "string",
    bookshelf: [
      {
        ISBN: "9781118951309",
        book_cover: "https://pictures.abebooks.com/isbn/9781118951309-uk.jpg",
        title: "Coding for Dummies",
      },
      {
        ISBN: "0241984750",
        book_cover:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/330px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
        title: "The Catcher in the Rye",
      },
    ],
    email: "string",
    name: "string",
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{ headerStyle: { backgroundColor: "orange" } }}>
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
          <Drawer.Screen name="Listings" component={Listings} />
          <Drawer.Screen
            name="BookShelf"
            component={BookShelf}
            options={{ title: "My Bookshelf" }}
          />
          <Drawer.Screen
            name="PostListing"
            component={PostListing}
            options={{ title: "New Listing" }}
          />
          <Drawer.Screen
            name="SwapHistory"
            component={SwapHistory}
            options={{ title: "Swap History" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
