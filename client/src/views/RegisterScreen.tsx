import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { ReactElement, useState } from 'react';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { NativeBaseProvider, Radio } from 'native-base';
import BasicButton from '../components/Button';
import { JsxElement } from 'typescript';

const RegisterScreen = () => {
    const [user, setUser] = React.useState('user');
    const [error, setErrorr] = useState(false);
    const [errorMessage, setErrorMessage] = useState('message');

    const _renderHeader = () => {
        return (
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Header title="ADOPT A DOG" />
                <Text style={{ marginTop: 20, fontSize: 20, marginBottom: 20 }}>Register</Text>
            </View>
        );
    };
    const _renderEmailPassword = (): JSX.Element => {
        return (
            <View style={{ height: 150 }}>
                <TextInput style={styles.input} placeholder="email" type="normal" />
                <TextInput style={styles.input} placeholder="password" type="password" />
                <TextInput style={styles.input} placeholder="confirm password" type="password" />
            </View>
        );
    };

    const _renderUserTypeSelect = (): JSX.Element => {
        return (
            <View style={{ display: 'flex', alignSelf: 'flex-start' }}>
                <Text
                    style={{
                        fontSize: 17,
                        marginBottom: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    Select user type
                </Text>

                <Radio.Group
                    name="myRadioGroup"
                    value={user}
                    style={{ marginBottom: 15 }}
                    onChange={(nextValue) => {
                        setUser(nextValue);
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: 190,
                            height: 'auto',
                        }}
                    >
                        <Radio value="user" my="1">
                            user
                        </Radio>
                        <Radio value="admin" my="1">
                            admin
                        </Radio>
                    </View>
                </Radio.Group>
            </View>
        );
    };

    const _renderUserFields = () => {
        return (
            <View style={{ height: 50 }}>
                <TextInput style={styles.input} placeholder="full name" type="normal" />
            </View>
        );
    };

    const _renderAdminFields = () => {
        return (
            <View style={{ height: 200 }}>
                <TextInput style={styles.input} placeholder="shelter name" type="normal" />
                <TextInput style={styles.input} placeholder="city" type="normal" />
                <TextInput style={styles.input} placeholder="street" type="normal" />
                <TextInput style={styles.input} placeholder="number" type="normal" />
            </View>
        );
    };

    const _renderError = (errorMessage) =>{
        return (
            <Text style={styles.errorLabel}>{errorMessage}</Text>
        )
    }

    return (
        <NativeBaseProvider>
            <SafeAreaView>
                <ScrollView style={styles.view}>
                    {_renderHeader()}
                    {_renderUserTypeSelect()}
                    {user === 'user' ? _renderUserFields() : _renderAdminFields()}
                    {_renderEmailPassword()}
                    {error ? _renderError(errorMessage) : <></>}
                    <BasicButton style={[styles.button, styles.registerButton]} title="REGISTER" />
                </ScrollView>
            </SafeAreaView>
        </NativeBaseProvider>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flex: 1,
        width: 250,
        overflow: 'scroll',
        marginHorizontal: 50,
    },
    button: {
        fontSize: 40,
        marginTop: 25,
    },
    registerButton: {
        backgroundColor: '#01BFA6',
    },
    input: {
        height: 35,
    },
    errorLabel:{
        color: 'red',
        fontSize: 20,
    }
});
