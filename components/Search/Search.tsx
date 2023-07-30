import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { auth, db } from "../../FirebaseConfig";
import { query, collection, getDocs, where } from "firebase/firestore";
import { SearchCard } from "./SearchCard";

export const Search: React.FC = () => {
  const currentUser = auth.currentUser;
  const [users, setUsers] = useState<any[]>([]);
  const usersRef = collection(db, "users");
  const fetchUsers = (search: string) => {
    setUsers([]);
    getDocs(
      query(
        usersRef,
        where("name", ">=", search),
        where("name", "!=", currentUser?.displayName)
      )
    ).then((querySnapshot) => {
      const users: React.SetStateAction<any[]> = [];
      querySnapshot.forEach((doc) => {
        let userName = doc.data().name;
        let userId = doc.id;
        users.push({ username: userName, userid: userId });
      });
      setUsers(users);
    });
  };

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
        renderItem={({ item }) => <SearchCard person={item} />}
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
