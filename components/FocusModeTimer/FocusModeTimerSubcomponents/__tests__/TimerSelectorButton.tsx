import { TimerSelectorButton } from "../TimerSelectorButton";
import renderer from "react-test-renderer";

describe("TimerSelectorButton", () => {
  it("should match the snapshot", () => {
    const tree = renderer
      .create(<TimerSelectorButton duration={20} toggleTimer={jest.fn} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
