import { useAuthentication } from "../utils/hooks/useAuthentication";
import { StackScreenProps } from "@react-navigation/stack";

import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native'
import React, {useContext , useEffect} from 'react'
import { UserContext } from "../context/UserContext";
import { Card } from "@rneui/themed";
import {fetchAllListings} from "../api"


const Listings: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const { currentUser } = useContext(UserContext);

    const [listings, setListings] = React.useState([])
    

    useEffect(()=>{
        fetchAllListings().then((res)=>{
            const dataFromApi:{
                // listing_id: number; TBD
                title: string;
                cover_url: string;
                ISBN: string;
                // tags: string[]; TBD
                error: string;
            }[] = [];
            res.listings.forEach(function (listing:any){
                dataFromApi.push({
                    title: listing.title,
                    cover_url: listing.cover_url,
                    ISBN: listing.ISBN,
                    error:""
                })
            })
            setListings(dataFromApi)
        })
    },[])
    

  return (
    <View style={styles.container}>
      <Text>Listings</Text>
      <ScrollView>
        <View style={styles.row}>
      {listings?.map(function (listing:any,i:number) {
        return (
        <TouchableOpacity onPress={() => navigation.navigate({name:"Listing", params:{listing:listing}})} key={i}>
          <Card>
            <Card.Title style={styles.bookTitle}>{listing.title}</Card.Title>
            <Card.Image style={styles.cardImage} source={{ uri: listing.cover_url }} />
          </Card>
          </TouchableOpacity>
        );
      })}
      </View>
      </ScrollView>
    </View>
  )
}

export default Listings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },

      row: {
        flexDirection: "row",
        flexWrap: "wrap",
      },

      cardImage: {
        width: 140,
        height: 180,
        resizeMode: "contain",
      },
    
      bookTitle: {
        width: 140,
      },
})