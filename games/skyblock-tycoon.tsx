import TypingEffect from '../components/TypingEffect';
import { GameConfig } from '../config/games';

export const config: GameConfig = {
    slug: 'skyblock-tycoon',
    icon: require('../assets/images/skyblockTycoon/icon.png'),
    title: 'Skyblock Tycoon',
    background: 'carousel',
    carouselImages: [
        require('../assets/images/skyblockTycoon/background.png')
    ],
};

export default function SkyblockTycoonContent() {
    return (
        <>
            <TypingEffect>A casual spin on the popular Minecraft gamemode.</TypingEffect>
        </>
    );
}
