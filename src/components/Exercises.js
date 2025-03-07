// components/MainScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Exercises({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('VideoWithDescription')}
      >
        <Text style={styles.cardText}>1. Loosening</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Diaphragmatic')}
      >
        <Text style={styles.cardText}>2. Diaphragmatic</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('SingleKnee')}
      >
        <Text style={styles.cardText}>3. Single Knee to Chest</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('DoubleKnee')}
      >
        <Text style={styles.cardText}>4. Double knee to chest</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('SpinalRotation')}
      >
        <Text style={styles.cardText}>5. Spinal rotation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  card: {
    backgroundColor: '#fff',
    elevation: 5,
    padding: 20,
    marginVertical: 10,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
});