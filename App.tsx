import React from 'react';
import {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function Counter() {
  //this is an example of assignment deconstruction, counter will be the current value of the state which is 0
  //and setCounter is the setter function that updates the value of counter
  const [counter, setCounter] = useState<number>(0);
  const incrementCounter = () => {
    setCounter(counter + 1);
  };
  const decrementCounter = () => {
    setCounter(counter - 1);
  };

  return (
    <View style={styles.container}>
      <Text>{counter}</Text>
      <Button onPress={() => incrementCounter()} title="Increment Counter" />
      <Button
        onPress={() => decrementCounter()}
        title="Decrement Counter Counter"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
});
