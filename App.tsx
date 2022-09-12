import "react-native-gesture-handler";
import React, { useState } from "react";
import { ThemeProvider } from "@rneui/themed";
import "./config/firebase";
import RootNavigation from "./navigation";
import { UserContext } from "./context/UserContext";

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
    <ThemeProvider>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <RootNavigation />
      </UserContext.Provider>
    </ThemeProvider>
  );
}
