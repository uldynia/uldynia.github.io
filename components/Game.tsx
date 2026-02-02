import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export interface GameProps {
    icon: string;
    background: string;
    title: string;
    children: React.ReactNode;
}

export default function Game({ icon, background, title, children }: GameProps) {
    return (
        <ImageBackground
            source={{ uri: background }}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    {children}
                </View>
            </View>
        </ImageBackground>
    );
}

// Export a helper to extract icon from Game element
Game.getIcon = (element: React.ReactElement<GameProps>): string => {
    return element.props.icon;
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(17, 24, 39, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        gap: 16,
        maxWidth: 600,
    },
    title: {
        fontSize: 48,
        fontWeight: '300',
        color: '#fff',
        marginBottom: 8,
    },
});
