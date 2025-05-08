import React from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import Icon from './icon';
import { AudioWaveform, Folder, Gift, HomeIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const NavBar = () => {

    const navigation = useNavigation();

    return (
        <View style={{
            flex: 0, flexDirection: 'row', backgroundColor: '#35355e', height: 90,
            overflow: 'hidden', zIndex: 20, position: 'absolute', bottom: 0, left: 0,
            right: 0, justifyContent: 'center', alignItems: 'center'
        }}>
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                <View style={{ flexDirection: 'column', alignItems: 'center', margin: 20 }}>
                    <HomeIcon color={'white'} size={24} />
                    <Text style={{ color: 'white', fontWeight: 'normal' }}>Home</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("test")}>
                <View style={{ flexDirection: 'column', alignItems: 'center', margin: 20, opacity: 0.7 }}>
                    <AudioWaveform color={'white'} size={24} />
                    <Text style={{ color: 'white', fontWeight: 'normal' }}>Pain Tracker</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={{ flexDirection: 'column', alignItems: 'center', margin: 20, opacity: 0.7 }}>
                    <Gift color={'white'} size={24} />
                    <Text style={{ color: 'white', fontWeight: 'normal' }}>Rewards</Text>
                </View>
            </TouchableOpacity>
        </View >
    )
}

export default NavBar