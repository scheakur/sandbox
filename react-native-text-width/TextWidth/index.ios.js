/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

class TextWidth extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapper1}>
          <Text style={styles.text}>111111111</Text>
        </View>
        <View style={styles.wrapper1}>
          <Text style={styles.text}>111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111</Text>
        </View>
        <View style={styles.wrapper1}>
          <Text style={styles.flexText}>111111111</Text>
        </View>
        <View style={styles.wrapper1}>
          <Text style={styles.flexText}>111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111</Text>
        </View>
        <View style={styles.wrapper2}>
          <View style={styles.spacer}/>
          <Text style={styles.text}>222222222</Text>
          <View style={styles.spacer}/>
          <Text style={styles.text}>222222222 222222222 222222222 222222222 222222222 222222222 222222222 222222222 222222222 222222222</Text>
          <View style={styles.spacer}/>
        </View>
        <View style={styles.wrapper2}>
          <View style={styles.spacer}/>
          <Text style={styles.flexText}>222222222</Text>
          <View style={styles.spacer}/>
          <Text style={styles.flexText}>222222222 222222222 222222222 222222222 222222222 222222222 222222222 222222222 222222222 222222222</Text>
          <View style={styles.spacer}/>
        </View>
        <View style={styles.wrapper3}>
          <View style={styles.spacer}/>
          <Text style={styles.text}>333333333</Text>
          <View style={styles.spacer}/>
          <Text style={styles.text}>333333333 333333333 333333333 333333333 333333333 333333333 333333333 333333333 333333333 333333333</Text>
          <View style={styles.spacer}/>
        </View>
        <View style={styles.wrapper3}>
          <View style={styles.spacer}/>
          <Text style={styles.flexText}>333333333</Text>
          <View style={styles.spacer}/>
          <Text style={styles.flexText}>333333333 333333333 333333333 333333333 333333333 333333333 333333333 333333333 333333333 333333333</Text>
          <View style={styles.spacer}/>
        </View>
        <View style={styles.wrapper3}>
          <Text style={styles.text}>333333333</Text>
        </View>
        <View style={styles.wrapper3}>
          <Text style={styles.flexText}>333333333</Text>
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text}>444444444</Text>
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.flexText}>444444444</Text>
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text}>444444444 444444444 444444444 444444444 444444444 444444444 444444444 444444444 444444444 444444444</Text>
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.flexText}>444444444 444444444 444444444 444444444 444444444 444444444 444444444 444444444 444444444 444444444</Text>
        </View>
        <View style={styles.wrapper5}>
          <Text style={styles.text}>555555555</Text>
        </View>
        <View style={styles.wrapper5}>
          <Text style={styles.flexText}>555555555</Text>
        </View>
        <View style={styles.wrapper5}>
          <Text style={styles.text}>555555555 555555555 555555555 555555555 555555555 555555555 555555555 555555555 555555555 555555555</Text>
        </View>
        <View style={styles.wrapper5}>
          <Text style={styles.flexText}>555555555 555555555 555555555 555555555 555555555 555555555 555555555 555555555 555555555 555555555</Text>
        </View>
        <View style={styles.wrapper6}>
          <Text style={styles.text}>666666666</Text>
        </View>
        <View style={styles.wrapper6}>
          <Text style={styles.flexText}>666666666</Text>
        </View>
        <View style={styles.wrapper6}>
          <Text style={styles.text}>666666666 666666666 666666666 666666666 666666666 666666666 666666666 666666666 666666666 666666666</Text>
        </View>
        <View style={styles.wrapper6}>
          <Text style={styles.flexText}>666666666 666666666 666666666 666666666 666666666 666666666 666666666 666666666 666666666 666666666</Text>
        </View>
        <View style={styles.wrapper7}>
          <Text style={styles.text}>777777777</Text>
        </View>
        <View style={styles.wrapper7}>
          <Text style={styles.flexText}>777777777</Text>
        </View>
        <View style={styles.wrapper7}>
          <Text style={styles.text}>777777777 777777777 777777777 777777777 777777777 777777777 777777777 777777777 777777777 777777777</Text>
        </View>
        <View style={styles.wrapper7}>
          <Text style={styles.flexText}>777777777 777777777 777777777 777777777 777777777 777777777 777777777 777777777 777777777 777777777</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#fff',
    flex: 1,
  },
  spacer: {
    width: 30,
    height: 30,
    backgroundColor: '#999',
  },
  wrapper1: {
    margin: 10,
    backgroundColor: '#ddd',
  },
  wrapper2: {
    margin: 10,
    backgroundColor: '#ddd',
    flexDirection: 'column',
  },
  wrapper3: {
    margin: 10,
    backgroundColor: '#ddd',
    flexDirection: 'row',
  },
  wrapper4: {
    width: 200,
    margin: 10,
    backgroundColor: '#ddd',
    flexDirection: 'row',
  },
  wrapper5: {
    width: 200,
    margin: 10,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wrapper6: {
    width: 200,
    margin: 10,
    backgroundColor: '#ddd',
  },
  wrapper7: {
    width: 200,
    margin: 10,
    backgroundColor: '#ddd',
    alignItems: 'flex-start',
  },
  text: {
    backgroundColor: '#fdd',
  },
  flexText: {
    flex: 1,
    backgroundColor: '#ddf',
    alignSelf: 'flex-start',
  },
});

AppRegistry.registerComponent('TextWidth', () => TextWidth);
