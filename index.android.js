import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  Surface,
  Shape,
  Path
} from 'ReactNativeART';
import {
  DynamicButton,
  DynamicButtonType
} from './DynamicButton'

export default class Example extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {buttonType: DynamicButtonType.Play};
  }
  
  render() {
    return (
      <View style={styles.container}>
        <DynamicButton style={{width: 300, height: 300}} type={this.state.buttonType} onPress={this._onPress.bind(this)}>
        </DynamicButton>
      </View>
    );
  };
  
  _onPress() {
    console.log("App ON PRESS");
    let buttonType = this.state.buttonType;
    switch (buttonType) {
      case DynamicButtonType.Play:
        this.setState({
          buttonType: DynamicButtonType.Pause
        })
        break;
      case DynamicButtonType.Pause:
        this.setState({
          buttonType: DynamicButtonType.Stop
        })
        break;
      case DynamicButtonType.Stop:
        this.setState({
          buttonType: DynamicButtonType.Play
        })
        break;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('Example', () => Example);
