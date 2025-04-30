import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Switch, ScrollView } from "react-native";
import Video from "react-native-video";
import { useRoute } from "@react-navigation/native";

const ExerciseVideo = () => {
    const route = useRoute();
    const exerciseName = route.params?.exerciseName || "";
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState("english");

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
        <ScrollView contentContainerStyle={styles.container}>
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
        height: 250,
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
        marginTop: 20,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        padding: 15,
        elevation: 2,
    },
    instructionsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
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
