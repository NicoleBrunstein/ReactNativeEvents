import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

 // Ruta y nombre del componente actualizados
import EventosScreen from '../src/eventos'
import EventoDetalleScreen from '../src/eventoDetalle';
const StackE = createNativeStackNavigator();
const StackD = createNativeStackNavigator();
export default function StackENavigator(id) {
  return (
    <StackE.Navigator>
      <StackE.Screen name="eventoDetalle" component={EventoDetalleScreen} />
      <StackD.Screen name="eventos" component={EventosScreen(id)} />
    </StackE.Navigator>
  );
}