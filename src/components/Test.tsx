import React from 'react'
import PainSelector from './MoodTracker'

const Test = () => {
    return (
        <PainSelector onPainChange={(val) => console.log('Pain level selected:', val.level)} />
    )
}

export default Test;