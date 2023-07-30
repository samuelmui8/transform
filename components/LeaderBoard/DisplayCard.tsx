import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

interface user {
  username: string;
  userexp: number;
  userid: string;
}
export const DisplayCard = ({ user }: { user: user }) => {
  const userLevel = Math.floor(user.userexp / 100);
  return (
    <View style={styles.button}>
      <Text>{user.username}</Text>
      <Text>{"LEVEL: " + userLevel}</Text>
      <Text>{"EXP: " + user.userexp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderColor: "green",
    borderWidth: 6,
    borderRadius: 10,
  },
  text: {
    color: "black",
  },
});
