import React, { Component, PropTypes } from 'react';
import {
  View
} from 'react-native';
import {
  Surface,
  Shape,
  Path
} from 'ReactNativeART';

export DynamicButtonType = {
	'Play': 'play',
	'Pause': 'pause',
	'Stop': 'stop',
};

export class DynamicButton extends Component {
	
  currentPath() {
	const width = this.props.style.width;
    const height = this.props.style.height;
    const padding = this.props.padding;
    const type = this.props.type;
    if (type == DynamicButtonType.Play) {
	  const d = Path()
		.moveTo(width / 3 - padding, padding)
		.lineTo(width - padding, height / 2)
		.lineTo(width / 3 - padding, height - padding)
		.close();
	  return d;
	} else if (type == DynamicButtonType.Pause) {
	  const d = Path()
		.moveTo(width / 3 - padding, padding)
		.lineTo(width - padding, height / 2)
		.lineTo(width / 3 - padding, height - padding)
		.close();
	  return d;
	}	
  }	
  	
  render() {
    return (
      <View>
        <Surface width={width} height={height}>
          <Shape stroke={this.props.strokeColor} strokeWidth={this.props.strokeWidth} d = {this.state.d} />
        </Surface>
      </View>
    );
  }
}

DynamicButton.propTypes = {
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  padding: PropTypes.number,
  type: PropTypes.oneOf([DynamicButtonType.Play, DynamicButtonType.Pause, DynamicButtonType.Stop]),
};

DynamicButton.defaultProps = {
  strokeColor: '#9FABFF',
  strokeWidth: 8,
  padding: 40,
  type: {DynamicButtonType.Play},
};