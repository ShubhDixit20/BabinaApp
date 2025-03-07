import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('GoalsScreen');
    }, 3000); // Splash screen duration
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.jpg')} // Add your logo image here
        style={styles.logo}
      />
      <Text style={styles.text}>Welcome to HealthTracker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d3652',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
