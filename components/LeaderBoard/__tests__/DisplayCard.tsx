import React from "react";
import { render } from "@testing-library/react-native";
import { DisplayCard } from "../DisplayCard";

describe("DisplayCard", () => {
  const user = {
    username: "TestUser",
    userexp: 250,
    userid: "testuser123",
  };

  it("renders user information correctly", () => {
    const { getByText } = render(<DisplayCard user={user} />);

    const usernameText = getByText(user.username);
    const levelText = getByText(`LEVEL: ${Math.floor(user.userexp / 100)}`);
    const expText = getByText(`EXP: ${user.userexp}`);

    expect(usernameText).toBeTruthy();
    expect(levelText).toBeTruthy();
    expect(expText).toBeTruthy();
  });
});
