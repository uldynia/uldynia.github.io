import ActionButton from '../components/ActionButton';
import TypingEffect from '../components/TypingEffect';
import { GameConfig } from '../config/games';

export const config: GameConfig = {
    slug: 'resting-place',
    icon: require('../assets/images/restingplace/1.png'),
    title: 'Resting Place',
    background: 'carousel',
    carouselImages: [
        { source: require('../assets/images/restingplace/background.png'), alignment: 'left' },
        require('../assets/images/restingplace/1.png'),
        require('../assets/images/restingplace/2.png'),
        require('../assets/images/restingplace/3.png'),
        require('../assets/images/restingplace/4.png'),
        require('../assets/images/restingplace/5.png'),
    ],
};

export default function RestingPlaceContent() {
    return (
        <>
            <TypingEffect speed={0}>An isometric 2.5D mystery RPG with visual novel and point-and-click elements set in 1970s America. You play as an author named Jo Darcy as he investigates his own death in the Woodrow Hotel.</TypingEffect>
            <ActionButton icon="https://brandlogos.net/wp-content/uploads/2025/12/itch.io-logo_brandlogos.net_bhtjr.png" href="https://santakooki.itch.io/resting-place">Play on Itch.io</ActionButton>
        </>
    );
}
