import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Listings";

  switch (routeName) {
    case "Listings":
      return "Listings";
    case "Listing":
      return "Listing";
    case "Profile":
      return "My profile";
    case "Account":
      return "My account";
    case "AddBook":
      return "Add Book";
    case "Tradeffer":
      return "Trade Offer";
    case "SwapHistory":
      return "Swap History";
    case "Swap":
      return "Swap";
    case "SwapAccepted":
      return "Swap Confirmation";
    case "Welcome":
      return "Welcome";
  }
}
