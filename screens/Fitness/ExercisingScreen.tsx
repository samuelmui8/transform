import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../FirebaseConfig";
import {
  doc,
  updateDoc,
  DocumentReference,
  increment,
} from "firebase/firestore";
import { auth } from "../../FirebaseConfig";
import {
  setCompleted,
  setWorkout,
  setMinutes,
  setCalories,
} from "../../redux/fitnessSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { incrementByAmount } from "../../redux/expSlice";

export const ExercisingScreen: React.FC = () => {
  const user = auth.currentUser;
  let userDocRef: DocumentReference;
  if (user) {
    // get tasklist for user from firestore
    userDocRef = doc(db, "users", user.uid);
  }
  const navigation = useNavigation();
  const route = useRoute();
  const [index, setIndex] = useState(0);
  const exercises = route.params.exercises;
  const current = exercises[index];
  const dispatch = useAppDispatch();
  const { minutes } = useAppSelector((store) => store.fitness);
  const { calories } = useAppSelector((store) => store.fitness);
  const { workout } = useAppSelector((store) => store.fitness);
  const { value } = useAppSelector((store) => store.exp);

  return (
    <SafeAreaView>
      <Image
        style={{ width: "100%", height: 370 }}
        source={{ uri: current.image }}
      />
      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        {current.name}
      </Text>
      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          fontSize: 38,
          fontWeight: "bold",
        }}
      >
        x{current.sets}
      </Text>

      {index + 1 >= exercises.length ? (
        <Pressable
          onPress={() => {
            updateDoc(userDocRef, {
              workout: workout,
              minutes: minutes,
              calories: calories,
              exp: value,
            });
            navigation.navigate("Content");
          }}
          style={{
            backgroundColor: "blue",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 150,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          >
            DONE
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            navigation.navigate("Rest");
            dispatch(setCompleted(current.name));
            dispatch(setWorkout(1));
            dispatch(setMinutes(2.5));
            dispatch(setCalories(6));
            dispatch(incrementByAmount(5));
            setTimeout(() => {
              setIndex(index + 1);
            }, 2000);
          }}
          style={{
            backgroundColor: "blue",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 150,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          >
            DONE
          </Text>
        </Pressable>
      )}

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 50,
        }}
      >
        <Pressable
          disabled={index === 0}
          onPress={() => {
            navigation.navigate("Rest");

            setTimeout(() => {
              setIndex(index - 1);
            }, 2000);
          }}
          style={{
            backgroundColor: "green",
            padding: 10,
            borderRadius: 20,
            marginHorizontal: 20,
            width: 100,
          }}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            PREV
          </Text>
        </Pressable>
        {index + 1 >= exercises.length ? (
          <Pressable
            onPress={() => {
              navigation.navigate("Content");
            }}
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 100,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SKIP
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate("Rest");

              setTimeout(() => {
                setIndex(index + 1);
              }, 2000);
            }}
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 100,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SKIP
            </Text>
          </Pressable>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
