import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface GameProps {
    icon: string;
    title: string;
    children: React.ReactNode;
    background?: React.ReactNode;
}

export default function Game({ icon, title, children, background }: GameProps) {
    return (
        <View style={styles.container}>
            {/* Background layer */}
            {background && (
                <View style={styles.backgroundLayer} pointerEvents="box-none">
                    {background}
                </View>
            )}

            {/* Content layer with blur backdrop */}
            <View style={styles.contentWrapper} pointerEvents="box-none">
                <View style={styles.blurContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {children}
                </View>
            </View>
        </View>
    );
}

// Export a helper to extract icon from Game element
Game.getIcon = (element: React.ReactElement<GameProps>): string => {
    return element.props.icon;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
    },
    backgroundLayer: {
        ...StyleSheet.absoluteFillObject,
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    blurContainer: {
        alignItems: 'center',
        gap: 16,
        padding: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(17, 24, 39, 0.3)',
        // @ts-ignore - Web backdrop-filter
        backdropFilter: 'blur(8px)',
        // @ts-ignore - Safari support
        WebkitBackdropFilter: 'blur(8px)',
        maxWidth: 700,
    },
    title: {
        fontSize: 48,
        fontWeight: '300',
        color: '#fff',
        marginBottom: 8,
        fontFamily: 'GoogleSans-Regular',
    },
});
