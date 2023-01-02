import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import NavaigationScreen from './NavaigationScreen';
import DogCard from './src/components/DogCard';
import { AuthContext, AuthProvider } from './src/context/auth';
import HomeScreen from './src/views/HomeScreen';
import LoginScreen from './src/views/LoginScreen';
import RegisterScreen from './src/views/RegisterScreen';

export default function Navigation() {

    return (
        <NavigationContainer>
            <AuthProvider>
                <NavaigationScreen />
            </AuthProvider>
        </NavigationContainer>
    );
}
