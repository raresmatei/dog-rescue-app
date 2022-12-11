import { StyleSheet, Text, View } from 'react-native';
import LandingScreen from './src/views/LandingScreen';

export default function App() {
    return (
        <View style={styles.container}>
            <LandingScreen/>
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
