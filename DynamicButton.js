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
    
    this.currentPath = this.getNormalPath(this.props.type);
    this.state = {pathAnimation: Morph.Tween(this.currentPath, this.currentPath)};
    console.log("do it do it");
  }

  easeOutBounce(t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
	}
  }
  
  animate(start) {
    this.animating = requestAnimationFrame((timestamp) => {
      if (!start) {
        start = timestamp;
      }
      let duration = this.props.animationDuration;
      let delta = (timestamp - start) / this.props.animationDuration;
      let delta2 = this.easeOutBounce(timestamp - start, 0, 1, duration);
      console.log("Delta 2 " + delta2);

      if (delta > 1) {
        this.animating = null;
        this.currentPath = this.nextPath;
        this.setState({
          pathAnimation: Morph.Tween(this.currentPath, this.currentPath)
        });

        return;
      }

      this.state.pathAnimation.tween(delta2);

      this.setState(this.state, () => {
        this.animate(start);
      });
    });
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
    console.log("Render Accc");
    return (
      <TouchableWithoutFeedback onPress={this._onPress} onPressIn={this._onPressIn.bind(this)} onPressOut={this._onPressOut.bind(this)}>
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
    console.log("_onPressIn");
    let type = this.props.type;
    
    this.currentPath = this.getNormalPath(type);
    this.nextPath = this.getHighlightPath(type);
    this.state = {pathAnimation: Morph.Tween(this.currentPath, this.nextPath)};
    this.animate();
  }
  
  _onPressOut() {
    console.log("_onPressOut");
    
    let type = this.props.type;
    
    this.currentPath = this.getHighlightPath(type);
    this.nextPath = this.getNormalPath(type);
    this.state = {pathAnimation: Morph.Tween(this.currentPath, this.nextPath)};
    this.animate();
  }
}

DynamicButton.propTypes = {
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  type: PropTypes.oneOf([DynamicButtonType.Play, DynamicButtonType.Pause, DynamicButtonType.Stop]),
  animationDuration: PropTypes.number,
};

DynamicButton.defaultProps = {
  strokeColor: '#9FABFF',
  strokeWidth: 8,
  type: DynamicButtonType.Play,
  animationDuration: 500,
};