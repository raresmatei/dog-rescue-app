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
    
    console.log(isFocused);

    useEffect(() => {
        if (isFocused) {
            fetchDogs();
        }
    }, [isFocused] );

    const fetchDogs = async () => {
        try {
            const request = `http://localhost:8000/savedDogs/${state.user._id}`;
            const result = await axios.get(request);

            const promises = result.data.map(async (el) => {
                const request = `http://localhost:8000/dogImage/${el.dogId}`;

                return await axios.get(request);
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
                    const base64String = btoa(
                        new Uint8Array(singleData.img.data.data).reduce(function (data, byte) {
                            return data + String.fromCharCode(byte);
                        }, '')
                    );
                    const name = singleData.name;
                    return (
                        <DogCard
                            dogId={singleData._id}
                            key={index}
                            name={name}
                            image={{ uri: `data:image/png;base64,${base64String}` }}
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
