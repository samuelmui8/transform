import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

type Props = {
  duration: number;
  toggleTimer: (duration: number) => void;
};

export const TimerSelectorButton: React.FC<Props> = ({
  duration,
  toggleTimer,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => toggleTimer(duration)}
      >
        <Text style={styles.text}>{duration}</Text>
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
