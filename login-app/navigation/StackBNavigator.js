import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa tu componente ScreenB1
import ScreenB1 from '../scr/ScreenB1'; // Ajusta la ruta según tu estructura de carpetas

const StackB = createNativeStackNavigator();

export default function StackBNavigator() {
  return (
    <StackB.Navigator>
      <StackB.Screen name="ScreenB1" component={ScreenB1} />
      {/* ... otras pantallas */}
    </StackB.Navigator>
  );
}