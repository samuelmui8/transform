import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addToFollowing,
  removeFromFollowing,
  updateLeaderBoard,
} from "../../redux/followSlice";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";

type Props = {
  user: any;
};

export const SearchCard: React.FC<Props> = ({ user }) => {
  const { following } = useAppSelector((store) => store.follow);
  const amFollowing = following.includes(user.userid);
  const dispatch = useAppDispatch();

  const add = () => {
    dispatch(removeFromFollowing(user.userid));
    const leaderBoard: any[] = [];
    console.log(following);
    for (const userId of following) {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("id", "==", userId)
        // orderBy("exp", "desc")
      );
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          leaderBoard.push({
            username: doc.data().name,
            userexp: doc.data().exp,
          });
          // console.log(doc.id, " => ", doc.data().name);
          // console.log(friends);
        });
      });
    }
    dispatch(updateLeaderBoard(leaderBoard));
    console.log(leaderBoard);
    console.log("completedeeeeeeeeeeeeee");
  };

  const remove = () => {
    dispatch(addToFollowing(user.userid));
    const leaderBoard: any[] = [];
    console.log(leaderBoard);
    for (const userId of following) {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("id", "==", userId)
        // orderBy("exp", "desc")
      );
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          leaderBoard.push({
            username: doc.data().name,
            userexp: doc.data().exp,
          });
        });
      });
    }
    dispatch(updateLeaderBoard(leaderBoard));
    console.log(leaderBoard);
    console.log("completed");
  };

  return (
    <View>
      <Text style={styles.text}>{user.username}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("presseddddd");
          amFollowing ? () => add : remove;
          console.log("beiwbvkebrverb");
        }}
      >
        <Text style={styles.text}>{amFollowing ? "Unfollow" : "Follow"}</Text>
      </TouchableOpacity>
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
