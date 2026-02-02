import { Redirect, useLocalSearchParams } from 'expo-router';
import CarouselBackground from '../components/CarouselBackground';
import GameView from '../components/Game';
import Portfolio from '../components/Portfolio';
import StarBackground from '../components/StarBackground';
import { getGameBySlug } from '../config/games';

export default function GameRoute() {
    const { game } = useLocalSearchParams<{ game: string }>();
    const gameConfig = getGameBySlug(game);

    // If game not found, redirect to home
    if (!gameConfig) {
        return <Redirect href="/" />;
    }

    const renderBackground = () => {
        if (gameConfig.background === 'stars') {
            return <StarBackground starCount={200} parallaxStrength={25} />;
        }
        return <CarouselBackground images={gameConfig.carouselImages || []} />;
    };

    const Content = gameConfig.Content;

    return (
        <Portfolio activeSlug={game}>
            <GameView
                icon={gameConfig.icon}
                title={gameConfig.title}
                background={renderBackground()}
            >
                <Content />
            </GameView>
        </Portfolio>
    );
}
