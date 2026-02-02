import React, { useRef, useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface ActionButtonProps {
    icon: string;
    children: string;
    onPress?: () => void;
    style?: ViewStyle;
}

export default function ActionButton({ icon, children, onPress, style }: ActionButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<View>(null);

    const handleMouseEnter = (e: any) => {
        if (Platform.OS === 'web' && buttonRef.current) {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setRipplePosition({ x, y });
        }
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Pressable
            ref={buttonRef}
            style={[styles.button, style]}
            onPress={onPress}
            // @ts-ignore - Web-only props
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Ripple effect overlay */}
            {isHovered && (
                <View
                    style={[
                        styles.ripple,
                        {
                            left: ripplePosition.x,
                            top: ripplePosition.y,
                        },
                    ]}
                />
            )}
            <Image source={{ uri: icon }} style={styles.icon} resizeMode="contain" />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        gap: 10,
        overflow: 'hidden',
        position: 'relative',
        // @ts-ignore - Web cursor
        cursor: 'pointer',
    },
    ripple: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        transform: [{ translateX: -150 }, { translateY: -150 }],
        // @ts-ignore - Web animation
        transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
    },
    icon: {
        width: 20,
        height: 20,
        borderRadius: 2,
        zIndex: 1,
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'GoogleSans-Medium',
        zIndex: 1,
    },
});
