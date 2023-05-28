import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

type Props = {
  timerDate: Date;
};

export const TimerCountDownDisplay: React.FC<Props> = ({ timerDate }) => {
  return (
    <View>
      <Text style={styles.timerCountDownText}>
        {timerDate.getUTCHours().toString().padStart(2, "0")}:
        {timerDate.getUTCMinutes().toString().padStart(2, "0")}:
        {timerDate.getUTCSeconds().toString().padStart(2, "0")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerCountDownText: {
    fontSize: 90,
    fontWeight: "700",
  },
});
