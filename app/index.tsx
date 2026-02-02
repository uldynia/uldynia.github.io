import { Image } from 'react-native';
import ActionButton from '../components/ActionButton';
import CarouselBackground from '../components/CarouselBackground';
import Game from '../components/Game';
import Portfolio from '../components/Portfolio';
import RandomTag from '../components/RandomTag';
import Row from '../components/Row';
import StarBackground from '../components/StarBackground';
import TypingEffect from '../components/TypingEffect';

export default function Index() {
  return (
    <Portfolio>
      <Game
        icon={require('../assets/images/favicon.png')}
        title="uldynia"
        background={<StarBackground starCount={200} parallaxStrength={25} />}
      >
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
      </Game>

      <Game
        icon={require('../assets/images/favicon.png')}
        title="My Game"
        background={
          <CarouselBackground
            images={[
              'https://picsum.photos/1920/1080?random=1',
              'https://picsum.photos/1920/1080?random=2',
              'https://picsum.photos/1920/1080?random=3',
            ]}
          />
        }
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
