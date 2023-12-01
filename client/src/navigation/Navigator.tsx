import IndicatorsScreen from '../screens/Indicators/Indicators';
import TodosScreen from '../screens/Todos/TodosScreen';
import ProductsScreen from '../screens/Products/ProductsScreen';
import AuthorizationScreen from '../screens/Authorization/AuthorizationScreen';
import RegistrationScreen from '../screens/Registration/RegistrationScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import {headerRightForAddProduct} from './headers/headers'

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddProductScreen from '../screens/AddProduct/AddProductScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator> 
    <Tab.Screen name="Показатели" component={IndicatorsScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Товары" component={ProductsScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Задачи" component={TodosScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Профиль" component={ProfileScreen} options={{ headerShown: false }}/>
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="AuthorizationScreen" component={AuthorizationScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      <Stack.Screen name="AddProductScreen" component={AddProductScreen} options={{headerRight: headerRightForAddProduct}}/>
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
