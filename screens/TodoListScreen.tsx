import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TodoList } from "../components/TodoList/TodoList";

export const TodoListScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <TodoList />
    </View>
  );
};
