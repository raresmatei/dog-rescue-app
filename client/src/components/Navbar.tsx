import { Box, HamburgerIcon, Menu, NativeBaseProvider } from 'native-base';
import React, { useContext } from 'react';
import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import { RollInLeft } from 'react-native-reanimated';
import userIcon from '../../assets/icons8-user-50.png';
import { AuthContext } from '../context/auth';

const Navbar = ({ navigation }) => {
    const [state, setState] = useContext(AuthContext);

    const isAdmin = () => state.user.role === 'admin';

    const onHomelick = () => {
        navigation.navigate('HomeScreen');
    };

    const _renderMenu = () => {
        return (
            <Menu
                w="190"
                style={{
                    backgroundColor: '#6B62FF',
                    marginTop: -25,
                    marginLeft: -22,
                    // height: 200
                }}
                trigger={(triggerProps) => {
                    return (
                        <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                            <HamburgerIcon style={{ color: '#ffffff', width: 45, height: 50 }} />
                        </Pressable>
                    );
                }}
            >
                <Menu.Item onPress={onHomelick}>
                    <Text style={styles.menuItem}>home</Text>
                </Menu.Item>
            </Menu>
        );
    };

    const onSavedDogsClick = () => {
        navigation.navigate('SavedDogsScreen');
    };

    const onAdoptedDogsClick = () => {
        navigation.navigate('AdoptedDogsScreen');
    };

    const _renderUser = () => {
        return (
            <Menu
                w="190"
                style={{
                    backgroundColor: '#6B62FF',
                    marginTop: -20,
                    marginRight: 10,
                }}
                trigger={(triggerProps) => {
                    return (
                        <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                            <Image style={{ width: 45, height: 45 }} source={userIcon} />
                        </Pressable>
                    );
                }}
            >
                {!isAdmin() && (
                    <>
                        <Menu.Item onPress={onSavedDogsClick}>
                            <Text style={styles.menuItem}>saved dogs</Text>
                        </Menu.Item>
                        <Menu.Item onPress={onAdoptedDogsClick}>
                            <Text style={styles.menuItem}>my adoptions</Text>
                        </Menu.Item>
                    </>
                )}
                <Menu.Item onPress={() => setState({ ...state, user: null, token: '' })}>
                    <Text style={styles.menuItem}>log out</Text>
                </Menu.Item>
            </Menu>
        );
    };

    return (
        <View style={styles.navbar}>
            <NativeBaseProvider>
                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <View>{_renderMenu()}</View>
                    <View>{_renderUser()}</View>
                </View>
            </NativeBaseProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        zIndex: 1000,
        height: 55,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 15,
        backgroundColor: '#6B62FF',
    },
    menuItem: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '600',
    },
});

export default Navbar;
