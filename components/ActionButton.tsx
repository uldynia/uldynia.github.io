import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Linking, Platform, Pressable, StyleSheet, ViewStyle } from 'react-native';

interface ActionButtonProps {
    icon?: string;
    children: string;
    href?: string;
    onPress?: () => void;
    style?: ViewStyle;
}

export default function ActionButton({ icon, children, href, onPress, style }: ActionButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [rippleOrigin, setRippleOrigin] = useState({ x: 0, y: 0 });
    const rippleScale = useRef(new Animated.Value(0)).current;
    const rippleOpacity = useRef(new Animated.Value(0)).current;
    const textColorAnim = useRef(new Animated.Value(0)).current;

    // Ripple size needs to be large enough to cover entire button from any corner
    const RIPPLE_SIZE = 500;

    const handlePress = () => {
        if (href) {
            Linking.openURL(href);
        }
        onPress?.();
    };

    useEffect(() => {
        if (isHovered) {
            rippleScale.setValue(0);
            rippleOpacity.setValue(1);
            Animated.parallel([
                Animated.timing(rippleScale, {
                    toValue: 1,
                    duration: 350,
                    useNativeDriver: Platform.OS !== 'web',
                }),
                Animated.timing(textColorAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: Platform.OS !== 'web',
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(rippleOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: Platform.OS !== 'web',
                }),
                Animated.timing(textColorAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: Platform.OS !== 'web',
                }),
            ]).start();
        }
    }, [isHovered, rippleScale, rippleOpacity, textColorAnim]);

    const handleHoverIn = (e: any) => {
        if (Platform.OS === 'web' && e.nativeEvent) {
            const target = e.currentTarget || e.target;
            if (target && target.getBoundingClientRect) {
                const rect = target.getBoundingClientRect();
                setRippleOrigin({
                    x: e.nativeEvent.clientX - rect.left,
                    y: e.nativeEvent.clientY - rect.top,
                });
            }
        }
        setIsHovered(true);
    };

    const handleHoverOut = () => {
        setIsHovered(false);
    };

    // Interpolate text color from white to dark
    const animatedTextColor = textColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ffffff', '#111827'],
    });

    return (
        <Pressable
            style={[styles.button, !icon && styles.buttonNoIcon, style]}
            onPress={handlePress}
            onHoverIn={handleHoverIn}
            onHoverOut={handleHoverOut}
        >
            {/* Animated ripple effect - pure white */}
            <Animated.View
                style={[
                    styles.ripple,
                    {
                        width: RIPPLE_SIZE,
                        height: RIPPLE_SIZE,
                        borderRadius: RIPPLE_SIZE / 2,
                        left: rippleOrigin.x - RIPPLE_SIZE / 2,
                        top: rippleOrigin.y - RIPPLE_SIZE / 2,
                        opacity: rippleOpacity,
                        transform: [
                            {
                                scale: rippleScale.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1],
                                }),
                            },
                        ],
                    },
                ]}
            />
            {icon && (
                <Image
                    source={{ uri: icon }}
                    // @ts-ignore - Web filter for inverting icon
                    style={[styles.icon, isHovered && { filter: 'invert(1)' }]}
                    resizeMode="contain"
                />
            )}
            <Animated.Text style={[styles.text, { color: animatedTextColor }]}>
                {children}
            </Animated.Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        gap: 10,
        overflow: 'hidden',
        position: 'relative',
        minWidth: 120,
        // @ts-ignore - Web cursor
        cursor: 'pointer',
    },
    buttonNoIcon: {
        paddingHorizontal: 24,
    },
    ripple: {
        position: 'absolute',
        backgroundColor: '#ffffff',
    },
    icon: {
        width: 20,
        height: 20,
        borderRadius: 2,
        zIndex: 1,
    },
    text: {
        fontSize: 14,
        fontFamily: 'GoogleSans-Regular',
        zIndex: 1,
    },
});
