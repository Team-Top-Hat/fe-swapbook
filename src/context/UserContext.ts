import { createContext } from "react";
interface AppBookShelf {
  ISBN: string;
  cover_url: string;
  title: string;
}
interface AppUserContext {
  avatar_url: string;
  bookshelf: AppBookShelf[];
  email: string;
  name: string;
  test: string;
}
interface ContextProps {
  currentUser: AppUserContext | null;
  setCurrentUser: (UserContext: AppUserContext) => void;
}

export const UserContext = createContext<ContextProps>({
  currentUser: null,
  setCurrentUser: () => null,
});
