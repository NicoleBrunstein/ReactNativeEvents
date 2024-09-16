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
  