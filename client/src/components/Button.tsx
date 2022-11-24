import React from 'react';
import { Button, NativeBaseProvider } from 'native-base';
import { StyleSheet } from 'react-native';

const BasicButton = () => {
    const styles = StyleSheet.create({
        button: {
            width: 200,
        },
    });
    return (
        <NativeBaseProvider>
            <Button style={styles.button}>TEXT</Button>
        </NativeBaseProvider>
    );
};

export default BasicButton;
