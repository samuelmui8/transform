import React from "react";
import renderer from "react-test-renderer";
import { ExperienceBar } from "../ExperienceBar";

// Mock the useAppSelector hook from redux
jest.mock("../../../redux/hooks.ts", () => ({
  useAppSelector: jest.fn((selector) => selector({ exp: 70 })), // Replace the '50' with a value for testing
}));

describe("ExperienceBar", () => {
  it("should match the snapshot", () => {
    const tree = renderer.create(<ExperienceBar height={40} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
