import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StackScreenProps } from "@react-navigation/stack";
import { getAuth } from "firebase/auth";
import { useAuthentication } from "../utils/hooks/useAuthentication";


const auth = getAuth();
const BookShelf: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const { user } = useAuthentication();

//api call to our backend to get the users books - display;
//pic title auth catagory
//button to add-book screen
//create new screen to have the ability to add new book to our db


  return (
    <View style={styles.container}>
      <Text>{user?.email} BookShelf!</Text>
    </View>
  )
}

export default BookShelf

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      button: {
        marginTop: 10,
      },
    });
