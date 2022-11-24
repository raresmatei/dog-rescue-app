import { extendTheme, Input, NativeBaseProvider } from 'native-base';
import React from 'react';

const TextInput = ({placeholder}) => {
    const theme = extendTheme({
        components: {
            Input: {
                defaultProps: {
                    width: 200,
                    borderRadius: 10,
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
            <Input variant="rounded" placeholder={placeholder} />
        </NativeBaseProvider>
    );
};

export default TextInput;
