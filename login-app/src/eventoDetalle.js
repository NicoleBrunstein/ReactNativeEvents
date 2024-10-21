import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Button } from 'react-native';

export default function EventoDetalleScreen({ route }) {
  const { id } = route.params || {}; // Extraemos el ID de los parámetros de la ruta
  const [eventoDetalle, setEventoDetalle] = useState(null); // Cambiado a null ya que la API devuelve un solo objeto
  const [loading, setLoading] = useState(true);

  const handleEventoDetalle = async () => {
    setLoading(true); // Inicia el loading
    try {
      let response;
      let url = '';
      // Determina la URL según el ID
      if (id) {
         url = `https://set-previously-redfish.ngrok-free.app/api/event/${id}`;
      } else {
         url = `https://set-previously-redfish.ngrok-free.app/api/event/`;
      }
      console.log('url', url);
      response = await fetch(url);
      // Verifica si la respuesta fue exitosa
      if (!response.ok) {
        const errorMessage = await response.text(); // Captura el texto de la respuesta en caso de error
        Alert.alert('Error al mostrar evento', errorMessage || 'No se puede mostrar el evento');
        return; // Sale de la función si hay un error
      }

      // Intenta convertir la respuesta a JSON
      const data = await response.json();
      setEventoDetalle(data); // Asigna el evento obtenido
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error', 'Hubo un problema al cargar los eventos');
    } finally {
      setLoading(false); // Finaliza el loading
    }
  };

  useEffect(() => {
    handleEventoDetalle(); // Llama a handleEventoDetalle al montar el componente
  }, [id]); // Cambiado a [id] para que se ejecute cuando cambie el ID

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!eventoDetalle) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No se encontraron detalles del evento.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Recargar Evento" onPress={handleEventoDetalle} />
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text style={{ fontSize: 18 }}>{eventoDetalle.name}</Text>
        <Text>{eventoDetalle.full_address}</Text>
        <Text>Capacidad máxima: {eventoDetalle.max_capacity}</Text>
      </View>
    </View>
  );
}
