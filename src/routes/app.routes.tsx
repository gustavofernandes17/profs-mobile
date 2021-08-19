import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';

import Registries from '../pages/Registries';
import Registry from '../pages/Registry'

const Stack = createNativeStackNavigator(); 

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Registries"component={Registries} options={{headerShown:false}}/>
      <Stack.Screen name="Registry" component={Registry} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default AppRoutes;