import { CircleArrowLeft, User, UserCircle } from 'lucide-react-native';
import React from 'react'
import { View, Dimensions, Text, TouchableOpacity, Touchable, Alert } from 'react-native'
import Cards from './Cards';
import NavBar from './navBar';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const HomeScreen = () => {

    const navigation = useNavigation();
    const nav = () => {
        navigation.navigate('ExercisePage');
    }

    const requestWritePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'App needs access to your storage to save the file',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage permission granted');
                return true;
            } else {
                console.log('Storage permission denied');
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const handleDownloadPDF = async () => {
        try {
            const hasPermission = await requestWritePermission();
            if (!hasPermission) {
                Alert.alert('Permission Denied', 'Storage permission is required to download the file');
                return;
            }

            const fileName = 'Patient Education.pdf';
            const assetPath = `${RNFS.MainBundlePath}/assets/${fileName}`;
            const downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

            const fileExists = await RNFS.exists(assetPath);
            if (!fileExists) {
                Alert.alert('Error', `File not found at path: ${assetPath}`);
                return;
            }

            await RNFS.copyFile(assetPath, downloadPath);
            Alert.alert('Download Complete', `File saved to: ${downloadPath}`);
        } catch (error) {
            console.error('Download error:', error);
            Alert.alert('Download Failed', `Unable to download the file. Error: ${error.message}`);
        }
    };

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginLeft: 15, marginRight: 15 }}>
                <View style={{ flex: 0, alignItems: 'center', backgroundColor: 'transparent', justifyContent: 'center' }}>
                    <Text style={{ color: 'green', fontSize: 30, fontWeight: 'bold', marginLeft: 7 }}>Health Tracker App</Text>
                </View>
                <TouchableOpacity>
                    <UserCircle color="black" size={40} />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 0, flexDirection: 'column', marginLeft: 20, marginTop: 15 }}>
                <Text style={{ flex: 0, color: 'grey', fontSize: 22, fontWeight: 'bold' }}>Good Morning,</Text>
                <Text style={{ flex: 0, color: 'green', fontSize: 35, fontWeight: 'bold' }}>Shubham Dixit</Text>
            </View>

            <ScrollView style={{ backgroundColor: 'transparent', flex: 1, margin: 10, overflow: 'scroll' }}>
                <Cards title='Patient Education' iconName='SquareActivity' description='Test your flexibility with these exercises for greater mobility' onPress={handleDownloadPDF} />
                <Cards title='Ergonomics & Postural Stability' iconName='SquareActivity' description='Test your flexibility with these exercises for greater mobility' />
                <Cards title='Exercises' iconName='SquareActivity' description='Test your flexibility with these exercises for greater mobility' onPress={nav} />
                <Cards title='Physical Activity' iconName='SquareActivity' description='Test your flexibility with these exercises for greater mobility' />
                <Cards title='Psychological Support' iconName='SquareActivity' description='Test your flexibility with these exercises for greater mobility' />
            </ScrollView>

            <NavBar />
        </View>
    )
}

export default HomeScreen;