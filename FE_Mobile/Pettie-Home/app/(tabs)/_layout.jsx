import { Tabs } from "expo-router";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, Text } from "react-native";
export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="appointment"
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="calendar"
              size={26}
              color={focused ? "#ed7c44" : "#b0b0b0"} // Cam khi hoạt động, xám khi không
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 9,
                color: focused ? "#ed7c44" : "#b0b0b0",
                fontWeight: 700,
              }}
            >
              Lịch hẹn
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={26}
              color={focused ? "#ed7c44" : "#b0b0b0"} // Cam khi hoạt động, xám khi không
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 9,
                color: focused ? "#ed7c44" : "#b0b0b0",
                fontWeight: 700,
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user-circle-o"
              size={26}
              color={focused ? "#ed7c44" : "#b0b0b0"} // Cam khi hoạt động, xám khi không
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 9,
                color: focused ? "#ed7c44" : "#b0b0b0",
                fontWeight: 700,
              }}
            >
              Cá nhân
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
