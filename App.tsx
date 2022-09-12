import React, { useState } from "react";
import { ThemeProvider } from "@rneui/themed";
import "./config/firebase";
import RootNavigation from "./navigation";
import { UserContext } from "./context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    avatar_url: "string",
    bookshelf: [
      {
        ISBN: "9781118951309",
        book_cover: "https://pictures.abebooks.com/isbn/9781118951309-uk.jpg",
        title: "Coding for Dummies",
      },
    ],
    email: "string",
    name: "string",
  });

  return (
    <ThemeProvider>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <RootNavigation />
      </UserContext.Provider>
    </ThemeProvider>
  );
}
