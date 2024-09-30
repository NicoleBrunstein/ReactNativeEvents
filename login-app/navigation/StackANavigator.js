import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../src/login'; // Ruta y nombre del componente actualizados

const StackA = createNativeStackNavigator();

export default function StackANavigator() {
  return (
    <StackA.Navigator>
      <StackA.Screen name="login" component={LoginScreen} />
      {/* Añade otras pantallas si es necesario */}
    </StackA.Navigator>
  );
}