import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ContentScreen } from "./screens/ContentScreen";
import { ExercisingScreen } from "./screens/Fitness/ExercisingScreen";
import { FitnessHomeScreen } from "./screens/Fitness/FitnessHomeScreen";
import { RestScreen } from "./screens/Fitness/RestScreen";
import { WorkoutScreen } from "./screens/Fitness/WorkoutScreen";
import { LoginScreen } from "./screens/authentication/LoginScreen";
import { RegisterScreen } from "./screens/authentication/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function App() {
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
}
