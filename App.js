import React from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import FlatListApp from './FlatListApp';

const App = () => {
  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <FlatListApp />
      </View>
    </PaperProvider>
  );
};

export default App;
