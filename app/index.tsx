import GameView from '../components/Game';
import Portfolio from '../components/Portfolio';
import StarBackground from '../components/StarBackground';
import { games } from '../config/games';

// Home route renders uldynia directly
export default function Index() {
  const gameConfig = games[0]; // uldynia is first
  const Content = gameConfig.Content;

  return (
    <Portfolio activeSlug="">
      <GameView
        icon={gameConfig.icon}
        title={gameConfig.title}
        background={<StarBackground starCount={200} parallaxStrength={25} />}
      >
        <Content />
      </GameView>
    </Portfolio>
  );
}
