import React from 'react'
import { View } from 'react-native'
import SemiCircleProgressBar from "react-progressbar-semicircle";

const PainTrackerNew = () => {
    return (
        <View>
            <SemiCircleProgressBar percentage={33} showPercentValue />;
        </View>
    )
}

export default PainTrackerNew