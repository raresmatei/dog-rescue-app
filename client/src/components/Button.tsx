import React from 'react';
import { Button, NativeBaseProvider } from 'native-base';

const BasicButton = () => {
    return (
        <NativeBaseProvider>
            <Button>TEXT</Button>
        </NativeBaseProvider>
    );
};

export default BasicButton;
