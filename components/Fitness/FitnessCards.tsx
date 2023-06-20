import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Fitness from "../../data/Fitness";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigatorScreenParams } from "@react-navigation/native";

type FitnessItem = {
  id: string;
  image: string;
  exercises: {
    id: string;
    image: string;
    name: string;
    sets: number;
  }[];
};

const FitnessCards: React.FC = () => {
  const FitnessData: FitnessItem[] = Fitness;
  const navigation = useNavigation();
  return (
    <View>
      {FitnessData.map((item) => (
        <Pressable
          onPress={() =>
            navigation.navigate("Workout", {
              id: item.id,
              image: item.image,
              exercises: item.exercises,
            })
          }
          style={{ alignItems: "center", justifyContent: "center", margin: 10 }}
          key={item.id}
        >
          <Image
            style={{ width: "95%", height: 140, borderRadius: 7 }}
            source={{ uri: item.image }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              left: 20,
              top: 20,
            }}
          >
            {item.name}
          </Text>
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: "white",
              bottom: 15,
              left: 20,
            }}
            name="lightning-bolt"
            size={24}
            color="black"
          />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default FitnessCards;
