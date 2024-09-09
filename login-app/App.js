import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity, Alert } from 'react-native';
import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';




function ScreenA1() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://set-previously-redfish.ngrok-free.app/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const result = await response.json(); // Convierte la respuesta a JSON

      if (response.ok) {
        Alert.alert('Login exitoso');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error en el login', result.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error', 'Hubo un problema con el login');
    }
  };

  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>MACHO'S FOOD</Text>
      <Text style={styles.description}>Bienvenidos a nuestra app</Text>
      
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={username}
        onChangeText={setUsername}
      />
      
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}


function ScreenA2() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>HOLA - ALGO</Text>
      <Text style={styles.description}>
        Primer Stack - Segunda Screen
        {'\n\n'}
        * Botón para navegar a ScreenA1
        {'\n'}
        navigation.navigate('ScreenA1')
        {'\n'}
      </Text>
      <Button title="Ir A ScreenA1" onPress={() => navigation.navigate('ScreenA1')} />
    </View>
  );
}

// Screens del Segundo Stack
function ScreenB1() {
  const navigation = useNavigation();
  return (
    <View style={styles.searchScreen}>
      <Text style={styles.text}>BUSCADOR</Text>
      <Text style={styles.description}>
        Segundo Stack - Primer Screen
        {'\n\n'}
        * Botones para navegar a ScreenB2 y ScreenB2 enviando Parámetros:
        {'\n'}
        navigation.navigate('ScreenB2', {'{itemId: 1}'})
        {'\n\n'}
        * Ejemplo de un botón con un Icono de 'Ionicons'
        {'\n'}
      </Text>
      <Button title="ScreenB2 itemId: 1" onPress={() => navigation.navigate('ScreenB2', { itemId: 1 })} />
      <Button title="ScreenB2 itemId: 2" onPress={() => navigation.navigate('ScreenB2', { itemId: 2 })} />
      <TouchableOpacity onPress={() => alert('Presionaste en el Icono!')}>
        <Ionicons name="search" size={50} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function ScreenB2({ route }) {
  const { itemId } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.searchScreen}>
      <Text style={styles.text}>BUSCADOR - ITEM</Text>
      <Text style={styles.text}>Parametro recibido {itemId}</Text>
      <Text style={styles.description}>
        Segundo Stack - Segunda Screen
        {'\n\n'}
        * No hay botón para navegar (ver la barra):
        {'\n'}
      </Text>
      {/* <Button title="BUSCADOR" onPress={() => navigation.navigate('ScreenB1')} /> */}
    </View>
  );
}

// Screens del Tercer Stack
function ScreenC1() {
  const navigation = useNavigation();
  return (
    <View style={styles.perfilScreen}>
      <Text style={styles.text}>PERFIL</Text>
      <Text style={styles.description}>
        Tercer Stack - Primer Screen
        {'\n\n'}
        * Se modificó la Barra, se centró, se puso un botón! (ver la barra):
        {'\n'}
      </Text>
      <Button title="IR A ScreenC2" onPress={() => navigation.navigate('ScreenC2')} />
    </View>
  );
}

function ScreenC2() {
  const navigation = useNavigation();
  return (
    <View style={styles.perfilScreen}>
      <Text style={styles.text}>PERFIL - EDICIÓN</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button title="IR A ScreenC1" onPress={() => navigation.navigate('ScreenC1')} />
    </View>
  );
}

function ScreenD1() {
  const navigation = useNavigation();
  return (
    <View style={styles.MenuScreen}>
      <Text style={styles.text}>MENU</Text>
      <Text style={styles.description}>
        Cuarto Stack - Primer Screen
        {'\n\n'}
        * Se modificó la Barra, se centró, se puso un botón! (ver la barra):
        {'\n'}
      </Text>
      <Button title="IR A ScreenD2" onPress={() => navigation.navigate('ScreenD2')} />
    </View>
  );
}

function ScreenD2() {
  const navigation = useNavigation();
  return (
    <View style={styles.MenuScreen}>
      <Text style={styles.text}>MENU - EDICIÓN</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button title="IR A ScreenD1" onPress={() => navigation.navigate('ScreenD1')} />
    </View>
  );
}

// Navigators
const StackLogin = createNativeStackNavigator();
const StackA = createNativeStackNavigator();
const StackB = createNativeStackNavigator();
const StackC = createNativeStackNavigator();
const StackD = createNativeStackNavigator();

function StackLoginNavigator(){
  return(
    <StackLogin.Navigator>
      <StackLogin.Screen name="Login" component={LoginScreen} />
    </StackLogin.Navigator>
  )
}

function StackANavigator() {
  return (
    <StackA.Navigator>
      <StackA.Screen name="ScreenA1" component={ScreenA1} />
      <StackA.Screen name="ScreenA2" component={ScreenA2} />
    </StackA.Navigator>
  );
}

function StackBNavigator() {
  return (
    <StackB.Navigator>
      <StackB.Screen name="ScreenB1" component={ScreenB1} />
      <StackB.Screen name="ScreenB2" component={ScreenB2} />
    </StackB.Navigator>
  );
}

function StackCNavigator() {
  return (
    <StackC.Navigator>
      <StackC.Screen 
        name="ScreenC1" 
        component={ScreenC1} 
        options={{ 
          title: 'Otro Titulo',
          headerStyle: { backgroundColor: 'purple' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              onPress={() => alert('Hice Click!!')}
              title="Info"
              color="#00cc00"
            />
          ),
          headerTransparent: true 
        }}
      />
      <StackC.Screen 
        name="ScreenC2" 
        component={ScreenC2} 
        options={{ 
          headerShown: false 
        }}
      />
    </StackC.Navigator>
  );
}

function StackDNavigator() {
  return (
    <StackD.Navigator>
      <StackD.Screen name="ScreenD1" component={ScreenD1} />
      <StackD.Screen name="ScreenD2" component={ScreenD2} />
    </StackD.Navigator>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={StackANavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Buscador"
        component={StackBNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={StackCNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={StackDNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Componente principal App
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

//
// Envolviendo la aplicación en el NavigationContainer
//


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Fondo negro para contrastar el texto blanco
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  description: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
  
  homeScreen: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor:'#ff0000' 
  }, 
  MenuScreen: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor:'yellow' 
  },
  
  searchScreen: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor:'#044a16' 
  },
  perfilScreen: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor:'#0000ff' 
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '90%',
    color: 'white',
  },
});