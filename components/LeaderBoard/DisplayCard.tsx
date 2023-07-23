import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

type Props = {
  user2: any;
};

export const DisplayCard: React.FC<Props> = ({ user2 }) => {
  const userLevel = user2.userexp / 100;
  return (
    <View>
      <Text>{user2.username}</Text>
      <Text>{userLevel}</Text>
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
