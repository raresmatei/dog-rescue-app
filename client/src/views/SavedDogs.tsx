import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import DogCard from '../components/DogCard';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { decode as atob, encode as btoa } from 'base-64';
import { AuthContext } from '../context/auth';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const [savedDogs, setSavedDogs] = useState([]);
    const [state, setState] = useContext(AuthContext);
    const [dogs, setDogs] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchDogs();
        }
    }, [isFocused]);

    const fetchDogs = async () => {
        try {
            const request = `http://localhost:8000/savedDogs/${state.user._id}`;
            const result = await axios.get(request);

            const promises = result.data.map((el) => {
                const request = `http://localhost:8000/dogImage/${el.dogId}`;

                return axios.get(request);
            });

            const savedDogs = await Promise.all(promises);

            const mappedToDataDogs = savedDogs.map((el) => el.data);

            setSavedDogs(mappedToDataDogs);
        } catch (err) {
            console.log('err: ', err);
        }
    };

    const _renderHeader = () => {
        return (
            <View style={styles.header}>
                <Header title="Saved dogs" />
            </View>
        );
    };

    const _renderDogs = () => {
        return (
            <View style={styles.dogsView}>
                {savedDogs.map((singleData, index) => {
                    const name = singleData.name;
                     const breed = singleData.breed;
                     const gender = singleData.gender;
                     const temper = singleData.temper;
                     const age = singleData.age;
                     const shelterId = singleData.shelterId;
                    return (
                        <DogCard
                            navigation={navigation}
                            dogId={singleData._id}
                            key={index}
                            name={name}
                            image={{ uri: `data:image/png;base64,${singleData.base64StringImage}` }}
                            breed={breed}
                            gender={gender}
                            temper={temper}
                            age={age}
                            shelterId={shelterId}
                        />
                    );
                })}
            </View>
        );
    };

    return (
        <View style={styles.view}>
            <View style={{ width: '100%', zIndex: 1000 }}>
                <Navbar navigation={navigation} />
            </View>

            <View>{_renderHeader()}</View>
            <ScrollView>{_renderDogs()}</ScrollView>
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
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#E5E5E5',
        height: '100%',
        width: '100%',
    },
    dogsView: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
    },
});

export default HomeScreen;
