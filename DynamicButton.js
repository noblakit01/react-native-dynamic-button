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
    
    this.state = {paddingHightlight: 0};
    console.log("Start 1");
  }
  
  componentWillMount() {
    console.log("componentWillMount");
    this.paddingAnim = new Animated.Value(0);
    this.paddingAnim.addListener(({value}) => {
      this.setState({paddingHightlight: value});
      console.log("Update scale " + this.state.paddingHightlight);
    });
  }
  
  currentPath() {
	const width = this.props.style.width;
    const height = this.props.style.height;
    const paddingHightlight = this.state.paddingHightlight;
    const type = this.props.type;
    if (type == DynamicButtonType.Play) {
	  return Path()
		.moveTo(width * 0.2, height * 0.1)
		.lineTo(width * 0.86, height / 2)
		.lineTo(width * 0.2, height * 0.9)
		.close();
	} else if (type == DynamicButtonType.Pause) {
	  return Path()
		.moveTo(width * 0.33, height * 0.15)
		.lineTo(width * 0.33, height * 0.85)
        .moveTo(width * 0.67, height * 0.15)
		.lineTo(width * 0.67, height * 0.85)
		.close();
	} else if (type == DynamicButtonType.Stop) {
      return Path()
		.moveTo(width * 0.15, height * 0.15)
		.lineTo(width * 0.85, height * 0.15)
        .lineTo(width * 0.85, height * 0.85)
		.lineTo(width * 0.15, height * 0.85)
        .lineTo(width * 0.15, height * 0.15)
		.close();
    }
  }	
  	
  render() {
    const width = this.props.style.width;
    const height = this.props.style.height;
    const d = this.currentPath();
    console.log("render 1");
    return (
      <TouchableWithoutFeedback onPress={this._onPress} onPressIn={this._onPressIn.bind(this)} onPressOut={this._onPressOut}>
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
    console.log("_onPressIn WTF");
    if (this.paddingAnim) {
      console.log("AAAA");
    } else {
      console.log("BBBB");
    }
    Animated.timing(
      this.paddingAnim, 
      {
        toValue: this.props.paddingHightlight,
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
  type: PropTypes.oneOf([DynamicButtonType.Play, DynamicButtonType.Pause, DynamicButtonType.Stop]),
};

DynamicButton.defaultProps = {
  strokeColor: '#9FABFF',
  strokeWidth: 8,
  type: DynamicButtonType.Play,
};