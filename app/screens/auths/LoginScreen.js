import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';
import FloatingLableInput from '../../components/FloatingLabelInput';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    validatedEmailStyle: '#C6CBD4',
    validEmail: false,
    isLoading: false,
  };

  handleEmailInput = value => {
    if (value.length > 0) {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(value)) {
        this.setState({
          validatedEmailStyle: '#4B74FF',
          email: value,
          validEmail: true,
        });
      } else {
        this.setState({
          validatedEmailStyle: '#D0021B',
          email: value,
          validEmail: false,
        });
      }
    } else {
      this.setState({
        validatedEmailStyle: '#4B74FF',
        email: value,
        validEmail: false,
      });
    }
  };

  handleSignIn = () => {
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    const { navigation } = this.props;
    if (email !== '' && password !== '') {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ isLoading: false });
          navigation.navigate('App');
        })
        .catch(() => {
          this.setState({ isLoading: false });
          Alert.alert(
            'Login Failed',
            'Wrong Email/Password!',
            [{ text: 'RETRY' }],
            { cancelable: false }
          );
        });
    }
  };

  handlePasswordInput = value => {
    this.setState({ password: value });
  };

  render() {
    const {
      email,
      password,
      validatedEmailStyle,
      isLoading,
      validEmail,
    } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.isWaiting}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : null}
        <View style={{ position: 'absolute', top: 80, left: 24 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
            Login with email
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 160,
            left: 24,
            width: Dimensions.get('window').width - 48,
          }}
        >
          <FloatingLableInput
            label="Email"
            textColor={`${validatedEmailStyle}`}
            autoFocus
            onChangeText={text => this.handleEmailInput(text)}
            value={email}
            returnKeyType="next"
            textContentType="emailAddress"
            keyboardType="email-address"
            blurOnSubmit={false}
            onSubmitEditing={() =>
              this.customInput2.refs.innerTextInput2.focus()
            }
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: 224,
            left: 24,
            width: Dimensions.get('window').width - 48,
          }}
        >
          <FloatingLableInput
            label="Password"
            onChangeText={text => this.handlePasswordInput(text)}
            value={password}
            secureTextEntry
            returnKeyType="done"
            textContentType="password"
            ref={ref => {
              this.customInput2 = ref;
            }}
            refInner="innerTextInput2"
          />
        </View>
        <TouchableOpacity
          onPress={this.handleSignIn}
          disabled={!(validEmail && password !== '')}
          style={{
            position: 'absolute',
            top: 288,
            left: 24,
            width: Dimensions.get('window').width - 48,
            height: 52,
            backgroundColor: '#C6CBD4',
            justifyContent: 'center',
            borderRadius: 4,
            paddingRight: 24,
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: '100', alignSelf: 'center' }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  isWaiting: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
