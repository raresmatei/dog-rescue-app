import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './src/context/auth';
import HomeScreen from './src/views/HomeScreen';
import LoginScreen from './src/views/LoginScreen';
import RegisterScreen from './src/views/RegisterScreen';
import SavedDogs from './src/views/SavedDogs';
import DogDetailsScreen from './src/views/DogDetailsScreen';

const Stack = createNativeStackNavigator();

const NavaigationScreen = () => {
    const [state, setState] = useContext(AuthContext);

    console.log('context state: ', state);

    const authenticated = state && state.token !== '' && state.user !== null;

    return (
        <Stack.Navigator
            initialRouteName="SavedDogsScreen"
            screenOptions={{
                headerShown: false,
            }}
        >
            {authenticated ? (
                <>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="SavedDogsScreen" component={SavedDogs} />
                    <Stack.Screen name="DogDetailsScreen">{(props) => <DogDetailsScreen {...props} />}</Stack.Screen>
                </>
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
