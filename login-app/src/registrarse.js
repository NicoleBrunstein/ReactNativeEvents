import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function RegistrarseScreen() {

    const [firstName, setFirstName] = useState('cacho');
    const [lastName, setLastName] = useState('castania');
    const [username, setUsername] = useState('pepe@gmail.com');
    const [password, setPassword] = useState('passwd');
    const navigation = useNavigation();
  
    const handleRegister = async () => {
      if (!firstName || !lastName || !username || !password) {
          Alert.alert('Error', 'Por favor completa todos los campos');
          return;
      }
  
      try {
        const payload = {
              'first_name': firstName,
              'last_name': lastName,
              'username': username,
              'password': password
          };

          console.log('payload', payload);
          
          const response = await fetch('https://set-previously-redfish.ngrok-free.app/api/user/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload)
          });

          const result = await response.json();
          console.log('result', result);
          // Verifica si la respuesta no está vacía
          if (!result.success) {
              const errorMessage = result.message; // Extrae el texto de la respuesta
              Alert.alert('Error en el registro', errorMessage || 'No se pudo completar el registro');
              return;
          } else {
              // navego a la otra pantalla
              Alert.alert('Registro exitoso.. navego');
          }
  
 
          
          //navigation.navigate('Home'); // Navega a la pantalla de inicio
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
          
          placeholder="Introduce tu nomb"
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
        <Button title="Volver a Iniciar Sesión" onPress={() => navigation.navigate('login')} />
      </View>
    );
  }