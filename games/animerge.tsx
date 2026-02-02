import React from 'react';
import ActionButton from '../components/ActionButton';
import TypingEffect from '../components/TypingEffect';
import { GameConfig } from '../config/games';


export const config: GameConfig = {
    slug: 'animerge',
    icon: require('../assets/images/animerge/icon.png'),
    title: 'Animerge',
    background: 'carousel',
    carouselImages: [
        require('../assets/images/animerge/background.png')
    ],
    Side: AnimergeSide,
};

export default function AnimergeContent() {
    return (
        <>
            <TypingEffect>Jam-winning real-time strategy game. Merge animals into stronger ones. Defeat your enemy!</TypingEffect>
            <ActionButton href="http://animerge.uldynia.org/classic">Play online</ActionButton>
        </>
    );
}

export function AnimergeSide() {
    return (
        <iframe width="350" height="758" src="https://www.youtube.com/embed/inxDPYJVdn4" title="Animerge" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    );
}