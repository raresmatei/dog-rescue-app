import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import DogCard from './src/components/DogCard';
import { AuthContext, AuthProvider } from './src/context/auth';
import HomeScreen from './src/views/HomeScreen';
import LoginScreen from './src/views/LoginScreen';
import RegisterScreen from './src/views/RegisterScreen';

const Stack = createNativeStackNavigator();

const NavaigationScreen = () => {
    const [state, setState] = useContext(AuthContext);

    console.log('context state: ', state);

    const authenticated = state && state.token !== '' && state.user !== null;
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
            }}
        >
            {authenticated ? (
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            ) : (
                <>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default NavaigationScreen;
