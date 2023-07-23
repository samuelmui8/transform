import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { db } from "../../FirebaseConfig";
import {
  query,
  orderBy,
  limit,
  collection,
  doc,
  getDocs,
  where,
} from "firebase/firestore";
import { SearchCard } from "./SearchCard";

export const Search: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const usersRef = collection(db, "users");
  const fetchUsers = (search: string) =>
    getDocs(query(usersRef, where("name", ">=", search))).then(
      (querySnapshot) => {
        const users: React.SetStateAction<any[]> = [];
        querySnapshot.forEach((doc) => {
          let userName = doc.data().name;
          let userId = doc.id;
          users.push({ username: userName, userid: userId });
        });
        setUsers(users);
        console.log(users);
      }
    );

  return (
    <View>
      <View style={{ marginVertical: 30, paddingHorizontal: 20 }}>
        <TextInput
          style={styles.searchBar}
          placeholder="Type Here..."
          onChangeText={fetchUsers}
        />
      </View>

      <FlatList
        data={users}
        renderItem={({ item }) => <SearchCard user={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: "whitesmoke",
    color: "grey",
    paddingLeft: 10,
    borderRadius: 8,
    height: 40,
    marginTop: -5,
  },
});
