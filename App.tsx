import "react-native-gesture-handler";
import React from "react";
import "./config/firebase";
import { ThemeProvider } from "@rneui/themed";
import RootNavigation from "./src/navigation";

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}
