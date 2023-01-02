import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        token: '',
    });

    useEffect(() => {
        const loadFromAsyncStorage = async () => {
            const data = await AsyncStorage.getItem('auth-rn');

            const parsed = JSON.parse(data);

            setState({ ...state, user: parsed.user, token: parsed.token });
        };

        loadFromAsyncStorage();
    },[]);

    return <AuthContext.Provider value={[state, setState]}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
