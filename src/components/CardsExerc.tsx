import React from 'react'
import { View, Dimensions, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from './icon';
import { useNavigation } from '@react-navigation/native';

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
                    return <TouchableOpacity onPress={() => {
                        if (list.navigateTo) {
                            navigation.navigate("ExerciseVideo", { exerciseName: list.title });
                        }
                    }}>
                        <View key={index} style={{ height: 150, width: 150, borderRadius: 13, backgroundColor: 'grey', marginLeft: 10 }}>
                            <Image
                                source={require('../assets/sample1.png')}
                                style={{
                                    width: 300,
                                    height: 200,
                                    borderRadius: 10,
                                }}
                                resizeMode="cover"
                            />
                            <Text style={{ color: 'white', fontSize: 15, margin: 10 }}>{list.title}</Text>
                        </View>
                    </TouchableOpacity>
                })}
            </ScrollView>
        </View>
    )
}

export default CardsEx