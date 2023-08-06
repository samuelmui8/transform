import React, { Component, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";

const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

export const CalendarScreen: React.FC = () => {
  // States
  const [items, setItems] = useState<String[]>([]);
  const [event, setEvent] = useState(String);
  const [day, setDay] = useState(String);

  // On Add Function
  const handleAddEvent = () => {
    if (!items[day]) {
      items[day] = [];
    }

    items[day].push({
      name: event,
      height: Math.max(50, Math.floor(Math.random() * 150)),
      day: day,
    });
    console.log(day);
    console.log(event);

    setDay("");
    setEvent("");
  };

  const loadItems = (day: DateData) => {
    // load empty items for days in the month
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          // items[strTime].push({
          //   name: "Item for " + strTime + " #01",
          //   height: Math.max(50, Math.floor(Math.random() * 150)),
          //   day: strTime,
          // });
        }
      }
      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={"2023-05-16"}
        renderItem={renderItem}
      />
      <TextInput
        placeholder={"Write a date in YYYY-MM-DD format"}
        value={day}
        onChangeText={(text) => setDay(text)}
        style={{
          padding: 5,
        }}
      />
      <TextInput
        placeholder={"Write an event"}
        value={event}
        onChangeText={(text) => setEvent(text)}
        style={{
          padding: 5,
        }}
      />
      <TouchableOpacity
        onPress={() => handleAddEvent()}
        style={{
          backgroundColor: "#6699CC",
          padding: 0,
          borderRadius: 15,
          marginBottom: 5,
        }}
      >
        <View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 50,
              color: "#fff",
            }}
          >
            +
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
