import React from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { camelCase } from 'react-native-svg/lib/typescript/xml';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import globalStyles from '../globalStyles/styles';

const HomeScreen = () => {
    const _renderHeader = () => {
        return (
            <View style={styles.header}>
                <Header title="Available dogs" />
            </View>
        );
    };

    return (
        <View style={styles.view}>
            <View style={{ width: '100%', zIndex: 1000 }}>
                <Navbar />
            </View>
            <View style={styles.content}>{_renderHeader()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingTop: 20,
        width: '100%',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#E5E5E5',
        height: '100%',
        width: '100%',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20,
    },
});

export default HomeScreen;
