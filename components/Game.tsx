import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

export interface GameProps {
    icon: ImageSourcePropType;
    title: string;
    children: React.ReactNode;
    background?: React.ReactNode;
    side?: React.ReactNode;
}

export default function Game({ icon, title, children, background, side }: GameProps) {
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
                <View style={styles.layoutContainer} pointerEvents="box-none">
                    <View style={styles.blurContainer}>
                        <Text style={styles.title}>{title}</Text>
                        {children}
                    </View>
                    {side && (
                        <View style={styles.sideContainer}>
                            {side}
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

// Export a helper to extract icon from Game element
Game.getIcon = (element: React.ReactElement<GameProps>): ImageSourcePropType => {
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
    layoutContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        width: '100%',
        maxWidth: 1400,
    },
    blurContainer: {
        alignItems: 'center',
        gap: 12,
        padding: 24,
        borderRadius: 20,
        backgroundColor: 'rgba(17, 24, 39, 0.3)',
        // @ts-ignore - Web backdrop-filter
        backdropFilter: 'blur(8px)',
        // @ts-ignore - Safari support
        WebkitBackdropFilter: 'blur(8px)',
        maxWidth: 700,
        flexGrow: 999, // Prefers to grow more than side
        flexShrink: 1,
        flexBasis: 500,
    },
    sideContainer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 350,
        maxWidth: 600,
        minWidth: 300,
    },
    title: {
        fontSize: 36,
        fontWeight: '300',
        color: '#fff',
        marginBottom: 8,
        fontFamily: 'GoogleSans-Regular',
        textAlign: 'center',
    },
});
