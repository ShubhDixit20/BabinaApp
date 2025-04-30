import React from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import Icon from './icon';
import { AudioWaveform, Folder, Gift } from 'lucide-react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const NavBar = () => {
    return (
        <View style={{
            flex: 0, flexDirection: 'row', backgroundColor: 'grey', height: 70,
            overflow: 'hidden', zIndex: 20, position: 'absolute', bottom: 0, left: 0,
            right: 0, justifyContent: 'space-between', alignItems: 'center'
        }}>
            <TouchableOpacity>
                <View style={{ flexDirection: 'column', alignItems: 'center', margin: 20 }}>
                    <Folder color={'white'} size={24} />
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>My Management</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={{ flexDirection: 'column', alignItems: 'center', margin: 20 }}>
                    <AudioWaveform color={'white'} size={24} />
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Pain Tracker</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={{ flexDirection: 'column', alignItems: 'center', margin: 20 }}>
                    <Gift color={'white'} size={24} />
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Rewards</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default NavBar