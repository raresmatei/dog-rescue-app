import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import DogCard from '../components/DogCard';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useIsFocused } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { event } from 'react-native-reanimated';

const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    const [openBreed, setOpenBreed] = useState(false);
    const [openGender, setOpenGender] = useState(false);
    const [openShelterCity, setOpenShelterCity] = useState(false);
    const [openMinAge, setOpenMinAge] = useState(false);
    const [openMaxAge, setOpenMaxAge] = useState(false);

    const [filterValues, setFilterValues] = useState({
        gender: 'male',
        minAge: 0,
        maxAge: 15,
        breed: '',
        shelterCity: '',
    });

    const age = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const _generateSelectItem = (value) => ({ value: value, label: value });

    const _generateSelectFields = (values) => values.map(_generateSelectItem);

    const filterItems = {
        breed: _generateSelectFields(['labrador', 'teckel']),
        minAge: _generateSelectFields(age),
        maxAge: _generateSelectFields(age),
        city: _generateSelectFields(['timisoara', 'arad']),
        gender: _generateSelectFields(['male', 'female']),
    };

    const [breed, setBreed] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [maxAge, setMaxAge] = useState<number>();
    const [minAge, setMinAge] = useState<number>();

    useEffect(() => {
        fetchDogs();
    }, [isFocused]);

    const fetchDogs = async () => {
        try {
            const result = await axios.get('http://localhost:8000/dogs');

            setData(result.data);
        } catch (err) {
            console.log('err: ', err);
        }
    };

    console.log(breed, gender, city, minAge, maxAge);

    const _renderHeader = () => {
        return (
            <View style={styles.header}>
                <Header title="Available dogs" />
            </View>
        );
    };

    const _renderFilter = (filterField, state, setState, open, setOpen, zIndex) => {
        return (
            <View style={{ zIndex: zIndex, marginBottom: 7 }}>
                <Text style={{ fontSize: 17, marginBottom: 5, paddingLeft: 20 }}>Select {filterField}</Text>
                <DropDownPicker
                    style={{
                        width: 300,
                        alignSelf: 'center',
                    }}
                    containerStyle={{
                        width: 320,
                    }}
                    dropDownContainerStyle={{
                        height: 120
                    }}
                    textStyle={{
                        fontSize: 17
                    }}
                    dropDownDirection="BOTTOM"
                    open={open}
                    value={state}
                    items={filterItems[filterField]}
                    setOpen={setOpen}
                    setValue={setState}
                />
            </View>
        );
    };

    const _renderFilters = () => {
        return (
            <View style={{ height: 410, alignSelf: 'center', zIndex: 20000 }}>
                {_renderFilter('breed', breed, setBreed, openBreed, setOpenBreed, 15000)}
                {_renderFilter('gender', gender, setGender, openGender, setOpenGender, 14000)} 
                {_renderFilter('city', city, setCity, openShelterCity, setOpenShelterCity, 13000)}
                {_renderFilter('minAge', minAge, setMinAge, openMinAge, setOpenMinAge, 12000)}
                {_renderFilter('maxAge', maxAge, setMaxAge, openMaxAge, setOpenMaxAge, 11000)} 
            </View>
        );
    };

    const _renderDogs = () => {
        return (
            <View style={styles.dogsView}>
                {data.map((singleData, index) => {
                    const name = singleData.name;
                    const breed = singleData.breed;
                    const gender = singleData.gender;
                    const temper = singleData.temper;
                    const age = singleData.age;
                    const shelterId = singleData.shelterId;
                    const isAdopted = singleData.isAdopted;
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
                            isAdopted={isAdopted}
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
            {/* <View></View> */}
            <ScrollView>
                {_renderFilters()}
                {_renderDogs()}
            </ScrollView>
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
        // height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
});

export default HomeScreen;
