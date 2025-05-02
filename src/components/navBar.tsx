import React from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import Icon from './icon';
import { AudioWaveform, Folder, Gift } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const NavBar = () => {

    const navigation = useNavigation();

    return (
        <View style={{
            flex: 0, flexDirection: 'row', backgroundColor: '#90C67C', height: 70,
            overflow: 'hidden', zIndex: 20, position: 'absolute', bottom: 0, left: 0,
            right: 0, justifyContent: 'center', alignItems: 'center'
        }}>
            <TouchableOpacity onPress={navigation.navigate('PainTrack')}>
                <View style={{ flexDirection: 'column', alignItems: 'center', margin: 20 }}>
                    <AudioWaveform color={'black'} size={24} />
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Pain Tracker</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={{ flexDirection: 'column', alignItems: 'center', margin: 20 }}>
                    <Gift color={'black'} size={24} />
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Rewards</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default NavBar