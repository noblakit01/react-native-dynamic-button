import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated
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
    
    this.scale = 1.0;
    
    this.state = {scale: 1.0};
    this.scaleAnim = new Animated.Value(1);
    this.scaleAnim.addListener(({value}) => {
      this.setState({scale: value});
      console.log("Update scale " + this.state.scale);
    });
  }
  
  currentPath() {
	const width = this.props.style.width * this.state.scale;
    const height = this.props.style.height * this.state.scale;
    const padding = this.props.padding;
    const type = this.props.type;
    if (type == DynamicButtonType.Play) {
	  return Path()
		.moveTo(padding, padding)
		.lineTo(width - padding, height / 2)
		.lineTo(padding, height - padding)
		.close();
	} else if (type == DynamicButtonType.Pause) {
	  return Path()
		.moveTo(width * 0.35, padding)
		.lineTo(width * 0.35, height - padding)
        .moveTo(width * 0.65, padding)
		.lineTo(width * 0.65, height - padding)
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
    const width = this.props.style.width * this.state.scale;
    const height = this.props.style.height * this.state.scale;
    const d = this.currentPath();
    console.log("render");
    return (
      <TouchableWithoutFeedback onPress={this._onPress} onPressIn={this._onPressIn(this)} onPressOut={this._onPressOut}>
        <View style={{width: width, height: height, backgroundColor: '#FF0000'}}>
          <Surface width={width} height={height}>
          <Shape stroke={this.props.strokeColor} strokeWidth={this.props.strokeWidth} d = {d} />
        </Surface>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
  
  // Touch 
  _onPress() {
	console.log("_onPress");
  }
  
  _onPressIn() {
    console.log("_onPressIn");
    
    Animated.timing(
      this.scaleAnim,
      {
        toValue: 1.2,
      }
    ).start();
  }
  
  _onPressOut() {
    console.log("_onPressOut");
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