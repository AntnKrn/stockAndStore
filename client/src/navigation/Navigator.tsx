import IndicatorsScreen from '../screens/Indicators/Indicators';
import TodosScreen from '../screens/Todos/TodosScreen';
import ProductsScreen from '../screens/Products/ProductsScreen';
import AuthorizationScreen from '../screens/Authorization/AuthorizationScreen';
import RegistrationScreen from '../screens/Registration/RegistrationScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator> 
    <Tab.Screen name="Показатели" component={IndicatorsScreen} options={{ headerShown: true }}/>
    <Tab.Screen name="Товары" component={ProductsScreen} options={{ headerShown: true }}/>
    <Tab.Screen name="Задачи" component={TodosScreen} options={{ headerShown: true }}/>
    <Tab.Screen name="Профиль" component={ProfileScreen} options={{ headerShown: true }}/>
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AuthorizationScreen" component={AuthorizationScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
