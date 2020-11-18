import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import MealsNavigator from './navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';

// @refresh reset

// OUTSIDE METHODS
enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  // STATE ~~~~~~~~~~~~~~~~
  const [fontLoaded, setFontLoaded] = useState(false);

  // COMPONENT METHODS ~~~~~~~~~~~~~~
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  // VIEW ~~~~~~~~~~~~~~~~~
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}

// STYLES ~~~~~~~~~~~~~~~~~
const styles = StyleSheet.create({
  container: {}
});
