import React, {useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
    return (
        <View style={styles.listItem} >
            <DefaultText> {props.children} </DefaultText>
        </View>
    );
};

const MealDetailScreen = (props) => {
    const mealId = props.navigation.getParam('mealId');
    const currentMealIsFavorite = useSelector(state => 
        state.meals.favoriteMeals.some(meal => meal.id === mealId)
    );
    const availableMeals = useSelector((state) => state.meals.meals);
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({
            toggleFav: toggleFavoriteHandler
        });
    }, [toggleFavoriteHandler])

    useEffect(() => {
        props.navigation.setParams({
            isFav: currentMealIsFavorite
        });
    }, [currentMealIsFavorite]);

    // useEffect(() => {
    //     props.navigation.setParams({
    //         mealTitle: selectedMeal.title
    //     });     
    // }, [selectedMeal]);

    return(
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
            <View style={styles.details} >
                <DefaultText>{selectedMeal.duration } min</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title} >Ingredients</Text>
            {selectedMeal.ingredients.map((ingredient, i) => (
                <ListItem key={i} > {ingredient} </ListItem>
            ))}
            <Text style={styles.title} >Steps</Text>
            {selectedMeal.steps.map((step, i) => (
                <ListItem key={i} > {step} </ListItem>
            ))}
        </ScrollView>
        
    );
}

MealDetailScreen.navigationOptions = (navigationData) => {
    // const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFav = navigationData.navigation.getParam('isFav');
    // const selectedMeal = MEALS.find(meal => meal.id === mealId);
    return {
        headerTitle: mealTitle,
        headerRight: () =>
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title="Favourite"
                iconName= {isFav ? "ios-star" : "ios-star-outline" }
                onPress={toggleFavorite}
            />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200

    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;