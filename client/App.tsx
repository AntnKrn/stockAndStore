import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './src/store/reducers/rootReducer';
import Navigator from './src/navigation/Navigator';
import AppNavigator from './src/navigation/Navigator';
import { LogBox } from 'react-native';


LogBox.ignoreLogs(['Warning: ...']);

const store = createStore(rootReducer, applyMiddleware(thunk));


export default function App() {
LogBox.ignoreAllLogs()
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}