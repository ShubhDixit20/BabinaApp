import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { CircleArrowLeft, UserCircle } from 'lucide-react-native';

const PainTracker = () => {
  const [painValue, setPainValue] = useState(0);
  const [dataPoints, setDataPoints] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [chartHeight, setChartHeight] = useState(200);

  const handleLayout = (event) => {
    const { height, y } = event.nativeEvent.layout;
    const windowHeight = Dimensions.get('window').height;
    setChartHeight(windowHeight - (y + height + 20)); // Dynamic height calculation
  };

  const getEmoji = (value) => {
    if (value === 0) return '😃';
    if (value <= 3) return '🙂';
    if (value <= 6) return '😐';
    if (value <= 9) return '😖';
    return '😭';
  };

  const confirmValue = () => {
    const currentTime = new Date().toLocaleTimeString();
    setDataPoints([...dataPoints, painValue]);
    setTimestamps([...timestamps, currentTime]);
    Alert.alert('Pain Value Saved', `You selected: ${painValue}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFDF6' }}>
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginLeft: 15, marginRight: 15 }}>
        <CircleArrowLeft color="black" size={40} />
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent', justifyContent: 'center' }}>
          <Text style={{ color: 'green', fontSize: 20 }}>Pain Tracker</Text>
        </View>
        <UserCircle color="black" size={40} />
      </View>

      <View style={{
        flex: 1, flexDirection: 'column', backgroundColor: '#FFFDF6', borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
      }}>
        <Text style={styles.instructionHeader}>Pain Severity Scale</Text>
        <Text style={styles.instructionText}>
          - <Text style={{ fontWeight: 'bold' }}>0:</Text> No pain{'\n'}
          - <Text style={{ fontWeight: 'bold' }}>1-3:</Text> Mild pain{'\n'}
          - <Text style={{ fontWeight: 'bold' }}>4-6:</Text> Moderate pain{'\n'}
          - <Text style={{ fontWeight: 'bold' }}>7-9:</Text> Severe pain{'\n'}
          - <Text style={{ fontWeight: 'bold' }}>10:</Text> Worst possible pain
        </Text>
      </View>

      <View style={styles.instructionContainer}>
        <Text style={styles.instructionHeader}>दर्द का पैमाना (Aana Scale)</Text>
        <Text style={styles.instructionText}>
          - <Text style={{ fontWeight: 'bold' }}>4 आना:</Text> हल्का दर्द{'\n'}
          - <Text style={{ fontWeight: 'bold' }}>8 आना:</Text> मध्यम दर्द{'\n'}
          - <Text style={{ fontWeight: 'bold' }}>12 आना:</Text> तेज़ दर्द{'\n'}
          - <Text style={{ fontWeight: 'bold' }}>16 आना:</Text> अत्यधिक दर्द{'\n'}
        </Text>
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.sliderWrapper}>
          <Slider
            style={[styles.slider, { position: 'absolute', zIndex: 1 }]} // Slider with higher z-index
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={painValue}
            onValueChange={(value) => setPainValue(value)}
            minimumTrackTintColor="#4BC6B9"
            maximumTrackTintColor="#D3D3D3"
            thumbTintColor="#1D9BF0"
          />
          <Text
            style={[
              styles.emoji,
              {
                left: `${(painValue / 10) * 100}%`,
                transform: [{ translateX: -12 }],
              },
            ]}
          >
            {getEmoji(painValue)}
          </Text>
        </View>
      </View>

      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Pain Level: {painValue}</Text>

      <View style={styles.buttonContainer} onLayout={handleLayout}>
        <Button title="Confirm" onPress={confirmValue} color="#1D9BF0" />
      </View>

      {dataPoints.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartLabel}>Pain Level Over Time</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <LineChart
              data={{
                labels: timestamps,
                datasets: [
                  {
                    data: dataPoints,
                    strokeWidth: 2,
                    color: (opacity = 1) => `rgba(29, 155, 240, ${opacity})`,
                  },
                ],
              }}
              width={Math.max(Dimensions.get('window').width, dataPoints.length * 60)} // Dynamic width
              height={300}
              chartConfig={{
                backgroundColor: '#E3F2F9',
                backgroundGradientFrom: '#E3F2F9',
                backgroundGradientTo: '#4BC6B9',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#4BC6B9',
                },
              }}
              bezier
              style={styles.chart}
              verticalLabelRotation={-50}
            />
          </ScrollView>
        </View>
      )};
    </View >
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1d3652',
  },
  headerContainer: {
    backgroundColor: '#1E293B',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'left',
    marginLeft: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  instructionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  instructionContainer: {
    flex: 1,
    backgroundColor: '#E3F2F9',
    padding: 5,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  instructionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1D9BF0',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
    paddingBottom: 5,
  },
  sliderContainer: {
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
  },
  sliderWrapper: {
    width: '100%',
    height: 50, // Make space for emoji and slider
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: 30,
  },
  emoji: {
    position: 'absolute',
    top: -20, // Position above the slider track
    fontSize: 24,
  },
  valueText: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
  },
  chartContainer: {
    marginTop: 30,
    paddingHorizontal: 10, // Add horizontal padding
  },
  chartLabel: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default PainTracker;
