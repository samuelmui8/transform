import { defaultDuration } from "../../Timer";
import { TimerCountDownDisplay } from "../TimerCountDownDisplay";
import renderer from "react-test-renderer";

describe("TimerCountDownDisplay", () => {
  it("should match the snapshot", () => {
    const tree = renderer
      .create(<TimerCountDownDisplay timerDate={new Date(defaultDuration)} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
