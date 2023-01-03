import { NativeBaseProvider, View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-elements';

let cardHeight = 232;

const DogDetailsCard = ({ name, breed, gender, age, temper, isShelter, city, street, number }) => {
    // const [cardStyle, setCardStyle] = useState('');



    const _renderDetailLine = (detailName, detailValue) => {
        return (
            <View style={styles.detail}>
                <Text style={styles.text}>{detailName}</Text>
                <Text style={styles.text}>{detailValue}</Text>
            </View>
        );
    };
    return (
        <NativeBaseProvider>
            <Card containerStyle={!isShelter ? styles.card : stylesShelterDetails.card}>
                {!isShelter ? (
                    <>
                        {_renderDetailLine('name', name)}
                        {_renderDetailLine('breed', breed)}
                        {_renderDetailLine('gender', gender)}
                        {_renderDetailLine('age', age)}
                        {_renderDetailLine('temper', temper)}
                    </>
                ) : (
                    <>
                        {_renderDetailLine('city', city)}
                        {_renderDetailLine('street', street)}
                        {_renderDetailLine('number', number)}
                    </>
                )}
            </Card>
        </NativeBaseProvider>
    );
};

console.log(cardHeight);

const styles = StyleSheet.create({
    card: {
        borderWidth: 1.5,
        borderColor: '#000',
        borderRadius: 6,
        width: 320,
        height: cardHeight,
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
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 17,
    },
});

const stylesShelterDetails=StyleSheet.create({
    card:{
        ...styles.card,
        height: 150
    }
})

export default DogDetailsCard;
