import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/Home'
const App = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
