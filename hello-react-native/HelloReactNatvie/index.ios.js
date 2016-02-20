import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from 'react-native-button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttons: {
    fontSize: 20,
    color: 'green',
    padding: 20,
  },
});


class HelloReactNatvie extends Component {

  handlePress() {
    console.log('Pressed!');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Button
          style={styles.buttons}
          onPress={this.handlePress}>
          Press Me!
        </Button>
      </View>
    );
  }
}

AppRegistry.registerComponent('HelloReactNatvie', () => HelloReactNatvie);
