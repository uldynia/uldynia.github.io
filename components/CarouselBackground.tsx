import { Asset } from 'expo-asset';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, ImageSourcePropType, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { CarouselImage } from '../config/games';
interface CarouselBackgroundProps {
    images: (string | ImageSourcePropType | CarouselImage)[];
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

    const getSource = (image: string | ImageSourcePropType | CarouselImage) => {
        if (!image) return undefined;
        if (typeof image === 'string') {
            return { uri: image };
        }
        if (image && typeof image === 'object' && 'source' in (image as any)) {
            const imgObj = image as any;
            return typeof imgObj.source === 'string' ? { uri: imgObj.source } : imgObj.source;
        }
        return image;
    };

    const getAlignment = (image: any): string | undefined => {
        if (image && typeof image === 'object' && 'alignment' in image) {
            return image.alignment;
        }
        return undefined;
    };

    const currentImage = images[currentIndex];
    const source = getSource(currentImage);
    const alignment = getAlignment(currentImage);

    // Resolve URI for web backgroundImage
    let imageUri = null;
    if (Platform.OS === 'web' && source) {
        if (typeof source === 'string') {
            imageUri = source;
        } else if (typeof source === 'object' && 'uri' in (source as any)) {
            imageUri = (source as any).uri;
        } else if (typeof source === 'number') {
            imageUri = Asset.fromModule(source).uri;
        }
    }

    return (
        <View style={styles.container}>
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
                    style={[
                        styles.image,
                        { opacity: fadeAnim }
                    ]}
                    resizeMode="cover"
                />
            )}

            {/* Dark overlay */}
            <View style={styles.overlay} />

            {/* Edge fade gradients */}
            <View style={styles.gradientTop} />
            <View style={styles.gradientBottom} />
            <View style={styles.gradientLeft} />
            <View style={styles.gradientRight} />

            {/* Combined Carousel Controls */}
            {showControls && (
                <View style={styles.controlsContainer} pointerEvents="box-none">
                    <Pressable
                        style={styles.navButton}
                        onPress={handlePrev}
                    >
                        <Text style={styles.navButtonText}>‹</Text>
                    </Pressable>

                    <View style={styles.dotsContainer}>
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

                    <Pressable
                        style={styles.navButton}
                        onPress={handleNext}
                    >
                        <Text style={styles.navButtonText}>›</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const FADE_SIZE = 40;

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
    controlsContainer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        zIndex: 30,
    },
    navButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        // @ts-ignore
        cursor: 'pointer',
    },
    navButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '300',
        marginTop: Platform.OS === 'web' ? -4 : 0, // Visual centering for chevron
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        // @ts-ignore
        cursor: 'pointer',
    },
    dotActive: {
        backgroundColor: '#fff',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});
