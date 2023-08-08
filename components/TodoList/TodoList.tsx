import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Task from "./TodoListSubcomponents/Task";
import { db } from "../../FirebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  DocumentReference,
  increment,
} from "firebase/firestore";
import { auth } from "../../FirebaseConfig";
import { useAppDispatch } from "../../redux/hooks";
import { incrementByAmount } from "../../redux/expSlice";

export const TodoList = () => {
  const user = auth.currentUser;
  let userDocRef: DocumentReference;
  const dispatch = useAppDispatch();
  const [task, setTask] = useState<string>();
  const [taskItems, setTaskItems] = useState<string[]>([]);

  if (user) {
    // get tasklist for user from firestore
    userDocRef = doc(db, "users", user.uid);
    getDoc(userDocRef).then((snap) => {
      if (snap.exists()) {
        setTaskItems(snap.data().tasks);
      } else {
        // snap.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task != undefined && userDocRef) {
      updateDoc(userDocRef, {
        tasks: arrayUnion(task),
      });
      setTaskItems([...taskItems, task]);
      setTask(undefined);
    }
  };

  const completeTask = (index: number) => {
    let itemsCopy = [...taskItems];
    updateDoc(userDocRef, {
      tasks: arrayRemove(itemsCopy[index]),
      exp: increment(10),
    });
    dispatch(incrementByAmount(10));
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        testID="tasks-wrapper"
      >
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
          testID="write-task-wrapper"
        />
        <TouchableOpacity onPress={() => handleAddTask()} testID="add-button">
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
