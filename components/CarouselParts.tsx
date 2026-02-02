import { Asset } from 'expo-asset';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, ImageSourcePropType, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { CarouselImage } from '../config/games';

export interface CarouselState {
    currentIndex: number;
    images: (string | ImageSourcePropType | CarouselImage)[];
    fadeAnim: Animated.Value;
    handlePrev: () => void;
    handleNext: () => void;
    handleDotPress: (index: number) => void;
}

export function useCarousel(images: (string | ImageSourcePropType | CarouselImage)[], interval = 5000, transitionDuration = 1000): CarouselState {
    const [currentIndex, setCurrentIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isAnimating = useRef(false);

    const goToIndex = useCallback((index: number) => {
        if (isAnimating.current || index === currentIndex) return;
        isAnimating.current = true;

        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: transitionDuration / 2,
            useNativeDriver: true,
        }).start(() => {
            setCurrentIndex(index);
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
                    return prev;
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

    return {
        currentIndex,
        images,
        fadeAnim,
        handlePrev,
        handleNext,
        handleDotPress,
    };
}

export function CarouselImages({ state }: { state: CarouselState }) {
    const { currentIndex, images, fadeAnim } = state;

    if (images.length === 0) return null;

    const getSource = (image: any) => {
        if (!image) return undefined;
        if (typeof image === 'string') return { uri: image };
        if (image && typeof image === 'object' && 'source' in image) {
            return typeof image.source === 'string' ? { uri: image.source } : image.source;
        }
        return image;
    };

    const getAlignment = (image: any) => image?.alignment;

    const currentImage = images[currentIndex];
    const source = getSource(currentImage);
    const alignment = getAlignment(currentImage);

    let imageUri = null;
    if (Platform.OS === 'web' && source) {
        if (typeof source === 'string') imageUri = source;
        else if (typeof source === 'object' && 'uri' in source) imageUri = (source as any).uri;
        else if (typeof source === 'number') imageUri = Asset.fromModule(source).uri;
    }

    return (
        <View style={styles.imgContainer}>
            {Platform.OS === 'web' && imageUri ? (
                <Animated.View
                    style={[
                        styles.image,
                        {
                            opacity: fadeAnim,
                            // @ts-ignore
                            backgroundImage: `url("${imageUri}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: alignment || 'center',
                            backgroundRepeat: 'no-repeat'
                        }
                    ]}
                />
            ) : (
                <Animated.Image
                    source={source as any}
                    style={[styles.image, { opacity: fadeAnim }]}
                    resizeMode="cover"
                />
            )}
            <View style={styles.overlay} />
            <View style={styles.gradientTop} />
            <View style={styles.gradientBottom} />
            <View style={styles.gradientLeft} />
            <View style={styles.gradientRight} />
        </View>
    );
}

export function CarouselControls({ state }: { state: CarouselState }) {
    const { currentIndex, images, handlePrev, handleNext, handleDotPress } = state;
    if (images.length <= 1) return null;

    return (
        <View style={styles.controlsContainer} pointerEvents="box-none">
            <Pressable style={styles.navButton} onPress={handlePrev}>
                <Text style={styles.navButtonText}>‹</Text>
            </Pressable>

            <View style={styles.dotsContainer}>
                {images.map((_, index) => (
                    <Pressable
                        key={index}
                        style={[styles.dot, currentIndex === index && styles.dotActive]}
                        onPress={() => handleDotPress(index)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    />
                ))}
            </View>

            <Pressable style={styles.navButton} onPress={handleNext}>
                <Text style={styles.navButtonText}>›</Text>
            </Pressable>
        </View>
    );
}

const FADE_SIZE = 40;
const styles = StyleSheet.create({
    imgContainer: {
        ...StyleSheet.absoluteFillObject,
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
        top: 0, left: 0, right: 0, height: FADE_SIZE,
        // @ts-ignore
        background: 'linear-gradient(to bottom, #111827 0%, transparent 100%)',
        zIndex: 10, pointerEvents: 'none',
    },
    gradientBottom: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0, height: FADE_SIZE,
        // @ts-ignore
        background: 'linear-gradient(to top, #111827 0%, transparent 100%)',
        zIndex: 10, pointerEvents: 'none',
    },
    gradientLeft: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, width: FADE_SIZE,
        // @ts-ignore
        background: 'linear-gradient(to right, #111827 0%, transparent 100%)',
        zIndex: 10, pointerEvents: 'none',
    },
    gradientRight: {
        position: 'absolute',
        top: 0, bottom: 0, right: 0, width: FADE_SIZE,
        // @ts-ignore
        background: 'linear-gradient(to left, #111827 0%, transparent 100%)',
        zIndex: 10, pointerEvents: 'none',
    },
    controlsContainer: {
        position: 'absolute',
        bottom: 30, left: 0, right: 0,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 30,
        zIndex: 100,
    },
    navButton: {
        width: 44, height: 44, borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center', alignItems: 'center',
        // @ts-ignore
        cursor: 'pointer',
    },
    navButtonText: {
        color: '#fff', fontSize: 24, fontWeight: '300',
        marginTop: Platform.OS === 'web' ? -4 : 0,
    },
    dotsContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    dot: {
        width: 8, height: 8, borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        // @ts-ignore
        cursor: 'pointer',
    },
    dotActive: { backgroundColor: '#fff', width: 10, height: 10, borderRadius: 5 },
});
