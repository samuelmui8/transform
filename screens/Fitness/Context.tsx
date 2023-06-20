import React, { createContext, useState } from "react";
import { db } from "../../FirebaseConfig";
import {
  doc,
  getDoc,
  DocumentReference,
} from "firebase/firestore";
import { auth } from "../../FirebaseConfig";

const FitnessItems = createContext(NaN);

const FitnessContext = ({ children }) => {
  const user = auth.currentUser;
  let userDocRef: DocumentReference;
  if (user) {
    // get tasklist for user from firestore
    userDocRef = doc(db, "users", user.uid);
    getDoc(userDocRef).then((snap) => {
      if (snap.exists()) {
        setWorkout(snap.data().workout);
        setCalories(snap.data().calories);
        setMinutes(snap.data().minutes);
      } else {
        // snap.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }
  const [completed, setCompleted] = useState([]);
  const [workout, setWorkout] = useState(0);
  const [calories, setCalories] = useState(0);
  const [minutes, setMinutes] = useState(0);
  return (
    <FitnessItems.Provider
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        calories,
        setCalories,
        minutes,
        setMinutes,
      }}
    >
      {children}
    </FitnessItems.Provider>
  );
};

export { FitnessContext, FitnessItems };
