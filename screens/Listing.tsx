import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'

const Listing = ({route}) => {
    const currentListing = route.params.listing;
    console.log(currentListing.cover_url)
  return (
    <View style={styles.container}>
      <Text>{currentListing.title}</Text>
      <Image style={styles.coverImage} source={{
          uri: currentListing.cover_url,
        }}/>
    </View>
  )
}

export default Listing

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      
    coverImage: {
        height: 500,
        width: 300,
    }

})