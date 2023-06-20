import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./authentication/LoginScreen";
import { RegisterScreen } from "./authentication/RegisterScreen";
import { ContentScreen } from "./ContentScreen";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { WorkoutScreen } from "./Fitness/WorkoutScreen";
import { ExercisingScreen } from "./Fitness/ExercisingScreen";
import { RestScreen } from "./Fitness/RestScreen";
import { FitnessHomeScreen } from "./Fitness/FitnessHomeScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Content" component={ContentScreen} />
          <Stack.Screen name="FitnessHome" component={FitnessHomeScreen} />
          <Stack.Screen name="Workout" component={WorkoutScreen} />
          <Stack.Screen name="Exercising" component={ExercisingScreen} />
          <Stack.Screen name="Rest" component={RestScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default AuthStack;
