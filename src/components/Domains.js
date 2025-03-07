// components/MainScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Domain({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('PatientEducation')}
      >
        <Text style={styles.cardText}>Patient Education</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Ergonomics')}
      >
        <Text style={styles.cardText}>Ergonomics & Postural Tips</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Exercises')}
      >
        <Text style={styles.cardText}>Exercises</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('PhysicalActivity')}
      >
        <Text style={styles.cardText}>Physical Activity</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('PsychologicalSupport')}
      >
        <Text style={styles.cardText}>Psychological Support</Text>
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