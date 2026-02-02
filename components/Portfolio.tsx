import { Href, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { games } from '../config/games';

interface PortfolioProps {
    children: React.ReactNode;
    activeSlug: string;
}

export default function Portfolio({ children, activeSlug }: PortfolioProps) {
    const router = useRouter();

    const isActive = (game: typeof games[0], index: number) => {
        // First game (uldynia) is active when activeSlug is empty or matches
        if (index === 0) {
            return activeSlug === '' || activeSlug === game.slug;
        }
        return activeSlug === game.slug;
    };

    const getRoute = (game: typeof games[0], index: number): Href => {
        // First game goes to home route
        return (index === 0 ? '/' : `/${game.slug}`) as Href;
    };

    return (
        <View style={styles.container}>
            {/* Navbar */}
            <View style={styles.navbarContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.navbar}
                >
                    {games.map((game, index) => (
                        <TouchableOpacity
                            key={game.slug}
                            style={[
                                styles.navButton,
                                isActive(game, index) && styles.navButtonActive,
                            ]}
                            onPress={() => router.push(getRoute(game, index))}
                            activeOpacity={0.7}
                        >
                            <Image source={game.icon} style={styles.navIcon} resizeMode="contain" />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Active Game Content */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
    },
    navbarContainer: {
        backgroundColor: 'rgba(30, 35, 50, 0.95)',
        shadowColor: 'rgba(100, 120, 180, 0.3)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 4,
        zIndex: 100,
    },
    navbar: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 12,
    },
    navButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    navButtonActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
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
