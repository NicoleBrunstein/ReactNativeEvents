import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriasScreen from '../src/categorias'; // Ruta y nombre del componente actualizados

const StackD = createNativeStackNavigator();

export default function StackDNavigator(categoriaNombre) {
  return (
    <StackD.Navigator>
      <StackD.Screen name="categorias" component={CategoriasScreen} />
      {/* Añade otras pantallas si es necesario */}
    </StackD.Navigator>
  );
}