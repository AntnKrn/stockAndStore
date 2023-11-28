import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import AuthorizationScreen from './src/screens/Authorization/AuthorizationScreen';
import ProductsScreen from './src/screens/Products/ProductsScreen';
import RegistrationScreen from './src/screens/Registration/RegistrationScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
            headerShown: false
          }}
      >

        <Stack.Screen
          name="AuthorizationScreen"
          component={AuthorizationScreen}
          
        />

        <Stack.Screen
          name="ProductsScreen" options={{
            headerLeft: ()=> null, 
            gestureEnabled: true      //false!
          }}
          component={ProductsScreen}
        />

        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
