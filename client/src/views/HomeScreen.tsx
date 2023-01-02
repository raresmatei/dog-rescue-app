import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import DogCard from '../components/DogCard';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { decode as atob, encode as btoa } from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchDogs();
    }, []);

    const fetchDogs = async () => {
        try {
            const result = await axios.get('http://localhost:8000/dogs');

            setData(result.data);
        } catch (err) {
            console.log('err: ', err);
        }
    };

    const _renderHeader = () => {
        return (
            <View style={styles.header}>
                <Header title="Available dogs" />
            </View>
        );
    };

    const _renderDogs = () => {
        return (
            <View style={styles.dogsView}>
                {data.map((singleData, index) => {
                    const base64String = btoa(
                        new Uint8Array(singleData.img.data.data).reduce(function (data, byte) {
                            return data + String.fromCharCode(byte);
                        }, '')
                    );
                    const name = singleData.name;
                    return <DogCard dogId={singleData._id} key={index} name={name} image={{ uri: `data:image/png;base64,${base64String}` }} />;
                })}
            </View>
        );
    };

    return (
        <View style={styles.view}>
            <View style={{ width: '100%', zIndex: 1000 }}>
                <Navbar />
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
