import { CircleArrowLeft, User, UserCircle } from 'lucide-react-native';
import React from 'react'
import { View, Dimensions, Text, TouchableOpacity, Touchable } from 'react-native'
import Cards from './Cards';
import NavBar from './navBar';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const PainTrackerNew = () => {

    const navigation = useNavigation();
    const nav = () => {
        navigation.navigate('ExercisePage');
    }

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginLeft: 15, marginRight: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <CircleArrowLeft color="black" size={40} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent', justifyContent: 'center' }}>
                    <Text style={{ color: 'green', fontSize: 15 }}>Health tracker app</Text>
                </View>
                <TouchableOpacity>
                    <UserCircle color="black" size={40} />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 0, flexDirection: 'column', marginLeft: 20, marginTop: 15 }}>
                <Text style={{ flex: 0, color: 'grey', fontSize: 22, fontWeight: 'bold' }}>Good Morning,</Text>
                <Text style={{ flex: 0, color: 'green', fontSize: 35, fontWeight: 'bold' }}>Shubham</Text>
            </View>

            <ScrollView style={{ backgroundColor: 'transparent', flex: 1, margin: 10, overflow: 'scroll' }}>
                <Cards title='Patient Education' iconName='SquareActivity' description='Test your flexibility with these exercises for greater mobility' />
                <Cards title='Ergonomics & Postural Stability' iconName='SquareActivity' description='Test your flexibility with these exercises for greater mobility' />
                <Cards title='Exercises' iconName='SquareActivity' description='Test your flexibility with these exercises for greater mobility' onPress={nav} />
                <Cards title='Physical Activity' iconName='SquareActivity' description='Test your flexibility with these exercises for greater mobility' />
                <Cards title='Psychological Support' iconName='SquareActivity' description='Test your flexibility with these exercises for greater mobility' />
            </ScrollView>

            <NavBar />
        </View>
    )
}

export default PainTrackerNew