import { StyleSheet, Text, View } from 'react-native';
import LandingScreen from './src/views/LandingScreen';
import RegisterScreen from './src/views/RegisterScreen';

export default function App() {
    return (
        <View style={styles.container}>
            <RegisterScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
