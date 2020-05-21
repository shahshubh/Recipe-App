import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TouchableNativeFeedback, ImageBackground } from 'react-native';

import DefaultText from './DefaultText';

const MealItem = (props) => {
    let TouchableComp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComp = TouchableNativeFeedback;
    }
    return(
        <View style={styles.mealItem}>
            <TouchableComp onPress={props.onSelectMeal} >
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader }}>
                        <ImageBackground source={{uri: props.image}} style={styles.bgImage} >
                            <View style={styles.titleContainer} >
                                <Text style={styles.title} numberOfLines={1} >{props.title}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{...styles.mealRow, ...styles.mealDetail }} >
                        <DefaultText>{props.duration } min</DefaultText>
                        <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                        <DefaultText>{props.affordability.toUpperCase()}</DefaultText> 
                    </View>
                </View>
            </TouchableComp>
        </View>
        
    );
}

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden', // so no child item goes outside of the space
        marginVertical: 10
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },  
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '85%'
    },
    mealDetail: {
        height: '15%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default MealItem;
