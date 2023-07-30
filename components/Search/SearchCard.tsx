import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToFollowing, removeFromFollowing } from "../../redux/followSlice";
import {
  DocumentReference,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";

interface LeaderBoardItem {
  username: string;
  userexp: number;
  userid: string;
}

type Props = {
  person: LeaderBoardItem;
};

export const SearchCard: React.FC<Props> = ({ person }) => {
  const dispatch = useAppDispatch();
  const userId = person.userid;
  const { following } = useAppSelector((store) => store.follow);
  const amFollowing = following.includes(person.userid);
  const user = auth.currentUser;
  let userDocRef: DocumentReference;
  if (user) {
    userDocRef = doc(db, "users", user.uid);
  }

  const add = () => {
    dispatch(addToFollowing(userId));
    if (userId != undefined) {
      updateDoc(userDocRef, {
        following: arrayUnion(userId),
      });
    }
  };

  const remove = () => {
    dispatch(removeFromFollowing(userId));
    if (userId != undefined) {
      updateDoc(userDocRef, {
        following: arrayRemove(userId),
      });
    }
  };

  return (
    <View>
      <Text style={styles.text}>{person.username}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          amFollowing ? remove() : add();
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
