import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#6a6a85',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: height * 0.05,
    }}>

      <Text style={{
        color: 'white',
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
      }}>
        HealthTrack{'\n'}
        <View>
          <Text style={{ color: 'white', fontSize: 15 }}>-By Dr.Babina</Text>
        </View>
      </Text>

      <Image
        source={require('../assets/splashscreen01.png')}
        resizeMode="contain"
        style={{
          width: width * 0.8,
          height: height * 0.3,
        }}
      />

      <View style={{
        alignItems: 'center',
        marginTop: height * 0.05,
      }}>

        <Text style={{
          color: 'white',
          fontSize: 40,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>Track your</Text>

        <Text style={{
          color: 'white',
          fontSize: 40,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>Health Journey</Text>

        <Text style={{
          color: 'white',
          fontSize: 40,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>with ease</Text>

      </View>

      <TouchableOpacity
        style={{
          width: '90%',
          height: height * 0.08,
          borderRadius: 30,
          backgroundColor: '#35355e',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: height * 0.02,
        }}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={{
          fontSize: 24,
          color: 'white',
          fontWeight: 'bold',
        }}>GET STARTED</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SplashScreen;
