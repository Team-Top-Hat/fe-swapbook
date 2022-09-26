import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import WelcomeScreen from "../screens/Welcome";
import SignInScreen from "../screens/auth/SignInScreen";
import SignOutScreen from "../screens/auth/SignUpScreen";
import Listings from "../screens/listings/Listings";

import { getHeaderTitle } from "../utils/getHeaderTitle";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ScreenNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "orange" } }}>
        <Drawer.Screen name="Welcome" component={WelcomeScreen} />
        <Drawer.Screen name="Sign In" component={SignInScreen} />
        <Drawer.Screen name="Sign Up" component={SignOutScreen} />
        <Drawer.Screen
          name="ScreenNav"
          component={ScreenNav}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            drawerItemStyle: { height: 0 },
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
