import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebViewComponent from '../components/WebView';

export default function DetailPostScreen({route}) {
    const {link} = route.params
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 1}}>
                <WebViewComponent link={link}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
})