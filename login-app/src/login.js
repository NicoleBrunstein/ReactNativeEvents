// screens/ScreenA1.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from './../styles.js';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://set-previously-redfish.ngrok-free.app/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Login exitoso');
        navigation.navigate('eventos');
      } else {
        Alert.alert('Error en el login', result.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error', 'Hubo un problema con el login');
    }
  };

  return (
    <View >
      <Text >MACHO'S FOOD</Text>
      <Text >Bienvenidos a nuestra app</Text>
      
      <Text >Email</Text>
      <TextInput
        
        placeholder="Introduce tu email"
        keyboardType="email-address"
        value={username}
        onChangeText={setUsername}
      />
      
      <Text >Contraseña</Text>
      <TextInput
        
        placeholder="Introduce tu contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <Button title="Login" onPress={handleLogin} />
      <Button title="Registrarse" onPress={() => navigation.navigate('registrarse')} />
    </View>
  );
}
