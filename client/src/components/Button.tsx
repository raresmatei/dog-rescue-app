import React from 'react';
import { Button, NativeBaseProvider } from 'native-base';
import { StyleSheet, Text } from 'react-native';

const BasicButton = ({ title, style }) => {
    const styles = StyleSheet.create({
        button: {
            fontSize: 44,
        },
        text:{
            color: "#FFFFFF",
            fontSize: 18,
            fontWeight:'500'
        }
    });
    return (
        <NativeBaseProvider>
            <Button style={style}>
                <Text style={styles.text}>{title}</Text>
            </Button>
        </NativeBaseProvider>
    );
};

export default BasicButton;
