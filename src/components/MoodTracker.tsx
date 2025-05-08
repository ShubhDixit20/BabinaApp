import { useNavigation } from '@react-navigation/native';
import { CircleArrowLeft, FileX, UserCircle } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    StyleSheet,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');
const height_main = Dimensions.get('window').height;

const ITEM_WIDTH = 120;
const SPACER_WIDTH = (width - ITEM_WIDTH) / 2;

const painLevels = [
    { level: 0, icon: '😄' },
    { level: 1, icon: '🙂' },
    { level: 2, icon: '😊' },
    { level: 3, icon: '😐' },
    { level: 4, icon: '😕' },
    { level: 5, icon: '😟' },
    { level: 6, icon: '😣' },
    { level: 7, icon: '😫' },
    { level: 8, icon: '😭' },
    { level: 9, icon: '🤕' },
    { level: 10, icon: '🧟' },
];

export default function PainSelector() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

    const [selectedEntries, setSelectedEntries] = useState([]);
    const navigation = useNavigation();

    const painList = [{ empty: true }, ...painLevels, { empty: true }];

    const handleItemPress = (index) => {
        const scrollTo = (index + 1) * ITEM_WIDTH;
        flatListRef.current.scrollToOffset({ offset: scrollTo, animated: true });

        const time = new Date().toLocaleTimeString(); // Current time (HH:MM:SS)
        const level = painLevels[index].level;

        setSelectedEntries((prev) => [...prev, { time, level }]);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                flex: 0, flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'transparent', margin: 15, alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <CircleArrowLeft color="black" size={40} />
                </TouchableOpacity>
                <Text style={{ color: 'green', fontSize: 18, alignSelf: 'center' }}>Pain Tracker</Text>
                <TouchableOpacity>
                    <UserCircle color="black" size={40} />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 0, backgroundColor: 'transparent', alignSelf: 'center', marginVertical: 10 }}>
                <Text style={{ fontSize: 30, color: 'grey', fontWeight: 'bold' }}>How intense is your pain?</Text>
            </View>

            <View style={{ flex: 0, backgroundColor: 'transparent', paddingTop: 5 }}>
                <Animated.FlatList
                    ref={flatListRef}
                    data={painList}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    snapToInterval={ITEM_WIDTH}
                    decelerationRate="fast"
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    contentContainerStyle={{ paddingHorizontal: SPACER_WIDTH }}
                    renderItem={({ item, index }) => {
                        if (item.empty) {
                            return <View style={{ width: ITEM_WIDTH * -5 }} />;
                        }

                        const inputRange = [
                            (index - 2) * ITEM_WIDTH,
                            (index - 1) * ITEM_WIDTH,
                            index * ITEM_WIDTH,
                        ];

                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.7, 1, 0.7],
                            extrapolate: 'clamp',
                        });

                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });

                        return (
                            <TouchableOpacity onPress={() => handleItemPress(index - 1)}>
                                <Animated.View style={[styles.item, { transform: [{ scale }], opacity }]}>
                                    <Text style={styles.icon}>{item.icon}</Text>
                                    <Text style={styles.label}>{item.level}</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>

            <View style={{ flex: 0, flexDirection: 'row', height: '20%', marginBottom: 50, gap: 5, margin: 15 }}>
                <View style={{
                    flex: 1, flexDirection: 'column', backgroundColor: '#DDEB9D', borderBottomEndRadius: 20,
                    borderRadius: 20
                }}>
                    <Text style={{ fontSize: 18, padding: 8, alignSelf: 'center', fontWeight: 'bold', color: 'green' }}>Pain Severity Scale</Text>
                    <Text style={styles.instructionText}>
                        - <Text style={{ fontWeight: 'bold' }}>0:</Text> No pain{'\n'}
                        - <Text style={{ fontWeight: 'bold' }}>1-3:</Text> Mild pain{'\n'}
                        - <Text style={{ fontWeight: 'bold' }}>4-6:</Text> Moderate pain{'\n'}
                        - <Text style={{ fontWeight: 'bold' }}>7-9:</Text> Severe pain{'\n'}
                        - <Text style={{ fontWeight: 'bold' }}>10:</Text> Worst possible pain
                    </Text>
                </View>

                <View style={{
                    flex: 1, flexDirection: 'column', backgroundColor: '#DDEB9D', borderBottomEndRadius: 20,
                    borderRadius: 20
                }}>
                    <Text style={{ fontSize: 18, padding: 8, alignSelf: 'center', fontWeight: 'bold', color: 'green' }}>दर्द का पैमाना</Text>
                    <Text style={{ fontSize: 18, alignSelf: 'center', fontWeight: 'bold', color: 'green' }}>(Aana Scale)</Text>
                    <Text style={{
                        padding: 10,
                        fontSize: 14,
                        color: '#333',
                    }}>
                        - <Text style={{ fontWeight: 'bold' }}>4 आना:</Text> हल्का दर्द{'\n'}
                        - <Text style={{ fontWeight: 'bold' }}>8 आना:</Text> मध्यम दर्द{'\n'}
                        - <Text style={{ fontWeight: 'bold' }}>12 आना:</Text> तेज़ दर्द{'\n'}
                        - <Text style={{ fontWeight: 'bold' }}>16 आना:</Text> अत्यधिक दर्द{'\n'}
                    </Text>
                </View>
            </View>

            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent' }}>
                <Text style={styles.chartTitle}>Pain over Time</Text>
                {selectedEntries.length > 0 ? (
                    <LineChart
                        data={{
                            labels: selectedEntries.map((e) => e.time),
                            datasets: [
                                {
                                    data: selectedEntries.map((e) => e.level),
                                },
                            ],
                        }}
                        width={width - 50}
                        height={270}
                        chartConfig={{
                            backgroundGradientFrom: '',
                            backgroundGradientTo: '#fff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,  // black line and points
                            labelColor: () => '#000',  // black axis labels
                            propsForDots: {
                                r: '4',
                                strokeWidth: '2',
                                stroke: '#00ffcc',
                            },
                            propsForVerticalLabels: {
                                rotation: '-45',
                            },
                        }}
                        formatXLabel={(label) => `${label}\n`}  // This creates space for rotation visually
                        bezier
                        style={{
                            marginVertical: 16,
                            borderRadius: 16,
                        }}
                    />
                ) : (
                    <Text style={styles.noData}>No pain data recorded yet.</Text>
                )}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    question: {
        fontSize: 18,
        color: '#000',
        marginBottom: 20,
    },
    item: {
        width: ITEM_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 100,
    },
    label: {
        fontSize: 14,
        color: '#ccc',
        marginTop: 4,
    },
    chartTitle: {
        marginTop: 20,
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
    },
    noData: {
        color: '#aaa',
        marginTop: 10,
    },
    instructionText: {
        marginTop: 10,
        padding: 10,
        fontSize: 14,
        color: '#333',
    },
});
