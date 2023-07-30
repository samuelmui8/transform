import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { DisplayCard } from "./DisplayCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchLeaderboard } from "../../redux/leaderboardSlice";

interface LeaderBoardItem {
  username: string;
  userexp: number;
  userid: string;
}

export const LeaderBoardList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { following } = useAppSelector((store) => store.follow);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [following]);

  const leaderboardInfo = useAppSelector(
    (state) => state.leaderboard.leaderboardInfo
  );
  const isLoading = useAppSelector((state) => state.leaderboard.isLoading);
  const error = useAppSelector((state) => state.leaderboard.error);

  // leaderboardInfo.sort((a, b) => b - a.userexp);
  const renderItem = ({ item }: { item: LeaderBoardItem }) => {
    return <DisplayCard user={item} />;
  };

  if (isLoading) {
    console.log("loading");
  } else if (error) {
    console.log("loaded");
  }
  return (
    <FlatList
      style={styles.FlatList}
      data={[...leaderboardInfo].sort((a, b) => {
        return b.userexp - a.userexp;
      })}
      renderItem={renderItem}
      keyExtractor={(item) => item.userid.toString()}
    />
  );
};

const styles = StyleSheet.create({
  FlatList: {
    flex: 1,
  },
});
