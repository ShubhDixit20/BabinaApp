import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Switch, ScrollView, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CircleArrowLeft, UserCircle } from "lucide-react-native";

const ExerciseVideo = () => {
    const route = useRoute();
    const exerciseName = route.params?.exerciseName || "";
    const subItem = route.params?.subItem || "";
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState("english");
    const navigation = useNavigation();

    useEffect(() => {
        if (exerciseName) {
            fetchExerciseDetails(exerciseName);
        }
    }, [exerciseName]);

    const fetchExerciseDetails = async (name) => {
        try {
            const response = await fetch(`https://backendhealthapp.onrender.com/api/exercise?exercise_name=${name}`);
            const data = await response.json();

            if (response.ok) {
                setExercise(data);
            } else {
                setError(data.error || "Error fetching data");
            }
        } catch (err) {
            setError("Failed to connect to server");
        } finally {
            setLoading(false);
        }
    };

    const renderInstructions = (instructions) => {
        return instructions.split(/<br>|\\n/).map((line, index) => (
            <Text key={index} style={styles.step}>
                {line.trim()}
            </Text>
        ));
    };

    if (loading) return <ActivityIndicator size="large" color="#3b5998" />;
    if (error) return <Text style={styles.error}>{error}</Text>;

    return (

        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginLeft: 15, marginRight: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <CircleArrowLeft color="black" size={40} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent', justifyContent: 'center' }}>
                    <Text style={{ color: 'green', fontSize: 15 }}>{exerciseName}</Text>
                </View>
                <TouchableOpacity>
                    <UserCircle color="black" size={40} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ flex: 0, marginTop: 20 }}>
                {exercise?.video_url ? (
                    <Video
                        source={{ uri: exercise.video_url }}
                        style={styles.video}
                        controls
                        resizeMode="contain"
                        onError={(err) => console.error("Video Error:", err)}
                    />
                ) : (
                    <Text style={styles.error}>No video available</Text>
                )}

                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleLabel}>EN</Text>
                    <Switch
                        trackColor={{ false: "#d3d3d3", true: "#3b5998" }}
                        thumbColor={language === "english" ? "#f5f5f5" : "#3b5998"}
                        value={language === "hindi"}
                        onValueChange={() => setLanguage(language === "english" ? "hindi" : "english")}
                    />
                    <Text style={styles.toggleLabel}>HI</Text>
                </View>

                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsTitle}>Step-by-Step Instructions</Text>
                    {language === "english"
                        ? renderInstructions(exercise?.english_instructions || "")
                        : renderInstructions(exercise?.hindi_instructions || "")}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        padding: 20,
    },
    video: {
        width: "100%",
        height: 240,
        borderRadius: 10,
        backgroundColor: "#000",
    },
    toggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15,
    },
    toggleLabel: {
        fontSize: 16,
        color: "#3b5998",
        marginHorizontal: 5,
    },
    instructionsContainer: {
        width: "100%",
        // marginTop: 20,
        backgroundColor: "#f9f9f9",
        // borderRadius: 10,
        padding: 15,
        alignItems: 'center'
        // elevation: 2,
    },
    instructionsTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "grey",
        marginBottom: 10,
    },
    step: {
        fontSize: 16,
        color: "#555",
        marginBottom: 8,
        backgroundColor: "#f0f2f5",
        padding: 10,
        borderRadius: 5,
    },
    error: {
        fontSize: 16,
        color: "red",
        marginTop: 10,
    },
});

export default ExerciseVideo;
