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
    
    this.state = {padding: this.props.padding};
    console.log("Start 1");
  }
  
  componentWillMount() {
    console.log("componentWillMount");
    this.paddingAnim = new Animated.Value(this.props.padding);
    this.paddingAnim.addListener(({value}) => {
      this.setState({padding: value});
      console.log("Update scale " + this.state.padding);
    });
  }
  
  currentPath() {
	const width = this.props.style.width;
    const height = this.props.style.height;
    const padding = this.state.padding;
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
  padding: PropTypes.number,
  paddingHightlight: PropTypes.number,
  type: PropTypes.oneOf([DynamicButtonType.Play, DynamicButtonType.Pause, DynamicButtonType.Stop]),
};

DynamicButton.defaultProps = {
  strokeColor: '#9FABFF',
  strokeWidth: 8,
  padding: 40,
  paddingHightlight: 20,
  type: DynamicButtonType.Play,
};