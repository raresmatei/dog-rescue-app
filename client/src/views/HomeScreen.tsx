import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DogCard from '../components/DogCard';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useIsFocused } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from '../context/auth';

const HomeScreen = ({ navigation }) => {
    const [state, setState] = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const isFocused = useIsFocused();
    const [openBreed, setOpenBreed] = useState(false);
    const [openGender, setOpenGender] = useState(false);
    const [openShelterCity, setOpenShelterCity] = useState(false);
    const [openMinAge, setOpenMinAge] = useState(false);
    const [openMaxAge, setOpenMaxAge] = useState(false);

    const [lastDeletedDog, setLastDeletedDog] = useState('');

    const isAdmin = () => state.user.role === 'admin';

    const age = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const _generateSelectItem = (value) => ({ value: value, label: value });

    const _generateSelectFields = (values) => values.map(_generateSelectItem);

    const filterItems = {
        breed: _generateSelectFields(['labrador', 'teckel', 'german']),
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
        if (isFocused || lastDeletedDog !== '') {
            fetchDogs();
            setBreed('');
            setMinAge(undefined);
            setMaxAge(undefined);
            setGender('');
            setCity('');
        }
    }, [isFocused, lastDeletedDog]);

    const fetchDogs = async () => {
        try {
            const getDogsRequest = !isAdmin()
                ? 'http://localhost:8000/dogs'
                : `http://localhost:8000/shleter/dogs/${state.user._id}`;

            const result = await axios.get(getDogsRequest);

            if (!isAdmin()) {
                const promisesCities = result.data.map(async (item) => await getCity(item.shelterId));

                const cities = await Promise.all(promisesCities);

                const resultWithCities = result.data.map((item, index) => ({
                    ...item,
                    city: cities[index],
                }));

                setData(resultWithCities);
                setDisplayData(resultWithCities);
            } else {
                setData(result.data);
                setDisplayData(result.data);
            }
        } catch (err) {
            console.log('err: ', err);
        }
    };

    const getCity = async (id) => {
        try {
            const result = await axios.get(`http://localhost:8000/api/shelter/${id}`);

            if (result) {
                return result.data.city;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const filterByCity = (array) => {
        if (city !== '') {
            return array.filter((item) => item.city === city);
        }
        return array;
    };

    const filterByBreed = (array) => {
        if (breed !== '') {
            return array.filter((item) => item.breed === breed);
        }
        return array;
    };

    const filterByGender = (array) => {
        if (gender !== '') {
            return array.filter((item) => item.gender === gender);
        }
        return array;
    };

    const filterByMinAge = (array) => {
        if (minAge !== undefined) {
            return array.filter((item) => item.age >= minAge);
        }
        return array;
    };

    const filterByMaxAge = (array) => {
        if (maxAge !== undefined) {
            return array.filter((item) => item.age <= maxAge);
        }
        return array;
    };

    useEffect(() => {
        let filteredData = data;
        filteredData = filterByBreed(filteredData);
        filteredData = filterByCity(filteredData);
        filteredData = filterByGender(filteredData);
        filteredData = filterByMaxAge(filteredData);
        filteredData = filterByMinAge(filteredData);

        setDisplayData(filteredData);
    }, [breed, city, minAge, maxAge, gender, isFocused]);

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
                        height: 120,
                    }}
                    textStyle={{
                        fontSize: 17,
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

    const filtersHeight = isAdmin() ? 340 : 410;
    const _renderFilters = () => {
        return (
            <View style={{ height: filtersHeight, alignSelf: 'center', zIndex: 20000 }}>
                {_renderFilter('breed', breed, setBreed, openBreed, setOpenBreed, 15000)}
                {_renderFilter('gender', gender, setGender, openGender, setOpenGender, 14000)}
                {!isAdmin() && _renderFilter('city', city, setCity, openShelterCity, setOpenShelterCity, 13000)}
                {_renderFilter('minAge', minAge, setMinAge, openMinAge, setOpenMinAge, 12000)}
                {_renderFilter('maxAge', maxAge, setMaxAge, openMaxAge, setOpenMaxAge, 11000)}
            </View>
        );
    };

    const _renderDogs = () => {
        return (
            <View style={styles.dogsView}>
                {displayData.map((singleData, index) => {
                    const name = singleData.name;
                    const breed = singleData.breed;
                    const gender = singleData.gender;
                    const temper = singleData.temper;
                    const age = singleData.age;
                    const shelterId = singleData.shelterId;
                    const isAdopted = singleData.isAdopted;
                    return (
                        <DogCard
                            onDelete={() => {
                                setLastDeletedDog(singleData._id);
                            }}
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
