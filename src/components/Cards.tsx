import React from 'react'
import { View, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from './icon';
import RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;



interface props {
    title: string;
    iconName: string;
    description: string;
    onPress: () => void;
}

const Cards = ({ title, iconName, description, onPress }: props) => {
    return (
        <TouchableOpacity style={{ backgroundColor: 'transparent', width: '100%' }} onPress={onPress}>
            <View style={{
                flexDirection: 'column', backgroundColor: '#6a6a85', height: height * 0.14, borderRadius: 20,
                overflow: 'hidden', marginBottom: 10
            }}>
                <View style={{ flex: 1, justifyContent: 'flex-start', margin: 10, alignItems: 'flex-end' }}>
                    <Icon name={iconName || 'ArrowLeft'} color={"white"} size={40} />
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 7, backgroundColor: 'transparent', bottom: 30 }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
                    <Text style={{ color: 'white', fontSize: 14 }}>{description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Cards