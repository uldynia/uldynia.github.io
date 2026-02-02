import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
}

interface StarBackgroundProps {
    starCount?: number;
    parallaxStrength?: number;
}

export default function StarBackground({ starCount = 150, parallaxStrength = 20 }: StarBackgroundProps) {
    const [stars, setStars] = useState<Star[]>([]);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Generate stars on mount
    useEffect(() => {
        const generatedStars: Star[] = [];
        for (let i = 0; i < starCount; i++) {
            generatedStars.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3,
            });
        }
        setStars(generatedStars);
    }, [starCount]);

    useEffect(() => {
        // Mouse move handler for parallax (web/desktop)
        if (Platform.OS === 'web') {
            const handleMouseMove = (e: MouseEvent) => {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const offsetX = ((e.clientX - centerX) / centerX) * parallaxStrength;
                const offsetY = -((e.clientY - centerY) / centerY) * parallaxStrength;
                setOffset({ x: offsetX, y: offsetY });
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, [parallaxStrength]);

    return (
        <View style={styles.container}>
            {/* Gradient overlay for edge fade */}
            <View style={styles.gradientTop} />
            <View style={styles.gradientBottom} />
            <View style={styles.gradientLeft} />
            <View style={styles.gradientRight} />

            {/* Stars with parallax - direct transform, no animation */}
            <View
                style={[
                    styles.starsContainer,
                    {
                        transform: [
                            { translateX: offset.x },
                            { translateY: offset.y },
                        ],
                    },
                ]}
            >
                {stars.map((star) => (
                    <View
                        key={star.id}
                        style={[
                            styles.star,
                            {
                                left: `${star.x}%`,
                                top: `${star.y}%`,
                                width: star.size,
                                height: star.size,
                                opacity: star.opacity,
                            },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const FADE_SIZE = 80;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#111827',
        overflow: 'hidden',
    },
    starsContainer: {
        ...StyleSheet.absoluteFillObject,
        margin: -100,
    },
    star: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    gradientTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: FADE_SIZE,
        // @ts-ignore - Web gradient
        background: 'linear-gradient(to bottom, #111827 0%, transparent 100%)',
        zIndex: 10,
        pointerEvents: 'none',
    },
    gradientBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: FADE_SIZE,
        // @ts-ignore - Web gradient
        background: 'linear-gradient(to top, #111827 0%, transparent 100%)',
        zIndex: 10,
        pointerEvents: 'none',
    },
    gradientLeft: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: FADE_SIZE,
        // @ts-ignore - Web gradient
        background: 'linear-gradient(to right, #111827 0%, transparent 100%)',
        zIndex: 10,
        pointerEvents: 'none',
    },
    gradientRight: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: FADE_SIZE,
        // @ts-ignore - Web gradient
        background: 'linear-gradient(to left, #111827 0%, transparent 100%)',
        zIndex: 10,
        pointerEvents: 'none',
    },
});
