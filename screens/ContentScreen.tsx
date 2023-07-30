import { StatusBar, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TimerScreen } from "./TimerScreen";
import { TodoListScreen } from "./TodoListScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { WelcomeScreen } from "./WelcomeScreen";
import { FitnessHomeScreen } from "./Fitness/FitnessHomeScreen";
import { CalendarScreen } from "./CalendarScreen";
import { LeaderboardScreen } from "./LeaderboardScreen";
import { SearchScreen } from "./SearchScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

export const ContentScreen = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName="Welcome Page"
        style={styles.navBar}
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: () => {
            // Set the icon based on the route name and whether it's focused or not
            switch (route.name) {
              case "Todo List":
                return <Ionicons name="clipboard" size={25} color="black" />;
              case "Welcome Page":
                return <Ionicons name="home" size={25} color="black" />;
              case "Transform Timer":
                return <Ionicons name="timer" size={25} color="black" />;
              case "Fitness":
                return <Ionicons name="barbell" size={25} color="black" />;
              case "Calendar":
                return <Ionicons name="calendar" size={25} color="black" />;
              case "Leaderboard":
                return <Ionicons name="trophy-sharp" size={25} color="black" />;
              case "Search":
                return <Ionicons name="search" size={25} color="black" />;
            }
          },
        })}
      >
        <Tab.Screen name="Todo List" component={TodoListScreen} />
        <Tab.Screen name="Welcome Page" component={WelcomeScreen} />
        <Tab.Screen name="Transform Timer" component={TimerScreen} />
        <Tab.Screen name="Fitness" component={FitnessHomeScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
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
