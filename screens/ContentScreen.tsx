import { StatusBar, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TimerScreen } from "./TimerScreen";
import { TodoListScreen } from "./TodoListScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { WelcomeScreen } from "./WelcomeScreen";

const Tab = createMaterialTopTabNavigator();

export const ContentScreen = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator initialRouteName="Welcome Page" style={styles.navBar}>
        <Tab.Screen name="Todo List" component={TodoListScreen} />
        <Tab.Screen name="Welcome Page" component={WelcomeScreen} />
        <Tab.Screen name="Transform Timer" component={TimerScreen} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navBar: {
    marginTop: StatusBar.currentHeight,
  },
});