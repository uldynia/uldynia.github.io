import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

interface CarouselBackgroundProps {
    images: string[];
    interval?: number;
    transitionDuration?: number;
}

export default function CarouselBackground({
    images,
    interval = 5000,
    transitionDuration = 1000
}: CarouselBackgroundProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isAnimating = useRef(false);

    const showControls = images.length > 1;

    const goToIndex = useCallback((index: number) => {
        if (isAnimating.current || index === currentIndex) return;
        isAnimating.current = true;

        // Fade out
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: transitionDuration / 2,
            useNativeDriver: true,
        }).start(() => {
            setCurrentIndex(index);
            // Fade in
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: transitionDuration / 2,
                useNativeDriver: true,
            }).start(() => {
                isAnimating.current = false;
            });
        });
    }, [currentIndex, fadeAnim, transitionDuration]);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const startTimer = useCallback(() => {
        clearTimer();
        if (images.length > 1) {
            timerRef.current = setInterval(() => {
                setCurrentIndex(prev => {
                    const nextIndex = (prev + 1) % images.length;
                    goToIndex(nextIndex);
                    return prev; // Don't update here, goToIndex will do it
                });
            }, interval);
        }
    }, [images.length, interval, goToIndex, clearTimer]);

    const handlePrev = useCallback(() => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        goToIndex(newIndex);
        startTimer();
    }, [currentIndex, images.length, goToIndex, startTimer]);

    const handleNext = useCallback(() => {
        const newIndex = (currentIndex + 1) % images.length;
        goToIndex(newIndex);
        startTimer();
    }, [currentIndex, images.length, goToIndex, startTimer]);

    const handleDotPress = useCallback((index: number) => {
        goToIndex(index);
        startTimer();
    }, [goToIndex, startTimer]);

    useEffect(() => {
        if (images.length > 1) {
            startTimer();
        }
        return clearTimer;
    }, [images.length, startTimer, clearTimer]);

    if (images.length === 0) {
        return <View style={styles.container} />;
    }

    return (
        <View style={styles.container}>
            <Animated.Image
                source={{ uri: images[currentIndex] }}
                style={[styles.image, { opacity: fadeAnim }]}
                resizeMode="cover"
            />

            {/* Dark overlay */}
            <View style={styles.overlay} />

            {/* Edge fade gradients */}
            <View style={styles.gradientTop} />
            <View style={styles.gradientBottom} />
            <View style={styles.gradientLeft} />
            <View style={styles.gradientRight} />

            {/* Navigation buttons - only show if multiple images */}
            {showControls && (
                <>
                    <Pressable
                        style={[styles.navButton, styles.navButtonLeft]}
                        onPress={handlePrev}
                    >
                        <Text style={styles.navButtonText}>‹</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.navButton, styles.navButtonRight]}
                        onPress={handleNext}
                    >
                        <Text style={styles.navButtonText}>›</Text>
                    </Pressable>
                </>
            )}

            {/* Dot selector at bottom - only show if multiple images */}
            {showControls && (
                <View style={styles.dotsContainer} pointerEvents="box-none">
                    {images.map((_, index) => (
                        <Pressable
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.dotActive,
                            ]}
                            onPress={() => handleDotPress(index)}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        />
                    ))}
                </View>
            )}
        </View>
    );
}

const FADE_SIZE = 80;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#111827',
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(17, 24, 39, 0.6)',
        zIndex: 5,
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
    navButton: {
        position: 'absolute',
        top: '50%',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 30,
        marginTop: -25,
        // @ts-ignore
        cursor: 'pointer',
    },
    navButtonLeft: {
        left: 20,
    },
    navButtonRight: {
        right: 20,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '300',
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        zIndex: 30,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        // @ts-ignore
        cursor: 'pointer',
    },
    dotActive: {
        backgroundColor: '#fff',
        width: 12,
        height: 12,
        borderRadius: 6,
    },
});
