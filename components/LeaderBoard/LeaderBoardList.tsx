import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DisplayCard } from "./DisplayCard";
import { useAppSelector } from "../../redux/hooks";

export const LeaderBoardList: React.FC = () => {
  const { leaderboardInfo } = useAppSelector((store) => store.follow);
  return (
    <View>
      <FlatList>
        data={leaderboardInfo}
        renderItem=
        {({ item }) => {
          return <DisplayCard user2={item} />;
        }}
        {/* {leaderboardInfo.map((info) => (
          <DisplayCard userExp={info.userexp} userName={info.username} />
        ))} */}
      </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
});
