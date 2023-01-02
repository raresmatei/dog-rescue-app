import { NavigationHelpersContext } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import icon from '../../assets/doggy.png';
import BasicButton from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../globalStyles/styles';
import { AuthContext } from '../context/auth';

const LoginScreen = ({ navigation }) => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loginFields, setLoginFields] = useState({
        email: '',
        password: '',
    });
    const [state, setState] = useContext(AuthContext);

    const handleChangeUsername = (value) => {
        setLoginFields({
            ...loginFields,
            email: value,
        });
    };

    const handleChangePassword = (value) => {
        setLoginFields({
            ...loginFields,
            password: value,
        });
    };

    const _renderError = (errorMessage) => {
        return <Text style={styles.errorLabel}>{errorMessage}</Text>;
    };

    const onLoginClickHandle = async () => {
        if (loginFields.email === '' || loginFields.password === '') {
            alert('please fill in all fields');
            return;
        }

        const resp = await axios.post('http://localhost:8000/api/signin', loginFields);
        console.log(JSON.stringify(resp.data));

        if (resp.data.error) {
            setError(true);
            setErrorMessage(resp.data.error);
        } else {
            setError(false);
            setErrorMessage('');
            setState(resp.data);

            await AsyncStorage.setItem("auth-rn", JSON.stringify(resp.data));

            navigation.navigate('HomeScreen');
        }
    };

    const onRegisterClickHandle = () => {
        navigation.navigate('RegisterScreen');
    };

    return (
        <View style={globalStyles.container}>
            <View style={styles.view}>
                <Header title="ADOPT A DOG" />
                <Image style={styles.image} source={icon} />
                <View style={styles.inputView}>
                    <TextInput onChange={handleChangeUsername} style={{}} type="normal" placeholder="email" />
                    <TextInput onChange={handleChangePassword} style={{}} type="password" placeholder="password" />
                </View>
                <View style={styles.buttonsView}>
                    <BasicButton
                        onClick={onLoginClickHandle}
                        style={[styles.button, styles.loginButton]}
                        title="LOGIN"
                    />
                    {error ? _renderError(errorMessage) : <></>}
                    <Text style={styles.registerLabel}>Register if you don’t have an account</Text>
                    <BasicButton
                        onClick={onRegisterClickHandle}
                        style={[styles.button, styles.registerButton]}
                        title="REGISTER"
                    />
                </View>
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
    },
    inputView: {
        marginTop: 30,
        height: 100,
        width: 250,
    },
    buttonsView: {
        marginTop: 30,
        height: 200,
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
    errorLabel: {
        color: 'red',
        fontSize: 20,
    },
});

export default LoginScreen;
