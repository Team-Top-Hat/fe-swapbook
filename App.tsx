import "react-native-gesture-handler";
import React, { useState } from "react";
import { ThemeProvider } from "@rneui/themed";
import "./config/firebase";
import RootNavigation from "./src/navigation";

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}
