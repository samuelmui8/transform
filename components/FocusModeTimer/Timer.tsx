import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TimerToggleButton } from "./FocusModeTimerSubcomponents/TimerToggleButton";
import { TimerCountDownDisplay } from "./FocusModeTimerSubcomponents/TimerCountDownDisplay";
import { TimeSelectorList } from "./FocusModeTimerSubcomponents/TimeSelectorList";

const defaultDuration = 20 * 60 * 1000;

export const Timer: React.FC = () => {
  const [timerCount, setTimerCount] = useState<number>(defaultDuration);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const startTimer = () => {
    const id = setInterval(() => setTimerCount((prev) => prev - 1000), 1000);
    setIsTimerRunning(true);
    setTimerInterval(id);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    if (timerInterval != null) {
      clearInterval(timerInterval);
      setTimerCount(defaultDuration);
    }
  };

  const setTimer = (duration: number) => {
    setTimerCount(duration * 60 * 1000);
  };

  useEffect(() => {
    if (timerCount === 0) {
      stopTimer();
    }
  }, [timerCount]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {isTimerRunning ? "TRANSFORMING!!!" : "TRANSFORM"}
      </Text>
      <TimerCountDownDisplay timerDate={new Date(timerCount)} />
      {isTimerRunning ? null : <TimeSelectorList toggleTimer={setTimer} />}
      <TimerToggleButton
        isTimerRunning={isTimerRunning}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  timerText: {
    fontSize: 30,
    alignItems: "center",
    fontWeight: "700",
  },
});
