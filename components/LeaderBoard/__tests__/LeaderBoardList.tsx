import React from "react";
import renderer, { ReactTestInstance } from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // Import the mock store creator
import { LeaderBoardList } from "../LeaderBoardList";
import { RootState } from "../../../redux/store"; // Import your RootState type

const mockStore = configureStore(); // Create a mock store creator

describe("LeaderBoardList", () => {
  it("renders correctly", () => {
    const initialState: RootState = {
      // Initialize with your desired initial state
      follow: {
        following: [],
      },
      leaderboard: {
        leaderboardInfo: [],
        isLoading: false,
        error: null,
      },
      exp: { value: 100 },
      fitness: { calories: 100, completed: [], workout: 1, minutes: 10 },
    };

    const store = mockStore(initialState); // Create a mock store with initial state

    const tree = renderer.create(
      <Provider store={store}>
        <LeaderBoardList />
      </Provider>
    );

    const instance = tree.root as ReactTestInstance;

    // Verify that the component renders correctly
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
