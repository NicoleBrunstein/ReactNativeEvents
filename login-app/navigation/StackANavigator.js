import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../src/login'; // Ruta y nombre del componente actualizados
import EventosScreen from '../src/eventos';
import CategoriasScreen from '../src/categorias';
import EventoDetalleScreen from '../src/eventoDetalle';
const StackA = createNativeStackNavigator();
const StackC = createNativeStackNavigator();
const StackD = createNativeStackNavigator();
const StackE = createNativeStackNavigator();
export default function StackANavigator() {
  return (
    <StackA.Navigator>
      <StackA.Screen name="login" component={LoginScreen} />
      <StackC.Screen name="eventos" component={EventosScreen} />
      <StackD.Screen name="categorias" component={CategoriasScreen} />
      <StackE.Screen name="eventoDetalle" component={EventoDetalleScreen} />
    </StackA.Navigator>
  );
}