import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './src/route'
function App(): JSX.Element {

  return (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  );
}

export default App;
