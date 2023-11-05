import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import RootNavigation from './src/route'
function App(): JSX.Element {

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <RootNavigation />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
