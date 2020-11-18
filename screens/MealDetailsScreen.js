import React, { useEffect, useCallback } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { toggleFavorite } from '../store/actions/meals';
import CustomHeaderButton from '../components/CustomHeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailsScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');
  const availableMeals = useSelector((state) => state.meals.meals);
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
  const isCurrentMealFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );

  const dispatch = useDispatch();
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [selectedMeal, toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: isCurrentMealFavorite });
  }, [isCurrentMealFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => {
        return <ListItem key={ingredient}>{ingredient}</ListItem>;
      })}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => {
        return <ListItem key={step}>{step}</ListItem>;
      })}
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: mealTitle,
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Favorite'
            iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
            onPress={toggleFavorite}
          />
        </HeaderButtons>
      );
    }
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  listItem: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  }
});

export default MealDetailsScreen;
