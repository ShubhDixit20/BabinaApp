import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native'
import { PermissionsAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Info, User } from 'lucide-react-native';

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
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

// The function that handles the PDF download
const handleDownloadPDF = async () => {
  try {
    const hasPermission = await requestWritePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Storage permission is required to download the file');
      return;
    }

    const fileName = 'Patient Education.pdf'; // Name of your file in assets
    const assetPath = `${RNFS.MainBundlePath}/assets/${fileName}`; // Path to your assets folder
    const downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}`; // Destination on the device

    const fileExists = await RNFS.exists(assetPath); // Check if the file exists in the assets folder
    if (!fileExists) {
      Alert.alert('Error', `File not found at path: ${assetPath}`);
      return;
    }

    // Copy the file from the asset path to the download path
    await RNFS.copyFile(assetPath, downloadPath);

    Alert.alert('Download Complete', `File saved to: ${downloadPath}`);
  } catch (error) {
    console.error('Download error:', error);
    Alert.alert('Download Failed', `Unable to download the file. Error: ${error.message}`);
  }
};

const GoalsScreen = ({ navigation }) => {
  const [expanded, setExpanded] = useState(null);
  const [nestedExpanded, setNestedExpanded] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'HEALTH TRACKER',
      headerRight: () => (
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              Alert.alert(
                'App Info',
                'This app helps you track your health goals and progress!'
              );
            }}
          >
            {/* <MaterialIcons name="info" size={24} color="white" /> */}
            <Info color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              Alert.alert('User Info', 'This feature will activate upon registration.');
            }}
          >
            {/* <MaterialIcons name="account-circle" size={24} color="white" /> */}
            <User color="white" />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#1E293B', // Updated theme-colored background
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const menuItems = [
    {
      id: '4',
      title: 'My Management',
      color: '#9089E1',
      subItems: [
        { title: 'Patient Education', onPress: handleDownloadPDF },
        { title: 'Ergonomics & Postural Tips' },
        {
          title: 'Exercises',
          subItems: [
            {
              title: 'Warm-up exercises',
              subItems: [
                { title: 'Loosening', navigateTo: 'VideoWithDescription' },
                { title: 'Diaphragmatic Breathing', navigateTo: 'Diaphragmatic' },
              ],
            },
            {
              title: 'Spinal Mobility Exercise',
              subItems: [
                { title: 'KNEE TO CHEST - SINGLE', navigateTo: 'SingleKnee' },
                { title: 'KNEE TO CHEST - DOUBLE', navigateTo: 'DoubleKnee' },
                { title: 'SPINAL ROTATION', navigateTo: 'SpinalRotation' },
                { title: 'CAT-CAMEL EXERCISE', navigateTo: 'CAT-CAMEL EXERCISE' },
              ],
            },
            {
              title: 'Stability Exercise',
              subItems: [
                { title: 'Level-1 Abdominal Drawing-in (core engagement)', navigateTo: "Abdominal Drawing-in (core engagement)" },
                { title: 'Level-1 Back extensor isometrics', navigateTo: "Back extensor isometrics" },
                { title: 'Level-1 Gluteal Squeeze', navigateTo: "Gluteal Squeeze" },
                { title: 'Level-1 Straight Leg Raise-Supine (single leg)', navigateTo: "Straight Leg Raise-Supine (single leg)" },
                { title: 'Level-1 Bridging', navigateTo: "Bridging" },
                { title: 'Level-2 Single table top', navigateTo: "Single table top" },
                { title: 'Level-2 Bridge with marching (heel lifts)', navigateTo: "Bridge with marching (heel lifts)" },
                { title: 'Level-2 Small leg circles', navigateTo: "Small leg circles" },
                { title: 'Level-2 Straight Leg Raise- supine', navigateTo: "Straight Leg Raise- supine" },
                { title: 'Level-2 Side plank, on knees', navigateTo: "Side plank, on knees" },
                { title: 'Level-2 Straight Leg Raise- Prone ', navigateTo: "Straight Leg Raise- Prone " },
                { title: 'Level-2 Quadripod- either arm/leg lift ', navigateTo: "Quadripod- either arm/leg lift " },
                { title: 'Level-3 Double Table Top', navigateTo: "Double Table Top" },
                { title: 'Level-3 Single Leg Bridging', navigateTo: "Single Leg Bridging" },
                { title: 'Level-3 Straight Leg Raise- Supine', navigateTo: "Straight Leg Raise- Supine" },
                { title: 'Level-3 Straight Leg Raise- Prone', navigateTo: "Straight Leg Raise- Prone" },
                { title: 'Level-3 Side Plank', navigateTo: "Side Plank" },
                { title: 'Level-3 Quadripod- contralateral arm and leg lift', navigateTo: "Quadripod- contralateral arm and leg lift" },
                { title: 'Standing March', navigateTo: "Standing March" },
              ]
            },
            {
              title: 'Trunk Extensor Endurance Training',
              subItems: [
                { title: 'Level 1: Prone- Bilateral shoulder lifts', navigateTo: "Level 1: Prone- Bilateral shoulder lifts" },
                { title: 'Level 2: Prone- Hands behind head: Bilateral shoulder lifts', navigateTo: "Level 2: Prone- Hands behind head: Bilateral shoulder lifts" },
                { title: 'Level 3: Prone- Arms fully elevated: Bilateral shoulder lifts', navigateTo: "Level 3: Prone- Arms fully elevated: Bilateral shoulder lifts" },
                { title: 'Level 4: Prone- Contralateral arm and leg lifts', navigateTo: "Level 4: Prone- Contralateral arm and leg lifts" },
                { title: 'Level 5: Prone- Shoulder-elbow 90-90: Bilateral shoulder and leg lifts', navigateTo: "Level 5: Prone- Shoulder-elbow 90-90: Bilateral shoulder and leg lifts" },
              ]
            },
            {
              title: 'Stretching Exercises',
              subItems: [
                { title: 'Piriformis Stretch', navigateTo: "Piriformis Stretch" },
                { title: 'Hamstrings Stretch', navigateTo: "Hamstrings Stretch" },
                { title: 'Calf Stretch', navigateTo: "Calf Stretch" },
                { title: 'Cobra Stretch', navigateTo: "Cobra Stretch" },
                { title: 'Child Pose', navigateTo: "Child Pose" },
                { title: 'Iliopsoas Stretch', navigateTo: "Iliopsoas Stretch" },
                { title: 'Spine side Stretch', navigateTo: "Spine side Stretch" },
                { title: 'Quadriceps Stretch', navigateTo: "Quadriceps Stretch" },
              ]
            },
            {
              title: 'Neural Mobility Exercises',
              subItems: [
                { title: 'Sciatic Neural Mobility in chair sitting- Level 1', navigateTo: "Sciatic Neural Mobility in chair sitting- Level 1" },
                { title: 'Sciatic Neural Mobility in chair sitting- Level 2', navigateTo: "Sciatic Neural Mobility in chair sitting- Level 2" },
                { title: 'Sciatic Neural Mobility in chair sitting- Level 3', navigateTo: "Sciatic Neural Mobility in chair sitting- Level 3" },
              ]
            },
          ],
        },
        { title: 'Physical Activity' },
        { title: 'Psychological Support' },
      ],
    },
    {
      id: '1',
      title: 'Pain Tracker',
      color: '#47D6E2',
      subItems: [],
      navigateTo: 'PainTracker',
    },
    {
      id: '3',
      title: 'Rewards',
      color: '#4CF6CF',
      subItems: [],
      navigateTo: 'PainTrackerNew',
    },
  ];

  const toggleExpand = (id) => {
    setExpandedSections((prevExpandedSections) => ({
      ...prevExpandedSections,
      [id]: !prevExpandedSections[id], // Toggle the current item’s expanded state
    }));
  };

  const toggleNestedExpand = (id) => {
    setExpandedSections((prevExpandedSections) => ({
      ...prevExpandedSections,
      [id]: !prevExpandedSections[id], // Toggle the nested item’s expanded state
    }));
  };

  const renderNestedSubItems = (subItems) => {
    return (
      <View style={styles.subItemsContainer}>
        {subItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.subItemButton}
            onPress={() => {
              if (item.navigateTo) {
                navigation.navigate("ExerciseVideo", { exerciseName: item.title }); // Pass exercise name
              }
            }}
          >
            <Text style={styles.subItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderSubItems = (subItems) => {
    return (
      <View style={styles.subItemsContainer}>
        {subItems.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.subItemButton}
              onPress={() => {
                if (item.subItems) {
                  toggleNestedExpand(item.title); // Toggle nested items
                } else if (item.navigateTo) {
                  // Instead of navigating to a generic screen, pass the exercise name
                  navigation.navigate("ExerciseVideo", { exerciseName: item.title });
                } else if (item.onPress) {
                  item.onPress(); // Handle actions like PDF download
                }
              }}
            >
              <Text style={styles.subItemText}>{item.title}</Text>
              {item.subItems && (
                <Text style={styles.expandIcon}>
                  {expandedSections[item.title] ? "-" : "+"}
                </Text>
              )}
            </TouchableOpacity>
            {expandedSections[item.title] && item.subItems && renderSubItems(item.subItems)}
          </View>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedSections[item.id]; // Check the state map for expansion

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (item.subItems.length > 0) {
              toggleExpand(item.id); // Toggle first-level items
            } else if (item.navigateTo) {
              navigation.navigate(item.navigateTo); // Navigate to screen
            }
          }}
          style={styles.menuItem}
        >
          <Text style={styles.menuText}>{item.title}</Text>
          {item.subItems.length > 0 && (
            <Text style={styles.expandIcon}>{isExpanded ? '-' : '+'}</Text>
          )}
        </TouchableOpacity>
        {isExpanded && renderSubItems(item.subItems)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.menuList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d3652', // Theme-colored background
  },
  menuList: {
    paddingHorizontal: 0, // Remove horizontal padding
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 0, // No rounded corners
    marginVertical: 0, // Remove vertical margin between items
    // borderBottomWidth: 1, // Add subtle divider
    // borderBottomColor: '#334155', // Divider color matching theme
  },
  menuText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff', // White text for contrast
  },
  expandIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subItemsContainer: {
    paddingLeft: 15,
    backgroundColor: '#2C3A47', // Slightly darker background for sub-items
  },
  subItemButton: {
    padding: 10,
    borderBottomWidth: 1, // Divider between sub-items
    // borderBottomColor: '#475569', // Subtle divider color
    backgroundColor: '#2C3A47', // Darker background for sub-item buttons
  },
  subItemText: {
    fontSize: 16,
    fontWeight: '500', // Slightly bold for better readability
    color: '#E2E8F0', // Light text color for better readability
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  iconContainer: {
    marginHorizontal: 8,
  },
});

export default GoalsScreen;

