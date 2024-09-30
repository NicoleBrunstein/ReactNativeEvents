import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa tu componente ScreenB1
import registrarse from '../src/registrarse.js'; // Ajusta la ruta según tu estructura de carpetas
import login from '../src/login.js';
const StackB = createNativeStackNavigator();

export default function StackBNavigator() {
  return (
    <StackB.Navigator>
      <StackB.Screen name="registrarse" component={registrarse} />
      {/* ... otras pantallas */}
    </StackB.Navigator>
  );
}