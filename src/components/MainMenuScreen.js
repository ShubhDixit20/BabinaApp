// components/MainScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('GoalsScreen')}
      >
        <Text style={styles.cardText}>My Goals</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('PainTracker')}
      >
        <Text style={styles.cardText}>Pain Tracker</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('RewardsScreen')}
      >
        <Text style={styles.cardText}>Rewards</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Domain')}
      >
        <Text style={styles.cardText}>My Management</Text>
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
