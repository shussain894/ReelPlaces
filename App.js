import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import getListing from "./getListing";
// const getListing = require("./getListing");

export default function App() {
    return (
      <View style={styles.container}>
        <Text>ReelPlaces</Text>
        {getListing()}
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
