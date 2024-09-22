import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import HomeScreen from './src/screens/home';
import InvoiceScreen from './src/screens/invoiceScreen';
import {PaperProvider} from 'react-native-paper';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
