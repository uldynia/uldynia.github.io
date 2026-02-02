import ActionButton from '../components/ActionButton';
import TypingEffect from '../components/TypingEffect';
import { GameConfig } from '../config/games';

export const config: GameConfig = {
    slug: 'groundbreakers',
    icon: require('../assets/images/groundbreakers/icon.webp'),
    title: 'GROUNDBREAKERS',
    background: 'carousel',
    carouselImages: [
        require('../assets/images/groundbreakers/background.webp')
    ],
};

export default function GroundbreakersContent() {
    return (
        <>
            <TypingEffect>A multiplayer 2D action adventure game where you play as a miner deployed to a foreign planet with a mission.</TypingEffect>
            <ActionButton icon="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-play-store-icon.png" href="https://play.google.com/store/apps/details?id=org.uldynia.GROUNDBREAKERS&pli=1">Google Play</ActionButton>
        </>
    );
}
