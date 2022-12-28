import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import icon from '../../assets/doggy.png';
import BasicButton from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';

const LandingScreen = () => {
    return (
        <View style={styles.view}>
            <Header title='ADOPT A DOG'/>
            <Image style={styles.image} source={icon} />
            <View style={styles.inputView}>
                <TextInput style={{}} type="normal" placeholder="username" />
                <TextInput style={{}} type="password" placeholder="password" />
            </View>
            <View style={styles.buttonsView}>
                <BasicButton style={[styles.button, styles.loginButton]} title="LOGIN" />
                <Text style={styles.registerLabel}>Register if you don’t have an account</Text>
                <BasicButton style={[styles.button, styles.registerButton]} title="REGISTER" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    nativeButton: {
        width: 200,
        marginTop: 20,
        backgroundColor: '#01BFA6',
        fontSize: 14,
    },
    view: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    inputView: {
        marginTop: 30,
        height: 100,
    },
    buttonsView: {
        marginTop: 30,
        height: 160,
        alignContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginBottom: 10,
        fontSize: 24,
        alignContent: 'center',
    },
    image: {
        height: 200,
        width: 250,
        marginBotton: 20,
    },
    button: {
        width: 250,
        fontSize: 40,
    },
    loginButton: {
        backgroundColor: '#6B62FF',
    },
    registerButton: {
        backgroundColor: '#01BFA6',
    },
    registerLabel: {
        marginBottom: 15,
        marginTop: 20,
        fontSize: 17,
    },
});

export default LandingScreen;
