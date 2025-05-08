import React from 'react'
import { View, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { menuItems } from '../lib/constants';
import CardsEx from './CardsExerc';
import { CircleArrowLeft, UserCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from './navBar';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ExercisePage = () => {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 0, flexDirection: 'column', backgroundColor: 'transparent' }}>

                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginLeft: 15, marginRight: 15 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <CircleArrowLeft color="black" size={40} />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent', justifyContent: 'center' }}>
                        <Text style={{ color: 'green', fontSize: 15 }}>Health Track</Text>
                    </View>

                    <TouchableOpacity>
                        <UserCircle color="black" size={40} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'grey', margin: 15 }}>Exercises</Text>
                </View>
            </View>

            <ScrollView style={{ flex: 1, backgroundColor: 'transparent', marginBottom: 80 }}>

                {menuItems?.map((item, idex) => {
                    console.log('here is the item: ', item)
                    return <CardsEx key={idex} title={item.title} list={item.subItems} />
                })}
            </ScrollView>

            <NavBar />
        </View>
    )
}

export default ExercisePage