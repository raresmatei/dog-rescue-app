import { FavouriteIcon, NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import doggy from '../../assets/dog.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const LikeButton = () => {
    const liked = useSharedValue(0);

    const outlineStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
                },
            ],
        };
    });

    const fillStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: liked.value,
                },
            ],
        };
    });

    return (
        <Pressable style={styles.favoriteIcon} onPress={() => (liked.value = withSpring(liked.value ? 0 : 1))}>
            <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
                <MaterialCommunityIcons name={'heart-outline'} size={32} color={'black'} />
            </Animated.View>

            <Animated.View style={fillStyle}>
                <MaterialCommunityIcons name={'heart'} size={32} color={'red'} />
            </Animated.View>
        </Pressable>
    );
};

const DogCard = ({name}) => {
    // const [liked, setLiked] = useState(false);

    

    return (
        <NativeBaseProvider>
            <Card containerStyle={styles.card}>
                <Card.Image style={{ width: '100%', height: 200, borderTopRightRadius: 6, borderTopLeftRadius: 6 }} source={doggy} />
                <View style={styles.labelView}>
                    <LikeButton/>
                    <Text style={{ fontSize: 18 }}>{name}</Text>
                </View>
            </Card>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1.5,
        borderColor: '#000',
        borderRadius: 6,
        width: 300,
        height: 250,
        padding: 0,
    },
    labelView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15,
        paddingLeft: 10,
        paddingTop: 15,
    },
    favoriteIcon: {
        position: 'relative',
        top: -3,
        // width: 40
    },
});

export default DogCard;
