import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(tabsShop)" />
      <Stack.Screen name="editprofile" />
      <Stack.Screen name="orderdetail" />

    </Stack>
  );
}
