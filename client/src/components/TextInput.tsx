import { extendTheme, Input, NativeBaseProvider } from 'native-base';
import React from 'react';

const TextInput = ({ placeholder, type, style }) => {
    const theme = extendTheme({
        components: {
            Input: {
                defaultProps: {
                    borderRadius: 7,
                    borderColor: '#000000',
                    fontSize: 17,
                    backgroundColor: '#F1F1F1',
                    _focus: {
                        borderColor: '#6B62FF',
                    },
                },
            },
        },
    });

    return (
        <NativeBaseProvider theme={theme}>
            <Input autoCorrect={false} autoCapitalize='none' style={style} variant="rounded" type={type} placeholder={placeholder} />
        </NativeBaseProvider>
    );
};

export default TextInput;
