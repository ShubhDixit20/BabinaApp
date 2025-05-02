import React from 'react'
import { View, Dimensions, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from './icon';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

interface props {
    title: string;
    list: {
        title: string;
        navigateTo: string;
    }[];
}

const CardsEx = ({ title, list }: props) => {

    const navigation = useNavigation();

    return (
        <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'grey', margin: 10 }}>{title}</Text>

            <ScrollView style={{ flex: 0, flexDirection: 'row', gap: 8, marginRight: 15 }} horizontal={true}>

                {list?.map((list, index) => {
                    console.log('list is: ', list)
                    return <TouchableOpacity key={index} onPress={() => {
                        if (list.navigateTo) {
                            navigation.navigate("ExerciseVideo", { exerciseName: list.title, subItem: list.subItem });
                        }
                    }}>
                        <View key={index} style={{
                            height: 150, width: 150, borderRadius: 13, backgroundColor: 'grey', marginLeft: 10,
                            overflow: 'hidden'
                        }}>
                            <LinearGradient
                                colors={["#020024", "#00D4FF",]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    borderRadius: 10,
                                    height: "100%",
                                    width: "100%",
                                    padding: 10,
                                    opacity: 0.83,
                                    borderWidth: 0.5,
                                    borderColor: '#000',
                                    position: 'absolute',
                                    zIndex: 1,

                                }}
                            ></LinearGradient>
                            <Image
                                source={require('../assets/sample1.png')}
                                style={{
                                    width: 200,
                                    height: 200,
                                    borderRadius: 10,
                                }}
                                resizeMode="cover"
                            />
                            <Text style={{ color: 'white', fontSize: 15, margin: 10, position: 'absolute', top: 2, zIndex: 3 }}>{list.title}</Text>
                        </View>
                    </TouchableOpacity>
                })}
            </ScrollView>
        </View>
    )
}

export default CardsEx