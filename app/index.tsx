import { Image } from 'react-native';
import ActionButton from '../components/ActionButton';
import Game from '../components/Game';
import Portfolio from '../components/Portfolio';
import RandomTag from '../components/RandomTag';
import Row from '../components/Row';
import TypingEffect from '../components/TypingEffect';

export default function Index() {
  return (
    <Portfolio>
      <Game
        icon="/icon.png"
        background="/background.png"
        title="uldynia"
      >
        <RandomTag>
          <TypingEffect>Caffeine-powered Software Engineer.</TypingEffect>
          <TypingEffect>Game Developer. Software Engineer. Caffeine Junkie.</TypingEffect>
        </RandomTag>
        <Row>
          <ActionButton icon="/linkedin.png">Hire On LinkedIn</ActionButton>
          <ActionButton icon="/discord.png">Join my Discord</ActionButton>
        </Row>
        <Image
          source={{ uri: '/skills.png' }}
          style={{ width: 300, height: 60 }}
          resizeMode="contain"
        />
      </Game>

      <Game
        icon="/game-icon.png"
        background="/game-bg.png"
        title="My Game"
      >
        <TypingEffect>An awesome indie game project.</TypingEffect>
        <Row>
          <ActionButton icon="/steam.png">View on Steam</ActionButton>
          <ActionButton icon="/itch.png">Play on Itch.io</ActionButton>
        </Row>
      </Game>
    </Portfolio>
  );
}

