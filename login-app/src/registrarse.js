import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function RegistrarseScreen() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
  
    const handleRegister = async () => {
      if (!firstName || !lastName || !username || !password) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
      }
  
      try {
        const response = await fetch('https://set-previously-redfish.ngrok-free.app/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
          }),
        });
  
        const result = await response.json(); // Convierte la respuesta a JSON
  
        if (response.ok) {
          Alert.alert('Registro exitoso');
          navigation.navigate('Home'); // Navega a la pantalla de inicio o a donde desees
        } else {
          Alert.alert('Error en el registro', result.message || 'No se pudo completar el registro');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        Alert.alert('Error', 'Hubo un problema con el registro');
      }
    };
  
    return (
      <View >
        <Text >MACHO'S FOOD</Text>
        <Text >Regístrate para empezar</Text>
        
        <Text >Nombre</Text>
        <TextInput
          
          placeholder="Introduce tu nombre"
          value={firstName}
          onChangeText={setFirstName}
        />
  
        <Text >Apellido</Text>
        <TextInput
          
          placeholder="Introduce tu apellido"
          value={lastName}
          onChangeText={setLastName}
        />
  
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
        
        <Button title="Registrarse" onPress={handleRegister} />
        <Button title="Volver a Iniciar Sesión" onPress={() => navigation.navigate('ScreenB1')} />
      </View>
    );
  }