import { extendTheme, Input, NativeBaseProvider } from 'native-base';
import React from 'react';

interface TextInputProperties {
    placeholder: string;
    type: any;
    style: object;
    onChange?: Function;
}

const TextInput = ({ placeholder, type, style, onChange}: TextInputProperties) => {
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
            <Input
                onChangeText={(value) => onChange(value)}
                autoCorrect={false}
                autoCapitalize="none"
                style={style}
                variant="rounded"
                type={type}
                placeholder={placeholder}
            />
        </NativeBaseProvider>
    );
};

export default TextInput;
