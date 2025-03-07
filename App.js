import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/components/SplashScreen';
import MainScreen from './src/components/MainMenuScreen';
import Domain from './src/components/Domains';
import Exercises from './src/components/Exercises';

import PainTracker from './src/components/PainTracker';
import GoalsScreen from './src/components/GoalsScreen';
import ExerciseVideo from './src/components/exercise';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#082240'
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20
          }
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="GoalsScreen"
          component={GoalsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="MainMenuScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Domain" component={Domain} options={{ headerShown: false }} />
        <Stack.Screen name="Exercises" component={Exercises} options={{ headerShown: false }} />
        <Stack.Screen name="PainTracker" component={PainTracker} options={{ headerShown: false }} />
        <Stack.Screen name="ExerciseVideo" component={ExerciseVideo} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
