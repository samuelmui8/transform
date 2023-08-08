import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import Task from "../Task";

describe("Task component", () => {
  it("should render with the provided text", () => {
    const text = "Sample task";
    const { getByText } = render(<Task text={text} />);

    const taskText = getByText(text);
    expect(taskText).toBeTruthy();
  });

  it("should render a colored square", () => {
    const { getByTestId } = render(<Task text="Sample task" />);

    const square = getByTestId("colored-square");
    expect(square).toBeTruthy();
  });

  it("should render a circular element", () => {
    const { getByTestId } = render(<Task text="Sample task" />);

    const circular = getByTestId("circular-element");
    expect(circular).toBeTruthy();
  });

  it("matches the snapshot", () => {
    const tree = renderer.create(<Task text="Sample task" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
