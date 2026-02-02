import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface ActionButtonProps {
    icon: string;
    children: string;
    onPress?: () => void;
    style?: ViewStyle;
}

export default function ActionButton({ icon, children, onPress, style }: ActionButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.8}>
            <Image source={{ uri: icon }} style={styles.icon} resizeMode="contain" />
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        gap: 10,
    },
    icon: {
        width: 20,
        height: 20,
        borderRadius: 2,
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});
