import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import RootNavigation from './src/route'
import { Provider } from 'react-redux';
import store from './src/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider>
          <RootNavigation />
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
