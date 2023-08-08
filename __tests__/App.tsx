import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import App from "../App";

describe("<App />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<App />).toJSON();

    // Check if tree is an array (multiple children)
    if (Array.isArray(tree)) {
      expect(tree.length).toBe(1);
    }
    // Check if tree is a single JSON object (one child)
    else if (tree as ReactTestRendererJSON) {
      expect(tree?.children).toHaveLength(1);
    } else {
      // Handle other cases if needed
      throw new Error("Unexpected tree structure");
    }
  });

  it("matches the snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
