import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Animated } from 'react-native';

class FloatingLableInput extends Component {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    this.animatedIsFocusValue = new Animated.Value(0);
  }

  componentDidUpdate() {
    const { isFocused } = this.state;
    Animated.timing(this.animatedIsFocusValue, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
    }).start();
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    const { value } = this.props;
    if (value === '') {
      this.setState({ isFocused: false });
    }
  };

  render() {
    const { label, textColor, ...props } = this.props;
    const { isFocused } = this.state;
    const labelStyle = {
      position: 'absolute',
      top: this.animatedIsFocusValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-5, -20],
      }),
      left: 0,
      fontSize: this.animatedIsFocusValue.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this.animatedIsFocusValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#6C727C', '#4B74FF'],
      }),
      fontWeight: '100',
    };

    return (
      <React.Fragment>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          ref={this.emailInput}
          style={{
            fontSize: 20,
            color: '#8c8c8c',
            height: 26,
            borderBottomWidth: 1,
            borderBottomColor: isFocused
              ? textColor !== undefined
                ? textColor
                : '#4B74FF'
              : '#C6CBD4',
          }}
          autoCapitalize="none"
          {...props}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={this.props.refInner}
        />
      </React.Fragment>
    );
  }
}
export default FloatingLableInput;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
