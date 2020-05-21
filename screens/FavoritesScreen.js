import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';  

import MealList from '../components/MealList';
import CustomHeaderButton from '../components/HeaderButton';

const FavoritesScreen = (props) => {
    const favMeals = useSelector((state) => state.meals.favoriteMeals);

    return(
        <MealList
            listData={favMeals}
            navigation={props.navigation}
        />
    );
};

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: () => 
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title="Menu"
                iconName='ios-menu' 
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }} 
            />
        </HeaderButtons>
    }
}

export default FavoritesScreen;
