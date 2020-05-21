import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import MealItem from './MealItem';

const MealList = (props) => {

    const renderMealItem = (itemData) => {
        return (
            <MealItem 
                title={itemData.item.title}
                duration = {itemData.item.duration}
                complexity = {itemData.item.complexity}
                affordability = {itemData.item.affordability}
                image = {itemData.item.imageUrl}
                onSelectMeal = {() => {
                    props.navigation.navigate({ 
                        routeName: 'MealDetail', 
                        params: {   
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title
                        } 
                    });
                }}
            />
        );
    }

    return (
        <View style={styles.list}>
            <FlatList 
                data={props.listData} 
                keyExtractor={(item, index) => item.id} // not required in latest version since it automaticallly checks for id field 
                renderItem={renderMealItem}
                style={{width: '100%'}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    }
});

export default MealList;
