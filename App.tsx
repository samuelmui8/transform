
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './navigation/AuthStack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthStack />

import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TodoListScreen } from "./screens/TodoListScreen";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Transform Timer" style={styles.navBar}>
          <Tab.Screen name="Todo List" component={TodoListScreen} />
          <Tab.Screen name="Transform Timer" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
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
