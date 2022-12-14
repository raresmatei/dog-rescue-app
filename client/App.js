import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import Navigation from './Navigation';
import DogCard from './src/components/DogCard';
import { AuthContext, AuthProvider } from './src/context/auth';
import HomeScreen from './src/views/HomeScreen';
import LoginScreen from './src/views/LoginScreen';
import RegisterScreen from './src/views/RegisterScreen';

export default function App() {
    return (
        <AuthProvider>
            <Navigation />
        </AuthProvider>
    );
}
