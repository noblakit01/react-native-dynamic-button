import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import {
  Surface,
  Shape,
  Path
} from 'ReactNativeART';

export const DynamicButtonType = {
	'Play': 'play',
	'Pause': 'pause',
	'Stop': 'stop',
};

export class DynamicButton extends Component {
  
  constructor(props) {
    super(props);
    this.state = {d: this.currentPath()};
	console.log("Test");
  }
  
  currentPath() {
	const width = this.props.style.width;
    const height = this.props.style.height;
    const padding = this.props.padding;
    const type = this.props.type;
    if (type == DynamicButtonType.Play) {
	  return Path()
		.moveTo(width / 3 - padding, padding)
		.lineTo(width - padding, height / 2)
		.lineTo(width / 3 - padding, height - padding)
		.close();
	} else if (type == DynamicButtonType.Pause) {
	  return Path()
		.moveTo(width * 0.35, padding * 2)
		.lineTo(width * 0.35, height - padding * 2)
        .moveTo(width * 0.65, padding * 2)
		.lineTo(width * 0.65, height - padding * 2)
		.close();
	} else if (type == DynamicButtonType.Stop) {
      return Path()
		.moveTo(padding, padding)
		.lineTo(width - padding, padding)
        .lineTo(width - padding, height - padding)
		.lineTo(padding, height - padding)
        .lineTo(padding, padding)
		.close();
    }
  }	
  	
  render() {
    return (
      <TouchableOpacity onPress={this._onPress} >
        <Surface width={this.props.style.width} height={this.props.style.height}>
          <Shape stroke={this.props.strokeColor} strokeWidth={this.props.strokeWidth} d = {this.state.d} />
        </Surface>
      </TouchableOpacity>
    );
  }
  
  
  // Touch 
  _onPress() {
	console.log("_onPress");
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
  type: DynamicButtonType.Play,
};