// screens/EventosScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Button } from 'react-native';

export default function EventosScreen({ route }) {
  const { categoriaNombre } = route.params || {}; // Extraemos el nombre de categoría de los parámetros de la ruta
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEventos = async () => {
    setLoading(true); // Inicia el loading
    try {
      let response;
      let data;

      // Determina la URL según la categoría
      if (categoriaNombre) {
        response = await fetch(`https://set-previously-redfish.ngrok-free.app/api/event/?category=${categoriaNombre}`);
      } else {
        response = await fetch('https://set-previously-redfish.ngrok-free.app/api/event');
      }

      data = await response.json();

      if (response.ok) {
        setEventos(data); // Asigna la lista de eventos
      } else {
        Alert.alert('Error al cargar eventos', data.message || 'No se pudieron cargar los eventos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error', 'Hubo un problema al cargar los eventos');
    } finally {
      setLoading(false); // Finaliza el loading
    }
  };

  useEffect(() => {
    handleEventos(); // Llama a handleEventos al montar el componente
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Recargar Eventos" onPress={handleEventos} />
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()} // Asegúrate de que el ID sea un string
        renderItem={({ item }) => (
          <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}
