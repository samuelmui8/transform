import React, { Component, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';

const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

export const CalendarScreen: React.FC = () => {
  
  
  // States
  const [events, setEvents] = useState({});
  const [marksDate, setMarksDate] = useState({});
  const [refreshCalender, setRefreshCalender] = useState(false);
  
  // callback called on day press
  const onDayPress = (day: DateData) => {
  
  }
  
  // On Add Function
  const onAddEventSubmit = () => {
      setRefreshCalender(true);
      let items = events;
      let mark = {};
      let eventDetails = {
          date: "2022-02-23", // Modal Value
          title: "Your Event Title" // Modal Value
      }
  
      if (!items[eventDetails.date]) {
          items[eventDetails.date] = [];
      }
  
      items[eventDetails.date].push(eventDetails);
  
  
      mark[eventDetails.date] = {
          customStyles: {
            container: {
              backgroundColor: '#0f0',
            },
            text: {
              color: 'white',
              fontWeight: 'bold',
            },
          },
      };
  
      setEvents(items);
      setMarksDate(mark);
      setRefreshCalender(false);
  }
  
  const [items, setItems] = useState<String[]>([]);

  // const loadItems = (day: DateData) => {
  //   const time = day.timestamp * 24 * 60 * 60 * 1000;
  //   const strTime = timeToString(time);
  //   const newItems: String[] = [];
  // }

  const loadItems = (day: DateData) => {

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }

      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  }

  const renderItem = (item) => {
    return (<TouchableOpacity style = {{marginRight: 10, marginTop: 17}}>
      <Card>
        <Card.Content>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>
              {item.name}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>)
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2023-05-16'}
        renderItem={renderItem}
      />
    </View>
  );
}