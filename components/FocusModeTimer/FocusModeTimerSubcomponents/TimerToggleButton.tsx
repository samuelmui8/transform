import React from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  isTimerRunning: boolean;
  stopTimer: () => void;
  startTimer: () => void;
};

export const TimerToggleButton: React.FC<Props> = ({
  isTimerRunning,
  startTimer,
  stopTimer,
}) => {
  return (
    <Pressable
      onPress={isTimerRunning ? stopTimer : startTimer}
      style={styles.pressable}
    >
      <View>
        <Text style={styles.text}>
          {isTimerRunning ? "😢 Give up 😢" : "⚡TRANSFORM NOW!⚡"}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "700",
  },
  pressable: {
    borderColor: "gold",
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
  },
});
