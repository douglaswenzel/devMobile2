import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FormAPI from './FormAPI';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <FormAPI />
      </PaperProvider>
    </SafeAreaProvider>
  );
}