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
  DynamicButton,
  DynamicButtonType
} from './DynamicButton'

export default class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <DynamicButton style={{width: 300, height: 300}} type={DynamicButtonType.Stop}>
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
