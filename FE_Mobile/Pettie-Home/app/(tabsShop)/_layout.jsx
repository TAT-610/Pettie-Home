import { Tabs } from "expo-router";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from '@expo/vector-icons/AntDesign';
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
        name="order"
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="shopping-cart" size={26} color={focused ? "#ed7c44" : "#b0b0b0"} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 9,
                color: focused ? "#ed7c44" : "#b0b0b0",
                fontWeight: 700,
              }}
            >
              Đơn hàng
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="shopping-bag" size={26} color={focused ? "#ed7c44" : "#b0b0b0"} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 9,
                color: focused ? "#ed7c44" : "#b0b0b0",
                fontWeight: 700,
              }}
            >
              Sản phẩm 
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="homeShop"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="home" size={26} color={focused ? "#ed7c44" : "#b0b0b0"} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 9,
                color: focused ? "#ed7c44" : "#b0b0b0",
                fontWeight: 700,
              }}
            >
              Trang chủ
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign name="message1" size={26} color={focused ? "#ed7c44" : "#b0b0b0"} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 9,
                color: focused ? "#ed7c44" : "#b0b0b0",
                fontWeight: 700,
              }}
            >
              Trò chuyện 
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
