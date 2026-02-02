import React from 'react';
import { ImageSourcePropType } from 'react-native';

// Import all games - add one line per game
import AnimergeContent, { config as animergeConfig } from '../games/animerge';
import EchelonContent, { config as echelonConfig } from '../games/echelon';
import GroundbreakersContent, { config as groundbreakersConfig } from '../games/groundbreakers';
import MeldedMakerContent, { config as meldedMakerConfig } from '../games/melded-maker';
import RestingPlaceContent, { config as restingPlaceConfig } from '../games/resting-place';
import ShiftbladeContent, { config as shiftbladeConfig } from '../games/shiftblade';
import SkyblockTycoonContent, { config as skyblockTycoonConfig } from '../games/skyblock-tycoon';
import UldyniaContent, { config as uldyniaConfig } from '../games/uldynia';

// Full game config with content component
export interface CarouselImage {
    source: string | ImageSourcePropType;
    alignment?: 'left' | 'center' | 'right' | string;
}

// Game config interface - used by each game file
export interface GameConfig {
    slug: string;
    icon: ImageSourcePropType;
    title: string;
    background: 'stars' | 'carousel';
    carouselImages?: (string | ImageSourcePropType | CarouselImage)[];
    Side?: React.ComponentType;
}

// Full game config with content component
export interface FullGameConfig extends GameConfig {
    Content: React.ComponentType;
}

// Build the games array - add one entry per game
export const games: FullGameConfig[] = [
    { ...uldyniaConfig, Content: UldyniaContent },
    { ...animergeConfig, Content: AnimergeContent },
    { ...skyblockTycoonConfig, Content: SkyblockTycoonContent },
    { ...restingPlaceConfig, Content: RestingPlaceContent },
    { ...meldedMakerConfig, Content: MeldedMakerContent },
    { ...groundbreakersConfig, Content: GroundbreakersContent },
    { ...echelonConfig, Content: EchelonContent },
    { ...shiftbladeConfig, Content: ShiftbladeContent },
];

// Helper functions
export function getGameBySlug(slug: string): FullGameConfig | undefined {
    return games.find((g) => g.slug === slug);
}

export function getDefaultGame(): FullGameConfig {
    return games[0];
}
