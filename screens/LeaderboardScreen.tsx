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
import { LeaderBoardList } from "../components/LeaderBoard/LeaderBoardList";
import { useAppSelector } from "../redux/hooks";

export const LeaderboardScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const usersRef = collection(db, "users");
  const { leaderboardInfo } = useAppSelector((store) => store.leaderboard);

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <LeaderBoardList />
    </View>
  );
};
