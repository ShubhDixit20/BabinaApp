import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('PainTrackerNew');
    }, 100); // Splash screen duration
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splashscreen01.png')} // Add your logo image here
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
    backgroundColor: '#efe0e0',
  },
  logo: {
    width: 360,
    height: 360,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
