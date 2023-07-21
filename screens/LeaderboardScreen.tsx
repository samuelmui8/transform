import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { db } from "../FirebaseConfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  query,
  orderBy,
  limit,
  collection,
  doc,
  getDocs,
} from "firebase/firestore";

export const LeaderboardScren: React.FC = () => {
  const insets = useSafeAreaInsets();
  const usersRef = collection(db, "users");

  const friends : string[] = [];
  const q = query(usersRef, orderBy("exp", "desc"), limit(3));
  getDocs(q).then(querySnapshot => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        friends.push(doc.data().name)
        console.log(doc.id, " => ", doc.data().name);
        console.log(friends);
      });
  })
  
  

  return (
    
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
        {/* array empty for some reason */}
        {friends.map((item, index) => {
              return (
                <Text>
                    {item}
                </Text>
              );
            })}
    </View>
  );
};
