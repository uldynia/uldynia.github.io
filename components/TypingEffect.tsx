import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

interface TypingEffectProps {
    children: string;
    speed?: number;
    style?: TextStyle;
    cursorColor?: string;
}

export default function TypingEffect({
    children,
    speed = 15,
    style,
    cursorColor = '#fff',
}: TypingEffectProps) {
    // Start with full text so it's visible in static HTML (SEO)
    // and to users with JS disabled.
    const [displayedText, setDisplayedText] = useState(children);
    const [showCursor, setShowCursor] = useState(true);
    const indexRef = useRef(children.length);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        // Once mounted, reset and start the animation
        setDisplayedText('');
        indexRef.current = 0;
        setIsStarted(true);
    }, []);

    useEffect(() => {
        if (!isStarted) return;

        const typingInterval = setInterval(() => {
            if (indexRef.current < children.length) {
                setDisplayedText(children.slice(0, indexRef.current + 1));
                indexRef.current += 1;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);

        return () => clearInterval(typingInterval);
    }, [isStarted, children, speed]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={[styles.text, style]}>
                {displayedText}
                <Text style={[styles.cursor, { color: showCursor ? cursorColor : 'transparent' }]}>|</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: '#d1d5db',
        fontFamily: 'GoogleSans-Regular',
        textAlign: 'center',
    },
    cursor: {
        fontWeight: 'bold',
    },
});
