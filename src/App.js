/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AppIntro from './components/AppIntro';

export default class App extends Component {

  onSkipBtnHandle = () => {
    Alert.alert('Skip');
  }

  doneBtnHandle = () => {
    Alert.alert('Done');
  }

  render() {
    //hide yellow warnings...
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;

    return (
      <View style={Styles.container}>
        <AppIntro
          onDoneBtnClick={this.doneBtnHandle}
          onSkipBtnClick={this.onSkipBtnHandle}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
