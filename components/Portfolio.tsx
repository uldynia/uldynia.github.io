import React, { Children, isValidElement, useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';
import Game, { GameProps } from './Game';

interface PortfolioProps {
    children: React.ReactNode;
}

export default function Portfolio({ children }: PortfolioProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Extract Game children and their icons
    const games = Children.toArray(children).filter(
        (child): child is React.ReactElement<GameProps> =>
            isValidElement(child) && child.type === Game
    );

    const icons: ImageSourcePropType[] = games.map((game) => game.props.icon);

    return (
        <View style={styles.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
                {icons.map((icon, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.navButton,
                            activeIndex === index && styles.navButtonActive,
                        ]}
                        onPress={() => setActiveIndex(index)}
                        activeOpacity={0.7}
                    >
                        <Image source={icon} style={styles.navIcon} resizeMode="contain" />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Active Game Content */}
            <View style={styles.content}>
                {games[activeIndex]}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
    },
    navbar: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 12,
        // Gradient-like effect using a slightly lighter top edge
        backgroundColor: 'rgba(30, 35, 50, 0.95)',
        // No border - using subtle shadow instead
        shadowColor: 'rgba(100, 120, 180, 0.3)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
    },
    navButton: {
        width: 48,
        height: 48,
        borderRadius: 10,
        backgroundColor: 'rgba(55, 65, 81, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    navButtonActive: {
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderWidth: 2,
        borderColor: 'rgba(165, 180, 252, 0.5)',
    },
    navIcon: {
        width: 28,
        height: 28,
        borderRadius: 4,
    },
    content: {
        flex: 1,
    },
});
