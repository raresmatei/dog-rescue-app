import { Box, HamburgerIcon, Menu, NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import userIcon from '../../assets/icons8-user-50.png';

const Navbar = () => {

    const _renderMenu = () => {
        return (
            <Box style={{ width: 40, height: 40 }} alignItems="flex-start">
                <Menu
                    w="190"
                    h="90"
                    style={{
                        backgroundColor: '#6B62FF',
                    }}
                    trigger={(triggerProps) => {
                        return (
                            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                <HamburgerIcon style={{ color: '#ffffff', width: 45, height: 50 }} />
                            </Pressable>
                        );
                    }}
                >
                    <Menu.Item>
                        <Text style={styles.menuItem}>filter dogs</Text>
                    </Menu.Item>
                    <Menu.Item>
                        <Text style={styles.menuItem}>filter shelters</Text>
                    </Menu.Item>
                </Menu>
            </Box>
        );
    };

    const _renderUser = () => {
        return (
            <Box style={{ width: 40, height: 40 }} alignItems="flex-start">
                <Menu
                    w="190"
                    h="130"
                    style={{
                        backgroundColor: '#6B62FF',
                    }}
                    trigger={(triggerProps) => {
                        return (
                            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                <Image style={{width: 45, height: 45}} source={userIcon} />
                            </Pressable>
                        );
                    }}
                >
                    <Menu.Item>
                        <Text style={styles.menuItem}>saved dogs</Text>
                    </Menu.Item>
                    <Menu.Item>
                        <Text style={styles.menuItem}>my adoptions</Text>
                    </Menu.Item>
                    <Menu.Item>
                        <Text style={styles.menuItem}>log out</Text>
                    </Menu.Item>
                </Menu>
            </Box>
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
