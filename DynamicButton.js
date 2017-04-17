import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native';
import {
  Surface,
  Shape,
  Path
} from 'ReactNativeART';

import Morph from 'art/morph/path';

export const DynamicButtonType = {
	'Play': 'play',
	'Pause': 'pause',
	'Stop': 'stop',
};

export class DynamicButton extends Component {
  
  constructor(props) {
    super(props);
    
    let type = this.props.type;
    this.currentPath = this.getNormalPath(type);
    this.nextPath = this.getHighlightPath(type);
    this.state = {pathAnimation: Morph.Tween(this.currentPath, this.nextPath), currentType: type};
    
    this.tweenAnim = new Animated.Value(0);
    this.tweenAnim.addListener(({value}) => {
      console.log("Update tweenAnim " + value);
      this.state.pathAnimation.tween(value);
      this.setState(this.state);
    });
  }
  
  componentWillReceiveProps(nextProps) {
    
    console.log("componentWillReceiveProps");
    
    let currentType = this.state.currentType;
    let nextType = nextProps.type;
    
    if (currentType != nextType) {
      this.currentPath = this.getNormalPath(currentType);
      this.nextPath = this.getNormalPath(nextType);
      this.state.pathAnimation = Morph.Tween(this.currentPath, this.nextPath);
      console.log("Will Receive New Type " + nextType + " .Old type " + currentType);

      Animated.timing(this.tweenAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.out(Easing.ease)
      }).start();
    }
  }
  
  getNormalPath(type) {
	  const width = this.props.style.width;
    const height = this.props.style.height;
    
    if (type == DynamicButtonType.Play) {
  	  return Morph.Path()
  		.moveTo(width * 0.2, height * 0.1)
  		.lineTo(width * 0.86, height / 2)
  		.lineTo(width * 0.2, height * 0.9)
  		.close();
  	} else if (type == DynamicButtonType.Pause) {
  	  return Morph.Path()
  		.moveTo(width * 0.33, height * 0.15)
  		.lineTo(width * 0.33, height * 0.85)
          .moveTo(width * 0.67, height * 0.15)
  		.lineTo(width * 0.67, height * 0.85)
  		.close();
  	} else if (type == DynamicButtonType.Stop) {
        return Morph.Path()
  		.moveTo(width * 0.15, height * 0.15)
  		.lineTo(width * 0.85, height * 0.15)
          .lineTo(width * 0.85, height * 0.85)
  		.lineTo(width * 0.15, height * 0.85)
          .lineTo(width * 0.15, height * 0.15)
  		.close();
      }
  }	
  
  getHighlightPath(type) {
    const width = this.props.style.width;
    const height = this.props.style.height;
    if (type == DynamicButtonType.Play) {
  	  return Morph.Path()
  		.moveTo(width * 0.15, height * 0.05)
  		.lineTo(width * 0.9, height / 2)
  		.lineTo(width * 0.15, height * 0.95)
  		.close();
  	} else if (type == DynamicButtonType.Pause) {
  	  return Morph.Path()
  		.moveTo(width * 0.33, height * 0.15)
  		.lineTo(width * 0.33, height * 0.85)
          .moveTo(width * 0.67, height * 0.15)
  		.lineTo(width * 0.67, height * 0.85)
  		.close();
  	} else if (type == DynamicButtonType.Stop) {
        return Morph.Path()
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
    console.log("Render Hoho");
    //this.state.pathAnimation.tween(this.state.tween);
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress} onPressIn={this._onPressIn.bind(this)} onPressOut={this._onPressOut.bind(this)}>
        <View style={{width: width, height: height, backgroundColor: '#FF0000'}}>
          <Surface width={width} height={height}>
          <Shape stroke={this.props.strokeColor} strokeWidth={this.props.strokeWidth} d = {this.state.pathAnimation} />
        </Surface>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
  _onPressIn() {
    console.log("_onPressIn");
    
    Animated.spring(this.tweenAnim, {
      toValue: 1,
      friction: 6,
      tension: 1000
    }).start();
  }
  
  _onPressOut() {
    console.log("_onPressOut");
   
   /* Dont delete

    Animated.timing(this.tweenAnim, {
      toValue: 0,
      duration: 100,
      easing: Easing.out(Easing.ease)
    }).start();*/
  }
}

DynamicButton.propTypes = {
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  type: PropTypes.oneOf([DynamicButtonType.Play, DynamicButtonType.Pause, DynamicButtonType.Stop]),
  animationDuration: PropTypes.number,
  onPress: PropTypes.func
};

DynamicButton.defaultProps = {
  strokeColor: '#9FABFF',
  strokeWidth: 8,
  type: DynamicButtonType.Play,
  animationDuration: 500
};