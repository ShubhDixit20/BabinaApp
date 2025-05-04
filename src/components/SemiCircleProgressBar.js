import React, { useState } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native'; // Use '@react-native-community/slider' if not using Expo
import Svg, { Path, G } from 'react-native-svg';

const InteractiveSemiCircle = ({ size = 200, strokeWidth = 20, color = '#4CAF50', backgroundColor = '#ddd' }) => {
  const [value, setValue] = useState(0); // from 0 to 10
  const progress = (value / 10) * 100;   // convert to percentage for arc drawing

  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    let angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    ].join(' ');
    return d;
  };

  const progressAngle = (progress / 100) * 180;

  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>{value}</Text>
      <Svg width={size} height={size / 2}>
        <G rotation="180" origin={`${center}, ${center}`}>
          {/* Background */}
          <Path
            d={describeArc(center, center, radius, 0, 180)}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress */}
          <Path
            d={describeArc(center, center, radius, 0, progressAngle)}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
          />
        </G>
      </Svg>

      {/* Slider */}
      <Slider
        style={{ width: size, marginTop: 20 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={value}
        onValueChange={(val) => setValue(val)}
        minimumTrackTintColor={color}
        maximumTrackTintColor="#aaa"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  valueText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default InteractiveSemiCircle;
