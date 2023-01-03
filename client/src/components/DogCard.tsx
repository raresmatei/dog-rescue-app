import { FavouriteIcon, NativeBaseProvider } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import axios from 'axios';
import { AuthContext } from '../context/auth';

const LikeButton = ({ dogId }) => {
    const liked = useSharedValue(0);
    const [state, setState] = useContext(AuthContext);

    useEffect(() => {
        getLikedValue();
    }, []);

    const getLikedValue = async () => {
        const request = `http://localhost:8000/savedDogs/${state.user._id}/${dogId}`;
        const isLiked = await axios.get(request);

        if (isLiked.data) {
            liked.value = 1;
        } else {
            liked.value = 0;
        }
    };

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

    const handleOnClickLikeButton = async () => {
        const body = {
            userId: state.user._id,
            dogId: dogId,
        };
        if (liked.value == 0) {
            await axios.post('http://localhost:8000/savedDogs', body);
        }
        if (liked.value == 1) {
            const deleteRequest = `http://localhost:8000/savedDogs/${body.userId}/${body.dogId}`;
            await axios.delete(deleteRequest);
        }
        liked.value = withSpring(liked.value ? 0 : 1);
    };

    return (
        <Pressable style={styles.favoriteIcon} onPress={handleOnClickLikeButton}>
            <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
                <MaterialCommunityIcons name={'heart-outline'} size={32} color={'black'} />
            </Animated.View>

            <Animated.View style={fillStyle}>
                <MaterialCommunityIcons name={'heart'} size={32} color={'red'} />
            </Animated.View>
        </Pressable>
    );
};

const DogCard = ({ navigation, name, image, dogId, breed, gender, age, temper }) => {
    console.log('id: ', dogId);
    console.log('name: ', name);

    const handleOnImagePress = () => {
        if (navigation) {
            navigation.navigate('DogDetailsScreen', {
                id: dogId,
                name: name,
                image: image,
                breed: breed,
                gender: gender,
                age: age,
                temper: temper,
            });
        }
    };

    return (
        <NativeBaseProvider>
            <Card containerStyle={styles.card}>
                <Pressable onPress={handleOnImagePress}>
                    <Card.Image
                        style={{ width: '100%', height: 270, borderTopRightRadius: 6, borderTopLeftRadius: 6 }}
                        source={image}
                    />
                </Pressable>
                <View style={styles.labelView}>
                    <LikeButton dogId={dogId} />
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
        width: 320,
        height: 320,
        padding: 0,
        marginBottom: 30,
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
