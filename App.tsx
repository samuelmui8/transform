import NavStack from "./screens/NavStack";
import { FitnessContext } from "./screens/Fitness/Context";

export default function App() {
  return (
    <FitnessContext>
      <NavStack />
    </FitnessContext>
  );
}
