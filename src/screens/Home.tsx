import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PlayControls from '../components/PlayControls';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Audio player</Text>
      <Text style={styles.header}>Speed and controls</Text>
      <PlayControls />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#186584',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  voiceChangerText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'grey',
  },
});
