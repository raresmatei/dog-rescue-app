import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { ReactElement, useState } from 'react';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { NativeBaseProvider, Radio } from 'native-base';
import BasicButton from '../components/Button';
import { JsxElement } from 'typescript';
import axios from 'axios';

const RegisterScreen = () => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('message');
    const [registerFields, setRegisterFields] = useState({
        role: 'user',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        city: '',
        street: '',
        number: '',
    });

    const handleChangeRole = (value) => {
        setRegisterFields({
            ...registerFields,
            role: value,
        });
    };

    const handleChangeName = (value) => {
        setRegisterFields({
            ...registerFields,
            name: value,
        });
    };

    const handleChangeEmail = (value) => {
        setRegisterFields({
            ...registerFields,
            email: value,
        });
    };

    const handleChangePassword = (value) => {
        setRegisterFields({
            ...registerFields,
            password: value,
        });
    };

    const handleChangeConfirmPassword = (value) => {
        setRegisterFields({
            ...registerFields,
            confirmPassword: value,
        });
    };

    const handleChangeCity = (value) => {
        setRegisterFields({
            ...registerFields,
            city: value,
        });
    };

    const handleChangeStreet = (value) => {
        setRegisterFields({
            ...registerFields,
            street: value,
        });
    };

    const handleChangeNumber = (value) => {
        setRegisterFields({
            ...registerFields,
            number: value,
        });
    };

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
                <TextInput onChange={handleChangeEmail} style={styles.input} placeholder="email" type="normal" />
                <TextInput
                    onChange={handleChangePassword}
                    style={styles.input}
                    placeholder="password"
                    type="password"
                />
                <TextInput
                    onChange={handleChangeConfirmPassword}
                    style={styles.input}
                    placeholder="confirm password"
                    type="password"
                />
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
                    value={registerFields.role}
                    style={{ marginBottom: 15 }}
                    onChange={(nextValue) => {
                        handleChangeRole(nextValue);
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
                <TextInput onChange={handleChangeName} style={styles.input} placeholder="full name" type="normal" />
            </View>
        );
    };

    const _renderAdminFields = () => {
        return (
            <View style={{ height: 200 }}>
                <TextInput onChange={handleChangeName} style={styles.input} placeholder="shelter name" type="normal" />
                <TextInput onChange={handleChangeCity} style={styles.input} placeholder="city" type="normal" />
                <TextInput onChange={handleChangeStreet} style={styles.input} placeholder="street" type="normal" />
                <TextInput onChange={handleChangeNumber} style={styles.input} placeholder="number" type="normal" />
            </View>
        );
    };

    const _renderError = (errorMessage) => {
        return <Text style={styles.errorLabel}>{errorMessage}</Text>;
    };

    const onSubmit = async () => {
        if (
            registerFields.name === '' ||
            registerFields.email === '' ||
            registerFields.password === '' ||
            registerFields.confirmPassword === ''
        ) {
            alert('please fill in all fields');
            return;
        }

        if (
            registerFields.role === 'admin' &&
            (registerFields.city === '' || registerFields.street === '' || registerFields.number === '')
        ) {
            alert('please fill in all fields');
            return;
        }

        const resp = await axios.post('http://localhost:8000/api/signup', registerFields);
        console.log(JSON.stringify(resp.data));

        if (resp.data.error) {
            setError(true);
            setErrorMessage(resp.data.error);
        } else {
            setError(false);
            setErrorMessage('');
        }
    };

    return (
        <NativeBaseProvider>
            <SafeAreaView>
                <ScrollView style={styles.view}>
                    {_renderHeader()}
                    {_renderUserTypeSelect()}
                    {registerFields.role === 'user' ? _renderUserFields() : _renderAdminFields()}
                    {_renderEmailPassword()}
                    {error ? _renderError(errorMessage) : <></>}
                    <BasicButton onClick={onSubmit} style={[styles.button, styles.registerButton]} title="REGISTER" />
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
    errorLabel: {
        color: 'red',
        fontSize: 20,
    },
});
