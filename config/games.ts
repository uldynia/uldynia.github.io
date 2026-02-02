import { ImageSourcePropType } from 'react-native';

// Import all games - add one line per game
import MyGameContent, { config as myGameConfig } from '../games/my-game';
import UldyniaContent, { config as uldyniaConfig } from '../games/uldynia';

// Game config interface - used by each game file
export interface GameConfig {
    slug: string;
    icon: ImageSourcePropType;
    title: string;
    background: 'stars' | 'carousel';
    carouselImages?: string[];
}

// Full game config with content component
export interface FullGameConfig extends GameConfig {
    Content: React.ComponentType;
}

// Build the games array - add one entry per game
export const games: FullGameConfig[] = [
    { ...uldyniaConfig, Content: UldyniaContent },
    { ...myGameConfig, Content: MyGameContent },
];

// Helper functions
export function getGameBySlug(slug: string): FullGameConfig | undefined {
    return games.find((g) => g.slug === slug);
}

export function getDefaultGame(): FullGameConfig {
    return games[0];
}
