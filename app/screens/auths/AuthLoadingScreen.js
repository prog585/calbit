import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';

export default class AuthLoadingScreen extends Component {
  // Fetch the token from storage then navigate to our appropriate place

  componentDidMount() {
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const { navigation } = this.props;
    const userToken = await AsyncStorage.getItem('userToken');

    navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    let activityIndicatorSize;
    if (Platform.OS === 'ios') {
      activityIndicatorSize = 'large';
    } else {
      activityIndicatorSize = 50;
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator size={activityIndicatorSize} />
        <StatusBar barStyle="dark-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
