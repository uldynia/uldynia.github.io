import ActionButton from '../components/ActionButton';
import TypingEffect from '../components/TypingEffect';
import { GameConfig } from '../config/games';

export const config: GameConfig = {
    slug: 'melded-maker',
    icon: require('../assets/images/meldedmaker/icon.webp'),
    title: 'Melded Maker',
    background: 'carousel',
    carouselImages: [
        require('../assets/images/meldedmaker/1.webp'),
        require('../assets/images/meldedmaker/2.webp'),
        require('../assets/images/meldedmaker/3.webp'),
        require('../assets/images/meldedmaker/4.webp'),

    ],
};

export default function MeldedMakerContent() {
    return (
        <>
            <TypingEffect speed={0}>A 3D top-down tycoon game where you collect and refine resources for coins. Chop down trees, mine ores and save money to be the ultimate tycoon. Purchase drones with flying chainsaws to automate your tasks and refine materials for cash. Get stronger at the combat forge and delve into The Singularity to fend off monsters in the abyss.</TypingEffect>
            <ActionButton icon="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-play-store-icon.png" href="https://play.google.com/store/apps/details?id=com.uldynia.meldedmakers&pcampaignid=web_share">Google Play</ActionButton>
        </>
    );
}
