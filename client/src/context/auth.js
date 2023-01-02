import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        token: '',
        password: ''
    });

    useEffect(() => {
        const loadFromAsyncStorage = async () => {
            // console.log('load ...');
            const data = await AsyncStorage.getItem('auth-rn');

            // console.log('data from storage: ', data);

            const parsed = JSON.parse(data);

            // console.log('parsed: ', parsed);
            setState({ ...state, user: parsed.user, token: parsed.token });
        };

        loadFromAsyncStorage();
    },[]);

    return <AuthContext.Provider value={[state, setState]}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
