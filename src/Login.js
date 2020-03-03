import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { AuthSession, Linking } from 'expo'

export default class Login extends React.Component {
  state = {
    authResult: {},
  };

  handleRedirect = async event => {
      WebBrowser.dismissBrowser()
  }

  handleOAuthLogin = async provider => {
      // gets the app's deep link
      let redirectUrl = await Linking.getInitialURL()
      // this should change depending on where the server is running
      let authUrl = `http://b7aaedbc.ngrok.io/auth/${provider}`
  this.addLinkingListener()
  try {
    let authResult = await WebBrowser.openAuthSessionAsync(`http://b7aaedbc.ngrok.io/auth/${provider}?redirectURL=${redirectUrl}`, redirectUrl)
        await this.setState({ authResult: authResult })
      } catch (err) {
        console.log('ERROR:', err)
      }
  this.removeLinkingListener()
  }

  addLinkingListener = () => {
      Linking.addEventListener('url', this.handleRedirect)
  }

  removeLinkingListener = () => {
      Linking.removeEventListener('url', this.handleRedirect)
  }

  render() {
    console.log(this.props.navigation)
    if (this.state.authResult.type && this.state.authResult.type === 'success') {
      return (
        <View style={styles.container}>
            <Text>{`Hey there, user!`}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Button title="Login with Facebook" onPress={() => this.handleOAuthLogin('facebook')} />
          <Button title="Login with Google" onPress={() => this.handleOAuthLogin('google')} />
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})