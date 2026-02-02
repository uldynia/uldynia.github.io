import { Image } from 'react-native';
import ActionButton from '../components/ActionButton';
import RandomTag from '../components/RandomTag';
import Row from '../components/Row';
import TypingEffect from '../components/TypingEffect';
import { GameConfig } from '../config/games';

// Config for this game
export const config: GameConfig = {
    slug: 'uldynia',
    icon: require('../assets/images/favicon.png'),
    title: 'uldynia',
    background: 'stars',
};

// Content component
export default function UldyniaContent() {
    return (
        <>
            <RandomTag>
                <TypingEffect>Caffeine-powered Software Engineer.</TypingEffect>
                <TypingEffect>Game Developer. Software Engineer. Caffeine Junkie.</TypingEffect>
            </RandomTag>
            <Row>
                <ActionButton icon="https://www.iconpacks.net/icons/1/free-linkedin-icon-130-thumb.png" href="https://linked.in/uldynia">Hire On LinkedIn</ActionButton>
                <ActionButton icon="https://pngimg.com/d/discord_PNG8.png" href="https://dc.uldynia.org">Join my Discord</ActionButton>
            </Row>
            <Image
                source={require('../assets/images/skills.png')}
                style={{ width: 600, height: 120 }}
                resizeMode="contain"
            />
        </>
    );
}
