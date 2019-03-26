// Note: I noticed that you imported Component from the wrong place. That might also be contributing to your issue so I fixed it here.
import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

// Unless you are exporting multiple things from a single file, you should just use this.
// It's more idiomatic than using module.exports = ReactApp;
export default class ReactApp extends Component {
    render() {
        return (
            <View><Text>Hello world</Text></View>
        );
    }
}