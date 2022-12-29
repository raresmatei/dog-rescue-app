import React from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Navbar from '../components/Navbar';
import globalStyles from '../globalStyles/styles';
import userIcon from '../../assets/icons8-user-40.png';

const HomeScreen = () => {
    const image = { uri: 'https://reactjs.org/logo-og.png' };

    return (
        <View style={{ ...globalStyles.container, ...styles.view }}>
            <View style={{ width: '100%' }}>
                <Navbar />
            </View>
            <View style={globalStyles.container}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingTop: 20,
    },
});

export default HomeScreen;
