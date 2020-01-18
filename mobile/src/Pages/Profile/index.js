import React from "react";
import { View } from "react-native";
import { WebView } from 'react-native-webview';

export default function Profile({ navigation }) {
  return (
    <View style={{flex: 1}}>
      <WebView source={{ uri: `https://www.github.com/${navigation.getParam('user')}` }} />
    </View>
  );
}
