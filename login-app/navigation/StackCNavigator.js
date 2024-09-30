import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EventosScreen from '../src/eventos'; // Ruta y nombre del componente actualizados

const StackC = createNativeStackNavigator();

export default function StackCNavigator() {
  return (
    <StackC.Navigator>
      <StackC.Screen name="eventos" component={EventosScreen} />
      {/* Añade otras pantallas si es necesario */}
    </StackC.Navigator>
  );
}

