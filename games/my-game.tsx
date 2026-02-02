import ActionButton from '../components/ActionButton';
import Row from '../components/Row';
import TypingEffect from '../components/TypingEffect';
import { GameConfig } from '../config/games';

// Config for this game
export const config: GameConfig = {
    slug: 'my-game',
    icon: require('../assets/images/favicon.png'),
    title: 'My Game',
    background: 'carousel',
    carouselImages: [
        'https://picsum.photos/1920/1080?random=1',
        'https://picsum.photos/1920/1080?random=2',
        'https://picsum.photos/1920/1080?random=3',
    ],
};

// Content component
export default function MyGameContent() {
    return (
        <>
            <TypingEffect>An awesome indie game project.</TypingEffect>
            <Row>
                <ActionButton icon="/steam.png">View on Steam</ActionButton>
                <ActionButton icon="/itch.png">Play on Itch.io</ActionButton>
            </Row>
        </>
    );
}
