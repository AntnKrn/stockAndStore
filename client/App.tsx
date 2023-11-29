import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import AuthorizationScreen from './src/screens/Authorization/AuthorizationScreen';
import ProductsScreen from './src/screens/Products/ProductsScreen';
import RegistrationScreen from './src/screens/Registration/RegistrationScreen';
import { rootReducer } from './src/store/reducers/rootReducer';

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}