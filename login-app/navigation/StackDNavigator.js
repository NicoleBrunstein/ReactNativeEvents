import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriasScreen from '../src/categorias'; // Ruta y nombre del componente actualizados
import EventosScreen from '../src/eventos'
import EventoDetalleScreen from '../src/eventoDetalle';
const StackD = createNativeStackNavigator();
const StackE = createNativeStackNavigator();
export default function StackDNavigator(categoriaNombre) {
  return (
    <StackD.Navigator>
      <StackD.Screen name="categorias" component={CategoriasScreen} />
      <StackDC.Screen name="eventos" component={EventosScreen(categoriaNombre)} />
      <StackE.Screen name="eventoDetalle" component={EventoDetalleScreen(id)} />
    </StackD.Navigator>
  );
}