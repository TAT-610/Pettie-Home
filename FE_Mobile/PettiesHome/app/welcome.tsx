import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
export default function Welcome() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>Hello</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2986af",
  },
});
