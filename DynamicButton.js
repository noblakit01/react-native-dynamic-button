import React, { Component, PropTypes } from 'react';
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
    const width = this.props.style.width;
    const height = this.props.style.height;
    const padding = this.props.padding;
    const d = Path()
    .moveTo(width / 3 - padding, padding)
    .lineTo(width - padding, height / 2)
    .lineTo(width / 3 - padding, height - padding)
    .close();
    return (
      <View>
        <Surface width={width} height={height}>
          <Shape stroke={this.props.strokeColor} strokeWidth={this.props.strokeWidth} d = {d} />
        </Surface>
      </View>
    );
  }
}

DynamicButton.propTypes = {
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  padding: PropTypes.number,
};

DynamicButton.defaultProps = {
  strokeColor: '#9FABFF',
  strokeWidth: 8,
  padding: 40,
};