import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { NativeBaseProvider, Radio } from 'native-base';
import BasicButton from '../components/Button';

const RegisterScreen = () => {
    const [user, setUser] = React.useState('one');

    return (
        <NativeBaseProvider>
            <View style={styles.view}>
                <Header title="ADOPT A DOG" />
                <Text style={{ marginTop: 20, fontSize: 20, marginBottom: 20 }}>Register</Text>
                <View style={{ height: 300, marginTop: 30, width: 270 }}>
                    <View style={{ justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: 17, marginBottom: 10 }}>Select user type</Text>
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
                                }}
                            >
                                <Radio value="one" my="1">
                                    user
                                </Radio>
                                <Radio value="two" my="1">
                                    admin
                                </Radio>
                            </View>
                        </Radio.Group>
                    </View>
                    <TextInput placeholder="username" type="normal" />
                    <TextInput placeholder="email" type="normal" />
                    <TextInput placeholder="password" type="password" />
                    <TextInput placeholder="confirm password" type="password" />
                </View>
                <BasicButton style={[styles.button, styles.registerButton]} title="REGISTER" />
            </View>
        </NativeBaseProvider>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
    button: {
        width: 250,
        fontSize: 40,
        marginTop: 25,
    },
    registerButton: {
        backgroundColor: '#01BFA6',
    },
});
