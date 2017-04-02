import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Surface,
  Shape,
  Path
} from 'ReactNativeART';

export class DynamicButton extends Component {
  render() {
    const d = Path().moveTo(80, 20).lineTo(280, 150).lineTo(80, 280).close();
    return (
      <View>
        <Surface width="300" height="300">
          <Shape stroke="#ff0000" strokeWidth="8" strokeJoin="round" strokeCap="round" d = {d} />
        </Surface>
      </View>
    );
  }
}