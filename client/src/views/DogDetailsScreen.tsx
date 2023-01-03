import axios from 'axios';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import DogCard from '../components/DogCard';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { decode as atob, encode as btoa } from 'base-64';
import { AuthContext } from '../context/auth';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import DogDetailsCard from '../components/DogDetailsCard';

const DogDetailsScreen = ({ navigation, route }): ReactElement => {
    const [savedDogs, setSavedDogs] = useState([]);
    const [state, setState] = useContext(AuthContext);
    const [dogs, setDogs] = useState([]);
    const isFocused = useIsFocused();

    const id = route.params.id;
    const name = route.params.name;
    const image = route.params.image;
    const breed = route.params.breed;
    const gender = route.params.gender;
    const age = route.params.age;
    const temper = route.params.temper;

    // useEffect(() => {
    //     if (isFocused) {
    //         fetchDog();
    //     }
    // }, [isFocused]);

    // const fetchDog = async () => {
    //     try {
    //         const request = `http://localhost:8000/savedDogs/${state.user._id}`;
    //         const result = await axios.get(request);

    //         const promises = result.data.map((el) => {
    //             const request = `http://localhost:8000/dogImage/${el.dogId}`;

    //             return axios.get(request);
    //         });

    //         const savedDogs = await Promise.all(promises);

    //         const mappedToDataDogs = savedDogs.map((el) => el.data);

    //         setSavedDogs(mappedToDataDogs);
    //     } catch (err) {
    //         console.log('err: ', err);
    //     }
    // };

    const _renderHeader = () => {
        return (
            <View style={styles.header}>
                <Header title={route.params.name} />
            </View>
        );
    };

    const _renderDog = () => {
        return <DogCard dogId={id} name={name} image={image} />;
    };

    const _renderDogDetails = () => {
        return <DogDetailsCard name={name} breed={breed} gender={gender} temper={temper} age={age} />;
    };

    const _renderContent = () => {
        return (
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    {_renderDog()}
                    {_renderDogDetails()}
                </View>
            </ScrollView>
        );
    };

    return (
        <View style={styles.view}>
            <View style={{ width: '100%', zIndex: 1000 }}>
                <Navbar navigation={navigation} />
            </View>

            <View>{_renderHeader()}</View>
            {_renderContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingTop: 20,
        width: '100%',
        backgroundColor: '#E5E5E5',
    },
    content: {
        // display: 'flex',
        // flexDirection: 'column',
        // backgroundColor: '#E5E5E5',
        // height: '100%',
        // width: '100%',
    },
    dogsView: {
        // display: 'flex',
        // flexDirection: 'column',
        // height: '100%',
        // width: '100%',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
    },
});

export default DogDetailsScreen;