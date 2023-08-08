import { TimeSelectorList } from "../TimeSelectorList";
import renderer from "react-test-renderer";

describe("TimerSelectorList", () => {
  it("should match the snapshot", () => {
    const tree = renderer
      .create(<TimeSelectorList toggleTimer={jest.fn} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
