import TypingEffect from '../components/TypingEffect';
import { GameConfig } from '../config/games';

export const config: GameConfig = {
    slug: 'shiftblade',
    icon: require('../assets/images/favicon.png'),
    title: 'Shiftblade',
    background: 'carousel',
    carouselImages: [
        require('../assets/images/shiftblade/background.png')
    ],
};

export default function ShiftbladeContent() {
    return (
        <>
            <TypingEffect>A 2D isometric game where your goal is to collect as many powerups while avoiding flying chainsaws.</TypingEffect>
        </>
    );
}
