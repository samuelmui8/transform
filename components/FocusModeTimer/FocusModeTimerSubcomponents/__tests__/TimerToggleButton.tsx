import renderer from "react-test-renderer";
import { TimerToggleButton } from "../TimerToggleButton";

describe("TimerToggleButton", () => {
  it("should match the snapshot when timer is running", () => {
    const tree = renderer
      .create(
        <TimerToggleButton
          isTimerRunning={true}
          startTimer={jest.fn}
          stopTimer={jest.fn}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match the snapshot when timer is not running", () => {
    const tree = renderer
      .create(
        <TimerToggleButton
          isTimerRunning={false}
          startTimer={jest.fn}
          stopTimer={jest.fn}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
