import React from 'react'
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Icon from './icon';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

interface props {
    title: string;
    iconName: string;
}

const Cards = ({ title, iconName }: props) => {
    return (
        <TouchableOpacity>
            <View style={{ flexDirection: 'column', backgroundColor: '#67AE6E', width: width * 0.45, height: height * 0.2, borderRadius: 20 }}>
                <View style={{ flex: 1, justifyContent: 'flex-start', margin: 10, alignItems: 'flex-end' }}>
                    <Icon name={iconName || 'ArrowLeft'} color={"white"} size={40} />
                </View>
                <Text style={{ marginLeft: 10, marginTop: 10, color: 'white', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Cards