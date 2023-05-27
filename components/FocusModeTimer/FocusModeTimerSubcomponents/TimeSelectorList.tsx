import { ScrollView, StyleSheet, Text } from "react-native";
import React from "react";
import { TimerSelectorButton } from "./TimerSelectorButton";

type Props = {
  toggleTimer: (duration: number) => void;
};

export const TimeSelectorList: React.FC<Props> = ({ toggleTimer }) => {
  const durations = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      // style={styles.scrollview}
    >
      {durations.map((duration) => (
        <TimerSelectorButton
          key={duration}
          duration={duration}
          toggleTimer={() => toggleTimer(duration)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
});
