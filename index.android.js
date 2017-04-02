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
import {
  DynamicButton
} from './DynamicButton'

export default class Example extends Component {
  render() {
    const d = Path().moveTo(80, 20).lineTo(280, 150).lineTo(80, 280).close();
    return (
      <View style={styles.container}>
        <DynamicButton width="300" height="300">
        </DynamicButton>
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

AppRegistry.registerComponent('Example', () => Example);
