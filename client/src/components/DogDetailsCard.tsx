import { NativeBaseProvider, View } from 'native-base';
import React  from 'react';
import {  StyleSheet, Text} from 'react-native';
import { Card,} from 'react-native-elements';

const DogDetailsCard = ({name, breed, gender, age, temper}) => {
    const _renderDetailLine = (detailName, detailValue)=>{
        return (
            <View style={styles.detail}>
                <Text style={styles.text}>{detailName}</Text>
                <Text style={styles.text}>{detailValue}</Text>
            </View>
        );
    }
    return (
        <NativeBaseProvider>
            <Card containerStyle={styles.card}>
                {_renderDetailLine('name', name)}
                {_renderDetailLine('breed', breed)}
                {_renderDetailLine('gender', gender)}
                {_renderDetailLine('age', age)}
                {_renderDetailLine('temper', temper)}
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
        height: 232,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 30,
    },
    detail: {
        height: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 7,
        paddingLeft: 7,
        marginTop: 13,
        borderBottomColor: '#000',
        borderBottomWidth: 1
    },
    text:{
        fontSize: 17,
    },
});

export default DogDetailsCard;
