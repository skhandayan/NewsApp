import React from 'react';
import { StyleSheet } from 'react-native';
import MainNavigator from './navigations/MainNavigator';


const App = () => {
  return <MainNavigator/>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
