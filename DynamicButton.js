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

import Morph from 'art/morph/path';

export const DynamicButtonType = {
	'Play': 'play',
	'Pause': 'pause',
	'Stop': 'stop',
};

export class DynamicButton extends Component {
  
  constructor(props) {
    super(props);
    
    this.previousPath = this.getPath(DynamicButtonType.Play);
    this.nextPath = this.getPath(DynamicButtonType.Pause);
    this.state = {pathAnimation: Morph.Tween(this.previousPath, this.nextPath)};
    console.log("do it do it");
  }

  animate(start) {
    this.animating = requestAnimationFrame((timestamp) => {
      if (!start) {
        start = timestamp;
      }
      const delta = (timestamp - start) / AnimationDurationMs;

      if (delta > 1) {
        this.animating = null;
        this.setState({
          pathAnimation: this.previousPath
        });

        return;
      }

      this.state.pathAnimation.tween(delta);

      this.setState(this.state, () => {
        this.animate(start);
      });
    });
  }
  
  getPath(type) {
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
  	
  render() {
    const width = this.props.style.width;
    const height = this.props.style.height;
    console.log("Render Accc");
    return (
      <TouchableWithoutFeedback onPress={this._onPress} onPressIn={this._onPressIn.bind(this)} onPressOut={this._onPressOut}>
        <View style={{width: width, height: height, backgroundColor: '#FF0000'}}>
          <Surface width={width} height={height}>
          <Shape stroke={this.props.strokeColor} strokeWidth={this.props.strokeWidth} d = {this.state.pathAnimation} />
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