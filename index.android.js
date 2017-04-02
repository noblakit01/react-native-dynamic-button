/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  Surface,
  Shape,
  Path
} from 'ReactNativeART';

export default class DynamicButton extends Component {
  render() {
    const d = Path().moveTo(80, 20).lineTo(280, 150).lineTo(80, 280).close();
    return (
      <View style={styles.container}>
        <Surface width="300" height="300">
          <Shape stroke="#ff0000" strokeWidth="8" strokeJoin="round" strokeCap="round" d = {d} />
        </Surface>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('DynamicButton', () => DynamicButton);
