import { CircleArrowLeft, User, UserCircle } from 'lucide-react-native';
import React from 'react'
import { View, Dimensions, Text } from 'react-native'
import Cards from './Cards';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const PainTrackerNew = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginLeft: 15, marginRight: 15 }}>
                <CircleArrowLeft color="black" size={40} />
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent', justifyContent: 'center' }}>
                    <Text style={{ color: 'green', fontSize: 15 }}>Health tracker app</Text>
                </View>
                <UserCircle color="black" size={40} />
            </View>

            <View style={{ flex: 0, flexDirection: 'column', marginLeft: 20, marginTop: 15 }}>
                <Text style={{ flex: 0, color: 'grey', fontSize: 22, fontWeight: 'bold' }}>Good Morning,</Text>
                <Text style={{ flex: 0, color: 'green', fontSize: 35, fontWeight: 'bold' }}>Shubham</Text>
            </View>

            <View style={{ flexDirection: 'row', margin: 15, gap: 7, flexWrap: 'wrap' }}>
                <Cards title='Exercises' iconName='SquareActivity' />
                <Cards title='Exercises' iconName='SquareActivity' />
                <Cards title='Exercises' iconName='SquareActivity' />
            </View>
        </View>
    )
}

export default PainTrackerNew