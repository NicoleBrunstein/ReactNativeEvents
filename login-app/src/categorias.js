import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CategoriasScreen() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleCategorias = async () => {
    setLoading(true); // Inicia el loading
    try {
      const response = await fetch('https://set-previously-redfish.ngrok-free.app/api/event_categories');
      const data = await response.json();

      if (response.ok) {
        setCategorias(data); // Asigna la lista de categorías
      } else {
        Alert.alert('Error al cargar categorías', data.message || 'No se pudieron cargar las categorías');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error', 'Hubo un problema al cargar las categorías');
    } finally {
      setLoading(false); // Finaliza el loading
    }
  };

  useEffect(() => {
    handleCategorias(); // Llama a handleCategorias al montar el componente
  }, []);

  const handleVerEventos = (categoriaNombre) => {
    navigation.navigate('eventos', { categoriaNombre }); // Navega a la pantalla de eventos
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
        <FlatList
            data={categorias}
            keyExtractor={(item) => item.id.toString()} // Asegúrate de que el ID sea un string
            renderItem={({ item }) => (
          <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>{typeof item.name === 'string' ? item.name : 'Nombre no disponible'}</Text>
            <Text>{typeof item.description === 'string' ? item.description : 'Descripción no disponible'}</Text>
            <Button title="Ver Eventos" onPress={() => handleVerEventos(item.name)} />
          </View>
        )}
      />
    </View>
  );
}
