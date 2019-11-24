/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';


import CodePush from 'react-native-code-push';
import Sound from 'react-native-sound';
import QRCode from 'react-native-qrcode';

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    }
  }

  codePushSync = () => {
    // Navigation.push(this.props.componentId, navigation.views.Bams())
    this.setState({ logs: ['Started at ' + new Date()] });
    CodePush.sync({
      updateDialog: true,
      installMode: CodePush.InstallMode.IMMEDIATE
    }, (status) => {
      for (var key in CodePush.SyncStatus) {
        if (status === CodePush.SyncStatus[key]) {
          this.setState(prevState => ({ logs: [...prevState.logs, key.replace(/_/g, '')] }));
          break;
        }
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', fontSize: 30, justifyContent: 'center' }}>KIta ada perubahan nih di v3</Text>
        <TouchableOpacity style={{ height: 40, width: 250, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue' }} onPress={() => this.codePushSync()}>
          <Text style={{ textAlign: 'center' }}>
            Klik untuk mencoba codepush
          </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 150 }}>
          {JSON.stringify(this.state.logs)}
        </Text>
        <QRCode
          value={'this.state.text'}
          size={200}
          bgColor='purple'
          fgColor='white' />
      </View >
    );
  };
}

export default CodePush(App);
