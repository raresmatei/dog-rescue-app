import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import BasicButton from '../components/Button';
import axios from 'axios';
import { AuthContext } from '../context/auth';
import Navbar from '../components/Navbar';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useIsFocused } from '@react-navigation/native';

const UploadDog = ({ navigation }) => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputFields, setInputFields] = useState({
        name: '',
        breed: '',
        age: '',
        temper: '',
        gender: '',
        image: null,
    });
    const [state, setState] = useContext(AuthContext);
    const isFocused = useIsFocused();

    useEffect(()=>{
        console.log('here');
        if(isFocused){
            setInputFields({
                name: '',
                breed: '',
                age: '',
                temper: '',
                gender: '',
                image: null,
            });
            setErrorMessage('');
            setError(false);
        }
    }, [isFocused])

    const handleChangeName = (value) => {
        setInputFields({
            ...inputFields,
            name: value,
        });
    };

    const handleChangeBreed = (value) => {
        setInputFields({
            ...inputFields,
            breed: value,
        });
    };

    const handleChangeAge = (value) => {
        setInputFields({
            ...inputFields,
            age: value,
        });
    };

    const handleChangeTemper = (value) => {
        setInputFields({
            ...inputFields,
            temper: value,
        });
    };

    const handleChangeGender = (value) => {
        setInputFields({
            ...inputFields,
            gender: value,
        });
    };

    const handleChangePhoto = (value) => {
        setInputFields({
            ...inputFields,
            image: value,
        });
    };

    const _renderHeader = () => {
        return (
            <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
                <Header title="ADD A DOG" />
            </View>
        );
    };

    const _renderFields = (): JSX.Element => {
        return (
            <View style={{ width: 300, height: 280 }}>
                <TextInput onChange={handleChangeName} style={styles.input} value={inputFields.name} placeholder="name" type="normal" />
                <TextInput onChange={handleChangeBreed} style={styles.input} value={inputFields.breed} placeholder="breed" type="normal" />
                <TextInput onChange={handleChangeAge} style={styles.input} placeholder="age" type="normal" value={inputFields.age}/>
                <TextInput onChange={handleChangeTemper} style={styles.input} placeholder="temper" type="normal" value={inputFields.temper}/>
                <TextInput onChange={handleChangeGender} style={styles.input} placeholder="gender" type="normal" value={inputFields.gender}/>
                {/* <Input /> */}
            </View>
        );
    };

    const _renderError = (errorMessage) => {
        return <Text style={styles.errorLabel}>{errorMessage}</Text>;
    };

    const onSubmit = async () => {
        if (
            inputFields.name === '' ||
            inputFields.breed === '' ||
            inputFields.age === '' ||
            inputFields.temper === '' ||
            inputFields.gender === ''
        ) {
            alert('please fill in all fields');
            return;
        }

        if (inputFields.image === null) {
            alert('please choose a photo');
            return;
        }

        const requestPayload = {
            ...inputFields,
            shelterId: state.user._id,
        };

        const resp = await axios.post('http://localhost:8000/dogs', requestPayload);

        if (resp.data.error) {
            alert(resp.data.error);
        } else {
            alert('uploaded successfully');
            navigation.navigate('HomeScreen');
        }
    };

    const onLoginClickHandle = () => {
        navigation.navigate('LoginScreen');
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        // const compressed = await _compressImage(result.assets[0]);

        // console.log('compressed: ', compressed.base64.length);

        if (!result.canceled) {
            handleChangePhoto(result.assets[0].base64);
        }
    };

    const _compressImage = async (image) => {
        const manipResult = await manipulateAsync(
            image.localUri || image.uri,
            [{ rotate: 0 }],
            { compress: 0.25, format: SaveFormat.PNG, base64: true }
        );

        return manipResult;
        //   setImage(manipResult);
    };

    const _renderButtons = () => {
        return (
            <View style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', marginBottom: 50 }}>
                <BasicButton
                    onClick={pickImage}
                    style={[styles.button, styles.registerButton]}
                    title="choose a photo"
                />
                {inputFields.image && (
                    <Image
                        source={{ uri: 'data:image/jpeg;base64,' + inputFields.image }}
                        style={{ width: 300, height: 300, marginTop: 10 }}
                    />
                )}
                <BasicButton onClick={onSubmit} style={[styles.button, styles.loginButton]} title="UPLOAD" />
                {error && _renderError(errorMessage)}
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
                {_renderFields()}
                {_renderButtons()}
            </ScrollView>
        </View>
    );
};

export default UploadDog;

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingTop: 20,
        width: '100%',
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
    },
    button: {
        fontSize: 40,
        marginTop: 25,
        width: 300,
    },
    registerButton: {
        backgroundColor: '#01BFA6',
    },
    input: {
        height: 35,
        width: 300,
    },
    errorLabel: {
        color: 'red',
        fontSize: 20,
    },
    loginButton: {
        backgroundColor: '#6B62FF',
    },
    choosePhotoLabel: {
        marginBottom: 15,
        marginTop: 10,
        fontSize: 17,
        // width: 300,
    },
});
