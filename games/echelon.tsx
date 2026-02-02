import TypingEffect from '../components/TypingEffect';
import { GameConfig } from '../config/games';

export const config: GameConfig = {
    slug: 'echelon',
    icon: require('../assets/images/echelon/icon.png'),
    title: 'Echelon',
    background: 'carousel',
    carouselImages: [
        require('../assets/images/echelon/1.png'),
        require('../assets/images/echelon/2.png'),
        require('../assets/images/echelon/3.png'),
        require('../assets/images/echelon/4.png'),
        require('../assets/images/echelon/5.png'),

    ],
};

export default function EchelonContent() {
    return (
        <>
            <TypingEffect speed={0}>A metroidvania that centers around a girl who wakes up to find herself in the Lower City: The lowest parts of the realm where only those banished are sent.
                She has no memory of who she is or where she’s from but is determined to find the answers within this grim situation.
            </TypingEffect>
        </>
    );
}
