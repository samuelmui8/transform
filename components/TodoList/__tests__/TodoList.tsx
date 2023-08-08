import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { TodoList } from "../TodoList";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

describe("TodoList", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const tasksWrapper = getByTestId("tasks-wrapper");
    const writeTaskWrapper = getByTestId("write-task-wrapper");

    expect(tasksWrapper).toBeTruthy();
    expect(writeTaskWrapper).toBeTruthy();
  });
});
