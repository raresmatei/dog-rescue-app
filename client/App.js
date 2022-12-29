import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import DogCard from './src/components/DogCard';
import HomeScreen from './src/views/HomeScreen';
import LoginScreen from './src/views/LoginScreen';
import RegisterScreen from './src/views/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        // <NavigationContainer>
        //     <Stack.Navigator
        //         initialRouteName="HomeScreen"
        //         screenOptions={{
        //             headerShown: false,
        //         }}
        //     >
        //         <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        //         <Stack.Screen name="LoginScreen" component={LoginScreen} />
        //         <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        //     </Stack.Navigator>
        // </NavigationContainer>
        <DogCard name='cutzu'/>
    );
}
