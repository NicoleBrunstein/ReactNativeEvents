import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, Button, FlatList } from 'react-native';

export default function EventoDetalleScreen({ route }) {
  const { id } = route.params || {};
  const [eventoDetalle, setEventoDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [canSubscribe, setCanSubscribe] = useState(false);
  const [subscribers, setSubscribers] = useState([]); // Nuevo estado para almacenar los suscriptores

  const handleEventoDetalle = async () => {
    setLoading(true);
    try {
      let response;
      let url = id
        ? `https://set-previously-redfish.ngrok-free.app/api/event/${id}`
        : `https://set-previously-redfish.ngrok-free.app/api/event/`;

      response = await fetch(url);
      if (!response.ok) {
        const errorMessage = await response.text();
        Alert.alert('Error al mostrar evento', errorMessage || 'No se puede mostrar el evento');
        return;
      }

      const data = await response.json();
      setEventoDetalle(data);

      const currentDate = new Date();
      const eventStartDate = new Date(data.start_date);
      setCanSubscribe(currentDate < eventStartDate);

      // Si el evento ha pasado, obtiene los suscriptores
      if (currentDate >= eventStartDate) {
        const subscribersResponse = await fetch(`https://set-previously-redfish.ngrok-free.app/api/event/${id}/subscribers`);
        if (!subscribersResponse.ok) {
          const errorMessage = await subscribersResponse.text();
          Alert.alert('Error al cargar suscriptores', errorMessage || 'No se pudo cargar la lista de suscriptores');
          return;
        }
        const subscribersData = await subscribersResponse.json();
        setSubscribers(subscribersData);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error', 'Hubo un problema al cargar los eventos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscriptionToggle = async () => {
    if (!canSubscribe) {
      Alert.alert('Error', 'No puedes suscribirte a un evento cuya fecha ya ha pasado.');
      return;
    }

    if (isSubscribed) {
      Alert.alert('Desuscripción', 'Te has desuscrito del evento.');
    } else {
      // Aquí iría la lógica para suscribirse, como antes
      Alert.alert('Suscripción', 'Te has suscrito al evento.');
    }
    setIsSubscribed(!isSubscribed);
  };

  useEffect(() => {
    handleEventoDetalle();
  }, [id]);

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
        <Text>{eventoDetalle.description}</Text>
        <Text style={{ fontSize: 16 }}>Fecha de inicio: {eventoDetalle.start_date}</Text>
        <Text>Duración en minutos: {eventoDetalle.duration_in_minutes}</Text>
        <Text>{eventoDetalle.full_address}</Text>
        <Text>Capacidad máxima: {eventoDetalle.max_assistance}</Text>
      </View>
      {canSubscribe && (
        <Button title={isSubscribed ? "Desuscribirse" : "Suscribirse"} onPress={handleSubscriptionToggle} />
      )}
      
      {/* Mostrar suscriptores si el evento ya ha pasado */}
      {subscribers.length > 0 && currentDate >= new Date(eventoDetalle.start_date) && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Suscriptores:</Text>
          <FlatList
            data={subscribers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text>{item.name}</Text> // Ajusta según la estructura de tu objeto de suscriptor
            )}
          />
        </View>
      )}
    </View>
  );
}
