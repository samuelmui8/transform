import React from "react";
import renderer, { ReactTestInstance, act } from "react-test-renderer";
import { Timer, defaultDuration } from "../Timer";
import { updateDoc, increment } from "firebase/firestore";
import expReducer, { incrementByAmount } from "../../../redux/expSlice";
import { Text } from "react-native";
import { TimerToggleButton } from "../FocusModeTimerSubcomponents/TimerToggleButton";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

// Mock the useAppDispatch and auth.currentUser hook
jest.mock("../../../redux/hooks", () => ({
  useAppDispatch: jest.fn(() => jest.fn),
}));

describe("Timer", () => {
  it("should match the snapshot", () => {
    const tree = renderer.create(<Timer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should start and stop the timer correctly", () => {
    jest.useFakeTimers();
    const tree = renderer.create(<Timer />);
    const instance = tree.root as ReactTestInstance;

    // Verify that the timer is initially not running
    const allTextComponents = instance.findAllByType(
      Text
    ) as ReactTestInstance[];
    const timerText = allTextComponents.find(
      (text) => text.props.children === "TRANSFORM"
    );
    expect(timerText?.props.children).toEqual("TRANSFORM");

    // Start the timer
    const timerToggleButton = instance.findByType(
      TimerToggleButton
    ) as ReactTestInstance;
    act(() => {
      timerToggleButton.props.startTimer(); // Simulate starting the timer
    });
    expect(timerText?.props.children).toEqual("TRANSFORMING!!!");

    // Fast-forward the timer by 5 seconds (for testing purposes)
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Verify that the timer is still running
    expect(timerText?.props.children).toEqual("TRANSFORMING!!!");

    // Stop the timer
    act(() => {
      timerToggleButton.props.stopTimer(); // Simulate stopping the timer
    });
    expect(timerText?.props.children).toEqual("TRANSFORM");

    // Fast-forward the timer by another 5 seconds (for testing purposes)
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Verify that the timer is still stopped
    expect(timerText?.props.children).toEqual("TRANSFORM");
  });

  // it("should update the timerCount and dispatch actions when the timer reaches 0", () => {
  //   jest.useFakeTimers();

  //   // Create a real Redux store with your root reducer
  //   const store = configureStore({
  //     reducer: {
  //       exp: expReducer,
  //     },
  //   });

  //   const tree = renderer.create(
  //     <Provider store={store}>
  //       <Timer />
  //     </Provider>
  //   );

  //   const instance = tree.root as ReactTestInstance;
  //   const timerToggleButton = instance.findByType(
  //     TimerToggleButton
  //   ) as ReactTestInstance;

  //   const initialState = store.getState().exp.value;

  //   // Start the timer
  //   act(() => {
  //     timerToggleButton.props.startTimer();
  //   });

  //   act(() => {
  //     jest.advanceTimersByTime(defaultDuration);
  //   });

  //   act(() => {
  //     useAppDispatch()(incrementByAmount(defaultDuration / 1000));
  //   });

  //   const { value } = useAppSelector((store) => store.exp);

  //   expect(value).toEqual(initialState + defaultDuration / 1000);

  //   // Verify that the firestore updateDoc function is called with the correct argument
  //   expect(updateDoc).toHaveBeenCalledWith(expect.any(Object), {
  //     exp: increment(defaultDuration),
  //   });
  // });
});
